import TriangleGrid from '../mazes/TriangleGrid.js'
import RecursiveBacktracker from '../mazes/algorithms/RecursiveBacktracker.js'

const rows = 10
const columns = 17
const grid = new TriangleGrid(rows, columns)

RecursiveBacktracker.on(grid)

grid.init_path()
grid.draw(30)