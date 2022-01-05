<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-4 offset-4">
        <div class="card">
          <div class="row">
            <div class="col-12 text-center">
              <h4>Login</h4>
              <form @submit.prevent="login">
                <div class="row g-2">
                  <div class="col-12">
                    <label for="username">Nome de usuário</label>
                    <input v-model="credentials.user" name="username" type="text" class="form-control">
                  </div>
                  <div class="col-12">
                    <label for="password">Senha</label>
                    <input v-model="credentials.pass" name="password" type="password" class="form-control">
                  </div>
                  <div class="col-12">
                    <input v-model="salvarLogin" name="salvarLogin" type="checkbox" class="form-check-input" style="margin-right: 5px;">
                    <label for="salvarLogin">Salvar credenciais de acesso</label>
                  </div>
                  <div class="col-12">
                    <button class="btn btn-primary">Entrar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Basic from '@/views/Basic.vue'; // @ is an alias to /src
import axios from 'axios';

export default class Login extends Basic {
  credentials = {
    user: '',
    pass: ''
  }
  salvarLogin = false

  mounted() {
    this.credentials.user = localStorage.getItem('username') ?? ''
    this.credentials.pass = localStorage.getItem('password') ?? ''
  }

  login() {
    axios({
      method: 'get',
      url: 'http://localhost:3000/auth/login',
      headers: {
        'authorization': 'Basic ' + btoa( this.credentials.user.trim() + ':' + this.credentials.pass.trim())
      }
    }).then( (response: any) => {
      if (this.salvarLogin) {
        localStorage.setItem('username', this.credentials.user)
        localStorage.setItem('password', this.credentials.pass)
      }
      var token = response.data.token
      localStorage.setItem('token', token)
      this.$router.push('/')
    }).catch( (err: any) => {
      localStorage.removeItem('username')
      localStorage.removeItem('password')
      this.$emit('showMessage', err.response.data.message ?? 'Erro')
    })
  }
}

</script>
<style scoped>
  
.card {
  margin-top: 100px;
}

</style>