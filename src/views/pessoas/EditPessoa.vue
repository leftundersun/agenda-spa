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
import moment from 'moment';
var Buffer = require('buffer/').Buffer
import { User, Role, Pessoa, Endereco, Cidade, Estado, Pais, Contato, ContatoTipo, ContatoCategoria } from '@/types'

@Options({
	components: {
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

	mounted() {
		this.axiosInstance.get('/pessoa/' + this.$route.params.id).then( (response: any) => {
			this.pessoa = this.format(response.data.pessoa)
		}).catch( (err: any) => {
			this.tratarErro(err)
		})
	}

	format(data: Pessoa) {
		data.data_nascimento = moment(data.data_nascimento).format('DD/MM/YYYY')
		data.cpf = data.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
		data.foto = data.foto == '' ?? `data:image;base64,${Buffer.from(data.foto.data).toString('base64')}`
		return data
	}

	updatePessoa() {
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