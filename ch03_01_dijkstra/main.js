import BinaryTree from '../mazes/algorithms/BinaryTree.js'
import Grid from '../mazes/Grid.js'

const grid = new Grid(8, 8)
BinaryTree.on(grid)

const { first_cell } = grid

grid.distances = first_cell.distances.path_to(grid.cell(grid.rows - 1, 0))
console.log(grid.distances)
console.log(grid.toString())

grid.draw()
