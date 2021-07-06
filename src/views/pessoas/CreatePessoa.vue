<template>
  	<div class="card large-margin-bottom">
	    <div class="row">
	      <div class="col-12">
	        <h4>Cadastrar uma nova pessoa</h4>
	      </div>
	    </div>
	    <div class="row">
	    	<div class="col-12">
	    		<form @submit.prevent="postPessoa()">
	    			<div class="row">
	    				<div class="col-12">
	    					<FormPessoa v-model:pessoa="pessoa" />
	    				</div>
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
import FormPessoa from '@/components/forms/FormPessoa.vue'; // @ is an alias to /src
import { User, Role, Pessoa, Endereco, Cidade, Estado, Pais, Contato, ContatoTipo, ContatoCategoria } from '@/types'

@Options({
	components: {
		FormPessoa
	}
})
export default class CreatePessoa extends Basic {

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

	postPessoa() {
		var formData = new FormData()
		formData.append('foto', this.pessoa.foto)
		formData.append('pessoa', JSON.stringify(this.pessoa) )
		this.axiosInstance.post('/pessoa', formData).then( (response: any) => {
			this.$router.push('/pessoas')
		}).catch( (err: any) => {
			this.tratarErro(err)
		})
	}

}

</script>
<style scoped>
	.large-margin-bottom {
		margin-bottom: 150px;
	}
</style>