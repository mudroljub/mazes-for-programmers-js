import Kruskals, { State } from '../mazes/algorithms/Kruskals.js'
import WeaveGrid from '../mazes/WeaveGrid.js'

const grid = new WeaveGrid(20)
const state = new State(grid)

for (let i = 0; i < grid.size; i += 1) {
  const row = 1 + Math.floor(Math.random() * (grid.rows - 2))
  const column = 1 + Math.floor(Math.random() * (grid.columns - 2))
  state.add_crossing(grid.cell(row, column))
}

Kruskals.on(grid, state)
grid.braid(0.3)

grid.init_distances()

const cellSize = 30
grid.draw(cellSize, 0.3)