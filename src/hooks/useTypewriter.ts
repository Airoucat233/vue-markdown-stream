export function useTypewriter() {
  let timer: number | null = null
  let index = 0
  let output = ''

  function startTyping(
    text: string,
    speed = 100,
    range: [number, number] = [1, 3],
    onUpdate?: (segment: string) => void,
    onDone?: (output: string) => void,
  ): () => void {
    if (timer) clearInterval(timer)
    index = 0
    output = ''

    function step() {
      const count = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0]
      const segment = text.slice(index, index + count)
      output += segment
      index += count
      onUpdate?.(segment)

      if (index >= text.length) {
        if (timer) {
          clearInterval(timer)
          timer = null
        }
        onDone?.(output)
      }
    }

    timer = setInterval(step, speed)

    return () => {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    }
  }

  return { startTyping }
}
