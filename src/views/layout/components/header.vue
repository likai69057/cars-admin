<template>
  <div id="header-wrap">
    <i class="iconfont icon-caidan" @click="navMenuState"></i>
    <div class="pull-right">
      <div class="user-info pull-left">
        <img src="@/assets/imgs/user.jpg" alt="">
        <p>{{ username }}</p>
      </div>
      <i class="iconfont icon-guanji pull-right" @click="Logout"></i>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'

export default {
  name: 'Header',
  setup (props, { root }) {
    // 从store中获取username
    const username = computed(() => root.$store.state.app.username)

    const navMenuState = () => {
      // ** 由于模块化的store的命名空间问题 需要加app/ 路径
      root.$store.commit('app/setCollapse')
      // 针对store的action异步处理的调用dispatch函数
    }
    // 登出按钮方法
    const Logout = () => {
      root.$store.dispatch('app/Logout').then(() => {
        root.$router.push({
          name: 'login'
        })
      })
    }

    return {
      username,
      navMenuState,
      Logout
    }
  }
}
</script>

<style scoped lang="less">
#header-wrap {
  position: fixed;
  top: 0px;
  right: 0px;
  left: 250px;
  height: 75px;
  line-height: 75px;
  background-color: #fff;
  box-shadow: 0 3px 16px 0px rgba(0, 0, 0, .1);
  z-index: 1;
  -webket-transition: all .3s ease 0s;
  -moz-transition: all .3s ease 0s;
  -o-transition: all .3s ease 0s;
  -ms-transition: all .3s ease 0s;
  transition: all .3s ease 0s;
  .iconfont{
    padding: 0 32px;
    font-size: 24px;
    cursor: pointer;
  }
  .user-info{
    height: 75px;
    display: flex;
    align-items: center;
    padding: 0 32px;
    border-right: 1px solid #ededed;
    + .icon-guanji {
      padding: 0 28px;
    }
    img {
      width: 35px;
      height: 35px;
      margin-right: 15px;
      border-radius: 50%;
      vertical-align: middle;
    }
    p {
      margin: 0;
      font-size: 14px;
    }
  }
}
.open {
  #header-wrap {
    left: 250px;
  }
}
.close {
  #header-wrap {
    left: 64px;
  }
}
</style>
