<template>
  <el-container class='home_container'>
    <el-header>
      <div>
        <img src="../assets/heima.png"
             alt="">
        <span>电商后台管理系统</span>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '400px'">
        <div class="toggle-button"
             @click="toggleCollapse()">|||</div>
        <el-menu background-color="#303746"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 unique-opened
                 router
                 :default-active='activePath'
                 :collapse="isCollapse">
          <el-submenu :index="item.id + ''"
                      v-for="item in menuList"
                      :key='item.id'>
            <template slot="title">
              <i :class="iconObject[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="'/' + subItem.path"
                          v-for="subItem in item.children"
                          :key='subItem.id'
                          @click="saveNavstate('/' + subItem.path)">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      // 左侧菜单数据
      menuList: [],
      // 设置不同得字体图标 这个地方注意应该学习到 一个id作为一个键 
      iconObject: {
        '125': 'iconfont icon-users',
        '103': 'iconfont icon-3702mima',
        '101': 'iconfont icon-baobiao',
        '102': 'iconfont icon-baobiao',
        '145': 'iconfont icon-baobiao'
      },
      isCollapse: false,
      activePath: ''
    }
  },
  created () {
    this.getMenuList();
    // 
    this.activePath = window.sessionStorage.getItem('avtivePath')
  },
  methods: {
    async getMenuList () {
      const { data: res } = await this.$http.get('menus');
      console.log(res.data);
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      // 因为res.data中得就是一个数组 所以在组件中设置menuList为一个数组
      this.menuList = res.data;
    },
    // 点击按钮，折叠和展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse;
    },
    // 点击时，将子件的index存储在本地中 然后再将本地的数据在防止在default-active中
    saveNavstate (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath;
    }
  }
}
</script>
<style>
@import "../assets/css/home/home.css";
</style>