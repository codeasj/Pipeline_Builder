import { useMemo } from 'react';
import { BaseNode } from './BaseNode';

export const ConditionNode = ({ id }) => {
  const targetHandles = useMemo(() => [{ key: 'value' }], []);
  const sourceHandles = useMemo(
    () => [
      { key: 'pass' },
      { key: 'fail' },
    ],
    []
  );

  return (
    <BaseNode id={id} title="Condition" subtitle="Route branch" targetHandles={targetHandles} sourceHandles={sourceHandles}>
      <p className="node-copy">Routes input to pass/fail based on a check.</p>
    </BaseNode>
  );
};
