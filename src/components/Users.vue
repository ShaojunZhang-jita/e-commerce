<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div @click="toggleV()">5555</div>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容"
                    class="input-with-select">
            <el-button slot="append"
                       icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="usersList"
                style="width: 100%"
                stripe>
        <el-table-column prop="role_name"
                         label="职位"
                         width="180">
        </el-table-column>
        <el-table-column prop="username"
                         label="姓名"
                         width="180">
        </el-table-column>
        <el-table-column prop="email"
                         label="邮箱地址">
        </el-table-column>
        <el-table-column prop="create_time"
                         label="创建时间">
        </el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <!-- 利用template来得到一些id，主要就是得到后台的一些数据的 -->
          <template slot-scope='scope'>
            <el-switch @change="userStateChanged(scope.row)"
            v-model="scope.row.mg_state"
           >
          </el-switch>
          </el-switch>
          </template>
</el-table-column>
<el-table-column label="操作">
    <template slot-scope='scope'>
      <!-- 编辑按钮 -->
    <el-button type="primary" icon="el-icon-edit" circle></el-button>
    <!-- 删除按钮 -->
    <el-button type="danger" icon="el-icon-delete" circle @click='del(scope.row.id)'></el-button>
    <!-- 提示按钮 -->
    <el-tooltip content="分配角色" placement="top">
      <el-button type="warning" icon="el-icon-star-off" circle></el-button>
    </el-tooltip>
  </template>
</el-table-column>
</el-table>
<!-- 分页区域 -->
<!-- page-sieze就是一页几条的意思 含有@的字符就是一个事件 这个需要注意一下 -->
<el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryList.pagenum" :page-sizes="[1, 5, 10, 20]" :page-size="queryList.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
</el-pagination>
</el-card>
</div>
</template>
<script>
    export default {

        data() {
            return {
                usersList: [],
                total: 2,
                //  请求参数 当请求参数发生变化时，页面所得到的数据是不一样的
                queryList: {
                    query: '',
                    // 当前的页数
                    pagenum: 1,
                    // 当前显示每页多少条数据
                    pagesize: 2
                },
            }
        },
        created() {
            this.getUserList();
        },
        methods: {
            async getUserList() {
                const {
                    data: res
                } = await this.$http.get('users', {
                    params: this.queryList
                });
                this.usersList = res.data.users;
                this.total = res.data.total;
                console.log(res);
                console.log(res.data.total);
            },
            del(id) {
                // 得到id之后 删除指定的元素即可
                console.log(id);
                // this.usersList = this.usersList.splice(0, 1);
                // this.usersList = this.usersList.find((item) => {
                //     if (item.id !== idItem) {
                //         return item
                //     }
                // })

            },
            // 监听 pagesize改变的事件 当pagesize改变后 传递的值就是pagesize
            handleSizeChange(newSize) {
                // console.log(newSize);
                this.queryList.pagesize = newSize;
                // 页面改变之后 重新渲染数据  因为queryList是请求得参数 当请求得参数发送改变的时候 那么页面所得到的数据就是不一样的了 这才是正确的逻辑
                this.getUserList();
            },
            // 监听 页码 即pagenum得值
            handleCurrentChange(newPage) {
                // console.log(newPage);
                this.queryList.pagenum = newPage;
                // 重新获取数据
                this.getUserList();
            },
            // 用户状态开关变化时，触发的函数
            async userStateChanged(userInfo) {
                console.log(userInfo);
                // put的方法好像就是在url中进行传递请求参数 关于修改都是用put方法
                // 传递参数都是一些动态id 所以我们用模板字符串来操作
                const {
                    data: res
                } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
                if (res.meta.status != 200) {
                    userInfo.mg_state = !userInfo.mg_state;
                    return this.$message.error('更新状态失败')
                }
                this.$message.success('更新状态成功')
            }

        }
    }
</script>
<style>
    @import "../assets/css/users/users.css";
</style>