<template>
  <div class="card">
    <div class="row">
      <div class="col-6">
        <h4>Users</h4>
      </div>
      <div class="col-6">
        <router-link to="/user/create" class="btn btn-outline-primary float-end">Criar usuário</router-link>
      </div>
    </div>
    <Paginacao
      :totalCount="totalCount"
      :selectedPage="selectedPage"
      @selectPage="selectPage($event)"
      @search="searchChange($event)"
    />
    <div v-if="users.length > 0" class="row">
      <UserCard
        @showMessage="showMessage($event)"
        @showInfo="setUserModal($event)"
        @excluirUser="excluirUser($event)"
        @editarUser="editarUser($event)"
        v-for="user in users"
        :user="user"
        :key="user.id"/>
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
  <ModalUserInfo @closeModal="closeModal" :showModal="showModalUserInfo" :user="userModal" />
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Basic from '@/views/Basic.vue'; // @ is an alias to /src
import UserCard from '@/components/lists/items/UserCard.vue'; // @ is an alias to /src
import Paginacao from '@/components/lists/Paginacao.vue'; // @ is an alias to /src
import ConfirmationModal from '@/components/overlaid/modals/ConfirmationModal.vue'; // @ is an alias to /src
import ModalUserInfo from '@/components/overlaid/modals/info/ModalUserInfo.vue'; // @ is an alias to /src
import { User, Role, Pessoa, Endereco, Cidade, Estado, Pais, Contato, ContatoTipo, ContatoCategoria } from '@/types'

@Options({
  components: {
    UserCard,
    ConfirmationModal,
    Paginacao,
    ModalUserInfo
  }
})
export default class ListUsers extends Basic {

  userModal: User = {
    id: 0,
    username: '',
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
  showModalUserInfo = false

  users: Array<User> = []

  totalCount = 0
  selectedPage = 1
  search = ''

  showConfirmationModal = false
  confirmationQuestion = 'Deseja excluir permanentemente esse usuário?'

  closeModal() {
    this.showModalUserInfo = false
  }

  showMessage(event: string) {
    this.$emit('showMessage', event)
  }

  mounted() {
    this.searchUsers()
  }

  searchUsers() {
    this.$emit('showCarregando')
    var url = '/user/list?'
    if (this.search.length > 2) {
      url += 'search=' + this.search + '&'
    }
    url += 'page=' + this.selectedPage
    this.axiosInstance.get(url).then( (response: any) => {
      this.$emit('hideCarregando')
      this.users = response.data.users
      this.totalCount = response.data.totalCount
    }).catch( (err: any) => {
      this.$emit('hideCarregando')
      this.tratarErro(err)
    })
  }

  selectPage(page: number) {
    this.selectedPage = page
    this.searchUsers()
  }

  searchChange(search: string) {
    console.log()
    if (search != this.search) {
      this.selectedPage = 1
      this.search = search
      this.searchUsers()
    }
  }

  editarUser(id: Number) {
    this.$router.push('/user/edit/' + id)
  }

  excluirUser(id: Number) {
    this.confirmationCallback = () => {
      this.showConfirmationModal = false
      this.$emit('showCarregando')
      this.axiosInstance.delete('/user/' + id).then( (response: any) => {
        this.$emit('hideCarregando')
        this.searchUsers()
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

  setUserModal(user: User) {
    this.userModal = user
    this.showModalUserInfo = true
  }

}

</script>
<style scoped>
</style>