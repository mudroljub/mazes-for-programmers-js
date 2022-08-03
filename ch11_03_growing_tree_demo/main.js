import GrowingTree from '../mazes/algorithms/GrowingTree.js'
import Grid from '../mazes/Grid.js'
import { sample } from '../mazes/utils.js'

const last = arr => arr[arr.length - 1]

const resize = (canvas, grid, cellSize) => {
  canvas.width = cellSize * grid.rows + 1
  canvas.height = cellSize * grid.columns + 1
}

const grid1 = new Grid(20)
GrowingTree.on(grid1, sample)

const cellSize = 20
const output1 = document.getElementById('output1')
const ctx1 = output1.getContext('2d')
resize(output1, grid1, cellSize)
grid1.init_distances()
grid1.draw(cellSize, 0, ctx1)

const grid2 = new Grid(20)
GrowingTree.on(grid2, last)

const output2 = document.getElementById('output2')
const ctx2 = output2.getContext('2d')
resize(output2, grid2, cellSize)
grid2.init_distances()
grid2.draw(cellSize, 0, ctx2)

const grid3 = new Grid(20)
GrowingTree.on(grid3, arr => Math.random() < 0.5 ? last(arr) : sample(arr))

const output3 = document.getElementById('output3')
const ctx3 = output3.getContext('2d')
resize(output3, grid3, cellSize)
grid3.init_distances()
grid3.draw(cellSize, 0, ctx3)
