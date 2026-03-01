import { useMemo } from 'react';
import { BaseNode } from './BaseNode';

export const MathNode = ({ id }) => {
  const targetHandles = useMemo(
    () => [
      { key: 'left', label: 'left' },
      { key: 'right', label: 'right' },
    ],
    []
  );
  const sourceHandles = useMemo(() => [{ key: 'result', label: 'result' }], []);

  return (
    <BaseNode id={id} title="Math" subtitle="Binary op" targetHandles={targetHandles} sourceHandles={sourceHandles}>
      <p className="node-copy">Combines two numeric inputs into one result.</p>
    </BaseNode>
  );
};
