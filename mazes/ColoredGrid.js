import Grid from './Grid.js'

export default class ColoredGrid extends Grid {
  set_distances(distances) {
    this.distances = distances
    let farthest_id;
    [farthest_id, this.maximum] = distances.max()
  }

  background_color_for(cell) {
    const distance = this.distances.get_cell(cell)
    const intensity = (this.maximum - distance) * 1.0 / this.maximum
    const dark = Math.floor(255 * intensity)
    const bright = Math.floor(128 + 127 * intensity)
    return `rgb(${dark},${bright},${dark})`
  }

  to_img(ctx, cellSize) {
    ctx.strokeStyle = 'black'

    const cell_gen = this.each_cell()
    while (true) {
      const cell = cell_gen.next().value
      if (!cell) break

      const x1 = cell.column * cellSize
      const y1 = cell.row * cellSize
      const x2 = (cell.column + 1) * cellSize
      const y2 = (cell.row + 1) * cellSize

      ctx.fillStyle = this.background_color_for(cell)
      ctx.fillRect(x1, y1, cellSize, cellSize)

      if (!cell.north) {
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y1)
        ctx.stroke()
      }
      if (!cell.west) {
        ctx.moveTo(x1, y1)
        ctx.lineTo(x1, y2)
        ctx.stroke()
      }
      if ((cell.east && !cell.isLinked(cell.east)) || !cell.east) {
        ctx.moveTo(x2, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }
      if ((cell.south && !cell.isLinked(cell.south)) || !cell.south) {
        ctx.moveTo(x1, y2)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }
    }
  }
}