import Grid from './Grid.js'
import { UnderCell } from './WeaveCells.js'

export default class WeaveGrid extends Grid {
  constructor(rows, columns) {
    super(rows, columns)
    this.under_cells = []
  }

  tunnel_under(over_cell) {
    const under_cell = new UnderCell(over_cell)
    this.under_cells.push(under_cell)
  }

  * each_cell() {
    for (const row of this.grid)
      for (const cell of row)
        if (cell) yield cell

    for (let i = 0; i < this.under_cells?.length; i += 1)
      if (this.under_cells[i]) yield this.under_cells[i]
  }

  draw_under_cell(ctx, cell, cellSize, x1, y1, inset) {
    const x2 = x1 + inset
    const x4 = x1 + cellSize
    const x3 = x4 - inset

    const y2 = y1 + inset
    const y4 = y1 + cellSize
    const y3 = y4 - inset

    if (cell.vertical_passage) {
      ctx.moveTo(x2, y1)
      ctx.lineTo(x2, y2)
      ctx.moveTo(x3, y1)
      ctx.lineTo(x3, y2)
      ctx.moveTo(x2, y3)
      ctx.lineTo(x2, y4)
      ctx.moveTo(x3, y3)
      ctx.lineTo(x3, y4)
      ctx.stroke()
    } else {
      ctx.moveTo(x1, y2)
      ctx.lineTo(x2, y2)
      ctx.moveTo(x1, y3)
      ctx.lineTo(x2, y3)
      ctx.moveTo(x3, y2)
      ctx.lineTo(x4, y2)
      ctx.moveTo(x3, y3)
      ctx.lineTo(x4, y3)
      ctx.stroke()
    }
  }

  draw_cell(ctx, cell, cellSize, x, y, inset) {
    if (cell.constructor.name == 'UnderCell')
      this.draw_under_cell(ctx, cell, cellSize, x, y, inset)
    else
      super.draw_cell(ctx, cell, cellSize, x, y, inset)
  }
}
