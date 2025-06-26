import { h, type VNode } from 'vue'

export const htmlToVNodes = (html: string) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = html.trim()

  function domNodeToVNode(node: Node): VNode | string | null {
    if (node.nodeType === 1) {
      // 元素节点
      const el = node as HTMLElement
      const tag = el.tagName.toLowerCase()
      const attrs: Record<string, any> = {}
      for (const attr of el.attributes) {
        attrs[attr.name] = attr.value
      }
      const children = Array.from(el.childNodes)
        .map(domNodeToVNode)
        .filter((v): v is VNode | string => v !== null)
      return h(tag, attrs, children)
    } else if (node.nodeType === 3) {
      // 文本节点
      return node.textContent || ''
    }
    // 注释等其他节点忽略
    return null
  }

  return Array.from(wrapper.childNodes)
    .map(domNodeToVNode)
    .filter((v): v is VNode | string => v !== null)
}
