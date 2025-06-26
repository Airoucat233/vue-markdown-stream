import type MarkdownIt from 'markdown-it'
import type { Token } from 'markdown-it/index.js'
import { Fragment, h, type Component, type VNode } from 'vue'

export const useVNodeRenderer = (md: MarkdownIt, plugin: Record<string, Component> = {}) => {
  let stack: { token: Token; children: VNode[] }[] = []
  // TODO: implement rendering every token to fine-grained VNode output,
  //       allowing for precise control over each token's transformation.

  //   const getAttrs = (token: Token): Record<string, any> => {
  //     const attrs: Record<string, any> = {}
  //     if (token.attrs) {
  //       for (const [name, value] of token.attrs) {
  //         attrs[name] = value
  //       }
  //     }
  //     return attrs
  //   }
  //   const renderEveryToken = (tokens: Token[], env: any = {}): VNode[] => {
  //     const vnodes: VNode[] = []
  //     let textBlock: string = ''

  //     const pushChild = (vnode: VNode) => {
  //       if (stack.length > 0) {
  //         stack[stack.length - 1].children.push(vnode)
  //       } else {
  //         vnodes.push(vnode)
  //       }
  //     }

  //     for (let i = 0; i < tokens.length; i++) {
  //       const token = tokens[i]

  //       if (token.hidden) continue
  //       // 1. 开标签：入栈
  //       if (token.nesting === 1) {
  //         stack.push({ token, children: [] })
  //       }

  //       // 2. 关闭标签：出栈并构建VNode
  //       else if (token.nesting === -1) {
  //         const last = stack.pop()
  //         if (!last) continue

  //         const tag = last.token.tag
  //         const vnode = h(tag, getAttrs(last.token), last.children)

  //         pushChild(vnode)
  //       }

  //       // 3. 普通token
  //       else if (token.nesting === 0) {
  //         if (token.type === 'inline') {
  //           if (token.children) {
  //             const children = render(token.children, env)
  //             children.forEach(pushChild)
  //           }
  //         } else if (token.type === 'text') {
  //           // 普通文本用 span 包裹（不能是 string）
  //           pushChild(h(Fragment, [token.content]))
  //         } else if (token.type == 'softbreak') {
  //           //自闭和的元素
  //           pushChild(h(token.tag))
  //         } else if (token.tag) {
  //           const html = md.renderer.render([token], md.options, env).trim()
  //           pushChild(h(token.tag, { innerHTML: html }))
  //         } else {
  //           // fallback（不常见），作为 span 文本兜底
  //           pushChild(h('span', {}, token.content))
  //         }
  //       }
  //     }

  //     return vnodes
  //   }

  const defaultFence = md.renderer.rules.fence
  const render = (content: string): VNode[] => {
    const vnodes: VNode[] = []
    let textBlock: string = ''

    const tokens = md.parse(content, {})

    const pushTextBlock = () => {
      if (textBlock) {
        vnodes.push(h('div', { class: 'text-block', innerHTML: textBlock }))
        textBlock = ''
      }
    }
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]

      if (token.type === 'fence') {
        pushTextBlock()
        const component = plugin[token.info.trim()]
        if (component) {
          vnodes.push(h(component, { config: token.content }))
        } else {
          vnodes.push(
            h('div', {
              class: 'code-block',
              innerHTML: defaultFence?.(tokens, i, md.options, {}, md.renderer) || '',
            }),
          )
        }
      } else {
        const html = md.renderer.render([token], md.options, {})
        textBlock += html
      }
    }
    pushTextBlock()
    return vnodes
  }

  return { render }
}
