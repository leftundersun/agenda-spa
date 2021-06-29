<template>
  <div class="card">
    <div class="row">
      <div class="col-12">
        <h4>Favoritos</h4>
      </div>
    </div>
    <div class="row">
      <FavoritoCard
        @showContatos="setContatosModal($event)"
        v-for="favorito in user.favoritos"
        :favorito="favorito"
        :key="favorito.id"/>
    </div>
  </div>
  <ModalContatos @closeModal="closeModal" :showModal="showModal" :pessoa="pessoaModal" />
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Basic from '@/views/Basic.vue'; // @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import FavoritoCard from '@/components/lists/items/FavoritoCard.vue'; // @ is an alias to /src
import ModalContatos from '@/components/overlaid/ModalContatos.vue'; // @ is an alias to /src
import { User, Role, Pessoa, Endereco, Cidade, Estado, Pais, Contato, ContatoTipo, ContatoCategoria } from '@/types'

@Options({
  components: {
    HelloWorld,
    FavoritoCard,
    ModalContatos
  },
})
export default class Home extends Basic {

  user: User = {
    id: 0,
    username: '',
    pessoa_id: 0,
    favoritos: []
  }

  pessoaModal: Pessoa = {
    id: 0,
    nome: '',
    cpf: '',
    data_nascimento: '',
    foto: ''
  }
  showModal = false

  mounted() {
    this.axiosInstance.get('/user').then( (response: any) => {
      console.log('########## response')
      console.log(response)
      this.user = response.data.user
    }).catch( (err: any) => {
      this.tratarErro(err)
    })
  }

  setContatosModal(pessoa: Pessoa) {
    this.pessoaModal = pessoa
    this.showModal = true
  }

  closeModal() {
    this.showModal = false
  }

}
</script>
