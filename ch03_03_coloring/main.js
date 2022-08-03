import Grid from '../mazes/Grid.js'
import BinaryTree from '../mazes/algorithms/BinaryTree.js'

const grid = new Grid(25)
BinaryTree.on(grid)

grid.init_distances()
console.log(grid.toString())
grid.draw(20)
