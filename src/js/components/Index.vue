<template>
  <div class="hello">
    <el-form label-width="100px">
        <el-form-item label="用户姓名">
          <el-input type="input" v-model="uname"></el-input>
        </el-form-item>
        <el-form-item label="当前用户名">
         <p>{{this.$store.state.users.name}}</p>
        </el-form-item>
        <el-form-item abel="">
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button type="primary" @click="onCheckInfo">查看详情</el-button>
        </el-form-item>
    </el-form>

    <br>
    <br>
    <br>
    <p>{{tableName}}</p>
    <list :listData="tableData" @setTitle="onSetTitle"></list>
  </div>
</template>

<script>
import List from './list.vue';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '修改用户姓名',
      uname: '',
      tableName: '',
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 15弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
    }
  },
  components: {
    List
  },
  mounted () {
  },
  methods: {
    onSubmit () {
       this.$store.dispatch('setUsername', this.uname)
    },
    onCheckInfo () {
      this.$router.push('/Info');
    },
    onSetTitle (val) {
      this.tableName = val;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.hello {
  width: 600px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
