<template>
  <div id="header-wrap">
    <i class="iconfont icon-caidan" @click="navMenuState"></i>
    <div class="pull-right">
      <div class="user-info pull-left">
        <img src="@/assets/imgs/user.jpg" alt="">
        <p>管理员</p>
      </div>
      <i class="iconfont icon-guanji pull-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  setup (props, { root }) {
    const navMenuState = () => {
      root.$store.commit('setCollapse')
      // 针对store的action异步处理的调用dispatch函数
    }

    return {
      navMenuState
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
