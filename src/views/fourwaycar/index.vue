<template>
  <div class="fourwaycar">
    <el-container>
      <el-header>四向车路径规划</el-header>
      <el-container>
        <el-aside width="200px">
          <div style="margin: 15px 0">
            <input type="text" v-model="inputObstacleX">
            <input type="text" v-model="inputObstacleY">
            <el-button type="danger" round @click="obstacle">障碍物</el-button>
          </div>
          <!--          <div style="margin: 15px 0">-->
          <!--            <el-button type="primary" round @click="reobstacle">移除障碍物</el-button>-->
          <!--          </div>-->
          <div style="margin: 15px 0">
            <input type="text" v-model="inputStartX">
            <input type="text" v-model="inputStartY">
            <el-button type="primary" round @click="start">起点</el-button>
          </div>
          <div style="margin: 15px 0">
            <input type="text" v-model="inputUplodeX">
            <input type="text" v-model="inputUplodeY">
            <el-button type="info" plain @click="uplode">上货</el-button>
          </div>
          <div style="margin: 15px 0">
            <input type="text" v-model="inputDownlodeX">
            <input type="text" v-model="inputDownlodeY">
            <el-button type="info" plain @click="downlode">下货</el-button>
          </div>
          <div style="margin: 15px 0">
            <el-button type="primary" round @click="Laden">{{ status }}</el-button>
          </div>
          <div style="margin: 15px 0">
            <input type="text" v-model="inputGoalX">
            <input type="text" v-model="inputGoalY">
            <el-button type="primary" round @click="goal">终点</el-button>
          </div>
          <div style="margin: 15px 0">
            <el-button type="success" plain @click="findp">查找路径</el-button>
          </div>
        </el-aside>
        <el-main>
          <div v-if="showPage">
            <div v-for="(row, rowIndex) in map" :key="rowIndex" class="row">
              <div v-for="(col, colIndex) in row" :key="colIndex" class="col">
                <button :ref="`buttonRefs${rowIndex}${colIndex}`" class="button" :style="getColor(col)"
                        @click="handleButtonClick(rowIndex, colIndex)"
                ></button>

              </div>
            </div>
          </div>

        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
import {
  getMap,
  findPath
} from '@/api/wcs/fourwaycarapi'
import Data from '../system/dict/data'

export default {
  name: 'fourwaycar',
  components: { Data },
  data() {
    return {
      status: '未装货',
      laden: false,
      map: [],
      inputObstacleX: [],
      inputObstacleY: [],
      inputStartX: [],
      inputStartY: [],
      inputUplodeX: [],
      inputUplodeY: [],
      inputDownlodeX: [],
      inputDownlodeY: [],
      inputGoalX: [],
      inputGoalY: [],
      showPage: true,
      // 查询路线请求参数
      queryParam: {
        startX: '',
        startY: '',
        goalX: '',
        goalY: '',
        laden: false
      }
    }

  },
  created() {

    this.initial()

  },
  methods: {
    findp() {
      this.queryParam.startX = this.inputStartX
      this.queryParam.startY = this.inputStartY
      this.queryParam.goalX = this.inputGoalX
      this.queryParam.goalY = this.inputGoalY
      this.queryParam.laden = this.laden

      findPath(this.queryParam, this.map).then(response => {
        let data = response.body.reverse()
        for (let i = 0; i < data.length; i++) {
          let buttonRef = this.$refs[`buttonRefs${data[i][0]}${data[i][1]}`]
          buttonRef[0].innerText = i
        }

      })
    },

    Laden() {
      if (this.status == '未装货') {
        this.status = '装货'
        this.laden = true
        let buttonRef = this.$refs[`buttonRefs${this.inputStartX}${this.inputStartY}`]
        buttonRef[0].style.backgroundColor = '#33FF33'
      } else {
        this.status = '未装货'
        this.laden = false
        let buttonRef = this.$refs[`buttonRefs${this.inputStartX}${this.inputStartY}`]
        buttonRef[0].style.backgroundColor = '#FFFFBB'
      }
    },
    obstacle() {
      this.setPoint(this.inputObstacleX, this.inputObstacleY, 5)
    },
    start() {
      let buttonRef = this.$refs[`buttonRefs${this.inputStartX}${this.inputStartY}`]
      buttonRef[0].style.backgroundColor = '#FFFFBB'
    },
    uplode() {
      if (this.inputUplodeY > 12) {
        this.setPoint(this.inputUplodeX, this.inputUplodeY, 4)
      } else {
        this.setPoint(this.inputUplodeX, this.inputUplodeY, 3)
      }
    },
    downlode() {
      if (this.inputUplodeY > 12) {
        this.setPoint(this.inputDownlodeX, this.inputDownlodeY, 2)
      } else {
        this.setPoint(this.inputDownlodeX, this.inputDownlodeY, 1)
      }
    },
    goal() {
      let buttonRef = this.$refs[`buttonRefs${this.inputGoalX}${this.inputGoalY}`]
      buttonRef[0].style.backgroundColor = '#FF8888'
    },
    setPoint(x, y, number) {
      this.map[x][y] = number
      this.showPage = false
      this.$nextTick(() => {
        this.showPage = true
      })
    },
    getColor(col) {
      if (col == 3 || col == 4) {
        return {
          background: '#00FFFF'
        }
      }
      if (col == 1 || col == 2) {
        return {
          background: 'white'
        }
      }
      if (col == 5) {
        return {
          background: 'black'
        }
      }
    },
    initial() {
      getMap().then(res => {
        this.map = res.body
      })
    },

    handleButtonClick(rowIndex, colIndex) {
      alert(rowIndex + ' ss' + colIndex)
    }
  }
}
</script>

<style lang="scss" scoped>
input[type="text"] {
  width: 30px;
  height: 30px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  //font-size: 26px;
}

.fourwaycar {
  .el-container {
    height: calc(100vh - 110px);

  }

  .el-header {
    line-height: 60px;
    text-align: center;
    background-color: white;
    font-size: 35px;

  }

  .el-aside {
    background-color: #D3DCE6;
    text-align: center;
    height: auto;
  }

  .el-main {
    background-color: #E9EEF3;
    //text-align: center;
    height: auto;

    .row {
      display: flex;
      //justify-content: center;

    }

    //.col {
    //  width: 25px;
    //  height: 25px;
    //  margin: 2px;
    //  background-color: #ccc;
    //}
    .button {
      width: 25px;
      height: 25px;
      margin: 2px;
      background-color: #ccc;
    }
  }
}
</style>
