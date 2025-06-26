import MarkdownIt from 'markdown-it'

/**
 * 支持的 MarkdownIt 插件形式：
 * - 单独函数：直接 md.use(plugin)
 * - 函数 + 参数：md.use(plugin, options) 或 md.use(plugin, arg1, arg2, ...)
 */
type MarkdownItPluginEntry =
  | ((md: MarkdownIt) => void)
  | [(md: MarkdownIt, ...params: any[]) => void, ...any[]]

export type { MarkdownItPluginEntry }
