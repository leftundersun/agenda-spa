<template>
  <div class="card mt-2">
    <h5 class="text-info">Dados pessoais</h5>
    <FormDadosPessoa v-model:pessoa="pessoa" />
  </div>
  <div class="card mt-2">
    <h5 class="text-info">Endereço</h5>
    <FormEndereco ref="formEndereco" v-model:endereco="pessoa.endereco" />
  </div>
  <div class="card mt-2">
    <div class="row">
      <div class="col-8">
        <h5 class="text-info">
          Contatos
        </h5>
      </div>
      <div class="col-4">
        <button type="button" @click="newContato()" class="btn btn-outline-primary float-end">Adicionar contato</button>
      </div>
      <div class="col-12">
        <FormContato 
          v-for="(contato, index) in pessoa.contatos"
          :contato="contato"
          :index="index"
          @removeContato="removeContato($event)"
          @excluirContato="excluirContato($event)"
          :key="index"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Basic from '@/views/Basic.vue'; // @ is an alias to /src
import FormEndereco from '@/components/forms/FormEndereco.vue'; // @ is an alias to /src
import FormContato from '@/components/forms/FormContato.vue'; // @ is an alias to /src
import FormDadosPessoa from '@/components/forms/FormDadosPessoa.vue'; // @ is an alias to /src
var Buffer = require('buffer/').Buffer
import { User, Role, Pessoa, Endereco, Cidade, Estado, Pais, Contato, ContatoTipo, ContatoCategoria } from '@/types'

@Options({
  props: {
    pessoa: Object
  },
  components: {
    FormContato,
    FormEndereco,
    FormDadosPessoa
  }
})
export default class FormPessoa extends Basic {

  defaultContato: Contato = {
      id: 0,
      valor: '',
      publico: false,
      pessoa_id: 0,
      user_id: 0,
      contato_tipo_id: 0,
      contatoTipo: {
        id: 0,
        descricao: ''
      },
      contato_categoria_id: 0,
      contatoCategoria: {
        id: 0,
        descricao: ''
      }
    }

  pessoa: Pessoa = {
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
    },
    contatos: []
  }

  $refs!: {
    formEndereco: FormEndereco
  }

  getEstados(paisId: Number) {
    this.$refs.formEndereco!.getEstados(paisId)
  }

  getCidades(estadoId: Number, search: String) {
    this.$refs.formEndereco!.getCidades(estadoId, search)
  }

  newContato() {
    this.pessoa.contatos!.push( JSON.parse(JSON.stringify(this.defaultContato)) )
  }

  removeContato(index: number) {
    this.pessoa.contatos!.splice(index, 1)
  }

  excluirContato(id: number) {
    this.$emit('excluirContato', id)
  }

}
</script>
<style scoped>
</style>