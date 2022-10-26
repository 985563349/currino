export function searchTree<T extends Record<string, any>>(
  iteratee: (node: T) => boolean,
  tree: T[],
  childrenKey: string = 'children'
): T[] {
  const result: T[] = [];

  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];

    if (iteratee(node)) {
      result.push(node);
      continue;
    }

    if (Array.isArray(node[childrenKey])) {
      const children = searchTree(iteratee, node[childrenKey], childrenKey);
      if (children.length > 0) {
        result.push({ ...node, [childrenKey]: children });
      }
    }
  }

  return result;
}
