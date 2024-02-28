<template>
  <div class="fourwaycar">
    <el-container>
      <el-header>GA动态演示</el-header>
      <el-container>
        <el-aside width="180px">
          <div style="margin: 15px 0">
            <el-select
              v-model="value" style="width: 130px"
              placeholder="请选择算法参数"
              @change="changeGAParameter">
              <el-option
                v-for="item in gaSelect"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div style="margin: 15px 0">
            <el-select
              v-model="value2" style="width: 130px"
              placeholder="请选择缓存库"
              @change="choseLibraries">
              <el-option
                v-for="item in librariesSelect"
                :key="item.value2"
                :label="item.label"
                :value="item.value2"
              />
            </el-select>
          </div>
          <div style="margin: 15px 0">
            <el-select
              v-model="value3" style="width: 130px"
              placeholder="请选择遗传算法"
              @change="choseLibraries">
              <el-option
                v-for="item in gasSelect"
                :key="item.value3"
                :label="item.label"
                :value="item.value3"
              />
            </el-select>
          </div>
          <div style="margin: 15px 0">
            <el-tag>种群数量：{{groupSize}}</el-tag>
            <el-tag>迭代次数：{{generation}}</el-tag>
            <el-tag type="success">交叉概率：{{crossRate}}</el-tag>
            <el-tag type="warning">变异概率：{{mutationRate}}</el-tag>
          </div>
          <div>
            <el-input v-model="time" placeholder="请输入延时时间"></el-input>
          </div>
          <div style="margin: 15px 0">
            <el-button type="primary" @click="start">动态演示</el-button>
          </div>
          <div>
            <el-input v-model="NN" placeholder="请输入N"></el-input>
          </div>
          <div style="margin: 15px 0">
            <el-button type="primary" @click="start2">结果</el-button>
          </div>
        </el-aside>
        <el-main>
          <div class="one">
            <div id="fristScatter"></div>
            <div class="gaparas">
              <div id="fristLine"></div>
              <div class="paras">
                <div style="margin: 25px 0"><el-tag>运行次数：{{runtimes}}</el-tag></div>
                <div style="margin: 10px 0"><el-tag type="success">最优适应度：{{bestFitness}}</el-tag></div>
                <div style="margin: 10px 0"><el-tag>平均适应度：{{averageFitness}}</el-tag></div>
                <div style="margin: 10px 0"><el-tag type="warning">最差适应度：{{worstFitness}}</el-tag></div>
                <div style="margin: 10px 0"><el-tag>适应度方差：{{fitnessVariance}}</el-tag></div>
              </div>
            </div>
          </div>
          <div class="two">
            <div id="fristBar"></div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
import {
  page,gaDisplay,gaDisplay22
} from '@/api/wcs/ga'
import {
  pageLibraries,
} from '@/api/wcs/libraries'
import Data from '../system/dict/data'
import * as echarts from 'echarts';
import Stomp from "stompjs";

