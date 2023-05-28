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
            <el-tag>种群数量：{{groupSize}}</el-tag>
            <el-tag>迭代次数：{{generation}}</el-tag>
            <el-tag type="success">交叉概率：{{crossRate}}</el-tag>
            <el-tag type="warning">变异概率：{{mutationRate}}</el-tag>
          </div>
          <div>
            <el-input v-model="time" placeholder="请输入延时时间"></el-input>
          </div>
          <div style="margin: 15px 0">
            <el-button type="primary" @click="start">开始</el-button>
          </div>
        </el-aside>
        <el-main>
          <div id="fristScatter">
          </div>
          <div id="fristLine">
          </div>

        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
import {
  page,gaDisplay,
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
      currentGeneration: 15,
      client:null,
      time: '',
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
      option : {
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
        title: {
          text: 'GA迭代图',
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
            if(value.min - 100>0){
              return value.min - 100;
            }else{
              return 0;
            }
          },
        },
        series: [
          {
            data: [],
            type: 'line'
          }
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
          //坐标轴颜色是绿色
          axisLine: {lineStyle: {color: 'green'}},
          //坐标轴刻度从200-1000
          min: 100,
          max: 1000,
          // min: function (value) {
          //   if(value.min - 100>0){
          //     return value.min - 100;
          //   }else{
          //     return 0;
          //   }
          // },
        },
        yAxis: {
          name: '各出库口等待时间之和',
          //坐标轴颜色是蓝色
          axisLine: {lineStyle: {color: 'blue'}},
          //坐标轴刻度从200-1000
          min: 100,
          max: 1000,
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
            symbolSize: 5,//点的大小
            //显示数值中x值中最小的点
            markPoint: {
              data: [
                //y轴最小值，最大值，平均值,同时显示该点的x值，颜色是蓝色
                {type: 'min', name: '最小值', valueIndex: 1, itemStyle: {color: 'blue'}},
                //x轴最小值，最大值，平均值，颜色是绿色
                {type: 'min', name: '最小值', valueIndex: 0, itemStyle: {color: 'green'}},
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
    }

  },
  mounted(){
    let chartDom = document.getElementById('fristLine');
    this.myChart = echarts.init(chartDom);
    this.option && this.myChart.setOption(this.option);
    let chartDom2 = document.getElementById('fristScatter');
    this.myChart2 = echarts.init(chartDom2);
    this.option2 && this.myChart2.setOption(this.option2);

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
        this.option2.title.text = '第'+this.currentGeneration+'代种群轮盘赌后分布图'
        //myChart2根据新的数据重新渲染
        this.option2 && this.myChart2.setOption(this.option2);
      }else {
        this.currentGeneration = JSON.parse(frame.body)[JSON.parse(frame.body).length-1][0]
        //将当前迭代次数和一个数据作为option的一个新增的数据
        this.option.series[0].data.push([this.currentGeneration,JSON.parse(frame.body)[JSON.parse(frame.body).length-1][1]])
        //将opention2的标题改为当前迭代次数
        this.option2.title.text = '第'+this.currentGeneration+'代种群分布图'
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
    start(){
      gaDisplay(this.value,this.value2,this.time).then(res => {
        //根据res弹窗提示成功
        this.$message({
          message: '发送请求成功',
          type: 'success'
        });
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

    background-color: #E9EEF3;
    //text-align: center;
    height: auto;

    .row {
      display: flex;
      //justify-content: center;

    }
    .button {
      width: 25px;
      height: 25px;
      margin: 2px;
      background-color: #ccc;
    }
  }
}
#fristScatter{
  height: 50vh;
  width: 70%;
}
#fristLine{
  height: 50vh;
  width: 70%;
}

</style>
