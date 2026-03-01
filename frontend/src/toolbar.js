// toolbar.js

import { DraggableNode } from './draggableNode';
import { toolbarNodes } from './nodeRegistry';

export const PipelineToolbar = () => {
    const groups = toolbarNodes.reduce((acc, node) => {
        if (!acc[node.category]) {
            acc[node.category] = [];
        }
        acc[node.category].push(node);
        return acc;
    }, {});

    return (
        <section className="pipeline-toolbar">
            <div className="toolbar-header">
                <h1>Pipeline Builder</h1>
                <p>Drag nodes to canvas and connect handles to model your flow.</p>
            </div>
            <div className="toolbar-groups">
                {Object.entries(groups).map(([groupName, nodes]) => (
                    <div key={groupName} className="toolbar-group">
                        <h2>{groupName}</h2>
                        <div className="toolbar-node-grid">
                            {nodes.map((node) => (
                                <DraggableNode key={node.type} type={node.type} label={node.label} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
