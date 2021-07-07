<template>
    <div class="card large-margin-bottom">
        <div class="row">
          <div class="col-12">
            <h4 class="text-info">Cadastrar um contato</h4>
          </div>
        </div>
        <div class="row">
            <div class="col-12">
                <form @submit.prevent="postContato()">
                    <div class="row">
                        <div class="col-6">
                            <label for="pessoa_id" class="form-label">Selecione a pessoa para a qual cadastrar o contato</label>
                            <input type="text" v-model="contato.pessoa.nome" @keyup="pessoaKeyUp($event)" class="form-control">
                            <select name="pessoa" class="form-select" v-model="contato.pessoa.id">
                                <option v-if="pessoas.length > 0" value="0">Selecione uma pessoa</option>
                                <option v-for="pessoa in pessoas" :key="pessoa.id" :value="pessoa.id">
                                    {{ pessoa.nome }}, {{ pessoa.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') }}
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
    
@Options({
    components: {
        FormContatoFields
    }
})
export default class CreateContato extends Basic {

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
    pessoas: Array<Pessoa> = []
    pessoaLastSearch = ''

    postContato() {
        this.axiosInstance.post('/contato', this.contato).then( (response: any) => {
            this.$router.push('/contatos')
        }).catch( (err: any) => {
            this.tratarErro(err)
        })
    }

    pessoaKeyUp(event: Event) {
        var search = (event.target! as HTMLInputElement).value
        if (search.length == 0) {
            this.pessoas = []
        } else if (search.length >= 3) {
            if (search != this.pessoaLastSearch) {
                this.pessoaLastSearch = search
                this.getPessoas(search)
            }
        }
    }

    getPessoas(search: String) {
        this.axiosInstance.get('/resources/pessoas/?search=' + search).then( (response: any) => {
            this.pessoas = response.data.pessoas
        }).catch( (err: any) => {
            this.tratarErro(err)
        })
    }

}
</script>
<style scoped></style>