import Grid from './Grid.js'
import PolarCell from './PolarCell.js'

const canvas = document.getElementById('output')
const ctx = canvas.getContext('2d')
canvas.width = 800
canvas.height = 600

export default class PolarGrid extends Grid {
  constructor(rows) {
    super(rows, 1)
  }

  prepare_grid() {
    const rows = new Array(this.rows)
    const row_height = 1 / this.rows
    rows[0] = [new PolarCell(0, 0)]

    for (let i = 1; i <= this.rows; i += 1) {
      const radius = i * 1 / this.rows
      const circumference = 2 * Math.PI * radius

      const previous_count = rows[i - 1].length
      const estimated_cell_width = circumference / previous_count
      const ratio = Math.round(estimated_cell_width / row_height)

      const cells = previous_count * ratio
      rows[i] = new Array(cells)
      for (let j = 0; j < cells; j += 1)
        rows[i][j] = new PolarCell(i, j)
    }
    this.grid = rows
  }

  configure_cells() {
    for (const cell of this.each_cell()) {
      const { row, column } = cell
      if (row == 0) continue

      cell.cw = this.cell(row, column + 1)
      cell.ccw = this.cell(row, column - 1)
      const ratio = this.grid[row].length / this.grid[row - 1].length
      const parent = this.grid[row - 1][Math.floor(column / ratio)]
      parent.outward.push(cell)
      cell.inward = parent
    }
  }

  cell(row, column) {
    if (row < 0 || row > this.rows - 1) return null
    return this.grid[row][column % this.grid[row].length]
  }

  get random_cell() {
    const row = Math.floor(Math.random() * this.rows)
    const col = Math.floor(Math.random() * this.grid[row].length)
    return this.cell(row, col)
  }

  cell_count(row) {
    return this.grid[row].length
  }

  draw_circle(theta_ccw, theta_cw, inner_radius, outer_radius, center, cell, ring_height) {
    const thetaMid = (theta_ccw + theta_cw) / 2
    const radiusMid = (inner_radius + outer_radius) / 2
    const centerX = center + Math.floor(radiusMid * Math.cos(thetaMid))
    const centerY = center + Math.floor(radiusMid * Math.sin(thetaMid))

    ctx.strokeStyle = ctx.fillStyle = this.background_color_for(cell)
    ctx.beginPath()
    ctx.arc(centerX, centerY, ring_height * .25, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()
  }

  draw(ring_height = 20) { // ring_height = cellSize
    const center = this.rows * ring_height

    for (const cell of this.each_cell()) {
      if (cell.row == 0) continue // center is empty

      const theta = 2 * Math.PI / this.cell_count(cell.row)
      const inner_radius = cell.row * ring_height
      const outer_radius = (cell.row + 1) * ring_height
      const theta_ccw = cell.column * theta // counter-clockwise (left) wall
      const theta_cw = (cell.column + 1) * theta // clockwise (right) wall

      const ax = center + Math.floor(inner_radius * Math.cos(theta_ccw))
      const ay = center + Math.floor(inner_radius * Math.sin(theta_ccw))
      const cx = center + Math.floor(inner_radius * Math.cos(theta_cw))
      const cy = center + Math.floor(inner_radius * Math.sin(theta_cw))
      const dx = center + Math.floor(outer_radius * Math.cos(theta_cw))
      const dy = center + Math.floor(outer_radius * Math.sin(theta_cw))

      this.draw_circle(theta_ccw, theta_cw, inner_radius, outer_radius, center, cell, ring_height)

      ctx.strokeStyle = 'black'
      ctx.lineWidth = 3
      ctx.beginPath()
      if (!cell.linked(cell.inward)) {
        ctx.moveTo(ax, ay)
        ctx.lineTo(cx, cy)
      }
      if (!cell.linked(cell.cw)) {
        ctx.moveTo(cx, cy)
        ctx.lineTo(dx, dy)
      }
      ctx.stroke()
    } // end for

    ctx.arc(center, center, this.rows * ring_height, 0, 2 * Math.PI)
    ctx.stroke()
  }
}