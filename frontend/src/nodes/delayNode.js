import { useMemo } from 'react';
import { BaseNode } from './BaseNode';

export const DelayNode = ({ id }) => {
  const targetHandles = useMemo(() => [{ key: 'input', label: 'input' }], []);
  const sourceHandles = useMemo(() => [{ key: 'output', label: 'output' }], []);

  return (
    <BaseNode id={id} title="Delay" subtitle="Throttle stream" targetHandles={targetHandles} sourceHandles={sourceHandles}>
      <p className="node-copy">Adds a time gap before forwarding data.</p>
    </BaseNode>
  );
};
