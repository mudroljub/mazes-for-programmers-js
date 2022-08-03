import RecursiveBacktracker from '../mazes/algorithms/RecursiveBacktracker.js'
import PolarGrid from './PolarGrid.js'

const rows = 8
const grid = new PolarGrid(rows)
RecursiveBacktracker.on(grid)

const cellSize = 20
grid.draw(cellSize)