export default class Cell {
  constructor(row, column) {
    this.row = row
    this.column = column
    this.links = {}
    this.north = null
    this.south = null
    this.east = null
    this.west = null
  }

  link(cell, bidi = true) {
    this.links[cell.get_id()] = cell
    if (bidi) cell.link(this, false)
  }

  unlink(cell, bidi = true) {
    delete this.links[cell.get_id()]
    if (bidi) cell.unlink(this, false)
  }

  get links_length() {
    return Object.keys(this.links)
  }

  linked(cell) {
    return this.links.hasOwnProperty(cell.get_id())
  }

  get unvisited() {
    return this.links_length == 0
  }

  get neighbors() {
    const list = []
    if (this.north) list.push(this.north)
    if (this.south) list.push(this.south)
    if (this.east) list.push(this.east)
    if (this.west) list.push(this.west)
    return list
  }

  get_id() {
    return this.row + '#' + this.column
  }

  distances() {
    const distances = new Distances(this)
    let frontier = [this]

    while (frontier.length > 0) {
      const new_frontier = []

      for (let i = 0; i < frontier.length; i += 1) {
        const cell = frontier[i]
        for (const link in cell.links) {
          const linkedCell = cell.links[link]
          if (linkedCell && distances.cell(linkedCell) == undefined) {
            distances.set_cell(linkedCell, distances.cell(cell) + 1)
            new_frontier.push(linkedCell)
          }
        }
      }

      frontier = new_frontier
    }

    return distances
  }
}