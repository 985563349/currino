export function mapTree<T, U>(
  iteratee: (node: T) => U,
  tree: T[],
  childrenKey: string = 'children'
): U[] {
  const result: U[] = [];
  let i = 0;

  while (i < tree.length) {
    const node: any = iteratee(tree[i]);

    if (node) {
      const children = node[childrenKey];
      if (Array.isArray(children)) {
        node[childrenKey] = mapTree(iteratee, node[childrenKey], childrenKey);
      }
      result.push(node);
    }

    i++;
  }

  return result;
}
