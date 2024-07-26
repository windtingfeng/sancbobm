<script setup lang="ts">
import Game from '../utils/initGame'
import { ref } from 'vue'
import { postionMap } from '../constants/position'

// 定义行列炸弹数量
let rows = ref(10)
let cols = ref(10)
let bomb = ref(15)
let bombValue = 15
// 定义计时器
let time = ref(0)
let timer: unknown = null
let hideOrShowTimer: unknown = null
// 定义玩耍次数
let timeCount = ref(0)
let gameStop = ref(false)
let gameSuccess = ref(false)
// 定义点击炸弹index
let bombIndex = ref(null)
// 定制面板
let board = ref([])

// 初始化新游戏实例
const initGame = () => {
  const newGame = new Game(rows.value, cols.value, bomb.value)
  board.value = newGame.start()
  bombValue = bomb.value
}
initGame()

// 选择难度
const choseLeave = (row, col, num) => {
  rows.value = row
  cols.value = col
  bomb.value = num
  bombValue = num
  reload()
  console.log(row, col, num)
}

// 自定义难度
const customLeave = () => {}

// 监听点击事件
const gameClick = (e) => {
  if (gameStop.value) return
  const { target } = e
  const className = target.className
  let realTarget
  if (className === 'wenhao' || className === 'qizhi') {
    realTarget = target.parentElement
    if (className === 'qizhi') bomb.value++
  } else if (className === 'gamebox_col_hover') {
    realTarget = target
  }
  if (!realTarget) return
  const tag = realTarget.dataset.tag
  if (tag === 'X') {
    // 手雷
    clickBomb(realTarget)
    return
  }
  if (tag === '0') {
    compareAndClear(realTarget.dataset.index)
  }
  realTarget.style.display = 'none'

  checkPassGame()
}

// 监听双击事件
const gameDbClick = (e) => {
  if (gameStop.value) return
  const { target } = e
  const className = target.className
  let realTarget
  if (className === 'wenhao' || className === 'qizhi') {
    realTarget = target.parentElement
  } else {
    realTarget = target
  }
  const index = realTarget.dataset.index
  compareAndClear(index)

  checkPassGame()
}

// 监听右键点击
const gameRightClick = (e) => {
  e.preventDefault()
  if (gameStop.value) return
  const { target } = e
  const className = target.className
  if (className === 'gamebox_col_hover') {
    const newElement = createElement('qizhi')
    target.appendChild(newElement)
    target.dataset.isBomb = true
    bomb.value--
    return
  } else if (className === 'qizhi') {
    const parent = target.parentElement
    removeChild(parent)
    const newElement = createElement('wenhao')
    parent.appendChild(newElement)
    parent.dataset.isBomb = false
    bomb.value++
  } else if (className === 'wenhao') {
    const parent = target.parentElement
    removeChild(parent)
  }
}

// 计时
const startTime = () => {
  time.value++
  timer = setTimeout(() => {
    startTime()
  }, 1000)
}
startTime()

// 重新加载
const reload = () => {
  clearTimeout(timer)
  clearInterval(hideOrShowTimer)
  time.value = 0
  bomb.value = bombValue
  timeCount.value++
  bombIndex.value = null
  gameStop.value = false
  initGame()
  startTime()
}

// 手雷点击
const clickBomb = (dom) => {
  let qizhiList = []
  clearTimeout(timer)
  gameStop.value = true
  const index = dom.dataset.index
  bombIndex.value = index
  const bombDiv = document.getElementsByClassName('gamebox_col_hover')
  for (let i = 0; i < bombDiv.length; i++) {
    const div = bombDiv[i] as HTMLDivElement
    const { dataset } = div
    const tag = dataset.tag
    if (tag === 'X') {
      div.style.display = 'none'
    }
    // 记录标记错误的
    if (dataset.isBomb === 'true' && tag !== 'X') {
      qizhiList.push(div)
    }
  }

  // 增加动效
  transfromQizhi(qizhiList)
}

