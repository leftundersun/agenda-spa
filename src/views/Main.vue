<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-secondary" style="padding: 5px 10px;">
    <router-link to="/" class="btn btn-secondary">Home</router-link>
    <router-link to="/users" class="btn btn-secondary">Usuários</router-link>
    <router-link to="/pessoas" class="btn btn-secondary">Pessoas</router-link>
    <router-link to="/contatos" class="btn btn-secondary">Contatos</router-link>
    <button @click="logoff()" class="btn btn-secondary">Logoff</button>
    </nav>
    <div class="container">
      <div class="row">
        <div class="col-12">
        <router-view
          @showMessage="showMessage($event)"
            @showCarregando="showCarregando()"
            @hideCarregando="hideCarregando()"/>
        </div>
      </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Basic from '@/views/Basic.vue'; // @ is an alias to /src

@Options({})
export default class Main extends Basic {

  showMessage(message: string) {
    console.log('############## showMessage')
    this.$emit('showMessage', message)
  }

  logoff() {
    localStorage.removeItem('token')
    this.$router.replace('/login')
  }

  showCarregando() {
    this.$emit('showCarregando')
  }
  hideCarregando() {
    this.$emit('hideCarregando')
  }

}
</script>
<style scoped>
.container {
  margin-top: 10px;
}
</style>