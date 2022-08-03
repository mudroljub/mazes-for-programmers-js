import Grid from './Grid.js'
import WeightedCell from './WeightedCell.js'
import { shadeOfYellow } from './utils.js'

export default class WeightedGrid extends Grid {
  prepare_grid() {
    this.grid = new Array(this.rows)
    for (let i = 0; i < this.rows; i += 1) {
      this.grid[i] = new Array(this.columns)
      for (let j = 0; j < this.columns; j += 1)
        this.grid[i][j] = new WeightedCell(i, j) // istead of Cell
    }
  }

  background_color_for(cell) {
    if (cell.weight > 1) return 'red'
    if (!this.distances) return 'white'
    const distance = this.distances.get(cell)
    if (!distance) return 'white'
    return shadeOfYellow (this.maximum, distance)
  }
}