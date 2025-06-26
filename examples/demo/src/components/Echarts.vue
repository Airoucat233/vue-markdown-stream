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
        >图表渲染中</span
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
