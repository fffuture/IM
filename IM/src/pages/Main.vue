<template>
  <article class="main-container">
    <header class="main-head">
      <div class="main-head-title">发现</div>
      <div class="main-head-imgs">
        <div>放大镜</div>
        <div>添加</div>
      </div>
    </header>
    <ki-swiper :activeIndex="activeIndex.index" @swipeEvent="swipeEvent($event,param)">
      <template v-slot:firstItem>
        <Chats @click="toDialogue"></Chats>
      </template>
      <template v-slot:secondItem>
        <Contacts></Contacts>
      </template>
      <template v-slot:thirdItem>
        <Discover></Discover>
      </template>
      <template v-slot:fourthItem>
        <Me></Me>
      </template>
    </ki-swiper>

    <main-tab :tabList="tabList" :swipeParam="swipeParam" @changeTab="changeTab($event,index)"></main-tab>
  </article>
</template>

<script>
import { reactive, watchEffect, onMounted, onActivated, onDeactivated, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import KiSwiper from "../components/ki-swiper";
import Chats from "./Main/Chats";
import Contacts from "./Main/Contacts";
import Discover from "./Main/Discover";
import Me from "./Main/Me";
import MainTab from "../components/main-tab";

import useI18n from "@/local/index"

// import Request from "@/utils/request"

export default {
  name: "Main",
  components: {
    KiSwiper,
    Chats,
    Contacts,
    Discover,
    Me,
    MainTab
  },
  setup() {
    const Router = useRouter(),
          Store = useStore(),
          { t } = useI18n();

    onMounted(()=>{
      if(!localStorage.getItem('token')) 
        Router.replace("/login")
        // console.log("--onMounted token:", localStorage.getItem('token'));
        console.log("---Main onMounted!!");
        // getFriendList();

        // 在此初始化websocket连接
        Store.dispatch('wsStore/initWS', {Router: Router});

    });

    onActivated(()=> {
      console.log("---MAIN onActivated");
    });
    onDeactivated(()=> {
      console.log("---MAIN onDeactivated");
    })

    onBeforeUnmount(() =>{
      console.log("---MAIN onBeforeUnmount");
    });

    // async function getFriendList() {
    //   console.log("---getFriendList");
    //   let res = await Request.post("/api/friend/getFriendList");
    //   console.log("---getFriendList: ", res);
    // }

    let activeIndex = reactive({
      index: 1
    });

    function changeTab(index) {
      // console.log("main changeTab:", index);
      activeIndex.index = index;
    }

    watchEffect(() => {
      // console.log("mian 1111");
      return activeIndex.value;
    });

    let swipeParam = reactive({
      progress: 0,
      activeIndex: 0,
      step: "panend"
    });
    function swipeEvent(param) {
      swipeParam.progress = param.progress;
      swipeParam.activeIndex = param.activeIndex;
      swipeParam.step = param.step;
      // console.log("aaaa", param, swipeParam);
    }

    let tabList = reactive([
      {
        name: t('app.main.chats'),
        icon: "CHATS",
        iconColor: "#000",
        iconBg: "#f00"
      },
      {
        name: t('app.main.contact'),
        icon: "CONTACTS",
        iconColor: "#000",
        iconBg: "#000"
      },
      {
        name: t('app.main.discover'),
        icon: "DISCOVER",
        iconColor: "#00f",
        iconBg: "#f00"
      },
      {
        name: t('app.main.mine'),
        icon: "ME",
        iconColor: "#000",
        iconBg: "#f00"
      }
    ]);

    function toDialogue() {
      Router.push("/Dialogue");
    }

    return {
      swipeParam,
      swipeEvent,
      tabList,
      activeIndex,
      changeTab,
      toDialogue,
    };
  }
};
</script>

<style lang="stylus" scoped>
@import '../css/variable.styl';

// // 主色调
// $main-bg_primary = #fff;
// $main-color_primary = #ededed;
// // header颜色
// $main-head-color = #000;
// $main-head-bg = #ededed;
// // tab颜色
// $main-tab-color = #000;
// $main-tab-bg = #f7f7f7;
// $main-tab-border_color = #d6d6d6;
.main-container {
  box-sizing: border-box;
  position: relative;
  // padding-top: 3rem;
  position: relative;
  width: 100%;
  height: 100%;
  background: $main-background_primary;
  overflow: hidden;
  user-select: none;

  .main-head {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 3rem;
    background-color: $main-head-bg;
    font-size: 0.95rem;
    z-index: 10;

    .main-head-title {
      margin: 0;
      padding: 0 0.85rem;
      color: $main-head-color;
    }

    .main-head-imgs {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      div {
        margin: 0 0.85rem;
      }
    }
  }
}
</style>
