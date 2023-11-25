<template>
  <div class="home">

    <div class="main0">
      <div class="aside">
        <div class="chose" style="margin-top: 15px">
          <el-select
            v-model="value1" style="width: 130px"
            placeholder="请选择缓存库"
            @change="choseLibraries">
            <el-option
              v-for="item in librariesSelect"
              :key="item.value1"
              :label="item.label"
              :value="item.value1"
            />
          </el-select>
        </div>
        <div class="capacity" style="margin-top: 10px;margin-left:22px;width: 150px;height: 180px;">
          <div id="liquidFill11" style="width: 150px;height: 180px;"></div>
        </div>
        <div style="margin-left:15px;width: 180px;">
          <el-input
            placeholder="请输入货物名称或ID"
            v-model="input"
            clearable>
          </el-input>
        </div>
        <div style="margin-top: 10px;">
          <el-button  type="primary" round @click="findGood">查 找</el-button>
        </div>
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
<!--        <div style="margin: 15px 0">-->
<!--          <el-select-->
<!--            v-model="value2" style="width: 130px"-->
<!--            placeholder="请选择缓存库"-->
<!--            @change="choseLibraries">-->
<!--            <el-option-->
<!--              v-for="item in librariesSelect"-->
<!--              :key="item.value2"-->
<!--              :label="item.label"-->
<!--              :value="item.value2"-->
<!--            />-->
<!--          </el-select>-->
<!--        </div>-->

        <div style="margin: 5px 0">
          <el-tag >种群数量：{{groupSize}}</el-tag>
        </div><div style="margin: 5px 0">
          <el-tag >迭代次数：{{generation}}</el-tag>
        </div><div style="margin: 5px 0">
          <el-tag type="success">交叉概率：{{crossRate}}</el-tag>
        </div><div style="margin: 5px 0">
          <el-tag type="warning">变异概率：{{mutationRate}}</el-tag>
        </div>
        <div style="margin: 10px 0">
          <el-select
            v-model="value3" style="width: 150px"
            placeholder="请选择遗传算法"
            @change="chosegas">
            <el-option
              v-for="item in gasSelect"
              :key="item.value3"
              :label="item.label"
              :value="item.value3"
            />
          </el-select>
        </div>
        <div style="margin: 15px 0">
          <el-button type="success" round @click="start">执行算法规划</el-button>
        </div>
      </div>
      <div class="main">
        <div class="inOrOut">
          <div v-for="index in outlet" :key="index" class="out" ></div>
        </div>
        <div class="RGVorbit">
          <div v-for="index in outRgv" :key="index" class="outRGV" ></div>
        </div>
        <div id="display" >
          <div v-for="index in plateChain" :key="index" class="rect"></div>
          <!--        <div v-for="(size, index) in sizes" :key="index" class="inner-rect"-->
          <!--             :style="{ width: size.width + 'px',-->
          <!--             height: size.height + 'px',-->
          <!--             top: size.top + 'px',-->
          <!--             left: size.left + 'px' }"></div>-->
        </div>
        <div class="RGVorbit">
          <div v-for="index in inRgv" :key="index" class="inRGV" ></div>
        </div>
        <div class="inOrOut">
          <div v-for="index in inlet" :key="index" class="in" ></div>
        </div>
        <div style="display: flex">
          <div>入库任务：</div>
          <div style="margin-left: 570px">出库任务：</div>
        </div>
        <div class="control">
          <div >
            <el-table stripe border :data="tableData"
                      max-height="180"
                      ref="multipleTable">
              <el-table-column
                prop="id"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column
                prop="name"
                label="货物名称"
                width="120">
              </el-table-column>
              <el-table-column
                prop="type"
                label="货物型号"
                width="90">
              </el-table-column>
              <el-table-column
                prop="goodsId"
                label="货物编号"
                width="100">
              </el-table-column>
              <el-table-column
                prop="number"
                label="货物数量"
                width="90">
              </el-table-column>
              <el-table-column
                prop="location"
                label="目标位置"
                width="100">
              </el-table-column>
              <el-table-column
                prop="status"
                label="任务状态"
                width="90" >
              </el-table-column>
            </el-table>
          </div>
          <div >
            <el-table stripe border :data="tableData2"
                      max-height="180"
                      ref="multipleTable">
              <el-table-column
                               prop="id"
                               label="序号"
                               width="50">
              </el-table-column>
              <el-table-column
                prop="name"
                label="货物名称"
                width="120">
              </el-table-column>
              <el-table-column
                prop="type"
                label="货物型号"
                width="90">
              </el-table-column>
              <el-table-column
                prop="goodsId"
                label="货物编号"
                width="100">
              </el-table-column>
              <el-table-column
                prop="number"
                label="货物数量(垛)"
                width="100">
              </el-table-column>
              <el-table-column
                prop="outlet"
                label="出库口"
                width="100">
              </el-table-column>
              <el-table-column
                prop="status"
                label="任务状态"
                width="90" >
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="right">
        <div style="margin-top: 40px">
          算法出库规划结果
        </div>
        <div style="margin-top: 5px">
          <el-table stripe border :data="gaResult"
                    max-height="800"
                    ref="multipleTable">
            <el-table-column
              prop="id"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="out"
              label="出库口"
              width="100">
            </el-table-column>
            <el-table-column
              prop="num"
              label="任务"
              width="130">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>


  </div>

