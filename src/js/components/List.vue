<template>
  <div>
    <el-table
      :data="listData" style="width: 100%">
      <el-table-column prop="uid" label="uid" width="80"></el-table-column>
      <el-table-column prop="date" label="日期" width="100"></el-table-column>
      <el-table-column prop="name" label="姓名" width="80"></el-table-column>
      <!-- <el-table-column prop="img" label="头像" width="180"></el-table-column>       -->
      <el-table-column prop="email" label="邮箱" width="120"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>

    <el-input type="input" v-model="tbTitle"></el-input>
    <el-button type="primary" @click="onClick">设置表格title</el-button>
  </div>
</template>

<style>

</style>

<script>
  export default {
    data () {
      return  {
        tbTitle: '',
      }
    },
    props: [
      'listData',
      'setTitle',
    ],
    created () {

    },
    mounted () {

    },
    methods: {
      onClick () {
        this.$emit('setTitle', this.tbTitle);
      }
    }
  }
</script>


