<template>
<div class="col-3">
  <div class="card">
    <img :src="foto" class="card-img-top" alt="...">
    <div class="card-body">
      <h6>{{ contato.pessoa.nome }}</h6>
      <h6>{{ contato.valor }}</h6>
      <h6>{{ contato.contatoTipo.descricao }}</h6>
      <h6>{{ contato.contatoCategoria.descricao }}</h6>
      <button v-if="contato.pessoa.benfeitores.length > 0" @click="removeFromFavoritos" class="btn btn-outline-secondary">Remover dos favoritos</button>
      <button v-else @click="addToFavoritos" class="btn btn-outline-secondary">Adicionar aos favoritos</button>
      <button @click="showInfo" class="btn btn-outline-secondary">Ver mais informações</button>
      <button @click="editarContato" class="btn btn-outline-secondary">Editar</button>
      <button @click="excluirContato" class="btn btn-outline-secondary">Excluir</button>
    </div>
  </div>
</div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Basic from '@/views/Basic.vue'; // @ is an alias to /src
import { User, Role, Pessoa, Endereco, Cidade, Estado, Pais, Contato, ContatoTipo, ContatoCategoria } from '@/types'
var Buffer = require('buffer/').Buffer

@Options({
  props: {
    contato: Object
  }
})
export default class ContatoCard extends Basic {

  contato: Contato = {
    id: 0,
    valor: '',
    publico: false,
    pessoa_id: 0,
    pessoa: {
      id: 0,
      nome: '',
      cpf: '',
      data_nascimento: '',
      foto: ''
    },
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

  get foto() {
    return this.contato.pessoa!.foto != '' ? `data:image;base64,${Buffer.from(this.contato.pessoa!.foto.data).toString('base64')}` : require('@/assets/user-default.jpeg')
  }

  showInfo() {
    this.$emit('showInfo', this.contato)
  }

  editarContato() {
    this.$emit('editarContato', this.contato.id)
  }

  excluirContato() {
    this.$emit('excluirContato', this.contato.id)
  }

  addToFavoritos() {
    this.$emit('addToFavoritos', this.contato.pessoa_id)
  }

  removeFromFavoritos() {
    this.$emit('removeFromFavoritos', this.contato.pessoa_id)
  }
}
</script>
<style scoped>
.btn {
  width: 100%;
  text-align: center;
}

.card {
  padding: 0;
}

.favorito {
  cursor: pointer;
}

.card-body {
  padding: 10px;
}

.col-3 {
  margin-top: 10px;
}
</style>