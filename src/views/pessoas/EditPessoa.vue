<template>
  <div class="card large-margin-bottom">
    <div class="row">
      <div class="col-12">
        <h4>Editar pessoa</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="updatePessoa()">
          <div class="row">
            <div class="col-12">
              <FormPessoa @excluirContato="excluirContato($event)" ref="formPessoa" v-model:pessoa="pessoa" />
            </div>
            <div class="col-12 mt-2">
              <button class="btn btn-outline-primary">Salvar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <ConfirmationModal
    :showModal="showConfirmationModal"
    :question="confirmationQuestion"
    @closeModal="closeConfirmationModal()"
    @callback="confirmationCallback()"
  />
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Basic from '@/views/Basic.vue'; // @ is an alias to /src
import ConfirmationModal from '@/components/overlaid/modals/ConfirmationModal.vue'; // @ is an alias to /src
import FormPessoa from '@/components/forms/FormPessoa.vue'; // @ is an alias to /src
import moment from 'moment';
import { User, Role, Pessoa, Endereco, Cidade, Estado, Pais, Contato, ContatoTipo, ContatoCategoria } from '@/types'

@Options({
  components: {
        ConfirmationModal,
    FormPessoa
  }
})
export default class EditPessoa extends Basic {

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
  showConfirmationModal = false
  confirmationQuestion = 'Deseja excluir permanentemente esse contato dessa pessoa?'

  $refs!: {
    formPessoa: FormPessoa
  }

  mounted() {
    this.getPesssoa()
  }

  getPesssoa() {
    this.axiosInstance.get('/pessoa/' + this.$route.params.id).then( (response: any) => {
      this.pessoa = this.format(response.data.pessoa)
      this.$refs.formPessoa.getEstados(this.pessoa.endereco!.cidade!.estado!.pais!.id)
      this.$refs.formPessoa.getCidades(this.pessoa.endereco!.cidade!.estado!.id, this.pessoa.endereco!.cidade!.nome)
    }).catch( (err: any) => {
      this.tratarErro(err)
    })
  }

  format(data: Pessoa) {
    data.data_nascimento = moment(data.data_nascimento).format('DD/MM/YYYY')
    data.cpf = data.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    data.endereco!.cep = data.endereco!.cep.replace(/(\d{5})(\d{3})/, '$1-$2')
    return data
  }

  updatePessoa() {
    var formData = new FormData()
    formData.append('foto', this.pessoa.foto)
    formData.append('pessoa', JSON.stringify(this.pessoa) )
    this.axiosInstance.put('/pessoa/' + this.pessoa.id, formData).then( (response: any) => {
      this.$router.push('/pessoas')
    }).catch( (err: any) => {
      this.tratarErro(err)
    })
  }

  excluirContato(id: Number) {
    this.confirmationCallback = () => {
      this.showConfirmationModal = false
      this.$emit('showCarregando')
      this.axiosInstance.delete('/contato/' + id).then( (response: any) => {
        this.$emit('hideCarregando')
        this.getPesssoa()
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

}

</script>
<style scoped>
  .large-margin-bottom {
    margin-bottom: 150px;
  }
</style>