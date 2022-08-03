import Kruskals, { State } from '../mazes/algorithms/Kruskals.js'
import WeaveGrid from '../mazes/WeaveGrid.js'

const h = 20
const w = 20
const grid = new WeaveGrid(h, w)
const state = new State(grid)

for (let i = 0; i < grid.size; i += 1) {
  const row = 1 + Math.floor(Math.random() * (grid.rows - 2))
  const column = 1 + Math.floor(Math.random() * (grid.columns - 2))
  state.add_crossing(grid.cell(row, column))
}

Kruskals.on(grid, state)
grid.braid(0.5)
const cellSize = 30

grid.init_distances()
console.log(grid.toString())

grid.draw(cellSize, 0.3)