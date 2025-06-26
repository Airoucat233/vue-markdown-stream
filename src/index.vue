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

import { computed, onMounted, type Component } from 'vue'

import { useVNodeRenderer } from './hooks/useVNodeRenderer'
import type { MarkdownItPluginEntry } from './types'

const props = defineProps<{
  content: string
  md?: MarkdownIt
  plugin?: MarkdownItPluginEntry[]
  fencePlugin?: Record<string, Component>
}>()

const emit = defineEmits([])

const md: MarkdownIt =
  props.md ||
  new MarkdownIt({
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
if (props.plugin) {
  for (const plugin of props.plugin) {
    if (typeof plugin === 'function') {
      md.use(plugin)
    } else {
      md.use(...plugin)
    }
  }
}

const { render } = useVNodeRenderer(md, props.fencePlugin ?? {})

const vnodeTree = computed(() => {
  return render(props.content)
})

onMounted(() => {})
</script>

<style lang="scss" scoped></style>
