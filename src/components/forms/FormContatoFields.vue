<template>
  <div class="col-6 mt-2">
    <label for="tipo" class="form-label">Tipo</label>
    <select name="tipo" class="form-select" v-model="contato.contatoTipo.id">
      <option value="0">Selecione o tipo</option>
      <option v-for="tipo in tipos" :key="tipo.id" :value="tipo.id">{{ tipo.descricao }}</option>
    </select>
  </div>
  <div class="col-6 mt-2">
    <label for="categoria" class="form-label">Categoria</label>
    <select name="categoria" class="form-select" v-model="contato.contatoCategoria.id">
      <option value="0">Selecione um categoria</option>
      <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">{{ categoria.descricao }}</option>
    </select>
  </div>
  <div class="col-6 mt-2">
    <label for="valor" class="form-label">Contato</label>
    <input v-if="contato.contatoTipo.id == 3" name="valor" v-model="contato.valor" type="text" class="form-control" :disabled="isntTipoSelected" placeholder="fulano@gmail.com">
    <input v-else name="valor" v-model="contato.valor" v-maska="valueMask" type="text" class="form-control" :disabled="isntTipoSelected" :placeholder="valueMask">
  </div>
  <div class="col-6 mt-2">
    <label for="publico" class="form-label">Público</label>
    <select name="publico" class="form-select" v-model="contato.publico">
      <option :value="false">Não</option>
      <option :value="true">Sim</option>
    </select>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Basic from '@/views/Basic.vue'; // @ is an alias to /src
import { User, Role, Pessoa, Endereco, Cidade, Estado, Pais, Contato, ContatoTipo, ContatoCategoria } from '@/types'

@Options({
  props: {
    contato: Object
  }
})
export default class FormContatoFields extends Basic {

  contato: Contato = {
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
  tipos: Array<ContatoTipo> = []
  categorias: Array<ContatoCategoria> = []
  get isntTipoSelected() {
    return this.contato.contatoTipo!.id == 0
  }
  get valueMask() {
    switch (this.contato.contatoTipo!.id) {
      case 1:
        return '+55 (##) ##### ####'
        break;
      case 2:
        return '+55 (##) #### ####'
        break;
      case 3:
        return '#*'
        break;
      default:
        this.contato.valor = ''
        return 'Selecione o tipo'
        break;
    }
  }

  mounted() {
    this.getTipos()
    this.getCategorias()
  }

  getTipos() {
    this.axiosInstance.get('/resources/contato-tipos').then( (response: any) => {
      this.tipos = response.data.tipos
    }).catch( (err: any) => {
      this.tratarErro(err)
    })
  }

  getCategorias() {
    this.axiosInstance.get('/resources/contato-categorias').then( (response: any) => {
      this.categorias = response.data.categorias
    }).catch( (err: any) => {
      this.tratarErro(err)
    })
  }
}

</script>
<style scoped></style>