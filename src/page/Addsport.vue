<template lang="">
  <div>
    <x-header
      style="background-color:green; color:white;"
      title="添加运动"
    ></x-header>

    <search
      @result-click="resultClick"
      @on-change="getResult"
      :results="results"
      v-model="value"
      position="absolute"
      auto-scroll-to-top
      top="46px"
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search"
    ></search>

    <van-tabs
      v-model="activeName"
      type="line"
      title-active-color="black"
      title-inactive-color="gray"
      line-width="50px"
      line-height="8px"
      color="#144a9e"
    >
      <van-tab title="常见" name="a"
        ><div>
          <div>
            <hr />
            <div v-for="item in foodlist" :key="item" @click="add(item)">
              <li>
                <img :src="imgUrl" />

                <span
                  style="font-size:16px;position:absolute;left:78px;top:15px;"
                  >{{ item.name }}</span
                >
                <span
                  style="font-size:12px;color:gray;position:absolute;left:78px;top:45px;"
                  ><span style="color:red;">{{ item.rl }}</span
                  >千卡/60{{ item.danwei }}</span
                >
                <div
                  style="display:inline-block; background-color:green;width:10px;height:10px;border-radius:50%;position:absolute;top:35px;right:20px;"
                ></div>
              </li>
              <hr />
            </div>
          </div>
        </div>
      </van-tab>

      <van-tab title="自定义" name="b" @click.native="makeSport()">
        <div>
          <van-icon
            name="plus"
            color="#1989fa"
            style="margin:20px;"
          />添加自定义运动
        </div>
        <div v-for="item in usportlist" :key="item" @click="add(item)">
          <li>
            <img class="img_food" :src="imgUrl" />

            <span
              style="font-size:16px;position:absolute;left:78px;top:15px;"
              >{{ item.name }}</span
            >
            <span
              style="font-size:12px;color:gray;position:absolute;left:78px;top:45px;"
              ><span style="color:red;">{{ item.rl }}</span
              >千卡/100{{ item.danwei }}</span
            >
          </li>
          <hr />
        </div>
      </van-tab>
    </van-tabs>
    <!-- 弹出 -->
    <div class="toast1" v-show="show">
      <p style="font-size:20px;color:gray;padding:15px 0;">
        <span style="margin:10px 0 0 20px;" @click="close">取消</span>
        <span style="margin:10px 0 0 50px;">{{ month }}月{{ day }}日/运动</span>
        <span style="margin:10px 20px 0 55px;" @click="finSport()">确认</span>
      </p>
      <div style="margin:20px 0;">
        <div>
          <li>
            <img :src="imgUrl" />

            <span
              style="font-size:16px;position:absolute;left:78px;top:15px;"
              >{{ addsport.name }}</span
            >
            <span
              style="font-size:12px;color:gray;position:absolute;left:78px;top:45px;"
              ><span style="color:red;">{{ addsport.rl }}</span
              >千卡/10{{ addsport.danwei }}</span
            >
          </li>
          <hr />
        </div>
      </div>

      <div>
        <br />

        <!-- 数量选择 -->
        <div>
          <div style="text-align:center;">
            <p style="font-size:16px;color:gray;margin:0 0 5px 0;">
              {{ reliang }}千卡/
            </p>
            <p style="font-size:16px;color:gray;margin:0 0 20px 0;">
              {{ tiji }}分钟
            </p>
            <inline-x-number
              v-model="num"
              @on-change="changeNum()"
              width="60px"
              :min="1"
            ></inline-x-number>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <span style="margin-left:10px;" @click="look()"
        >食物<badge :text="s_num"></badge
      ></span>
      <x-button
        @click.native="addSport()"
        text="完成"
        type="primary"
        style="display:inline; border-radius:99px; width:250px;margin-left:22px; "
      ></x-button>
    </div>
  </div>
</template>
<script>
import {
  Search,
  Badge,
  Sticky,
  Divider,
  XButton,
  Swiper,
  SwiperItem,
  InlineXNumber
} from "vux";
import Vue from "vue";
import { Tab, Tabs, Icon } from "vant";

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Icon);

