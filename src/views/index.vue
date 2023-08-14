<template>
  <div class="home">
    <div class="main">
      <div class="inOrOut">
        <div v-for="index in 4" :key="index" class="out" ></div>
      </div>
      <div class="RGVorbit">

      </div>
      <div id="display">
        <div v-for="index in 14" :key="index" class="rect"></div>
<!--        <div v-for="(size, index) in sizes" :key="index" class="inner-rect"-->
<!--             :style="{ width: size.width + 'px',-->
<!--             height: size.height + 'px',-->
<!--             top: size.top + 'px',-->
<!--             left: size.left + 'px' }"></div>-->
      </div>
      <div class="RGVorbit"></div>
      <div class="inOrOut"></div>
      <div class="control">
        <div class="chose" style="margin-left: 20px">
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
      </div>
    </div>
  </div>

</template>

<script>
import {
  plateChainList,pageLibraries
} from '@/api/wcs/show'
import * as echarts from "echarts";
export default {
  computed: {
    backgroundImage() {
      return backgroundImage
    }
  },
  data() {
    return {
      platechainNum: 0,
      value2: '',
      libraries:[],
      librariesSelect:[],
      sizes: [
        { width: 200, height: 300, top: 100, left: 100 },
        { width: 300, height: 500, top: 500, left: 500 },
        // ...
      ],

    }
  },
  mounted(){

  },
  created() {
    this.initial();
  },
  methods: {
    initial() {
      pageLibraries().then(res => {
        this.libraries = res.body.content
        console.log(this.libraries)
        //遍历libraries数组，将其转换为select数组
        for (let i = 0; i < this.libraries.length; i++) {
          this.librariesSelect.push({
            value2: this.libraries[i].id,
            label: this.libraries[i].id + '号缓存库'
          })
        }
        this.value2 = this.librariesSelect[0].value2
        this.platechainNum=this.libraries[0].plateChain
        this.shuxin()
      })
    },
    shuxin(){
      handleResize()
      let resizeTimer;//定义resizeTimer
      window.addEventListener("resize", handleResize);//监听窗口大小改变,触发handleResize函数
      function handleResize() {
        console.log("窗口大小改变")
        if (resizeTimer) {//如果resizeTimer不为null,说明有一个定时器在等待执行，为了避免执行多个定时器，所以需要先清除定时器
          cancelAnimationFrame(resizeTimer);
        }
        resizeTimer = requestAnimationFrame(resizeRects);//设置一个定时器
      }
      function resizeRects(){//设置一个resizeRects函数,用来改变rect的宽高
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
        console.log("width:"+width + "rectHeight:"+rectHeight1)
        let rects = document.querySelectorAll(".rect");//获取所有的rect
        //rects横向排列
        rects.forEach((rect) => {
          rect.style.width = (width-10*rects.length-50)/rects.length + "px";
          rect.style.height = rectHeight*0.5 + "px";
          //背景图片，同比例缩放
          rect.style.backgroundSize = "100% 100%";
          rect.style.backgroundImage = "url(" + require("@/assets/images/plateChain.png") + ")";
          //rect.style.backgroundColor = "#ccc";
          rect.style.marginRight = "10px";
          //最后一个rect的marginRight设置为0
          if (rect === rects[rects.length - 1]) {
            rect.style.marginRight = "0px";
          }
          //第一个rect的marginLeft设置为10px
          if (rect === rects[0]) {
            rect.style.marginLeft = "25px";
          }
        });
        //修改RGV的高度
        let RGVorbit = document.querySelectorAll(".RGVorbit");
        RGVorbit.forEach((RGVorbit) => {
          RGVorbit.style.height = rectHeight*0.075 + "px";
        });
        //修改inOrOut的高度
        let inOrOut = document.querySelectorAll(".inOrOut");
        inOrOut.forEach((inOrOut) => {
          inOrOut.style.height = rectHeight*0.08 + "px";
        });
        //修改out的高度
        let out = document.querySelectorAll(".out");
        out.forEach((out) => {
          out.style.height = rectHeight*0.08 + "px";
          out.style.width=rects.item(1).style.width
        });
      }
    },
    choseLibraries(){

    },
  },

}
</script>

<style scoped lang="scss">
.main {
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
  }
  .RGVorbit{
    width:100%;
    height: 60px;
    //背景图片同一目录下
    background-color: #666666;
  }
  .display{
    //display: flex;// 将容器设置为 flex 布局
    //flex-wrap: wrap; /* 如果想要自动换行 */
    //justify-content: space-between; /* 如果想要两端对齐 */
    //align-items: center; /* 如果想要垂直居中 */
    //垂直布局
    flex-direction: column;

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




.inner-rect {
  position: absolute;
  background-color: #f00;
}
</style>

