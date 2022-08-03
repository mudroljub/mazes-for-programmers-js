import HexGrid from '../mazes/HexGrid.js'
import RecursiveBacktracker from '../mazes/algorithms/RecursiveBacktracker.js'

const grid = new HexGrid(10)
RecursiveBacktracker.on(grid)

grid.init_path()
grid.draw()