import Grid from '../mazes/Grid.js'
import BinaryTree from '../mazes/algorithms/BinaryTree.js'

const grid = new Grid(25)
BinaryTree.on(grid)

grid.distances = grid.middle_cell.distances
grid.draw(20)
