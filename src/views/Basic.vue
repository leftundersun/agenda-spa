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
      baseURL: process.env.VUE_APP_API_ADRESS,
      headers: {
        'authorization': 'Bearer ' + (token ?? '')
      }
    })
  }

  tratarErro(err: any) {
    if (err.response.status == 401) {
      this.$router.replace('/login')
    } else {
      this.$emit('showMessage', err.response.data.message ?? 'Ocorreu um erro inesperado')
    }
  }
}

</script>
<style>
  
.card {
  padding: 10px;
}

</style>