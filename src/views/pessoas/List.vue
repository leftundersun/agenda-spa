<template>
    <div class="card">
        <div class="row">
            <div class="col-6">
                <h4>Pessoas</h4>
            </div>
            <div class="col-6">
                <button class="btn btn-outline-primary float-end">Criar pessoa</button>
            </div>
        </div>
        <Paginacao
            :totalCount="totalCount"
            :selectedPage="selectedPage"
            @selectPage="selectPage($event)"
            @search="searchChange($event)"
        />
        <div class="row">
            <PessoaCard
                @showMessage="showMessage($event)"
                @showInfo="setPessoaModal($event)"
                @excluirPessoa="excluirPessoa($event)"
                v-for="pessoa in pessoas"
                :pessoa="pessoa"
                :key="pessoa.id"/>
        </div>
    </div>
    <ConfirmationModal
        :showModal="showConfirmationModal"
        :question="confirmationQuestion"
        @closeModal="closeConfirmationModal()"
        @callback="confirmationCallback()"
    />
    <LoadingModal :showModal="carregando" />
    <ModalContatos @closeModal="closeModal" :showModal="showModalContatos" :pessoa="pessoaModal" />
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Basic from '@/views/Basic.vue'; // @ is an alias to /src
import PessoaCard from '@/components/lists/items/PessoaCard.vue'; // @ is an alias to /src
import Paginacao from '@/components/lists/Paginacao.vue'; // @ is an alias to /src
import ConfirmationModal from '@/components/overlaid/ConfirmationModal.vue'; // @ is an alias to /src
import LoadingModal from '@/components/overlaid/LoadingModal.vue'; // @ is an alias to /src
import ModalContatos from '@/components/overlaid/ModalContatos.vue'; // @ is an alias to /src
import { User, Role, Pessoa, Endereco, Cidade, Estado, Pais, Contato, ContatoTipo, ContatoCategoria } from '@/types'

@Options({
    components: {
        PessoaCard,
        ConfirmationModal,
        LoadingModal,
        Paginacao,
        ModalContatos
    }
})
export default class ListPessoas extends Basic {


    pessoaModal: Pessoa = {
        id: 0,
        nome: '',
        cpf: '',
        data_nascimento: '',
        foto: '',
        contatos: []
    }
    showModalContatos = false

    pessoas: Array<Pessoa> = []

    totalCount = 0
    selectedPage = 1
    search = ''

    carregando = false

    showConfirmationModal = false
    confirmationQuestion = 'Deseja excluir permanentemente essa pessoa e todos os contatos vinculados a ela?'

    closeModal() {
        this.showModalContatos = false
    }

    showMessage(event: string) {
        this.$emit('showMessage', event)
    }

    mounted() {
        this.searchPessoas()
    }

    searchPessoas() {
        this.carregando = true
        var options: any = {
            params: {
                page: this.selectedPage
            }
        }
        if (this.search.length > 2) {
            options.params.search = this.search
        }
        this.axiosInstance.get('/pessoa/list', options).then( (response: any) => {
            this.carregando = false
            console.log('########## response')
            console.log(response)
            this.pessoas = response.data.pessoas
            this.totalCount = response.data.totalCount
        }).catch( (err: any) => {
            this.carregando = false
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
            this.search = search
            this.searchPessoas()
        }
    }

    excluirPessoa(id: Number) {
        this.confirmationCallback = () => {
            this.showConfirmationModal = false
            this.carregando = true
            this.axiosInstance.delete('/pessoa/' + id).then( (response: any) => {
                this.carregando = false
                this.searchPessoas()
                this.$emit('showMessage', response.data.message)
            }).catch( (err: any) => {
                this.carregando = false
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
        this.showModalContatos = true
    }

}

</script>
<style scoped></style>