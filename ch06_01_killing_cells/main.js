import Grid from '../mazes/Grid.js'
import RecursiveBacktracker from '../mazes/algorithms/RecursiveBacktracker.js'

const grid = new Grid(10)

const { first_cell } = grid // top left
first_cell.east = first_cell.west = first_cell.south = first_cell.north = null

const { last_cell } = grid // bottom right
last_cell.east = last_cell.west = last_cell.south = last_cell.north = null

RecursiveBacktracker.on(grid, grid.cell(1, 1))

grid.init_distances()
grid.draw()