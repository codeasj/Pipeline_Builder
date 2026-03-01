// submit.js
import { useStore } from './store';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const onSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const result = await response.json();
            window.alert(
                [
                    'Pipeline Analysis Complete',
                    `Nodes: ${result.num_nodes}`,
                    `Edges: ${result.num_edges}`,
                    `Directed Acyclic Graph (DAG): ${result.is_dag ? 'Yes' : 'No'}`,
                ].join('\n')
            );
        } catch (error) {
            window.alert(`Failed to parse pipeline: ${error.message}`);
        }
    };

    return (
        <div className="submit-wrap">
            <button type="button" className="submit-button" onClick={onSubmit}>
                Submit Pipeline
            </button>
        </div>
    );
}
