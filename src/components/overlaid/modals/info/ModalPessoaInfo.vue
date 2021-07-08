<template>
    <div v-show="showModal" class="custom-modal-overlay">
        <div class="custom-modal">
            <div class="row g-0">
                <div class="col-12">
                    <h5 @click="closeModal" class="custom-btn-close float-end">X</h5>
                    <h4 class="title">{{ pessoa.nome }}</h4>
                </div>
                <div class="col-6">
                    <h6>{{ cpf }}</h6>
                    <h6>{{ data_nascimento }}</h6>
                    <h6>{{ endereco1 }}</h6>
                    <h6>{{ endereco2 }}</h6>
                </div>
                <div class="col-6">
                    <div class="card foto-preview-card mt-0">
                        <img :src="foto" width="300" alt="">
                    </div>
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
                        <h5 class="text-center mb-0">Nenhum contato para exibir</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BasicOverlaid from '@/components/overlaid/BasicOverlaid.vue'; // @ is an alias to /src
import moment from 'moment';
var Buffer = require('buffer/').Buffer
import { User, Role, Pessoa, Endereco, Cidade, Estado, Pais, Contato, ContatoTipo, ContatoCategoria } from '@/types'

@Options({
    props: {
        showModal: Boolean,
        pessoa: Object
    }
})
export default class ModalPessoaInfo extends BasicOverlaid {

    showModal = false;
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
    get cpf() {
        return this.pessoa.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    }
    get data_nascimento() {
        return moment(this.pessoa.data_nascimento).format('DD/MM/YYYY')
    }
    get endereco1() {
        var endereco = `${this.pessoa.endereco!.logradouro}, ${this.pessoa.endereco!.numero}, ${this.pessoa.endereco!.complemento}, ${this.pessoa.endereco!.bairro}`
        return endereco
    }
    get endereco2() {
        var endereco = `
            ${this.pessoa.endereco!.cidade!.nome},
            ${this.pessoa.endereco!.cidade!.estado!.uf},
            ${this.pessoa.endereco!.cidade!.estado!.pais!.nome} - ${this.pessoa.endereco!.cep.replace(/(\d{5})(\d{3})/, '$1-$2')}`
        return endereco
    }
    get foto() {
        return this.pessoa.foto != '' ? `data:image;base64,${Buffer.from(this.pessoa.foto.data).toString('base64')}` : require('@/assets/user-default.jpeg')
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
.foto-preview-card {
    min-height: 38px;
}
</style>