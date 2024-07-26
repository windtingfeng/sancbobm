export default class Game {
  // 行数
  rows: number = 10
  // 列数
  cols: number = 10
  // 地雷数量
  totalMines: number = 15

  constructor(rows: number, cols: number, totalMines: number) {
    this.rows = rows
    this.cols = cols
    this.totalMines = totalMines
  }

  // 空白面板
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  board: any = []

  // 开始游戏
  start = () => {
    this.initBoard()
    this.initMines()
    this.countMinesNum()
    return this.board
  }

  // 初始化空白面板
  initBoard = (): void => {
    this.board = Array.from({ length: this.rows }, (): number[] => Array(this.cols).fill(0))
  }

  // 初始化每行地雷
  initMines = (): void => {
    for (let i = 0; i < this.totalMines; i++) {
      const row = Math.floor(Math.random() * this.rows)
      const col = Math.floor(Math.random() * this.cols)
      if (this.board[row][col] !== 'X') {
        this.board[row][col] = 'X'
      } else {
        i--
      }
    }
  }

  // 计算每个方格周围的地雷数量
  countMinesNum = (): void => {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.board[row][col] !== 'X') {
          let count = 0
          for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
              if (r >= 0 && r < this.rows && c >= 0 && c < this.cols && this.board[r][c] === 'X') {
                count++
              }
            }
          }
          this.board[row][col] = count
        }
      }
    }
  }
}
