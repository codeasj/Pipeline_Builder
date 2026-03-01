// submit.js
import { useState } from 'react';
import { useStore } from './store';

const API_BASE_URL =
    process.env.NODE_ENV === 'production'
        ? 'https://pipeline-builder-rust.vercel.app'
        : (process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000');

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const onSubmit = async () => {
        setIsSubmitting(true);
        setError('');
        try {
            const response = await fetch(`${API_BASE_URL}/pipelines/parse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const parsed = await response.json();
            setResult(parsed);
        } catch (error) {
            setError(error.message);
            setResult(null);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
        <div className="submit-wrap">
            <button type="button" className="submit-button" onClick={onSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Analyzing...' : 'Submit Pipeline'}
            </button>
        </div>
        {(result || error) ? (
            <div className="result-overlay" role="dialog" aria-modal="true">
                <div className="result-card">
                    <div className="result-header">
                        <h3>Pipeline Analysis</h3>
                        <button
                            type="button"
                            className="result-close"
                            onClick={() => {
                                setResult(null);
                                setError('');
                            }}
                        >
                            Close
                        </button>
                    </div>
                    {error ? (
                        <p className="result-error">Failed to parse pipeline: {error}</p>
                    ) : (
                        <div className="result-grid">
                            <p><span>Nodes</span><strong>{result.num_nodes}</strong></p>
                            <p><span>Edges</span><strong>{result.num_edges}</strong></p>
                            <p><span>Is DAG</span><strong>{result.is_dag ? 'Yes' : 'No'}</strong></p>
                        </div>
                    )}
                </div>
            </div>
        ) : null}
        </>
    );
}
