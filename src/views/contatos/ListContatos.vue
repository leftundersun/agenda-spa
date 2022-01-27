<template>
  <div class="card">
    <div class="row">
      <div class="col-6">
        <h4>Contatos</h4>
      </div>
      <div class="col-6">
        <router-link to="/contato/create" class="btn btn-outline-primary float-end">Criar contato</router-link>
      </div>
    </div>
    <Paginacao
      :totalCount="totalCount"
      :selectedPage="selectedPage"
      @selectPage="selectPage($event)"
      @search="searchChange($event)"
    />
    <div v-if="contatos.length > 0" class="row gx-2">
      <ContatoCard
        @addToFavoritos="addToFavoritos($event)"
        @removeFromFavoritos="removeFromFavoritos($event)"
        @showMessage="showMessage($event)"
        @showInfo="setContatoModal($event)"
        @excluirContato="excluirContato($event)"
        @editarContato="editarContato($event)"
        v-for="contato in contatos"
        :contato="contato"
        :key="contato.id"/>
    </div>
    <div v-else class="row">
      <div class="col-12">
        <div class="card">
          <h6 class="text-center mb-0">Nenhum resultado para exibir</h6>
        </div>
      </div>
    </div>
  </div>
  <ConfirmationModal
    :showModal="showConfirmationModal"
    :question="confirmationQuestion"
    @closeModal="closeConfirmationModal()"
    @callback="confirmationCallback()"
  />
  <ModalContatoInfo @closeModal="closeModal" :showModal="showModalContatoInfo" :contato="contatoModal" />
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Basic from '@/views/Basic.vue'; // @ is an alias to /src
import ContatoCard from '@/components/lists/items/ContatoCard.vue'; // @ is an alias to /src
import Paginacao from '@/components/lists/Paginacao.vue'; // @ is an alias to /src
import ConfirmationModal from '@/components/overlaid/modals/ConfirmationModal.vue'; // @ is an alias to /src
import ModalContatoInfo from '@/components/overlaid/modals/info/ModalContatoInfo.vue'; // @ is an alias to /src
import { User, Role, Pessoa, Endereco, Cidade, Estado, Pais, Contato, ContatoTipo, ContatoCategoria } from '@/types'

@Options({
  components: {
    ContatoCard,
    ConfirmationModal,
    Paginacao,
    ModalContatoInfo
  }
})
export default class ListContatos extends Basic {

  contatoModal: Contato = {
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
    user: {
      id: 0,
      username: '',
      pessoa_id: 0,
      pessoa: {   
        id: 0,
        nome: '',
        cpf: '',
        data_nascimento: '',
        foto: '',
      }
    },
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
  showModalContatoInfo = false

  contatos: Array<Pessoa> = []

  totalCount = 0
  selectedPage = 1
  search = ''

  showConfirmationModal = false
  confirmationQuestion = 'Deseja excluir permanentemente esse contato?'

  closeModal() {
    this.showModalContatoInfo = false
  }

  showMessage(event: string) {
    this.$emit('showMessage', event)
  }

  mounted() {
    this.searchContatos()
  }

  searchContatos() {
    this.$emit('showCarregando')
    var url = '/contato/list?'
    if (this.search.length > 2) {
      url += 'search=' + this.search + '&'
    }
    url += 'page=' + this.selectedPage
    this.axiosInstance.get(url).then( (response: any) => {
      this.$emit('hideCarregando')
      this.contatos = response.data.contatos
      this.totalCount = response.data.totalCount
    }).catch( (err: any) => {
      this.$emit('hideCarregando')
      this.tratarErro(err)
    })
  }

  selectPage(page: number) {
    this.selectedPage = page
    this.searchContatos()
  }

  searchChange(search: string) {
    if (search != this.search) {
      this.selectedPage = 1
      this.search = search
      this.searchContatos()
    }
  }

  editarContato(id: Number) {
    this.$router.push('/contato/edit/' + id)
  }

  excluirContato(id: Number) {
    this.confirmationCallback = () => {
      this.showConfirmationModal = false
      this.$emit('showCarregando')
      this.axiosInstance.delete('/contato/' + id).then( (response: any) => {
        this.$emit('hideCarregando')
        this.searchContatos()
        this.$emit('showMessage', response.data.message)
      }).catch( (err: any) => {
        this.$emit('hideCarregando')
        this.tratarErro(err)
      })
    }
    this.showConfirmationModal = true
  }

  addToFavoritos(contatoId: Number) {
    this.axiosInstance.put('/favoritos/' + contatoId).then( (response: any) => {
      this.searchContatos()
      this.$emit('showMessage', response.data.message)
    }).catch( (err: any) => {
      this.tratarErro(err)
    })
  }
  removeFromFavoritos(contatoId: Number) {
    this.axiosInstance.delete('/favoritos/' + contatoId).then( (response: any) => {
      this.searchContatos()
      this.$emit('showMessage', response.data.message)
    }).catch( (err: any) => {
      this.tratarErro(err)
    })
  }

  closeConfirmationModal() {
    this.showConfirmationModal = false
  }

  confirmationCallback = () => {
    console.log('')
  }

  setContatoModal(contato: Contato) {
    this.contatoModal = contato
    this.showModalContatoInfo = true
  }

}
</script>
<style scoped></style>