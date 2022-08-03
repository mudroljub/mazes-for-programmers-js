export const shadeOfGreen = (maximum, distance) => {
  const intensity = (maximum - distance) / maximum
  const shade = Math.floor(230 * intensity)
  const green = Math.floor(128 + 127 * intensity)
  return `rgb(${shade}, ${green}, ${shade})`
}

export const shadeOfYellow = (maximum, distance) => {
  const intensity = (maximum - distance) / maximum
  const col = 64 + 191 * intensity
  return `rgb(${col}, ${col}, 0)`
}

export const shuffle = array => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

export const sample = arr => arr[Math.floor(Math.random() * arr.length)]
