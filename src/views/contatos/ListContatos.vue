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
        <div class="row">
            <ContatoCard
                @showMessage="showMessage($event)"
                @showInfo="setPessoaModal($event)"
                @excluirPessoa="excluirPessoa($event)"
                @editarPessoa="editarPessoa($event)"
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
    <ModalContatoInfo @closeModal="closeModal" :showModal="showModalContatoInfo" :pessoa="pessoaModal" />
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Basic from '@/views/Basic.vue'; // @ is an alias to /src
import ContatoCard from '@/components/lists/items/ContatoCard.vue'; // @ is an alias to /src
import Paginacao from '@/components/lists/Paginacao.vue'; // @ is an alias to /src
import ConfirmationModal from '@/components/overlaid/ConfirmationModal.vue'; // @ is an alias to /src
import ModalContatoInfo from '@/components/overlaid/ModalContatoInfo.vue'; // @ is an alias to /src
import { User, Role, Pessoa, Endereco, Cidade, Estado, Pais, Contato, ContatoTipo, ContatoCategoria } from '@/types'

@Options({
    components: {
        ContatoCard,
        ConfirmationModal,
        Paginacao,
        ModalContatoInfo
    }
})
export default class ListPessoas extends Basic {

}
</script>
<style scoped></style>