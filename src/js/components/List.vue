<template>
  <div>
    <el-table
      :data="listData" style="width: 100%; text-align: center">
      <el-table-column prop="uid" label="uid" width="80"></el-table-column>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="80"></el-table-column>
      <el-table-column  label="头像" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.img" style="max-width:100px; max-height: 100px">
        </template>
        </el-table-column>
      <el-table-column prop="email" label="邮箱" width="120"></el-table-column>
      <el-table-column prop="address" label="地址" width="120"></el-table-column>
    </el-table>
    <div style="width: 500px; margin-top: 50px;">
      <el-form :inline="true"> 
        <el-form-item label="设置表格标题">
          <el-input type="input" v-model="tbTitle"></el-input>
        </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onClick">设置表格title</el-button>
      </el-form-item>
      </el-form>
    </div>
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