</template>

<script>
import {
  orderByInletId,qrcode111,orderByOutletId,
  plateChainByLibrariesId,
  pageLibraries,
  pageRgv,
  storageByLibrariesId,
  goodsAll,outletByLibrariesId, inletByLibrariesId
} from '../api/wcs/show'
import {
  page,gaDisplay,gaDisplay2,gaDisplay3
} from '@/api/wcs/ga'
import{outletPage}from '../api/wcs/outlet'
import{inletPage}from '../api/wcs/inlet'
import * as echarts from "echarts";
import {qrcode} from "../api/wcs/show";
import Echarts from 'echarts'//引入echarts
import "echarts-liquidfill";
export default {
  computed: {
    backgroundImage() {
      return backgroundImage
    }
  },
  data() {
    return {
      gaResult:[],
      groupSize: '',
      generation: '',
      crossRate: '',
      mutationRate: '',
      gaSelect:[],
      gasSelect:[
        {value3: '0', label: '标准遗传算法'},
        {value3: '1', label: '改进-去重复的个体'},
        {value3: '2', label: '改进-精英策略'},
        {value3: '3', label: '基于排名选择'},
        {value3: '4', label: '锦标赛选择'},
      ],
      value:'',
      value3:'',
      multipleSelection: [],
      capacityUse:0,
      capacity:0,
      tableData: [{
        id: '1',
        type: '入库',
        status: '已完成',
        location: '1',
        goodsId: '1',
        amount: '1',
        time: '2020-12-12 12:12:12'
      }],
      tableData2: [{
        id: '1',
        type: '入库',
        status: '已完成',
        location: '1',
        goodsId: '1',
        name:'1',
        amount: '1',
        time: '2020-12-12 12:12:12'
      }],
      restaurants: [],
      state: '',
      timeout:  null,
      good:{
        name:'',
        type:'',
        id:'',
        length:'',
        width:'',
        number:'',
        inletId:'',
        location:'',
        outletId:'',
      },
      orderIn:[],
      input:'',
      value1: '',
      libraries:[],
      librariesSelect:[],
      plateChain:0,
      plateChain1:[],
      inlet:0,
      inlet1:[],
      outlet:0,
      outlet1:[],
      outRgv:0,
      inRgv:0,
      outletLocation:[],
      storageGoods:[],
      goodss:[],
      sizes: [
        { width: 200, height: 300, top: 100, left: 100 },
        { width: 300, height: 500, top: 500, left: 500 },
        // ...
      ],
      qr:{
        content:12
      },
      verifyCode:'',
    }
  },
  mounted(){
    this.liquidFill();
  },
  created() {
    this.initial();

  },
  methods: {
    changeGAParameter(){
      alert(this.value)
      this.groupSize = this.ga[this.value-1].groupSize
      this.generation = this.ga[this.value-1].generation
      this.crossRate = this.ga[this.value-1].crossRate
      this.mutationRate = this.ga[this.value-1].mutationRate
    },
    chosegas(){},
    start(){
      this.gaResult=[]
      //gaId,librariesId,gas
      gaDisplay3(this.value,this.value1,this.value3).then(res=>{
        console.log(res.body)
        //res.body是 [0:"0-2"1:"1-5"2:"2-2"3:"3-4"4:"1-12"]，怎么将其转换为数组
        let temp=[]
        for (let i = 0; i < res.body.length; i++) {
          let temp1=res.body[i].split("-")
          temp.push(temp1)
        }
        //遍历temp数组，将其转换为数组
        let temp2=[]
        for (let i = 0; i < temp.length; i++) {
          //遍历this.tableData2，找到它的outlet
          for (let j = 0; j < this.tableData2.length; j++) {
            if(this.tableData2[j].outlet==this.outlet1[temp[i][0]]+"号出库口"){
              temp2.push({
                id:i+1,
                out:this.outlet1[temp[i][0]]+"号出库口",
                num:temp[i][1]+"垛"+this.tableData2[j].name
              })
              break
            }
          }
        }
        this.gaResult=temp2
        this.$message({
          message: '执行成功',
          type: 'success'
        });
      })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    liquidFill (){//方法
      let liquid = echarts.init(document.getElementById('liquidFill11'));//初始化echarts
      liquid.setOption({
        title: {//标题
          text:'库存容量',
          textStyle: {//标题的样式
            color:'#f60',//字体颜色
            fontFamily: 'Microsoft YaHei',//字体
            align: 'center',//文字的水平方式
            verticalAlign: 'middle'//文字位于图片中间位置
          },
          left: 'center',//定位
          //backgroundColor: '#03dbdb'//文字区域的背景颜色
        },
        series: [{
          type: 'liquidFill',//类型
          data: [0.8, 0.8, 0.7,],//数据是个数组 数组的每一项的值是0-1
          outline: {
            show: true , //是否显示轮廓 布尔值
            borderDistance: 0, //外部轮廓与图表的距离 数字
            itemStyle:{
              borderColor:'rgba(255,0,0,0.09)', //边框的颜色
              borderWidth: 0,  //边框的宽度
              shadowBlur: 5 , //外部轮廓的阴影范围 一旦设置了内外都有阴影
              shadowColor: '#000' //外部轮廓的阴影颜色
            }
          },
          backgroundStyle: {
            color:'rgba(255,0,0,0.1)',//图表的背景颜色
            //borderWidth: '10',//图表的边框宽度
            //borderColor: '#000',//图表的边框颜色
            itemStyle: {
              shadowBlur:100,//设置无用
              shadowColor: '#f60',//设置无用
              opacity: 1 //设置无用
            }
          },
          itemStyle: {
            opacity:0.5,//波浪的透明度
            shadowBlur: 10,//波浪的阴影范围
            shadowColor:'#f60'//阴影颜色
          },
          emphasis:{
            itemStyle: {
              opacity :1 //鼠标经过波浪颜色的透明度
            }
          },
          //水波的颜色 对应的是data里面值,当第一个值越高，整体颜色越红，否则越蓝
          color: ['#03dbdb', '#03dbdb', '#03dbdb'],
          //水波的形状
          shape: 'circle',//水填充图的形状 circle默认圆形  rect圆角矩形  triangle三角形  diamond菱形  pin水滴状 arrow箭头状  还可以是svg的path
          center: ['50%','50%'],//图表相对于盒子的位置 第一个是水平的位置 第二个是垂直的值 默认是[50%,50%]是在水平和垂直方向居中 可以设置百分比 也可以设置具体值
          radius: '80%', //图表的大小 值是圆的直径 可以是百分比 也可以是具体值 100%则占满整个盒子 默认是40%; 百分比下是根据宽高最小的一个为参照依据
          amplitude:3,   //振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
          waveLength:'50%',//波的长度 可以是百分比也可以是具体的像素值  百分比下是相对于直径的 取得越大波浪的起伏越小
          phase:0 ,//波的相位弧度 默认情况下是自动
          period: (value,index)=>{//控制波的移动速度 可以是函数 也可以是数字 两个参数  value 是data数据里面的值 index 是data值的索引

            return index*2000;
          },
          direction: 'left',//波移动的速度 两个参数  left 从右往左 right 从左往右
          waveAnimation: true, //控制波动画的开关  值是布尔值 false 是关闭动画 true 是开启动画 也是默认值
          animationEasing: 'linear',//初始动画
          animationEasingUpdate: 'quarticInOut',//数据更新的动画效果
          animationDuration: 3000, //初始动画的时长，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更绚丽的初始动画效果
          animationDurationUpdate : 300 //数据更新动画的时长

        }],
        //backgroundColor: 'rgba(255,0,0,0.1)'容器背景颜色
      })
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      this.good.name=item.value
      this.good.id=item.id
      this.good.type=item.type
      this.good.length=item.length
      this.good.width=item.width
    },

    choseLocation(){

    },
    findGood(){
      if(this.input==''){
        this.$message({
          message: '请输入货物名称或ID',
          type: 'warning'
        });
        return
      }
      //根据输入的货物名称或ID查找板链上的货物，并将货物所在的方框外边显红
      //判断input是数字还是字符串
      let reg = /^[0-9]+.?[0-9]*$/;
      let y=false
      if(reg.test(this.input)){
        //遍历storageGoods数组
        for (let i = 0; i < this.storageGoods.length; i++) {
          if(this.storageGoods[i].length==0){
            continue
          }
          //遍历storageGoods[i]数组
          for (let j = 0; j < this.storageGoods[i].length; j++) {
            if(this.storageGoods[i][j].goodsId==this.input){
              //其中i表示第几个rect,j表示第几个canvas
              let rects = document.querySelectorAll(".rect");
              let rect=rects.item(i)
              let canvas=rect.getElementsByTagName("canvas")
              let canvas1=canvas.item(j)
              //将该canvas1进行闪烁，闪烁时间为5s
              let timer = null;
              timer = setInterval(function () {
                if (canvas1.style.opacity == "0.5") {
                  canvas1.style.opacity = "1";
                } else {
                  canvas1.style.opacity = "0.5";
                }
              }, 500);
              setTimeout(function () {
                clearInterval(timer);
                canvas1.style.opacity = "0.5";
              }, 4000);
              y=true
            }
          }
        }
      }else {
        //遍历goodss数组
        for (let i = 0; i < this.goodss.length; i++) {
           if(this.goodss[i].name==this.input){
              let id=this.goodss[i].id
              //遍历storageGoods数组
              for (let j = 0; j < this.storageGoods.length; j++) {
                if(this.storageGoods[j].length==0){
                  continue
                }
                //遍历storageGoods[j]数组
                for (let k = 0; k < this.storageGoods[j].length; k++) {
                  if(this.storageGoods[j][k].goodsId==id){
                    //其中j表示第几个rect,k表示第几个canvas
                    let rects = document.querySelectorAll(".rect");
                    let rect=rects.item(j)
                    let canvas=rect.getElementsByTagName("canvas")
                    let canvas1=canvas.item(k)
                    //将该canvas1进行闪烁，闪烁时间为5s
                    let timer = null;
                    timer = setInterval(function () {
                      if (canvas1.style.opacity == "0.5") {
                        canvas1.style.opacity = "1";
                      } else {
                        canvas1.style.opacity = "0.5";
                      }
                    }, 500);
                    setTimeout(function () {
                      clearInterval(timer);
                      canvas1.style.opacity = "0.5";
                    }, 4000);
                    y=true
                  }
                }
              }
           }
        }
      }
      if(y==false){
        this.$message({
          message: '该货物不存在',
          type: 'warning'
        });
      }
    },
    showQrcode(){
      qrcode111(this.qr).then(res=> {
        const src = window.URL.createObjectURL(res)//这里也是关键,调用window的这个方法URL方法
        this.verifyCode = src

      })
    },
    initial() {
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
      }),
      pageLibraries().then(res => {
        this.libraries = res.body
        //遍历libraries数组，将其转换为select数组
        for (let i = 0; i < this.libraries.length; i++) {
          this.librariesSelect.push({
            value1: this.libraries[i].id,
            label: this.libraries[i].id + '号缓存库',
            outlet:this.libraries[i].outlet,
            inlet:this.libraries[i].inlet,
            inRgv:this.libraries[i].inRgv,
            outRgv:this.libraries[i].outRgv,
            plateChain:this.libraries[i].plateChain
          })
        }
        this.value1 = this.librariesSelect[0].value1
        this.outlet=this.librariesSelect[0].outlet
        this.inlet=this.librariesSelect[0].inlet
        this.inRgv=this.librariesSelect[0].inRgv
        this.outRgv=this.librariesSelect[0].outRgv
        this.plateChain=this.librariesSelect[0].plateChain
        this.shuxin()
      })
    },
    async shuxin(){
      let value111=this.value1
      let outletLocation = []
      let inletLocation = []
      let plateChain = []
      let rgv=[]
      let storage = []
      let goods=[]
      await goodsAll().then(res=>{
          goods.push(res.body)
        this.goodss=goods[0]
        this.restaurants=[]
        for (let i = 0; i < this.goodss.length; i++) {
          this.restaurants.push({
            value: this.goodss[i].name,
            id: this.goodss[i].id,
            type:this.goodss[i].type,
            length:this.goodss[i].length,
            width:this.goodss[i].width
          });
        }
      })
      await plateChainByLibrariesId(this.value1).then(res=>{
        this.capacity=0
        let temp=[]
        //遍历plateChain数组,拿到plateChain的id为value1的plateChain
        for (let i = 0; i < res.body.length; i++) {
            if(res.body[i].type==1){
              plateChain.push(res.body[i])
            }else {
              plateChain.push(res.body[i])
              temp.push(res.body[i].id)
              this.capacity = this.capacity + res.body[i].length
            }
        }
        this.plateChain1=temp
      })
      //遍历plateChain数组,拿到plateChain的id作为storage的id
      await storageByLibrariesId(this.value1).then(res=>{
        this.capacityUse=0
            let sto=res.body
            for (let j = 0; j < sto.length; j++) {
              //拿到每个sto的id,用这个id去goods中找到对应的goods
              for (let k = 0; k < goods[0].length; k++) {
                if(sto[j].goodsId==goods[0][k].id){
                   this.capacityUse=this.capacityUse+goods[0][k].length+50
                }
              }
            }
            //将this.capacityUse/this.capacity作为库存容量的值
            let liquid = echarts.init(document.getElementById('liquidFill11'));//初始化echarts
            let capa=this.capacityUse/this.capacity
            liquid.setOption({
              series: [{
                data: [capa, capa, capa-capa/5,],
              }]
            })
            //遍历plateChain数组,拿到plateChain的id作为storage的id
            for (let i = 0; i < plateChain.length; i++) {
              let storage1=[]
              //遍历storage数组,拿到storage的id为plateChain的id的storage
              for (let j = 0; j < sto.length; j++) {
                if(sto[j].plateChainId==plateChain[i].id){
                  storage1.push(sto[j])
                }
              }
              storage.push(storage1)
            }
            this.storageGoods=storage
      })
      await pageRgv(this.value1).then(res=>{
        //遍历rgv数组,拿到rgv的id为value1的rgv
            rgv.push(res.body)
      })
      await outletByLibrariesId(this.value1).then(res=>{
        let temp=[]
        let temp3=[]
        //遍历outlet数组
        for (let i = 0; i < res.body.length; i++) {
          let id=res.body[i].id
            outletLocation.push(res.body[i].location)
            temp.push(res.body[i].id)
          orderByOutletId(res.body[i].id).then(res=>{
            //更新表格的数据
            for (let j = 0; j < res.body.length; j++) {
              //根据id,拿到具体的goods
              for (let k = 0; k < goods[0].length; k++) {
                if(res.body[j].goodsId==goods[0][k].id){
                  temp3.push({
                    id:i+1,
                    name:goods[0][k].name,
                    type:goods[0][k].type,
                    goodsId:res.body[j].goodsId,
                    number:res.body[j].number,
                    status:res.body[j].status,
                    outlet:id+"号出库口",
                    time:res.body[j].createdTime
                  })
                  if(res.body[j].status==1){
                    temp3.at(-1).status='待执行'
                  }else {
                    temp3.at(-1).status='执行中'
                  }
                  break
                }
              }
            }
          })
        }
        this.tableData2=temp3
        this.outlet1=temp
      })
      await inletByLibrariesId(this.value1).then(res=>{
        let temp2=[]
        //遍历outlet数组
        for (let i = 0; i < res.body.length; i++) {
          temp2.push(res.body[i].id)
          inletLocation.push(res.body[i].location)
          orderByInletId(res.body[i].id).then(res=>{
            //更新表格的数据
            let temp=[]
            for (let j = 0; j < res.body.length; j++) {
              //根据id,拿到具体的goods
              for (let k = 0; k < goods[0].length; k++) {
                if(res.body[j].goodsId==goods[0][k].id){
                  temp.push({
                    id:j+1,
                    name:goods[0][k].name,
                    type:goods[0][k].type,
                    goodsId:res.body[j].goodsId,
                    number:res.body[j].number,
                    location:"缓存区"+res.body[j].plateChainId,
                    status:res.body[j].status,
                    time:res.body[j].createdTime
                  })
                  if(res.body[j].status==1){
                    temp.at(-1).status='待执行'
                  }else {
                    temp.at(-1).status='执行中'
                  }
                  break
                }
              }
            }
            this.tableData=temp
          })
        }
        this.inlet1=temp2
      })
      let left = []
      handleResize()
      let resizeTimer;//定义resizeTimer
      //监听窗口大小改变,触发handleResize函数，短时间内多次触发resize事件，只会执行一次handleResize函数
      window.addEventListener("resize", handleResize);
      function handleResize() {
        console.log("窗口大小改变")
        if (resizeTimer) {//如果resizeTimer不为null,说明有一个定时器在等待执行，为了避免执行多个定时器，所以需要先清除定时器
          cancelAnimationFrame(resizeTimer);
        }
        resizeTimer = requestAnimationFrame(resizeRects);//设置一个定时器
      }
      function resizeRects(){
        left = []
        //设置一个resizeRects函数,用来改变rect的宽高
        let myDiv = document.getElementById("display");
        // 将容器设置为 flex 布局
        myDiv.style.display = "flex";
        // 将子元素排列在同一行
        myDiv.style.flexWrap = "nowrap";
        //拿到整个浏览器的宽度和高度
        let rectHeight1 = document.documentElement.clientHeight;
        let rect = myDiv.getBoundingClientRect();
        let width = rect.width;
        let rectHeight = rectHeight1-70;
        let rects = document.querySelectorAll(".rect");//获取所有的rect
        let num=0
        //rects横向排列
        rects.forEach((rect) => {
          //rect的内容清空
          rect.innerHTML = "";
          rect.style.width = (width-10*rects.length-50)/rects.length + "px";
          rect.style.height = rectHeight*0.5 + "px";
          //背景图片，同比例缩放
          rect.style.backgroundSize = "100% 100%";
          rect.style.backgroundImage = "url(" + require("@/assets/images/plateChain.png") + ")";
          //rect.style.backgroundColor = "#ccc";
          //如果num/3为整数,则marginRight为15px
          if(value111==1){
            if ((num) % 3 == 0) {
              rect.style.marginRight = "20px";
            }else {
              rect.style.marginRight = "10px";
            }
          }else {
            if ((num-2) % 3 == 0) {
              rect.style.marginRight = "20px";
            }else {
              rect.style.marginRight = "10px";
            }
          }

          //最后一个rect的marginRight设置为0
          if (rect === rects[rects.length - 1]) {
            rect.style.marginRight = "0px";
          }
          //第一个rect的marginLeft设置为10px
          if (rect === rects[0]) {
            rect.style.marginLeft = "10px";

          }
            if(storage[num].length==0){

            }else {
              //随机生成某个颜色
              let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
              for (let j = 0; j < storage[num].length; j++) {
                //遍历goods
                for (let k = 0; k < goods[0].length; k++) {
                  if (storage[num][j].goodsId == goods[0][k].id) {
                    //根据goods的id,拿到goods的具体信息
                    let goods1 = goods[0][k]
                    let number=storage[num][j].amount
                    let location=storage[num][j].location
                    //根据goods1的尺寸，对比rect的尺寸，将goods1的尺寸缩小
                    let goodsWidth = goods1.width
                    let goodsHeight = goods1.length
                    let rectWidth = rect.offsetWidth
                    let rectHeight = rect.offsetHeight
                    let goodsWidth1 =( goodsWidth / plateChain[num].width)*rectWidth
                    let goodsHeight1 = (goodsHeight / plateChain[num].length)*rectHeight-3

                    //根据这个尺寸画出对于的方框
                    let canvas = document.createElement("canvas");//canvas是一个矩形区域，可以用来绘制图形，或者显示图像
                    canvas.width = goodsWidth1;
                    canvas.height = goodsHeight1;
                    canvas.style.zIndex = "100";//z-index 属性设置元素的堆叠顺序
                    canvas.style.border = "1px solid #000";//边框
                    canvas.style.backgroundColor = color;//背景颜色
                    //水平居中
                    canvas.style.marginLeft = (rect.offsetWidth - canvas.width) / 2 + "px";
                    canvas.style.marginTop=2 + "px";
                    canvas.style.opacity = "0.5";//透明度
                    //canvas之间不在同一行
                    canvas.style.display = "block";//block:元素将显示为块级元素，此元素前后会带有换行符
                    //canvas中间位置显示文字goods1.name的前两个字
                    let ctx = canvas.getContext("2d");//getContext() 方法返回一个用于在画布上绘图的环境
                    ctx.font = "12px Arial";//font 属性设置或返回画布上文本内容的当前字体属性
                    //根据canvas的背景颜色，设置相对显眼的颜色
                    if (color == "#000000" || color == "#0000ff" || color == "#00ff00" || color == "#00ffff" || color == "#ff0000" || color == "#ff00ff" || color == "#ffff00") {
                      ctx.fillStyle = "#ffffff";//fillStyle 属性设置或返回用于填充绘画的颜色、渐变或模式
                    } else {
                      ctx.fillStyle = "#000000";
                    }
                    ctx.textAlign = "center";//textAlign 属性根据锚点，设置或返回文本内容的当前对齐方式
                    ctx.textBaseline = "middle";//textBaseline 属性设置或返回在绘制文本时使用的当前文本基线
                    ctx.fontWeight = "bold";//fontWeight 属性设置或返回文本的粗细
                    ctx.fillText(goods1.name.substring(0, 2), canvas.width / 2, canvas.height / 2);//fillText() 方法在画布上绘制填色的文本
                    //将canvas添加到rect中
                    rect.appendChild(canvas);
                    //鼠标移动到canvas上，在该位置显示goods的具体信息，界面上这个信息框只能有一个，信息框内有个确认按钮，确认后消失。
                    canvas.onmouseover = function () {
                      let div = document.createElement("div");
                      div.style.position = "absolute";
                      div.style.zIndex = "100";
                      div.style.backgroundColor = "#000";
                      div.style.color = "#fff";
                      div.style.fontSize = "12px";
                      div.style.fontWeight = "bold";
                      div.style.textAlign = "center";
                      div.style.padding = "5px";
                      div.style.borderRadius = "5px";
                      div.style.left = event.clientX + "px";
                      div.style.top = event.clientY + "px";
                      div.innerHTML = "货物名称:" + goods1.name + "<br/>" +"货物型号:" + goods1.type + "<br/>"+
                        "货物编号:" + goods1.id + "<br/>" + "货物尺寸:" + goods1.length +
                        "*" + goods1.width+ "<br/>"+ "数量:"+ number +
                        "<br/>"+"位置:"+location ;
                      document.body.appendChild(div);
                      //界面上只能有一个信息框，鼠标移动到其他canvas上，先将之前的信息框删除
                      canvas.onmouseout = function () {
                        document.body.removeChild(div);
                      }

                    }
                    //点击canvas,显示goods的具体信息
                    canvas.onclick = function () {
                      //将货物信息填到good中

                    }
                  }
                }
            }
          }
          //获取rect在当前视窗的位置
          let rect1 = rect.getBoundingClientRect();
          left.push(rect1.left);

          //rect的最后位置显示文字，显示plateChain的id
          let text = document.createElement("div");
          if(plateChain[num].type==1){
            text.innerHTML ="快速通道"+ plateChain[num].id;
          }else {
            text.innerHTML ="缓存区"+ plateChain[num].id;
          }
          text.style.zIndex = "100";
          text.style.color = "#000";
          text.style.fontSize = "12px";
          text.style.fontWeight = "bold";
          text.style.textAlign = "center";
          rect.appendChild(text);
          num++
        });
        //修改RGV轨道的高度
        let RGVorbit = document.querySelectorAll(".RGVorbit");
        RGVorbit.forEach((RGVorbit) => {
          RGVorbit.style.height = rectHeight*0.06 + "px";
        });
        //修改outRGV的高度
        let rgvO=0
        let outRGV = document.querySelectorAll(".outRGV");
        outRGV.forEach((outRGV) => {
          //outRGV的内容清空
          outRGV.innerHTML = "";
          outRGV.style.height = rectHeight*0.06 + "px";
          let width= rects.item(1).style.width;
          //获得outRGV.style.width的数值
          let width1 = width.substring(0,width.length-2);
          outRGV.style.width= width1*1.5 + "px";
          //更改outRGV到容器左边的距离
          outRGV.style.marginLeft = left[rgv[0].location-1]-200 + "px";
          //outRGV的中间位置显示文字，显示rgv的id
          let text = document.createElement("div");
          text.innerHTML = "出库RGV";
          text.style.zIndex = "100";
          text.style.color = "#000";
          text.style.fontSize = "12px";
          text.style.fontWeight = "bold";
          //文字的位置为outRGV的中间
          text.style.textAlign = "center";
          outRGV.appendChild(text);
          let x=0
          //遍历 rgv[0]中的数据
          for (let i = rgvO; i < rgv[0].length; i++) {
            if(rgv[0][i].rgvType==1){
              x=i;
              rgvO=i++;
              break
            }
          }
          //鼠标移动到outRGV上，在该位置显示rgv的具体信息，界面上这个信息框只能有一个，信息框内有个确认按钮，确认后消失。
          outRGV.onmouseover = function () {
            let div = document.createElement("div");
            div.style.position = "absolute";
            div.style.zIndex = "100";
            div.style.backgroundColor = "#000";
            div.style.color = "#fff";
            div.style.fontSize = "12px";
            div.style.fontWeight = "bold";
            div.style.textAlign = "center";
            div.style.padding = "5px";
            div.style.borderRadius = "5px";
            div.style.left = event.clientX + "px";
            div.style.top = event.clientY + "px";
            div.innerHTML = "RGV编号:" + rgv[0][x].id + "<br/>" +
              "ip地址:" + rgv[0][x].ip + "<br/>" + "端口号:" + rgv[0][x].port + "<br/>" +
              "状态:" + rgv[0][x].status + "<br/>" + "位置:" + rgv[0][x].location + "<br/>" +
              "速度:" + rgv[0][x].speed;
            document.body.appendChild(div);
            //界面上只能有一个信息框，鼠标移动到其他outRGV上，先将之前的信息框删除
            outRGV.onmouseout = function () {
              document.body.removeChild(div);
            }
          }
          rgvO++
        });
        let rgvI=0
        //修改inRGV的高度
        let inRGV = document.querySelectorAll(".inRGV");
        inRGV.forEach((inRGV) => {
          inRGV.innerHTML = "";
          inRGV.style.height = rectHeight*0.06 + "px";
          let width= rects.item(1).style.width;
          //获得inRGV.style.width的数值
          let width1 = width.substring(0,width.length-2);
          inRGV.style.width= width1*1.5 + "px";
          //更改inRGV到容器左边的距离
          inRGV.style.marginLeft = left[rgv[0].location-1]-200 + "px";
          //inRGV的中间位置显示文字，显示rgv的id
          let text = document.createElement("div");
          text.innerHTML = "入库RGV";
          text.style.zIndex = "100";
          text.style.color = "#000";
          text.style.fontSize = "12px";
          text.style.fontWeight = "bold";
          //文字的位置为inRGV的中间
          text.style.textAlign = "center";
          inRGV.appendChild(text);
          let x=0
          //遍历 rgv[0]中的数据
          for (let i = rgvI; i < rgv[0].length; i++) {
            if(rgv[0][i].rgvType==0){
              x=i;
              rgvI=i++;
              break
            }
          }
          //鼠标移动到inRGV上，在该位置显示rgv的具体信息，界面上这个信息框只能有一个，信息框内有个确认按钮，确认后消失。
          inRGV.onmouseover = function () {
            let div = document.createElement("div");
            div.style.position = "absolute";
            div.style.zIndex = "100";
            div.style.backgroundColor = "#000";
            div.style.color = "#fff";
            div.style.fontSize = "12px";
            div.style.fontWeight = "bold";
            div.style.textAlign = "center";
            div.style.padding = "5px";
            div.style.borderRadius = "5px";
            div.style.left = event.clientX + "px";
            div.style.top = event.clientY + "px";
            div.innerHTML = "RGV编号:" + rgv[0][x].id + "<br/>" +
              "ip地址:" + rgv[0][x].ip + "<br/>" + "端口号:" + rgv[0][x].port + "<br/>" +
              "状态:" + rgv[0][x].status + "<br/>" + "位置:" + rgv[0][x].location + "<br/>" +
              "速度:" + rgv[0][x].speed;
            document.body.appendChild(div);
            //界面上只能有一个信息框，鼠标移动到其他inRGV上，先将之前的信息框删除
            inRGV.onmouseout = function () {
              document.body.removeChild(div);
            }
          }
      });
        //修改inOrOut的高度
        let inOrOut = document.querySelectorAll(".inOrOut");
        inOrOut.forEach((inOrOut) => {
          inOrOut.style.height = rectHeight*0.06 + "px";
        });
        //修改out的高度
        let out = document.querySelectorAll(".out");
        let i=0
        out.forEach((out) => {
          out.innerHTML = "";
          out.style.height = rectHeight*0.06 + "px";
          out.style.width=rects.item(1).style.width
          //获得out.style.width的数值
          let width = out.style.width;
          let width1 = width.substring(0,width.length-2);
          //遍历outletLocation,取出每个值
          //更改out到容器左边的距离
          if(i==0){
            out.style.marginLeft = left[outletLocation[i]-1]-200-215 + "px";
            if(value111!=1){
              out.style.marginLeft = left[outletLocation[i]-1]-200-208 + "px";
            }
          }else {
            out.style.marginLeft = left[outletLocation[i]-1]-left[outletLocation[i-1]-1]-width1+ "px";
          }
          i++
          //out的底部显示文字，显示out的id
          let text = document.createElement("div");
          text.innerHTML = "出库口"+ i;
          text.style.zIndex = "100";
          text.style.color = "#000";
          text.style.fontSize = "12px";
          text.style.fontWeight = "bold";
          text.style.textAlign = "center";
          out.appendChild(text);
        });
        //修改in的高度
        let in1 = document.querySelectorAll(".in");
        i=0
        in1.forEach((in1) => {
          in1.innerHTML = "";
          in1.style.height = rectHeight*0.06 + "px";
          in1.style.width=rects.item(1).style.width
          //获得out.style.width的数值
          let width = in1.style.width;
          let width1 = width.substring(0,width.length-2);
          //遍历outletLocation,取出每个值
          //更改out到容器左边的距离
          if(i==0){
            in1.style.marginLeft = left[inletLocation[i]-1]-200-214 + "px";
            if(value111!=1){
              in1.style.marginLeft = left[inletLocation[i]-1]-200-207 + "px";
            }
          }else {
            in1.style.marginLeft = left[inletLocation[i]-1]-left[inletLocation[i-1]-1]-width1 + "px";
          }
          i++
          //in的底部显示文字，显示in的id
          let text = document.createElement("div");
          text.innerHTML = "入库口"+ i;
          text.style.zIndex = "100";
          text.style.color = "#000";
          text.style.fontSize = "12px";
          text.style.fontWeight = "bold";
          text.style.textAlign = "center";
          in1.appendChild(text);
        });
      }
    },
    choseLibraries(){
      this.gaResult=[]
      for (let i = 0; i < this.librariesSelect.length; i++) {
        if(this.value1==this.librariesSelect[i].value1){
          this.outlet=this.librariesSelect[i].outlet
          this.inlet=this.librariesSelect[i].inlet
          this.inRgv=this.librariesSelect[0].inRgv
          this.outRgv=this.librariesSelect[0].outRgv
          this.plateChain=this.librariesSelect[i].plateChain
        }
      }
      this.shuxin()
    },
  },

}
</script>

