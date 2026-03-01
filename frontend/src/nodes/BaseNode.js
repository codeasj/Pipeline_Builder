import { Handle, Position } from 'reactflow';

const getOffset = (index, total) => `${((index + 1) * 100) / (total + 1)}%`;

const renderHandles = (id, type, handles, position) => {
  if (!handles || handles.length === 0) {
    return null;
  }

  return handles.map((handle, index) => (
    <Handle
      key={`${id}-${type}-${handle.key}`}
      type={type}
      position={position}
      id={`${id}-${handle.key}`}
      style={{ top: getOffset(index, handles.length) }}
    />
  ));
};

export const BaseNode = ({
  id,
  title,
  subtitle,
  targetHandles = [],
  sourceHandles = [],
  children,
  className = '',
  style = {},
}) => {
  return (
    <div className={`node-card ${className}`.trim()} style={style}>
      {renderHandles(id, 'target', targetHandles, Position.Left)}
      <div className="node-header">
        <span className="node-title">{title}</span>
        {subtitle ? <span className="node-subtitle">{subtitle}</span> : null}
      </div>
      <div className="node-content">{children}</div>
      {renderHandles(id, 'source', sourceHandles, Position.Right)}
    </div>
  );
};
