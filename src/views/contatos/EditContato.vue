<template>
    <div class="card large-margin-bottom">
        <div class="row">
          <div class="col-12">
            <h4 class="text-info">Editar contato</h4>
          </div>
        </div>
        <div class="row">
            <div class="col-12">
                <form @submit.prevent="updateContato()">
                    <div class="row">
                        <div class="col-6">
                            <label for="pessoa" class="form-label">Selecione a pessoa para a qual cadastrar o contato</label>
                            <input type="text" v-model="contato.pessoa.nome" class="form-control" disabled>
                            <select name="pessoa" class="form-select" v-model="contato.pessoa.id" disabled>
                                <option :value="contato.pessoa.id">
                                    {{ contato.pessoa.nome }}, {{ contato.pessoa.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <FormContatoFields v-model:contato="contato" />
                    </div>
                    <div class="row">
                        <div class="col-12 mt-2">
                            <button class="btn btn-outline-primary">Salvar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Basic from '@/views/Basic.vue'; // @ is an alias to /src
import FormContatoFields from '@/components/forms/FormContatoFields.vue'; // @ is an alias to /src
import { User, Role, Pessoa, Endereco, Cidade, Estado, Pais, Contato, ContatoTipo, ContatoCategoria } from '@/types'
    
@Options({
    components: {
        FormContatoFields
    }
})
export default class EditContato extends Basic {

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

    mounted() {
        this.axiosInstance.get('/contato/' + this.$route.params.id).then( (response: any) => {
            this.contato = response.data.contato
        }).catch( (err: any) => {
            this.tratarErro(err)
        })
    }

    updateContato() {
        this.axiosInstance.put('/contato/' + this.contato.id, this.contato).then( (response: any) => {
            this.$router.push('/contatos')
        }).catch( (err: any) => {
            this.tratarErro(err)
        })
    }

}
</script>
<style scoped></style>