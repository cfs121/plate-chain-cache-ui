<template>
  <div class="agv-page">
    <el-row>
      <el-col :span="16">
        <el-card>
          <p slot="header">AGV 状态信息</p>
          <el-row>
            <el-col :span="8">小车编号</el-col>
            <el-col :span="8">当前位置</el-col>
            <el-col :span="8">电量</el-col>
          </el-row>
          <el-row v-for="(car, index) in cars" :key="index">
            <el-col :span="8">{{ car.id }}</el-col>
            <el-col :span="8">{{ car.position }}</el-col>
            <el-col :span="8">{{ car.battery }}</el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <p slot="header">调度控制信息</p>
          <el-row>
            <el-col :span="12">任务编号</el-col>
            <el-col :span="12">目标位置</el-col>
          </el-row>
          <el-row v-for="(task, index) in tasks" :key="index">
            <el-col :span="12">{{ task.id }}</el-col>
            <el-col :span="12">{{ task.target }}</el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="agv-animation">
      <el-col :span="24">
        <div class="agv-map">
          <!-- AGV 小车动画显示区域 -->
        </div>
      </el-col>
    </el-row>
  </div>


</template>


<script>
export default {
  name: 'AgvPage',
    data() {
    return {
      cars: [
        { position: '', speed: '', battery: '' },
        { position: '', speed: '', battery: '' },
        { position: '', speed: '', battery: '' }
      ]
    }
  },
  mounted() {
    setInterval(() => {
      axios.get('http://example.com/api/agv/status').then(response => {
        const data = response.data
        for (let i = 0; i < this.cars.length; i++) {
          this.cars[i].position = data[i].position
          this.cars[i].speed = data[i].speed
          this.cars[i].battery = data[i].battery
        }
      })
    }, 3000)
  }
}


</script>

<style scoped>
.agv-page {
  padding: 20px;
}

.agv-animation {
  margin-top: 20px;
}

.agv-map {
  width: 100%;
  height: 600px;
  background-color: #f0f0f0;
  position: relative;
}

.agv-car {
  width: 60px;
  height: 40px;
  border-radius: 5px;
  position: absolute;
  background-color: #409eff;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

</style>
