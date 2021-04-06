<template>
  <div id="nav-wrap">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      text-color="white"
      background-color="#344a5f"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      router
    >
      <!-- 由于v-if和v-for不能同时用 可以用template(不会解析的标签, 但是key属性必须绑定到实时渲染的标签上)包裹 -->
      <template v-for="(item,index) in routers">
        <el-submenu :index="index" v-if="!item.hidden" :key="item.id">
          <!-- 一级菜单  -->
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">{{ subItem.meta.name }}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { ref, reactive } from '@vue/composition-api'
export default {
  name: 'Nav',
  setup (props, { root }) {
    /*
    *  2.0的data数据
    */
    const isCollapse = ref(false)
    // 获取路由对象数组
    const routers = reactive(root.$router.options.routes)
    console.log(routers)

    /*
    * 2.0的methods对象
    */
    // 打开导航栏
    const handleOpen = function (key, keyPath) {
      console.log(key, keyPath)
    }
    // 关闭导航栏
    const handleClose = function (key, keyPath) {
      console.log(key, keyPath)
    }

    // 所有的属性和方法都要return出去
    return {
      isCollapse,
      handleOpen,
      handleClose,
      routers
    }
  }
}
</script>

<style scoped lang="less">
#nav-wrap {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 250px;
  height: 100vh;
  background-color: #344a5f;
}
.el-menu{
  border: none;
}
</style>
