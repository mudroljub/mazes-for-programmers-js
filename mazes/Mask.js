export default class Mask {
  constructor(rows, columns) {
    this.rows = rows
    this.columns = columns
    this.bits = new Array(this.rows)
    for (let i = 0; i < this.rows; i += 1) {
      this.bits[i] = new Array(this.columns)
      for (let j = 0; j < this.columns; j += 1)
        this.bits[i][j] = true

    }
  }

  get_bits(row, column) {
    if (row >= 0 && row < this.rows && column >= 0 && column < this.columns)
      return this.bits[row][column]

    return false
  }

  set_bits(row, column, is_on) {
    this.bits[row][column] = is_on
  }

  count() {
    let count = 0

    for (let i = 0; i < this.rows; i += 1)
      for (let j = 0; j < this.columns; j += 1)
        if (this.bits[i][j]) count += 1

    return count
  }

  random_location() {
    while (true) {
      const row = Math.floor(Math.random() * this.rows)
      const col = Math.floor(Math.random() * this.columns)

      if (this.get_bits(row, col)) return [row, col]
    }
  }

  static from_txt(string) {
    const lines 	= string.split(' ')
    const rows 	= lines.length
    const columns	= lines[0].length
    const mask 	= new Mask(rows, columns)

    for (let i = 0; i < rows; i += 1)
      for (let j = 0; j < columns; j += 1)
        if (lines[i][j] == 'X')
          mask.set_bits(i, j, false)

        else
          mask.set_bits(i, j, true)

    return mask
  }

  static from_img(imageData) {
    const rows 	= imageData.height
    const columns = imageData.width
    const mask 	= new Mask(rows, columns)

    for (let i = 0; i < rows; i += 1)
      for (let j = 0; j < columns; j += 1) {
        const image_index = (i * imageData.width + j) * 4
        if (imageData.data[image_index] == 0)
          mask.set_bits(i, j, false)

        else
          mask.set_bits(i, j, true)

      }

    return mask
  }
}