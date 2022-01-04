<template>
  <div class="card mt-2">
    <h5 class="text-info">Autorização</h5>
    <div class="row g-3">
      <div class="col-4">
        <label for="username" class="form-label">Nome de usuário</label>
        <input name="username" v-model="user.username" type="text" class="form-control">
      </div>
      <div class="col-4">
        <label for="password" class="form-label">Senha</label>
        <input name="password" v-model="user.password" type="password" class="form-control">
      </div>
      <div class="col-4">
        <label for="roles" class="form-label">Roles</label>
        <select size="2" multiple name="roles" class="form-control">
          <option
            style="color: black;"
            disabled="true"
            @click.stop.prevent="selectRole($event)"
            :selected="user.roles.filter( (item) => { return item.id == role.id }).length > 0"
            v-for="role in roles"
            :key="role.id"
            :value="role.id">
            {{ role.descricao }}
          </option>
        </select>
      </div>
    </div>
  </div>
  <div class="card mt-2">
    <h5 class="text-info">Pessoa</h5>
    <div class="row g-3 mb-3">
      <div class="col-4" v-if="user.id == 0" >
        <label for="pessoa" class="form-label">Cadastrar esse usuário para</label>
        <input type="text" v-model="user.pessoa.nome" @keyup="pessoaKeyUp($event)" class="form-control">
        <select @change="selectPessoa($event)" name="pessoa" class="form-select" v-model="user.pessoa.id">
          <option v-if="pessoas.length == 0" value="0">Nova pessoa</option>
          <option v-else value="0">Selecione uma pessoa</option>
          <option v-for="pessoa in pessoas" :key="pessoa.id" :value="pessoa.id">
            {{ pessoa.nome }}, {{ pessoa.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') }}
          </option>
        </select>
      </div>
    </div>
    <FormDadosPessoa :readonly="isPessoaSelected" v-model:pessoa="user.pessoa" />
  </div>
  <div class="card mt-2">
    <h5 class="text-info">Endereço</h5>
    <FormEndereco :readonly="isPessoaSelected" ref="formEndereco" v-model:endereco="user.pessoa.endereco" />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Basic from '@/views/Basic.vue'; // @ is an alias to /src
import FormEndereco from '@/components/forms/FormEndereco.vue'; // @ is an alias to /src
import FormContato from '@/components/forms/FormContato.vue'; // @ is an alias to /src
import FormDadosPessoa from '@/components/forms/FormDadosPessoa.vue'; // @ is an alias to /src
import moment from 'moment';
import { User, Role, Pessoa, Endereco, Cidade, Estado, Pais, Contato, ContatoTipo, ContatoCategoria } from '@/types'

@Options({
  props: {
    user: Object
  },
  components: {
    FormContato,
    FormEndereco,
    FormDadosPessoa
  }
})
export default class FormUser extends Basic {

  defaultPessoa: Pessoa = {
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

  user: User = {
    id: 0,
    username: '',
    roles: [],
    pessoa_id: 0,
    pessoa: JSON.parse( JSON.stringify(this.defaultPessoa) )
  }
  roles: Array<Role> = []
  pessoas: Array<Pessoa> = []
  pessoaLastSearch = ''
  get isPessoaSelected() {
    return this.user.id == 0 && this.user.pessoa!.id > 0
  }

  mounted() {
    this.getRoles()
  }

  selectRole(event: Event) {
    var roleId = parseInt((event.target! as HTMLOptionElement).value)
    var isRoleAlreadySelected = this.user.roles!.filter( (role) => { return role.id == roleId }).length > 0
    if (isRoleAlreadySelected) {
      this.user.roles! = this.user.roles!.filter( (role) => { return role.id != roleId })
    } else {
      this.user.roles!.push( this.roles.filter( (role) => { return role.id == roleId })[0] )
    }
  }

  selectPessoa(event: Event) {
    var pessoaId: number = parseInt((event.target! as HTMLSelectElement).value)
    this.changePessoa(pessoaId)
  }

  changePessoa(pessoaId: number) {
    if (pessoaId > 0) {
      console.log('###### pessoaId')
      console.log(pessoaId)
      var filterResult = this.pessoas.filter( (item) => {
        return item.id == pessoaId
      })
      console.log('###### filterResult')
      console.log(filterResult)
      this.user.pessoa = this.format(filterResult[0])
      this.getEstados(this.user.pessoa!.endereco!.cidade!.estado!.pais!.id)
      this.getCidades(this.user.pessoa!.endereco!.cidade!.estado!.id, this.user.pessoa!.endereco!.cidade!.nome)
    } else {
      this.user.pessoa = JSON.parse( JSON.stringify(this.defaultPessoa) )
    }
  }

  format(data: Pessoa) {
    data.data_nascimento = moment(data.data_nascimento).format('DD/MM/YYYY')
    data.cpf = data.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    data.endereco!.cep = data.endereco!.cep.replace(/(\d{5})(\d{3})/, '$1-$2')
    return data
  }

  pessoaKeyUp(event: Event) {
    var search = (event.target! as HTMLInputElement).value
    if (search.length == 0) {
      this.pessoas = []
      this.user.pessoa!.id = 0
      this.changePessoa(0)
    } else if (search.length >= 3) {
      if (search != this.pessoaLastSearch) {
        this.pessoaLastSearch = search
        this.getPessoas(search)
      }
    }
  }

  getPessoas(search: String) {
    this.axiosInstance.get('/resources/pessoas/?withoutUser=true&search=' + search).then( (response: any) => {
      this.pessoas = response.data.pessoas
    }).catch( (err: any) => {
      this.tratarErro(err)
    })
  }

  getRoles() {
    this.axiosInstance.get('/resources/roles').then( (response: any) => {
      this.roles = response.data.roles
    }).catch( (err: any) => {
      this.tratarErro(err)
    })
  }

  getEstados(paisId: Number) {
    console.log("################ this.$refs.formEndereco")
    console.log(this.$refs.formEndereco)
    this.$refs.formEndereco!.getEstados(paisId)
  }

  getCidades(estadoId: Number, search: String) {
    console.log("################ this.$refs.formEndereco")
    console.log(this.$refs.formEndereco)
    this.$refs.formEndereco!.getCidades(estadoId, search)
  }

  $refs!: {
    formEndereco: FormEndereco
  }

}
</script>
<style scoped>
</style>