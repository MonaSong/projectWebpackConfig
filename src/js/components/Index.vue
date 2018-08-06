<template>
  <div class="hello">
    <el-form label-width="100px" style="max-width: 500px;">
        <el-form-item label="用户姓名">
          <el-input type="input" v-model="uname"></el-input>
        </el-form-item>
        <el-form-item label="当前用户名">
         <p>{{this.$store.state.users.name|ff}}</p>
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
    <br>

    <demo></demo>
  </div>
</template>

<script>
// import List from './list.vue';
import { mapActions } from 'vuex';
import axios from 'axios';
// let demo = null;
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '修改用户姓名',
      uname: '',
      tableName: '',
      tableData: [],
      dd: null,
    }
  },
  components: {
    List:  () => import('./List.vue'),
    Demo: () => import('./Demo.vue')
  },
  created () {
    // axios.get('/api/user?uid=233').then((ret)=>{
    //   this.tableData = ret.data.result;
    // })

    // require.ensure([], require => {
    //   this.dd = require('./demo.vue');
    //   console.log('demo', demo);
    //   // demo.show();
    // }, 'demo');
  },
  filters: {
    ff (v) {
      return v+'mona.song'
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions([
        'setUsername' // 映射 this.setUsername() 为 this.$store.dispatch('setUsername')
    ]),
    // ...mapActions({
    //     setName: 'setUsername' // 映射 this.setName() 为 this.$store.dispatch('setUsername')
    // }),
    onSubmit () {
        this.$store.dispatch('setUsername', this.uname);
       // this.setName(this.uname);
       //this.setUsername(this.uname);
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
  width: 1000px;
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