<style scoped lang="scss">

.main0{
    //横向排列
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(100vh - 84px);
  .aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    width: 260px;
    height: calc(100vh - 84px);
    /* line-height: 20px; */
  }
  .right{
    text-align: center;
    background-color: #d3dce6;
    width: 300px;
  }
  .main {
    //纵向排列
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    }
  .control{
    width:100%;
    height: 100px;
    //水平均匀分布
    display: flex;
  }
  .inOrOut {
    width:100%;
    height: 60px;
    //水平均匀分布
    display: flex;
    .out{
      width:20%;
      height: 60px;
      background:url("../assets/images/out.png");
      background-size: 100% 100%;
      //background-color: #00afff;
    }
    .in{
      width:20%;
      height: 60px;
      background:url("../assets/images/out.png");
      background-size: 100% 100%;
      //background-color: #00afff;
    }
  }
  .RGVorbit{
    width:100%;
    height: 60px;
    //水平均匀分布
    display: flex;
    //背景图片同一目录下
    background-color: #666666;
    .outRGV{
      width:20%;
      height: 60px;
      background:url("../assets/images/RGV.png");
      background-size: 100% 100%;
    }
    .inRGV{
      width:20%;
      height: 60px;
      background:url("../assets/images/RGV.png");
      background-size: 100% 100%;
    }

  }
    .display{
      //display: flex;// 将容器设置为 flex 布局
      //flex-wrap: wrap; /* 如果想要自动换行 */
      //justify-content: space-between; /* 如果想要两端对齐 */
      //align-items: center; /* 如果想要垂直居中 */
      //垂直布局
      flex-direction: column;//将子元素排列在垂直方向

      .rect {
        width: 60px;
        height: 200px;
        background-color: #ccc;
        //margin-bottom: 10px;
        margin-right: 10px;
        &:last-child {// 最后一个元素
          margin-right: 0;
        }
        //第一个元素
        &:first-child {
          margin-left: 10px;
        }
      }
    }
  }




</style>

