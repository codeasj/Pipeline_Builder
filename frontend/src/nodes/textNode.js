// textNode.js

import { useEffect, useMemo, useRef, useState } from 'react';
import { useUpdateNodeInternals } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

const VARIABLE_REGEX = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const BASE_NODE_WIDTH = 220;
const MAX_NODE_WIDTH = 520;

const getUniqueVariables = (text) => {
  const variables = new Set();
  const matches = text.matchAll(VARIABLE_REGEX);

  for (const match of matches) {
    variables.add(match[1]);
  }

  return [...variables];
};

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const updateNodeInternals = useUpdateNodeInternals();
  const [currText, setCurrText] = useState(data?.text || 'Hello {{input}} from {{user_name}}');
  const textareaRef = useRef(null);

  const variableNames = useMemo(() => getUniqueVariables(currText), [currText]);
  const targetHandles = useMemo(
    () => variableNames.map((name) => ({ key: `var-${name}`, label: name })),
    [variableNames]
  );
  const sourceHandles = useMemo(() => [{ key: 'output' }], []);
  const lines = currText.split('\n');
  const longestLineLength = lines.reduce((maxLength, line) => Math.max(maxLength, line.length), 0);
  const widthStep = Math.floor(Math.max(0, longestLineLength - 28) / 12);
  const nodeWidth = clamp(BASE_NODE_WIDTH + widthStep * 48, BASE_NODE_WIDTH, MAX_NODE_WIDTH);

  const handleTextChange = (e) => {
    const value = e.target.value;
    setCurrText(value);
    updateNodeField(id, 'text', value);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const nextHeight = clamp(textareaRef.current.scrollHeight, 40, 260);
      textareaRef.current.style.height = `${nextHeight}px`;
    }
  }, [currText]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, targetHandles, updateNodeInternals]);

  return (
    <BaseNode id={id} title="Text" targetHandles={targetHandles} sourceHandles={sourceHandles} style={{ width: nodeWidth }}>
      <label className="node-field node-field-stacked">
        <span>
          Text:
        </span>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          className="text-node-input"
          placeholder="Type plain text or variables like {{input}}"
        />
      </label>
    </BaseNode>
  );
};
