import Grid from './Grid.js'
import Cell3D from './Cell3D.js'

const output = document.getElementById('output')
const ctx = output.getContext('2d')

export default class Grid3D extends Grid {
  constructor(levels, rows, columns) {
    super(rows, columns)
    this.levels = levels
    this.prepare_grid()
    this.configure_cells()
  }

  prepare_grid() {
    if (!this.levels) return

    this.grid = new Array(this.levels)
    for (let h = 0; h < this.levels; h += 1) {
      this.grid[h] = new Array(this.rows)
      for (let i = 0; i < this.rows; i += 1) {
        this.grid[h][i] = new Array(this.columns)
        for (let j = 0; j < this.columns; j += 1)
          this.grid[h][i][j] = new Cell3D(h, i, j)
      }
    }
  }

  configure_cells() {
    if (!this.levels) return

    for (let h = 0; h < this.levels; h += 1)
      for (let i = 0; i < this.rows; i += 1)
        for (let j = 0; j < this.columns; j += 1) {
          const cell = this.get_cell(h, i, j)
          if (cell == null) continue
          const { level } = cell
          const { row } = cell
          const col = cell.column

          cell.north = this.get_cell(level, row - 1, col)
          cell.south = this.get_cell(level, row + 1, col)
          cell.west = this.get_cell(level, row, col - 1)
          cell.east = this.get_cell(level, row, col + 1)
          cell.down = this.get_cell(level - 1, row, col)
          cell.up = this.get_cell(level + 1, row, col)
        }
  }

  get_cell(level, row, column) {
    if (level < 0 || level > this.levels - 1) return null
    if (row < 0 || row > this.grid[level].length - 1) return null
    if (column < 0 || column > this.grid[level][row].length - 1) return null
    return this.grid[level][row][column]
  }

  random_cell() {
    const level = Math.floor(Math.random() * this.levels)
    const row = Math.floor(Math.random() * this.grid[level].length)
    const column = Math.floor(Math.random() * this.grid[level][row].length)
    return this.get_cell(level, row, column)
  }

  size() {
    return this.levels * this.rows * this.columns
  }

  * each_level() {
    for (let h = 0; h < this.levels; h += 1)
      yield this.grid[h]

  }

  * each_row() {
    const level_gen = this.each_level()
    for (let h = 0; h < this.levels; h += 1) {
      const level = level_gen.next().value
      for (let i = 0; i < this.rows; i += 1)
        if (level[i]) yield level[i]
    }
  }

  * each_cell() {
    const level_gen = this.each_level()
    for (let h = 0; h < this.levels; h += 1) {
      const level = level_gen.next().value
      for (let i = 0; i < this.rows; i += 1) {
        const row = level[i]
        for (let j = 0; j < row.length; j += 1)
          if (row[j]) yield row[j]
      }
    }
  }

  to_img(cellSize = 10, inset = 0, margin = cellSize / 2) {
    ctx.strokeStyle = 'black'
    inset = Math.floor(cellSize * inset)

    const grid_width = cellSize * this.columns
    const grid_height = cellSize * this.rows

    const img_width = grid_width * this.levels + (this.levels - 1) * margin
    const img_height = grid_height

    const cell_gen = this.each_cell()
    while (true) {
      const cell = cell_gen.next().value
      if (!cell) break

      const x = cell.level * (grid_width + margin) + cell.column * cellSize
      const y = cell.row * cellSize

      if (inset > 0)
        this.to_img_with_inset(ctx, cell, cellSize, x, y, inset)
      else
        this.to_img_without_inset(ctx, cell, cellSize, x, y)

      const mid_x = x + cellSize / 2
      const mid_y = y + cellSize / 2

      if (cell.down && cell.isLinked(cell.down)) {
        ctx.beginPath()
        ctx.strokeStyle = 'yellow'
        ctx.moveTo(mid_x - 3, mid_y)
        ctx.lineTo(mid_x - 1, mid_y + 2)
        ctx.moveTo(mid_x - 3, mid_y)
        ctx.lineTo(mid_x - 1, mid_y - 2)
        ctx.stroke()
        ctx.closePath()
      }

      if (cell.up && cell.isLinked(cell.up)) {
        ctx.beginPath()
        ctx.strokeStyle = 'yellow'
        ctx.moveTo(mid_x + 3, mid_y)
        ctx.lineTo(mid_x + 1, mid_y + 2)
        ctx.moveTo(mid_x + 3, mid_y)
        ctx.lineTo(mid_x + 1, mid_y - 2)
        ctx.stroke()
        ctx.closePath()
      }
    }
  }

  to_img_without_inset(ctx, cell, cellSize, x, y) {
    const x1 = x
    const y1 = y
    const x2 = x1 + cellSize
    const y2 = y1 + cellSize

    ctx.strokeStyle = 'black'

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

  to_img_with_inset(ctx, cell, cellSize, x, y, inset) {
    let x1, x2, x3, x4, y1, y2, y3, y4;
    [x1, x2, x3, x4, y1, y2, y3, y4] = this.cell_coordinates_with_inset(x, y, cellSize, inset)

    ctx.strokeStyle = 'black'

    if (cell.north && cell.isLinked(cell.north)) {
      ctx.moveTo(x2, y1)
      ctx.lineTo(x2, y2)
      ctx.moveTo(x3, y1)
      ctx.lineTo(x3, y2)
      ctx.stroke()
    } else {
      ctx.moveTo(x2, y2)
      ctx.lineTo(x3, y2)
      ctx.stroke()
    }
    if (cell.south && cell.isLinked(cell.south)) {
      ctx.moveTo(x2, y3)
      ctx.lineTo(x2, y4)
      ctx.moveTo(x3, y3)
      ctx.lineTo(x3, y4)
      ctx.stroke()
    } else {
      ctx.moveTo(x2, y3)
      ctx.lineTo(x3, y3)
      ctx.stroke()
    }
    if (cell.west && cell.isLinked(cell.west)) {
      ctx.moveTo(x1, y2)
      ctx.lineTo(x2, y2)
      ctx.moveTo(x1, y3)
      ctx.lineTo(x2, y3)
      ctx.stroke()
    } else {
      ctx.moveTo(x2, y2)
      ctx.lineTo(x2, y3)
      ctx.stroke()
    }
    if (cell.east && cell.isLinked(cell.east)) {
      ctx.moveTo(x3, y2)
      ctx.lineTo(x4, y2)
      ctx.moveTo(x3, y3)
      ctx.lineTo(x4, y3)
      ctx.stroke()
    } else {
      ctx.moveTo(x3, y2)
      ctx.lineTo(x3, y3)
      ctx.stroke()
    }
  }
}