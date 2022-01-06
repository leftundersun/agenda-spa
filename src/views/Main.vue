<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-secondary" style="padding: 5px 10px;">
    <router-link to="/" class="btn btn-secondary">Home</router-link>
    <router-link to="/users" class="btn btn-secondary" v-show="isAdmin">Usuários</router-link>
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
        @hideCarregando="hideCarregando()"
        v-model:user="user"
        @updateLoggedUser="getLoggedUser()" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Basic from '@/views/Basic.vue'; // @ is an alias to /src
import { User, Role, Pessoa, Endereco, Cidade, Estado, Pais, Contato, ContatoTipo, ContatoCategoria } from '@/types'

export default class Main extends Basic {

  user: User = {
    id: 0,
    username: '',
    pessoa_id: 0,
    favoritos: [],
    roles: []
  }

  get isAdmin() {
    return this.user.roles!.filter( (role) => { return role.id == 1 } ).length == 1
  }

  mounted() {
    this.getLoggedUser()
  }

  getLoggedUser() {
    this.showCarregando()
    this.axiosInstance.get('/user').then( (response: any) => {
      this.hideCarregando()
      this.user = response.data.user
    }).catch( (err: any) => {
      this.hideCarregando()
      this.tratarErro(err)
    })
  }

  showMessage(message: string) {
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