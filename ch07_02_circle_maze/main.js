import PolarGrid from '../mazes/PolarGrid.js'
import RecursiveBacktracker from '../mazes/algorithms/RecursiveBacktracker.js'

const grid = new PolarGrid(10)
RecursiveBacktracker.on(grid)

grid.distances = grid.first_cell.distances // TODO: implement draw

grid.draw(20)
console.log(grid.toString())
