import { mergeGeneratedCollection } from './generated-content-merge.js';

export function mergeGeneratedDetailContent(target, detail) {
  return mergeGeneratedCollection(target, detail);
}
