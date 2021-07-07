<template>
    <div v-show="showModal" class="custom-modal-overlay">
        <div class="custom-modal">
            <div class="row g-0">
                <div class="col-12">
                    <h5 @click="closeModal" class="custom-btn-close float-end">X</h5>
                    <h4 class="title">Contatos de {{ pessoa.nome }}</h4>
                </div>
                <div class="col-12">
                    <div
                        v-if="pessoa.contatos.length > 0"
                        v-for="contato in pessoa.contatos"
                        :key="contato.id"
                        class="row g-0">
                        <div class="col-12">
                            <div class="card">
                                <h5>{{ contato.valor }}</h5>
                                <h6>{{ contato.contatoTipo.descricao }}</h6>
                                <h6>{{ contato.contatoCategoria.descricao }}</h6>
                            </div>
                        </div>
                    </div>
                    <div v-else class="card">
                        <h5>Nenhum contato para exibir</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BasicOverlaid from '@/components/overlaid/BasicOverlaid.vue'; // @ is an alias to /src
import { User, Role, Pessoa, Endereco, Cidade, Estado, Pais, Contato, ContatoTipo, ContatoCategoria } from '@/types'

@Options({
    props: {
        showModal: Boolean,
        pessoa: Object
    }
})
export default class ModalContatos extends BasicOverlaid {

    showModal = false;
    pessoa: Pessoa = {
        id: 0,
        nome: '',
        cpf: '',
        data_nascimento: '',
        foto: '',
        contatos: []
    }

    closeModal() {
        this.$emit('closeModal')
    }

}
</script>
<style scoped>
.card {
    margin-top: 10px;
}

.title {
    margin: 5px 30px 0 0;
}

.custom-modal {
    width: 800px;
}
</style>