<template>
  <section class="profile-container border-line_bottom">
    <img class="profile-avatar" :src="avatar" alt />
    <div class="profile-info">
      <span class="profile-name">{{ name }}</span>
      <div class="profile-more">
        <span class="profile-id">微信号：{{ id }}</span>
        <span class="profile-icon ki-icon-QR_code"></span>
        <span class="profile-icon ki-icon-arrow_right"></span>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted } from "vue";
export default {
  name: "KiProfile",
  // props: ["name"],
  props: {
    name: {
      type: String,
      default: "test"
    },
    avatar: {
      type: String, //传入图片的http地址，没有的话，则显示默认图片
      default: require("../assets/img/avatar.jpg")
    },
    id: {
      type: String,
      default: "xxxx"
    }
  },
  setup() {
    onMounted(() => {
      // console.log("onMounted");
    });
    return {};
  }
};
</script>

<style scoped>
  .profile-container {
    /* --ki-profile-bg: #FFF; */
    /* --ki-color_primary: #1b1b1b;
    --ki-color_secondary: #676767; */
    /* --ki-profile-name-color: #1b1b1b;
    --ki-profile-id-color: #676767; */

    box-sizing: border-box;
    padding-top: 0.74rem;
    padding-bottom: 2.31rem;
    display: flex;
    justify-content: flex-start;
    width: 100%;
    height: 6.8rem;
    background-color: var(--ki-profile-bg, #FFF);
  }

  .profile-container .profile-avatar {
    margin: 0 0.93rem 0 1.61rem;
    width: 3.75rem;
    height: 3.75rem;
    border-radius: 0.35rem;
    background: green;
  }

  .profile-container .profile-info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    flex: 1;
    height: 3.75rem;
  }

  .profile-container .profile-name {
    color: var(--ki-color_primary);
    font-weight: 500;
    font-size: 1.06rem;
  }

  .profile-container .profile-more {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }

  .profile-container .profile-id {
    flex: 1;
    color: var(--ki-color_secondary);
    font-weight: normal;
    font-size: 0.85rem;
    text-align: left;
  }

  .profile-container .profile-icon {
    margin-right: 0.76rem;
    width: 0.8rem;
    height: 0.8rem;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

</style>