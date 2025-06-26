<template>
  <div class="markdown-body">
    <component v-for="(node, i) in vnodeTree" :is="node" :key="i" />
  </div>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import 'github-markdown-css/github-markdown.css'
import './styles/index.scss'

import { ref, computed, onMounted, type Component } from 'vue'

import { full as emoji } from 'markdown-it-emoji'
import { useVNodeRenderer } from './hooks/useVNodeRenderer'
import preWrapperPlugin from './plugins/preWrapper'
import lineNumbersPlugin from './plugins/lineNumbers'

const props = defineProps<{
  modelValue: string
  plugin?: Record<string, Component>
}>()

const emit = defineEmits(['event', 'update:modelValue'])

const md: MarkdownIt = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          '</code></pre>'
        )
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  },
})
md.use(preWrapperPlugin)
md.use(lineNumbersPlugin)
md.use(emoji)

const plugins = computed(() => ({
  ...{
    // ehcarts: ECharts,
  },
  ...props.plugin,
}))

const { render } = useVNodeRenderer(md, plugins.value)

const vnodeTree = computed(() => {
  return render(props.modelValue)
})

onMounted(() => {})
</script>

<style lang="scss" scoped></style>