export default {
  name: 'fourwaycar',
  components: { Data },
  data() {
    return {
      gasSelect:[
        {value3: '0', label: '标准遗传算法'},
        {value3: '1', label: '改进-去重复的个体'},
        {value3: '2', label: '改进-精英策略'},
        {value3: '3', label: '基于排名选择'},
        {value3: '4', label: '锦标赛选择'},
      ],
      value3:'',
      runtimes:0,
      bestFitness:10000,
      averageFitness:0,
      worstFitness:0,
      fitnessVariance:0,//适应度方差
      GAcount1:-1,
      GAcount2:0,
      currentGeneration: 15,
      client:null,
      time: '',
      NN:'',
      groupSize: '',
      generation: '',
      crossRate: '',
      mutationRate: '',
      value: '',
      ga:[],
      gaSelect:[],
      libraries:[],
      librariesSelect:[],
      value2:'',
      showPage: true,
      myChart2: null,
      myChart: null,
      myChart3: null,
      option : {
        //鼠标悬停时显示该折线的数值和第几条折线
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        title: {
          //text: 'GA迭代图',
          text: '锦标赛',
          left: 'center',
        },
        xAxis: {
          type: 'category',
          //坐标轴标题
          name: '迭代次数',
          //坐标轴最大值随着currentGeneration值而改变
          max: function (value) {
            return value.currentGeneration;
          },
        },
        yAxis: {
          //坐标轴标题
          name: '适应度',
          //坐标轴刻度从数据的最小值-100开始
          min: function (value) {
            return 260;
            // if(value.min - 50>0){
            //   return value.min - 50;
            // }else{
            //   return 0;
            // }
          },
        },
        series: [
          {data: [], type: 'line'},{data: [], type: 'line'},{data: [], type: 'line'},
          {data: [], type: 'line'},{data: [], type: 'line'},{data: [], type: 'line'},
          {data: [], type: 'line'},{data: [], type: 'line'},{data: [], type: 'line'},
          {data: [], type: 'line'},
        ]
      },
      option2 : {
        //鼠标悬停时显示数值
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            params = params[0];
            return params.value[0] + ',' + params.value[1];
          },
          axisPointer: {
            animation: false
          }
        },
        //标题
        title: {
          text: '种群分布图',
          left: 'center',
        },
        xAxis: {
          //坐标轴标题
          name: '总运行时间',
          //坐标轴标题位置
          nameLocation: 'middle',
          //坐标轴标题与轴线距离
          nameGap: 25,
          //坐标轴标题与y轴距离
          nameTextStyle: {
            padding: [0, 0, 25, 0]//右，下，左，上
          },
          //坐标轴颜色是绿色
          axisLine: {lineStyle: {color: 'green'}},
          //坐标轴刻度从200-1000
          min: 400,
          //max: 1000,
          max: 800,
          // min: function (value) {
          //   if(value.min - 100>0){
          //     return value.min - 100;
          //   }else{
          //     return 0;
          //   }
          // },
        },
        yAxis: {
          name: ' aa     各出库口等待时间之和',
          //坐标轴颜色是蓝色
          axisLine: {lineStyle: {color: 'blue'}},
          //坐标轴刻度从200-1000
          min: 200,
          //max: 1000,
          max: 1200,
          // //坐标轴刻度从数据的最小值-100开始
          // min: function (value) {
          //   if(value.min - 100>0){
          //     return value.min - 100;
          //   }else{
          //     return 0;
          //   }
          // },
        },//y轴
        series: [
          {
            symbolSize: 3,//点的大小
            //显示数值中x值中最小的点
            markPoint: {
              data: [
                //显示x轴占比0.3，y轴占比0.7的点，同时显示该点的x值，颜色是红色
                //y轴最小值，最大值，平均值,同时显示该点的x值，颜色是蓝色
                // {type: 'min', name: '最小值', valueIndex: 1, itemStyle: {color: 'blue'}},
                // //x轴最小值，最大值，平均值，颜色是绿色
                // {type: 'min', name: '最小值', valueIndex: 0, itemStyle: {color: 'green'}},
              ]
            },
            //数据
            data: [
              [6.0, 8.04],
              [8.07, 6.95]
            ],
            type: 'scatter'
          }
        ]
      },
      count3:1,
      option3 : {
        legend: {},
        tooltip: {
          //柱状图上显示数值
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        dataset: {
          source: [
            ['product', '轮盘赌+精英策略', '基于排名选择', '基于锦标赛选择','种马进化'],
            ['最优适应度', 43.3, 85.8, 93.7,70],
            ['平均适应度', 83.1, 73.4, 55.1],
            ['最差适应度', 86.4, 65.2, 82.5],
            ['适应度方差', 72.4, 53.9, 39.1]
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          {
            label: { show: true, position: 'top' },
            type: 'bar'
          },{
            label: { show: true, position: 'top' },
            type: 'bar'
          },{
            label: { show: true, position: 'top' },
            type: 'bar'
          },{
            label: { show: true, position: 'top' },
            type: 'bar'
          }]
      },

    }

  },
  mounted(){
    let chartDom = document.getElementById('fristLine');
    this.myChart = echarts.init(chartDom);
    this.option && this.myChart.setOption(this.option);
    let chartDom2 = document.getElementById('fristScatter');
    this.myChart2 = echarts.init(chartDom2);
    this.option2 && this.myChart2.setOption(this.option2);
    let chartDom3 = document.getElementById('fristBar');
    this.myChart3 = echarts.init(chartDom3);
    this.option3 && this.myChart3.setOption(this.option3);
  },
  created() {
    this.initial()
    this.connect();
    console.log(this.option2.series[0].data)
  },
  methods: {
    //webSocket连接成功后回调函数
    onConnected(frame) {
      console.log("Connected: " + frame);
      //绑定交换机exchange_pushmsg是交换机的名字rk_pushmsg是绑定的路由key
      var exchange = "/exchange/exchange_pushmsg/rk_pushmsg";
      //创建随机队列用上面的路由key绑定交换机,放入收到消息后的回调函数和失败的回调函数
      this.client.subscribe(exchange, this.responseCallback, this.onFailed);
      console.log(frame)
    },
    onFailed(frame) {
      console.log("Failed: " + frame);
    },
    responseCallback(frame) {
      //获得JSON.parse(frame.body)除最后一个的所有值
      this.option2.series[0].data = JSON.parse(frame.body).slice(0,JSON.parse(frame.body).length-1)
      //this.option2.series[0].data = JSON.parse(frame.body)
      //将JSON.parse(frame.body)的最后一个数据取出
      if( this.currentGeneration== JSON.parse(frame.body)[JSON.parse(frame.body).length-1][0]){
        //将opention2的标题改为当前迭代次数
        //this.option2.title.text = '第'+this.currentGeneration+'代种群轮盘赌后分布图'
        let ll=this.currentGeneration+1
        this.option2.title.text = '第'+ll+'代选择操作后种群个体分布图'
        //myChart2根据新的数据重新渲染
        this.option2 && this.myChart2.setOption(this.option2);
      }else {
        this.currentGeneration = JSON.parse(frame.body)[JSON.parse(frame.body).length-1][0]
        if(this.GAcount2==this.GAcount1){
          //根据name的值将获得的数据放入series数组中
          this.option.series[this.GAcount1].data.push(JSON.parse(frame.body)[JSON.parse(frame.body).length-1][1])
        }else {
          this.GAcount2++
          this.option.series[this.GAcount1].data.push(JSON.parse(frame.body)[JSON.parse(frame.body).length-1][1])
        }
        if(this.currentGeneration==this.generation-1){
          //将最优适应度的值给bestFitness
          let fitness = JSON.parse(frame.body)[JSON.parse(frame.body).length-1][1]
          if(fitness<this.bestFitness){
            this.bestFitness = fitness
          }
          this.runtimes++
          this.averageFitness = 0
          //遍历series数组，将每个series的data数组的最后一个值取出，用来计算平均值
          for(let i=0;i<this.runtimes;i++){
            this.averageFitness += this.option.series[i].data[this.option.series[i].data.length-1]
          }
          //取两位小数
          this.averageFitness = this.averageFitness/this.runtimes
          this.averageFitness = this.averageFitness.toFixed(2)
          //最差适应度的值
          if(fitness>this.worstFitness){
            this.worstFitness = fitness
          }
          this.fitnessVariance = 0
          //遍历series数组，将每个series的data数组的最后一个值取出，用来计算方差
          for(let i=0;i<this.runtimes;i++){
            this.fitnessVariance += Math.pow(this.option.series[i].data[this.option.series[i].data.length-1]-this.averageFitness,2)//方差
          }
          this.fitnessVariance = this.fitnessVariance/this.runtimes
          this.fitnessVariance = this.fitnessVariance.toFixed(2)
        }
        //将opention2的标题改为当前迭代次数
        //this.option2.title.text = '第'+this.currentGeneration+'代种群分布图'
        this.option2.title.text = '第'+this.currentGeneration+'代选择操作后种群个体分布图'
        //myChart2根据新的数据重新渲染
        this.option2 && this.myChart2.setOption(this.option2);
        //myChart根据新的数据重新渲染
        this.option && this.myChart.setOption(this.option);
      }

      //接收到服务器推送消息，向服务器定义的接收消息routekey路由rk_recivemsg发送确认消息
      this.client.send("/exchange/exchange_pushmsg/rk_recivemsg", {"content-type":"text/plain"}, "ok");
    },
    connect() {
      //这里填你rabbitMQ的连接ip地址直接替换localhost:15674就好其它的不用改
      this.client= Stomp.client("ws://localhost:15674/ws")
      //填写你rabbitMQ登录的用户名和密码
      var headers = {
        "login": "guest",
        "passcode": "guest",
        //虚拟主机，默认“/”
        "host": "/"
      };
      //创建连接,放入连接成功和失败回调函数
      this.client.connect(headers, this.onConnected, this.onFailed);
    },
    start2(){
      this.GAcount1++
      gaDisplay22(this.value,this.value2,this.value3,this.NN).then(res => {
        this.option.series[this.GAcount1].data=res.body
        let fitness=this.option.series[this.GAcount1].data[this.option.series[this.GAcount1].data.length-1]
        if(fitness<this.bestFitness){
          this.bestFitness = fitness
          this.bestFitness=this.bestFitness.toFixed(2)
        }
        this.runtimes++
        this.averageFitness = 0
        //遍历series数组，将每个series的data数组的最后一个值取出，用来计算平均值
        for(let i=0;i<this.runtimes;i++){
          this.averageFitness += this.option.series[i].data[this.option.series[i].data.length-1]
        }
        //取两位小数
        this.averageFitness = this.averageFitness/this.runtimes
        this.averageFitness = this.averageFitness.toFixed(2)
        //最差适应度的值
        if(fitness>this.worstFitness){
          this.worstFitness = fitness
        }
        this.fitnessVariance = 0
        //遍历series数组，将每个series的data数组的最后一个值取出，用来计算方差
        for(let i=0;i<this.runtimes;i++){
          this.fitnessVariance += Math.pow(this.option.series[i].data[this.option.series[i].data.length-1]-this.averageFitness,2)//方差
        }
        this.fitnessVariance = this.fitnessVariance/this.runtimes
        this.fitnessVariance = this.fitnessVariance.toFixed(2)
        this.option && this.myChart.setOption(this.option);
        //根据res弹窗提示成功
        this.$message({
          message: '发送请求成功',
          type: 'success'
        });
        if(this.GAcount1==9){
          //alert(1)
          this.GAcount1 = -1
          this.GAcount2 = 0
          //this.runtimes=0
          this.runtimes=10
          this.option3.dataset.source[1][this.count3] = this.bestFitness
          this.option3.dataset.source[2][this.count3] = this.averageFitness
          this.option3.dataset.source[3][this.count3] = this.worstFitness
          this.option3.dataset.source[4][this.count3] = this.fitnessVariance
          this.option3 && this.myChart3.setOption(this.option3);
          this.count3++
          //this.bestFitness=10000
          //this.worstFitness=0
          //遍历option的series数组，清空data数组
          for(let i=0;i<10;i++){
            this.option.series[i].data = []
          }
        }
      })

    },
    start(){
      this.GAcount1++
      gaDisplay(this.value,this.value2,this.time,this.value3).then(res => {
        //根据res弹窗提示成功
        this.$message({
          message: '发送请求成功',
          type: 'success'
        });
        if(this.GAcount1==9){
          alert(1)
          this.GAcount1 = -1
          this.GAcount2 = 0
          this.runtimes=0
          this.option3.dataset.source[1][this.count3] = this.bestFitness
          this.option3.dataset.source[2][this.count3] = this.averageFitness
          this.option3.dataset.source[3][this.count3] = this.worstFitness
          this.option3.dataset.source[4][this.count3] = this.fitnessVariance
          this.option3 && this.myChart3.setOption(this.option3);
          this.count3++
          this.bestFitness=10000
          this.worstFitness=0
          //遍历option的series数组，清空data数组
          for(let i=0;i<10;i++){
            this.option.series[i].data = []
          }
        }
      })

    },
    initial(){
      page().then(res => {
        this.ga = res.body.content
        //遍历ga数组，将其转换为select数组
        for (let i = 0; i < this.ga.length; i++) {
          this.gaSelect.push({
            value: this.ga[i].id,
            label: this.ga[i].id+'号GA参数'
          })
        }
        this.value = this.gaSelect[0].value
        this.groupSize = this.ga[this.value-1].groupSize
        this.generation = this.ga[this.value-1].generation
        this.crossRate = this.ga[this.value-1].crossRate
        this.mutationRate = this.ga[this.value-1].mutationRate
      })
      pageLibraries().then(res => {
        this.libraries = res.body.content
        console.log(this.libraries)
        //遍历libraries数组，将其转换为select数组
        for (let i = 0; i < this.libraries.length; i++) {
          this.librariesSelect.push({
            value2: this.libraries[i].id,
            label: this.libraries[i].id+'号缓存库'
          })
        }
        this.value2 = this.librariesSelect[0].value2
      })
    },
    changeGAParameter(){
      alert(this.value)
      this.groupSize = this.ga[this.value-1].groupSize
      this.generation = this.ga[this.value-1].generation
      this.crossRate = this.ga[this.value-1].crossRate
      this.mutationRate = this.ga[this.value-1].mutationRate
    }
    ,
    choseLibraries(){}
  },
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
    //垂直布局
    flex-direction: column;
    background-color: #E9EEF3;
    height: auto;
    .one{
      //横向布局
      display: flex;
      .gaparas{
        //flex: 1;
        display: flex;
        .paras{
          //垂直布局
          flex-direction: column;
          //垂直居中显示
          justify-content: center;
          //与上方元素的距离
          margin-top: 150px;
        }

      }
    }
    .two{

    }
  }
}
#fristScatter{
  //flex: 1;
  width: 500px;
  height: 500px;
}
#fristLine{
  //flex: 1;
  //width: 600px;
  width: 500px;
  height: 500px;
}
#fristBar{
  //flex: 1;
  width: 700px;
  height: 500px;
}
</style>
