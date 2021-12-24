<template>
  <div class="card large-margin-bottom">
    <div class="row">
      <div class="col-12">
        <h4>Cadastrar um novo usuário</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="postUser()">
          <div class="row">
            <div class="col-12">
              <FormUser v-model:user="user" />
            </div>
            <div class="col-12 mt-2">
              <button class="btn btn-outline-primary">Salvar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Basic from '@/views/Basic.vue'; // @ is an alias to /src
import FormUser from '@/components/forms/FormUser.vue'; // @ is an alias to /src
import { User, Role, Pessoa, Endereco, Cidade, Estado, Pais, Contato, ContatoTipo, ContatoCategoria } from '@/types'

@Options({
  components: {
    FormUser
  }
})
export default class CreateUser extends Basic {

  user: User = {
    id: 0,
    username: '',
    roles: [],
    pessoa_id: 0,
    pessoa: {
      id: 0,
      nome: '',
      cpf: '',
      data_nascimento: '',
      foto: '',
      endereco: {
        id: 0,
        bairro: '',
        logradouro: '',
        numero: '',
        cep: '',
        complemento: '',
        cidade_id: 0,
        pessoa_id: 0,
        cidade: {
          id: 0,
          nome: '',
          estado_id: 0,
          estado: {
            id: 0,
            nome: '',
            uf: '',
            pais_id: 0,
            pais: {
              id: 0,
              nome: ''
            }
          }
        }
      }
    }
  }

  postUser() {
    var formData = new FormData()
    formData.append('foto', this.user.pessoa!.foto)
    formData.append('user', JSON.stringify(this.user) )
    this.axiosInstance.post('/user', formData).then( (response: any) => {
      this.$router.push('/users')
    }).catch( (err: any) => {
      this.tratarErro(err)
    })
  }

}

</script>
<style scoped>
.large-margin-bottom {
  margin-bottom: 150px;
}
</style>