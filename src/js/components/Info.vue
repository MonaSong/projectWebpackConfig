<template>
  <div>
    <h4>这个是用户信息页</h4>
    {{curName}}</div>
</template>

<style>

</style>

<script>
  import {mapState, mapMutations} from 'vuex';
  export default {
    data () {
      return {
        info: ''
      }
    },
    created () {

    },
    mounted () {

    },
    computed: {
      ...mapState({
        curName: state => state.users.name,
        curAge: state => state.users.age,
        curSchool: state => state.users.school,
      }),
    },
    methods: {

    }
  }
</script>

