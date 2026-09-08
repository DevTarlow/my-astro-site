/**
 * Rehype plugin: wrap every <table> produced by markdown in a scrollable
 * <div class="table-wrap"> so wide tables scroll inside the prose column
 * instead of overflowing the page on small viewports.
 */
export default function rehypeWrapTables () {
  return function (tree) {
    function walk (node) {
      if (!node || typeof node !== 'object' || !Array.isArray(node.children)) return
      node.children = node.children.flatMap(function (child) {
        walk(child)
        if (child && child.type === 'element' && child.tagName === 'table') {
          return [{
            type: 'element',
            tagName: 'div',
            properties: { className: ['table-wrap'] },
            children: [child],
          }]
        }
        return [child]
      })
    }
    walk(tree)
    return tree
  }
}
