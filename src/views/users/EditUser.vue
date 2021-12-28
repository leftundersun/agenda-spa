<template>
  <div class="card large-margin-bottom">
    <div class="row">
      <div class="col-12">
        <h4>Editar usuário</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="updateUser()">
          <div class="row">
            <div class="col-12">
              <FormUser ref="formUser" v-model:user="user" />
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
import moment from 'moment';
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

  $refs!: {
    formUser: FormUser
  }

  mounted() {
    this.getUser()
  }

  getUser() {
    this.axiosInstance.get('/user/' + this.$route.params.id).then( (response: any) => {
      this.user = this.format(response.data.user)
      this.$refs.formUser.getEstados(this.user.pessoa.endereco!.cidade!.estado!.pais!.id)
      this.$refs.formUser.getCidades(this.user.pessoa.endereco!.cidade!.estado!.id, this.user.pessoa.endereco!.cidade!.nome)
    }).catch( (err: any) => {
      this.tratarErro(err)
    })
  }

  format(data: User) {
    data.pessoa.data_nascimento = moment(data.pessoa.data_nascimento).format('DD/MM/YYYY')
    data.pessoa.cpf = data.pessoa.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    data.pessoa.endereco!.cep = data.pessoa.endereco!.cep.replace(/(\d{5})(\d{3})/, '$1-$2')
    return data
  }

  updateUser() {
    var formData = new FormData()
    formData.append('foto', this.user.pessoa!.foto)
    formData.append('user', JSON.stringify(this.user) )
    this.axiosInstance.put('/user/' + this.user.id, formData).then( (response: any) => {
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