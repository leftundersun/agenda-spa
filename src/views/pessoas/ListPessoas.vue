<template>
  <div class="card">
    <div class="row">
      <div class="col-6">
        <h4>Pessoas</h4>
      </div>
      <div class="col-6">
        <router-link to="/pessoa/create" class="btn btn-outline-primary float-end">Criar pessoa</router-link>
      </div>
    </div>
    <Paginacao
      :totalCount="totalCount"
      :selectedPage="selectedPage"
      @selectPage="selectPage($event)"
      @search="searchChange($event)"
    />
    <div v-if="pessoas.length > 0" class="row">
      <PessoaCard
        @showMessage="showMessage($event)"
        @showInfo="setPessoaModal($event)"
        @excluirPessoa="excluirPessoa($event)"
        @editarPessoa="editarPessoa($event)"
        v-for="pessoa in pessoas"
        :pessoa="pessoa"
        :key="pessoa.id"/>
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
  <ModalPessoaInfo @closeModal="closeModal" :showModal="showModalPessoaInfo" :pessoa="pessoaModal" />
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Basic from '@/views/Basic.vue'; // @ is an alias to /src
import PessoaCard from '@/components/lists/items/PessoaCard.vue'; // @ is an alias to /src
import Paginacao from '@/components/lists/Paginacao.vue'; // @ is an alias to /src
import ConfirmationModal from '@/components/overlaid/modals/ConfirmationModal.vue'; // @ is an alias to /src
import ModalPessoaInfo from '@/components/overlaid/modals/info/ModalPessoaInfo.vue'; // @ is an alias to /src
import { User, Role, Pessoa, Endereco, Cidade, Estado, Pais, Contato, ContatoTipo, ContatoCategoria } from '@/types'

@Options({
  components: {
    PessoaCard,
    ConfirmationModal,
    Paginacao,
    ModalPessoaInfo
  }
})
export default class ListPessoas extends Basic {

  pessoaModal: Pessoa = {
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
  showModalPessoaInfo = false

  pessoas: Array<Pessoa> = []

  totalCount = 0
  selectedPage = 1
  search = ''

  showConfirmationModal = false
  confirmationQuestion = 'Deseja excluir permanentemente essa pessoa e todos os contatos vinculados a ela?'

  closeModal() {
    this.showModalPessoaInfo = false
  }

  showMessage(event: string) {
    this.$emit('showMessage', event)
  }

  mounted() {
    this.searchPessoas()
  }

  searchPessoas() {
    this.$emit('showCarregando')
    var url = '/pessoa/list?'
    if (this.search.length > 2) {
      url += 'search=' + this.search + '&'
    }
    url += 'page=' + this.selectedPage
    this.axiosInstance.get(url).then( (response: any) => {
      this.$emit('hideCarregando')
      this.pessoas = response.data.pessoas
      this.totalCount = response.data.totalCount
    }).catch( (err: any) => {
      this.$emit('hideCarregando')
      this.tratarErro(err)
    })
  }

  selectPage(page: number) {
    this.selectedPage = page
    this.searchPessoas()
  }

  searchChange(search: string) {
    console.log()
    if (search != this.search) {
      this.selectedPage = 1
      this.search = search
      this.searchPessoas()
    }
  }

  editarPessoa(id: Number) {
    this.$router.push('/pessoa/edit/' + id)
  }

  excluirPessoa(id: Number) {
    this.confirmationCallback = () => {
      this.showConfirmationModal = false
      this.$emit('showCarregando')
      this.axiosInstance.delete('/pessoa/' + id).then( (response: any) => {
        this.$emit('hideCarregando')
        this.searchPessoas()
        this.$emit('showMessage', response.data.message)
      }).catch( (err: any) => {
        this.$emit('hideCarregando')
        this.tratarErro(err)
      })
    }
    this.showConfirmationModal = true
  }

  closeConfirmationModal() {
    this.showConfirmationModal = false
  }

  confirmationCallback = () => {
    console.log('')
  }

  setPessoaModal(pessoa: Pessoa) {
    this.pessoaModal = pessoa
    this.showModalPessoaInfo = true
  }

}

</script>
<style scoped>
</style>