const list = () => ["常见", "自定义"];
export default {
  components: {
    Search,
    Badge,
    Sticky,
    Divider,
    XButton,
    Swiper,
    SwiperItem,
    InlineXNumber
  },
  data() {
    return {
      activeName: "a",
      list2: list(),
      foodlist: null,
      demoDisabled: "A",
      index: 0,
      getBarWidth: function(index) {
        return (index + 1) * 22 + "px";
      },
      imgUrl: require("../images/mika.jpg"),
      addsport: {
        danwei: "分钟",
        name: "爬山",
        rl: "1436"
      },
      show: false,
      num: 1,
      sportname: null,
      reliang: 0,
      /* sportnames: [],
      reliangs: [], */
      tiji: 0,
      type: null,
      time: null,
      month: null,
      day: null,
      sport: null,
      //sports: null,
      s_num: 0,
      usportlist: null
    };
  },
  created() {
    this.axios.post("/sportlist").then(res => {
      console.log(res.data);
      this.foodlist = res.data;
      console.log(this.foodlist);
      /* const type = localStorage.getItem("type");
      this.type = type;
      console.log(this.type); */

      var data = new Date();
      this.month =
        data.getMonth() < 9 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1;
      this.day = data.getDate() <= 9 ? "0" + data.getDate() : data.getDate();
      this.time = data.getFullYear() + "-" + this.month + "-" + this.day;
      console.log(this.time); //2021-05-01
    });

    const u_name = localStorage.getItem("user_name");
    const user_name = {
      user_name: u_name
    };
    this.axios({
      method: "post",
      url: "/s_makesport",
      data: user_name
    }).then(res => {
      console.log(res.data);
      this.usportlist = res.data;
    });
  },
  methods: {
    add(item) {
      console.log("添加");
      // console.log(item);
      // this.addsport = item;
      this.addsport.name = item.name;
      this.addsport.rl = item.rl / 6;
      this.addsport.danwei = item.danwei;
      console.log(this.addsport);
      this.show = !this.show;
      this.sportname = this.addsport.name;
      this.reliang = this.addsport.rl * this.num;
      this.tiji = 10 * this.num;
    },
    close() {
      this.show = !this.show;
      this.num = 1;
    },
    finSport() {
      this.show = !this.show;
      this.num = 1;
      console.log(this.sportname + this.reliang);
      this.s_num += 1;

      const user_name = localStorage.getItem("user_name");
      this.sport = {
        user_name: user_name,
        sport: this.sportname,
        rl: this.reliang,
        time: this.time
      };
      this.axios({
        method: "post",
        url: "/add_sport",
        data: this.sport
      })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });

      /* this.sportnames.push(this.sportname);
      this.reliangs.push(this.reliang);
      console.log(this.sportnames + this.reliangs); */
    },
    addSport() {
      //console.log(this.num);
      /*  const user_name = localStorage.getItem("user_name");
      const str_sportnames = this.sportnames.join(",");
      const str_reliangs = this.reliangs.join(",");
      console.log(str_sportnames + str_reliangs);
      this.sports = {
        user_name: user_name,
        sport: str_sportnames,
        rl: str_reliangs,
        time: this.time
      };
      console.log(this.sports);
      //保存数据
      if (this.sports) {
        this.axios({
          method: "post",
          url: "/add_sport",
          data: this.sports
        })
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });
      } */
      this.s_num = 0;
      this.$router.replace("/jilu-food-sport");
    },
    changeNum() {
      console.log(this.num);
      this.reliang = this.addsport.rl * this.num;
      this.tiji = 10 * this.num;
    },
    makeSport() {
      console.log("tianjia");
      this.$router.replace("/make-sport");
    }
  }
  /* updated() {
    this.$nextTick(() => {});
    this.reliang = this.item.rl * this.num;
    this.tiji = this.item.danwei * this.num;
  } */
};
</script>
<style lang="css">
hr {
  background-color: rgb(209, 212, 214);
  height: 1px;
  border: none;
}
img {
  width: 50px;
  height: 50px;
  border-radius: 10px;
}
li {
  list-style-type: none;
  padding: 15px 20px;
  position: relative;
  margin: 0;
  height: 52px;
}
.toast1 {
  width: 100%;
  height: 400px;
  background-color: aliceblue;
  position: fixed;
  top: 300px;
  z-index: 2;
}

.footer {
  z-index: 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding-top: 10px;
  height: 55px;
  border-top: 1px rgb(197, 194, 194) solid;
  background-color: white;
}
</style>