// 生成dom
const createElement = (flag: string) => {
  let element = document.createElement('div')
  element.style.width = '100%'
  element.style.height = '100%'
  element.style.backgroundImage = `url(src/assets/images/${flag}.jpg)`
  element.style.backgroundSize = 'cover'
  element.dataset.tag = flag
  element.className = flag
  return element
}

// 移除子节点
const removeChild = (target) => {
  const { children } = target
  for (let i = 0; i < children.length; i++) {
    target.removeChild(children[i])
  }
}

// 计算和清理
const compareAndClear = (index: string) => {
  const list = computeAround(index)
  findBombDisposal(list)
}

// 计算周围九宫格
const computeAround = (index: string) => {
  let aroundList = [] // 周围方格
  const dataIndex = index.split('-')
  const row = Number(dataIndex[0])
  const col = Number(dataIndex[1])
  // console.log('目标', row, col)
  let a = row - 1
  let b = col - 1
  let aMax = row + 1
  let bMax = col + 1
  if (a < 0) a = 0
  if (b < 0) b = 0
  if (aMax > rows.value - 1) aMax = rows.value - 1
  if (bMax > cols.value - 1) bMax = cols.value - 1

  for (let x = a; x <= aMax; x++) {
    for (let y = b; y <= bMax; y++) {
      aroundList.push(x + '-' + y)
    }
  }
  // console.log('九宫格', aroundList)
  return aroundList
}

// 查看九宫格是否已拆弹
const findBombDisposal = (list: string[]) => {
  const bombDiv = document.getElementsByClassName('gamebox_col_hover')
  let domList: HTMLDivElement[] = []
  for (let i = 0; i < bombDiv.length; i++) {
    const div = bombDiv[i] as HTMLDivElement
    const { dataset } = div
    const index = dataset.index
    if (list.includes(index)) {
      domList.push(div)
    }
  }
  if (domList.every((item) => item.style.display !== '')) return
  const bombCount = domList.filter((item) => item.dataset.tag === 'X').length
  const disposalBombCount = domList.filter((item) => item.dataset.isBomb === 'true').length
  if (bombCount === disposalBombCount) {
    // 确认已排雷
    const isDisposalRealBomb = domList.filter(
      (item) => item.dataset.tag === 'X' && item.dataset.isBomb === 'true'
    ).length
    if (isDisposalRealBomb === bombCount) {
      // 排雷成功，清理周围方块
      let isNullBox = []
      for (let i = 0; i < domList.length; i++) {
        const dom = domList[i]
        if (dom.dataset.isBomb !== 'true') {
          dom.style.display = 'none'
          // 连带清理九宫格无炸弹格子
          if (dom.dataset.tag === '0' && !dom.dataset.iscomputed) {
            isNullBox.push(dom.dataset.index)
          }
          dom.setAttribute('data-iscomputed', 'true')
        }
      }
      // 清理空白格子周围
      for (let item of isNullBox) {
        compareAndClear(item)
      }
    } else {
      // 排雷失败，游戏结束
      for (let i = 0; i < domList.length; i++) {
        const dom = domList[i]
        const tag = dom.dataset.tag
        if (tag === 'X') {
          clickBomb(dom)
          break
        }
      }
    }
  } else {
    // 雷未排干净
    transform(domList)
  }
}

// 动效
const transform = (domList: HTMLDivElement[]) => {
  for (let item of domList) {
    if (item.style.display !== 'none' && item.dataset.isBomb !== 'true') {
      item.style.border = '1px solid #54ff00'
    }
  }
  setTimeout(() => {
    for (let item of domList) {
      if (item.style.display !== 'none') {
        item.style.border = 'unset'
      }
    }
  }, 300)
}

//  周围有炸弹动效
const transfromQizhi = (qizhiList: HTMLDivElement[]) => {
  hideOrShowTimer = setInterval(() => {
    for (let item of qizhiList) {
      if (item.style.opacity !== '0') item.style.opacity = '0'
      else item.style.opacity = '1'
      const childrens = item.children as unknown as HTMLDivElement[]
      if (childrens.length) {
        for (let child of childrens) {
          if (child.style.opacity !== '0') child.style.opacity = '0'
          else child.style.opacity = '1'
        }
      }
    }
  }, 800)
}

