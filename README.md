# vue-markdown-stream

🌐 English | [简体中文](./README.zh-CN.md)

A Vue 3 component based on [markdown-it](https://github.com/markdown-it/markdown-it), specifically optimized for efficient code block rendering in streaming scenarios (e.g., streaming responses from Large Language Models (LLMs)).

## 🔍 Features
### 🚀 Streaming Response Rendering Mechanism Support
Designed for real-time content update scenarios like **Large Language Model (LLM) streaming output**. Compared to traditional Markdown rendering solutions, this component achieves **incremental rendering**, avoiding repeated repainting of the entire HTML block.

### 🔧 Based on markdown-it Plugin Ecosystem
Fully compatible with the `markdown-it` plugin ecosystem. On this basis, you can customize your code block rendering plugins through Vue Components.

Visit 👉[markdown-it](https://github.com/markdown-it/markdown-it) to learn about the plugin ecosystem.

### 🧩 Custom Component Injection Support
For code blocks like ```echarts, they can be rendered as true Vue components, such as your custom `Echarts.vue`.

### 🔄 VNode-based Rendering Method
No longer relies on v-html, but directly converts Markdown tokens into Vue's Virtual DOM (VNode), offering:

* Finer-grained responsive updates
* Better performance and controllability
* Higher security (no HTML injection risk)

🎯 Minimized DOM Updates
Adapted for streaming text updates, based on Vue's VNode diff strategy, only necessary parts are updated, resulting in excellent performance.

## Installation

```sh
pnpm install vue-markdown-stream
```

## Usage Examples

### Simple Usage

```vue
<template>
  <div>
    <VueMarkdown :content="markdownContent" :plugin="pluginsMap"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueMarkdown from 'vue-markdown-stream'

const markdownContent = ref(`
# This is a Markdown example
`)

</script>

<style scoped>
</style>
```
### In Streaming Scenarios
```vue
<template>
  <div>
    <VueMarkdownStream :content="markdownContent"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueMarkdownStream,{useTypewriter} from 'vue-markdown-stream'

const markdownContent = ref('')

// Simulate streaming content updates
const streamContent = `
Below is a custom code block
`
const { startTyping } = useTypewriter()
const stop = startTyping(streamContent,100,[3,5],(text)=>{
  markdownContent+=text
})
</script>

<style scoped>
</style>
```
### Custom Component Code Block Plugin

If I ask a large model or backend to return a fixed format code block through some means, for example:

~~~json


  ```echarts
    {
        "title": {
        "text": "ECharts Example Chart"
      },
        "tooltip": {},
        "legend": {
        "data": ["Sales"]
      },
        "xAxis": {
        "data": ["Shirt", "Cardigan", "Chiffon Shirt", "Pants", "High Heels"]
      },
        "yAxis": {},
        "series": [{
        "name": "Sales",
        "type": "bar",
        "data": [5, 20, 36, 10, 10]
      }]
    }
  ```

~~~

Then define the component corresponding to the `echarts` fence identifier, you can render this code block in markdown as a Vue component, injected via the `fencePlugin` props. See below:

#### Parent Component

```vue
<template>
  <div>
    <VueMarkdownStream :content="markdownContent" :fencePlugin="pluginsMap"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueMarkdownStream from 'vue-markdown-stream'
import Echarts from '/path/to/Echarts.vue'
import Mermaid from '/path/to/Mermaid.vue'

const pluginsMap = ref({
  // The key is the custom code block identifier, the value is the imported custom component
  echarts:Echarts,
  mermaid:Mermaid
})
const markdownContent = ref('')
</script>

<style scoped>
</style>
```

A custom Echarts component is as follows:

#### Echarts.vue

```sh
pnpm install echarts
```

```vue
<!-- use tailwindcss -->
<template>
  <div
    class="echarts-block animate-in fade-in-95 zoom-in-95 relative my-4 w-[80%] rounded-md border border-gray-200 duration-500"
  >
    <div
      v-show="loading"
      class="animate-skeleton-loading absolute z-10 flex min-h-[400px] w-full items-center justify-center gap-1"
    >
      <span
        class="loading-text flex animate-pulse bg-gradient-to-r from-green-500 via-blue-500 to-violet-500 bg-clip-text text-[1.2rem] font-bold text-transparent"
        >Chart rendering</span
      >
      <div class="animate-wiggle h-5 w-5 rounded-sm bg-green-500"></div>
    </div>
    <div class="min-h-[400px] w-full" ref="echartsContainer"></div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  config: {
    type: String,
    default: '{}',
  },
})
const loading = ref<boolean>(true)
const option = ref()
const echartsContainer = ref<HTMLDivElement>()
let chart: echarts.ECharts | null = null
let observer: ResizeObserver

const renderCharts = () => {
  if (!echartsContainer.value) return

  if (!chart) {
    chart = echarts.init(echartsContainer.value)

    observer = new ResizeObserver(() => {
      chart?.resize()
    })
    observer.observe(echartsContainer.value)
  }

  if (option.value) {
    loading.value = false
    chart?.setOption(option.value)
  }
}

watch(
  () => props.config,
  (val) => {
    try {
      option.value = JSON.parse(val)
      renderCharts()
    } catch (err) {
      loading.value = true
    }
  },
  { immediate: true },
)

onMounted(() => {
  renderCharts()
})
onBeforeUnmount(() => {
  observer?.disconnect()
  chart?.dispose()
})
</script>

```

### Using markdown-it plugins

VueMarkdownStream also retains the native markdown-it plugin integration capability, which can be injected via the component's `plugin` props.


```sh
pnpm install markdown-it-emoji
```

```vue
<template>
  <div>
    <VueMarkdown :v-model="markdownContent" :plugin="plugins"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueMarkdown from 'vue-markdown-stream'
import { full as emoji } from 'markdown-it-emoji'

const plugins = ref([emoji])

const markdownContent = ref('')

</script>

<style scoped>
</style>
```

### Using your own markdown-it object

To support full customization, you can also pass a custom markdown-it object, which means this component only enhances the fence code block plugin.

```vue
<template>
  <div>
    <VueMarkdown :v-model="markdownContent" :md="myMarkdownIt"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueMarkdown from 'vue-markdown-stream'

const markdownContent = ref('')

const myMarkdownIt = new MarkdownIt({...})//Your custom MarkdownIt

</script>

<style scoped>
</style>
``` 