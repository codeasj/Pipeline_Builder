// llmNode.js

import { useMemo } from 'react';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const targetHandles = useMemo(
    () => [
      { key: 'system', label: 'system' },
      { key: 'prompt', label: 'prompt' },
    ],
    []
  );
  const sourceHandles = useMemo(() => [{ key: 'response', label: 'response' }], []);

  return (
    <BaseNode
      id={id}
      title="LLM"
      subtitle={data?.model || 'gpt-4.1-mini'}
      targetHandles={targetHandles}
      sourceHandles={sourceHandles}
    >
      <p className="node-copy">Generates a response from a system and prompt input.</p>
    </BaseNode>
  );
};
