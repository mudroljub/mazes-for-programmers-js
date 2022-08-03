import { sample } from '../utils.js'

export default class AldousBroder {
  static on(grid) {
    let cell = grid.random_cell
    let unvisited = grid.size - 1

    while (unvisited) {
      const neighbor = sample(cell.neighbors)
      if (!neighbor.links_length) {
        cell.link(neighbor)
        unvisited -= 1
      }
      cell = neighbor
    }
  }
}