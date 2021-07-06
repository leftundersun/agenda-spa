<template>
	<div class="row g-3">
		<div class="col-4">
			<label for="nome" class="form-label">Nome</label>
			<input name="nome" v-model="pessoa.nome" type="text" class="form-control">
		</div>
		<div class="col-4">
			<label for="cpf" class="form-label">CPF</label>
			<input name="cpf" v-maska="'###.###.###-##'" v-model="pessoa.cpf" type="text" class="form-control">
		</div>
		<div class="col-4">
			<label for="data_nascimento" class="form-label">Data de nascimento</label>
			<input name="data_nascimento" v-maska="'##/##/####'" v-model="pessoa.data_nascimento" type="text" class="form-control">
		</div>
		<div class="col-6">
			<label for="foto" class="form-label">Foto</label><br>
			<input name="foto" @change="changeFoto($event)" type="file" accept=".png, .jpg, .jpeg">
		</div>
		<div class="col-6">
			<label class="form-label">Preview</label>
			<div class="card foto-preview-card">
				<img :src="fotoPreview" width="300" alt="">
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Basic from '@/views/Basic.vue'
var Buffer = require('buffer/').Buffer
import { User, Role, Pessoa, Endereco, Cidade, Estado, Pais, Contato, ContatoTipo, ContatoCategoria } from '@/types'

@Options({
	props: {
		pessoa: Object
	}
})
export default class FormDadosPessoa extends Basic {

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

	get fotoPreview() {
		if (this.pessoa.foto == null || this.pessoa.foto == undefined || typeof this.pessoa.foto == 'string') {
			return ''
		} else if (this.pessoa.foto.name != undefined) {
			return URL.createObjectURL(this.pessoa.foto)
		} else if (this.pessoa.foto.data != undefined) {
			return `data:image;base64,${Buffer.from(this.pessoa.foto.data).toString('base64')}`
		} else {
			return ''
		}
	}

	changeFoto(event: Event) {
		try {
			this.pessoa.foto = (event.target! as HTMLInputElement).files![0] ?? ''
		} catch (err) {
			console.log(err)
		}
	}
}

</script>
<style scoped>
.foto-preview-card {
	min-height: 38px;
}
</style>