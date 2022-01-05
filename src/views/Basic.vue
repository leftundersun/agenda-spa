<template>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';
  
export default class Basic extends Vue {

  axiosInstance: any;

  beforeMount() {
    var token = localStorage.getItem('token')
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:3000',
      headers: {
        'authorization': 'Bearer ' + (token ?? '')
      }
    })
  }

  tratarErro(err: any) {
    if (err.response.status == 401) {
      this.$router.replace('/login')
    } else {
      this.$emit('showMessage', err.response.data.message ?? 'Erro')
    }
  }
}

</script>
<style>
  
.card {
  padding: 10px;
}

</style>