// 检查是否通关
const checkPassGame = () => {
  if (bomb.value > 8) return
  const bombDiv = document.getElementsByClassName('gamebox_col_hover')
  let isBombs = 0,
    hides = 0
  for (let i = 0; i < bombDiv.length; i++) {
    const div = bombDiv[i] as HTMLDivElement
    const { dataset } = div
    if (div.style.display !== 'none' && dataset.isBomb !== 'true') hides++
    if (dataset.isBomb === 'true') isBombs++
  }
  console.log(isBombs, hides)

  if ((isBombs === bombValue && hides === 0) || bomb.value === hides) {
    gameStop.value = true
    gameSuccess.value = true
    // eslint-disable-next-line no-alert
    alert('通关')
    clearTimeout(timer)
  }
}
</script>

<template>
  <main class="box">
    <div class="box_header">
      <span @click="choseLeave(10, 10, 15)">初级</span>
      <span @click="choseLeave(15, 20, 50)">中级</span>
      <span @click="choseLeave(20, 30, 99)">高级</span>
      <span @click="customLeave">自定义</span>
    </div>
    <div
class="gamebox"
@click="gameClick"
@dblclick="gameDbClick"
@contextmenu="gameRightClick">
      <div class="gamebox_header">
        <div class="gamebox_header_l">
          <img src="../assets/images/boom.png" width="30" alt="" />
          <span class="l_text">{{ bomb }}</span>
        </div>
        <div
          class="gamebox_header_m"
          :style="{
            backgroundPosition: gameSuccess
              ? postionMap['success'].join(' ')
              : gameStop
                ? postionMap['failed'].join(' ')
                : ''
          }"
          @click="reload"
        ></div>
        <div class="gamebox_header_r">{{ time }}</div>
      </div>
      <div v-for="(row, rowIndex) in board" :key="rowIndex + '-' + timeCount" class="gamebox_row">
        <div v-for="(col, colIndex) in row" :key="colIndex + '-' + timeCount" class="gamebox_col">
          <div
            class="gamebox_col_bg"
            :style="{
              backgroundPosition: postionMap[col].join(' '),
              backgroundColor: rowIndex + '-' + colIndex === bombIndex ? 'red' : ''
            }"
            :data-index="rowIndex + '-' + colIndex"
          >
            {{}}
          </div>
          <div
            class="gamebox_col_hover"
            :data-tag="col"
            :data-index="rowIndex + '-' + colIndex"
          ></div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="less" scoped>
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: scroll;

  .box_header {
    margin-bottom: 24px;

    span {
      margin: 0 4px;
      text-decoration-line: underline;
      cursor: pointer;

      &:hover {
        color: #38defc;
      }
    }
  }

  .gamebox {
    padding: 10px;
    background: linear-gradient(180deg, #2a383c 0%, #1f2322 100%);
    border-radius: 16px;

    .gamebox_header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 40px;
      padding: 0 2px;
      margin-bottom: 24px;
      border: 1px solid #fff;

      .gamebox_header_l {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        height: 30px;
        padding: 2px;
        color: #aaf028;

        .l_text {
          margin-left: 4px;
        }
      }

      .gamebox_header_r {
        min-width: 100px;
        color: #ffc609;
        text-align: right;
      }

      .gamebox_header_m {
        position: absolute;
        left: 50%;
        width: 30px;
        height: 30px;
        cursor: pointer;
        background-image: url('../assets/images/box.jpg');
        background-position: -80px -80px;
        background-size: 150px;
        border-radius: 50%;
      }
    }

    .gamebox_row {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
    }

    .gamebox_col {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border: 1px double #000;

      .gamebox_col_hover {
        position: absolute;
        inset: 0;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-image: url('../assets/images/box.jpg');
        background-position: -118px -6px;
        background-size: 150px;
        transition: border 0.3s;
        transition: opacity 0.3s;
      }

      .gamebox_col_bg {
        position: absolute;
        inset: 0;
        z-index: 1;
        background-image: url('../assets/images/game.png');
        background-size: 140px;
      }
    }
  }
}
</style>
