<template>
  <div>
    <VueMarkdown v-model="content"></VueMarkdown>
  </div>
</template>
<script setup lang="ts">
import VueMarkdown from 'vue-markdown-stream'
import { ref } from 'vue'

const content = ref<string>(`
# Markdown 常用样式示例
## 1. 标题
# H1
## H2
### H3

## 2. 文本样式
**加粗文本**
*斜体文本*
~~删除线文本~~
这是\`行内代码\`的示例
长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本

## 3. 列表
### 无序列表
- 项目1
- 项目2
- 子项目2.1
- 子项目2.2

### 有序列表
1. 第一项
2. 第二项
1. 子项2.1
2. 子项2.2

## 4. 链接与图片
[普通链接](https://example.com)
![图片描述](https://example.com/image.jpg)

## 5. 表格
| 左对齐 | 居中对齐 | 右对齐 |
| :------ | :------: | ------: |
| 单元格 | 单元格 | 单元格 |
| 数据1 | 数据2 | 数据3 |

## 6. 代码块
\`\`\`javascript
// JavaScript 示例
function hello() {
console.log("Hello World!");
}
\`\`\`
## 7. emoji
\`:smile:\` -> :smile:
## 8. 上标和下标
\`E=mc^2^\` -> E=mc^2^

\`H~2~O\` -> H~2~O
## 8. ehcarts

\`\`\`echarts
{
"title": {
"text": "ECharts 示例图表"
},
"tooltip": {},
"legend": {
"data": ["销量"]
},
"xAxis": {
"data": ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋"]
},
"yAxis": {},
"series": [{
"name": "销量",
"type": "bar",
"data": [5, 20, 36, 10, 10]
}]
}
\`\`\`
## 9. 流程图
\`\`\`mermaid
graph TD
A[开始] --> B(节点)
B --> C{分支节点}
C -->|描述| D[节点]
C -->|描述| E[节点]
C -->|描述| F[节点]
\`\`\`
## 视频
\`\`\`video
{
"url":"https://ai-assistant-obs.qjyy.com/Vedio/video1.mp4https://ai-assistant-obs.qjyy.com/Vedio/video1.mp4https://ai-assistant-obs.qjyy.com/Vedio/video1.mp4https://ai-assistant-obs.qjyy.com/Vedio/video1.mp4https://ai-assistant-obs.qjyy.com/Vedio/video1.mp4https://ai-assistant-obs.qjyy.com/Vedio/video1.mp4"
}
\`\`\`
## iframe
\`\`\`iframe
{
"url":"https://www.qjyy.com"
}
\`\`\``)
</script>
