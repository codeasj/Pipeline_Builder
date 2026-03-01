import { useMemo } from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id }) => {
  const targetHandles = useMemo(() => [{ key: 'items', label: 'items' }], []);
  const sourceHandles = useMemo(() => [{ key: 'filtered', label: 'filtered' }], []);

  return (
    <BaseNode id={id} title="Filter" subtitle="Text contains" targetHandles={targetHandles} sourceHandles={sourceHandles}>
      <p className="node-copy">Passes through items that match a filter condition.</p>
    </BaseNode>
  );
};
