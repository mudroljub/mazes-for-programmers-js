import HexGrid from '../mazes/HexGrid.js'
import RecursiveBacktracker from '../mazes/algorithms/RecursiveBacktracker.js'

const grid = new HexGrid(10)
RecursiveBacktracker.on(grid)

// const start = grid.middle_cell
// grid.distances = start.distances
grid.init_path(grid.first_cell, grid.last_cell)
grid.draw()