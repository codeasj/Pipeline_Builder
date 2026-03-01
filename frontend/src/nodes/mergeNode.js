import { useMemo } from 'react';
import { BaseNode } from './BaseNode';

export const MergeNode = ({ id }) => {
  const targetHandles = useMemo(
    () => [
      { key: 'first', label: 'first' },
      { key: 'second', label: 'second' },
    ],
    []
  );
  const sourceHandles = useMemo(() => [{ key: 'merged', label: 'merged' }], []);

  return (
    <BaseNode id={id} title="Merge" subtitle="Combine payloads" targetHandles={targetHandles} sourceHandles={sourceHandles}>
      <p className="node-copy">Joins two upstream values into one object.</p>
    </BaseNode>
  );
};
