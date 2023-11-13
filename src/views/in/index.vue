<template>
  <div class="home">
    <div class="main">
<!--      <div class="inOrOut">-->
<!--        <div v-for="index in outlet" :key="index" class="out" ></div>-->
<!--      </div>-->
<!--      <div class="RGVorbit">-->
<!--        <div v-for="index in outRgv" :key="index" class="outRGV" ></div>-->
<!--      </div>-->
      <div id="display">
        <div v-for="index in plateChain" :key="index" class="rect"></div>
<!--        <div v-for="(size, index) in sizes" :key="index" class="inner-rect"-->
<!--             :style="{ width: size.width + 'px',-->
<!--             height: size.height + 'px',-->
<!--             top: size.top + 'px',-->
<!--             left: size.left + 'px' }"></div>-->
      </div>
<!--      <div class="RGVorbit">-->
<!--        <div v-for="index in inRgv" :key="index" class="inRGV" ></div>-->
<!--      </div>-->
<!--      <div class="inOrOut">-->
<!--        <div v-for="index in inlet" :key="index" class="in" ></div>-->
<!--      </div>-->
      <div class="control">
        <div class="chose" style="margin-left: 20px">
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
        //显示该缓存库的二维码
        <div class="qrcode" style="margin-left: 20px">
          <el-button type="primary" @click="showQrcode">显示二维码</el-button>
          <img :src="verifyCode" style="float:right;">

        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {qrcode111,plateChainByLibrariesId,pageLibraries,pageRgv,storageByLibrariesId,goodsAll} from '../../api/wcs/show'
import{outletPage}from '../../api/wcs/outlet'
import{inletPage}from '../../api/wcs/inlet'
import * as echarts from "echarts";
import {qrcode} from "../../api/wcs/show";
export default {
  computed: {
    backgroundImage() {
      return backgroundImage
    }
  },
  data() {
    return {
      value1: '',
      libraries:[],
      librariesSelect:[],
      plateChain:0,
      inlet:0,
      outlet:0,
      outRgv:0,
      inRgv:0,
      outletLocation:[],
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

  },
  created() {
    this.initial();
  },
  methods: {
    showQrcode(){
      qrcode111(this.qr).then(res=> {
        const src = window.URL.createObjectURL(res)//这里也是关键,调用window的这个方法URL方法
        this.verifyCode = src

      })
    },
    initial() {
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
      let outletLocation = []
      let inletLocation = []
      let plateChain = []
      let rgv=[]
      let storage = []
      let goods=[]
      await goodsAll().then(res=>{
          goods.push(res.body)
      })
      await plateChainByLibrariesId(this.value1).then(res=>{
        //遍历plateChain数组,拿到plateChain的id为value1的plateChain
        for (let i = 0; i < res.body.length; i++) {
            plateChain.push(res.body[i])
        }
      })
      //遍历plateChain数组,拿到plateChain的id作为storage的id
      await storageByLibrariesId(this.value1).then(res=>{
            let sto=res.body
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
      })
      await pageRgv(this.value1).then(res=>{
        //遍历rgv数组,拿到rgv的id为value1的rgv
            rgv.push(res.body)
      })
      await outletPage().then(res=>{
        //遍历outlet数组,拿到outlet的id为value1的outlet
        for (let i = 0; i < res.body.content.length; i++) {
          if(res.body.content[i].librariesId==this.value1){
            outletLocation.push(res.body.content[i].location)
          }
        }
      })
      await inletPage().then(res=>{
        //遍历inlet数组,拿到inlet的id为value1的inlet
        for (let i = 0; i < res.body.content.length; i++) {
          if(res.body.content[i].librariesId==this.value1){
            inletLocation.push(res.body.content[i].location)
          }
        }
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
          rect.style.marginRight = "10px";
          //最后一个rect的marginRight设置为0
          if (rect === rects[rects.length - 1]) {
            rect.style.marginRight = "0px";
          }
          //第一个rect的marginLeft设置为10px
          if (rect === rects[0]) {
            rect.style.marginLeft = "25px";
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
                      div.innerHTML = "商品名称:" + goods1.name + "<br/>" +
                        "商品编号:" + goods1.id + "<br/>" + "商品尺寸:" + goods1.width +
                        "*" + goods1.length+ "<br/>"+ "数量:"+ number +
                        "<br/>"+"位置:"+location ;
                      document.body.appendChild(div);
                      //界面上只能有一个信息框，鼠标移动到其他canvas上，先将之前的信息框删除
                      canvas.onmouseout = function () {
                        document.body.removeChild(div);
                      }

                    }
                    //点击canvas,显示goods的具体信息
                    canvas.onclick = function () {
                      alert("商品名称:" + goods1.name + "\n" +
                        "商品编号:" + goods1.id + "\n" + "商品尺寸:" + goods1.width +
                        "*" + goods1.length+ "\n"+ "数量:"+ number +
                        "\n"+"位置:"+location )
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
            out.style.marginLeft = left[outletLocation[i]-1]-200 + "px";
          }else {
            out.style.marginLeft = left[outletLocation[i]-1]-left[outletLocation[i-1]-1]-width1 + "px";
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
            in1.style.marginLeft = left[inletLocation[i]-1]-200 + "px";
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
.main {
  .inOrOut {
    width:100%;
    height: 60px;
    //水平均匀分布
    display: flex;
    .out{
      width:20%;
      height: 60px;
      background:url("../../assets/images/out.png");
      background-size: 100% 100%;
      //background-color: #00afff;
    }
    .in{
      width:20%;
      height: 60px;
      background:url("../../assets/images/out.png");
      background-size: 100% 100%;
      //background-color: #00afff;
    }
  }
  .RGVorbit{
    width:100%;
    height: 60px;
    //水平均匀分布
    display: flex;
    //背景图片在上一层
    background-color: #666666;
    .outRGV{
      width:20%;
      height: 60px;
      background:url("../../assets/images/RGV.png");
      background-size: 100% 100%;
    }
    .inRGV{
      width:20%;
      height: 60px;
      background:url("../../assets/images/RGV.png");
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




.inner-rect {
  position: absolute;
  background-color: #f00;
}
</style>

