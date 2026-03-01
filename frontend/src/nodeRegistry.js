import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { MathNode } from './nodes/mathNode';
import { FilterNode } from './nodes/filterNode';
import { DelayNode } from './nodes/delayNode';
import { MergeNode } from './nodes/mergeNode';
import { ConditionNode } from './nodes/conditionNode';

export const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  math: MathNode,
  filter: FilterNode,
  delay: DelayNode,
  merge: MergeNode,
  condition: ConditionNode,
};

export const toolbarNodes = [
  { type: 'customInput', label: 'Input', category: 'Core' },
  { type: 'llm', label: 'LLM', category: 'Core' },
  { type: 'customOutput', label: 'Output', category: 'Core' },
  { type: 'text', label: 'Text', category: 'Core' },
  { type: 'math', label: 'Math', category: 'Utility' },
  { type: 'filter', label: 'Filter', category: 'Utility' },
  { type: 'delay', label: 'Delay', category: 'Utility' },
  { type: 'merge', label: 'Merge', category: 'Flow' },
  { type: 'condition', label: 'Condition', category: 'Flow' },
];
