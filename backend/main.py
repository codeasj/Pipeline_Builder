from collections import defaultdict, deque
from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


class PipelinePayload(BaseModel):
    nodes: list[dict[str, Any]] = Field(default_factory=list)
    edges: list[dict[str, Any]] = Field(default_factory=list)


def forms_dag(nodes: list[dict[str, Any]], edges: list[dict[str, Any]]) -> bool:
    node_ids = {node.get('id') for node in nodes if node.get('id') is not None}
    in_degree: dict[str, int] = {node_id: 0 for node_id in node_ids}
    adjacency: dict[str, set[str]] = defaultdict(set)

    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')

        if source not in node_ids or target not in node_ids:
            return False

        if source == target:
            return False

        if target not in adjacency[source]:
            adjacency[source].add(target)
            in_degree[target] += 1

    queue = deque([node_id for node_id, degree in in_degree.items() if degree == 0])
    visited = 0

    while queue:
        node_id = queue.popleft()
        visited += 1

        for neighbor in adjacency[node_id]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(node_ids)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(payload: PipelinePayload):
    nodes = payload.nodes
    edges = payload.edges

    return {
        'num_nodes': len(nodes),
        'num_edges': len(edges),
        'is_dag': forms_dag(nodes, edges),
    }
