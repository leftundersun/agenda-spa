<template>
	<div class="card mt-2">
		<h5 class="text-info">Dados pessoais</h5>
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
	</div>
	<div class="card mt-2">
		<h5 class="text-info">Endereço</h5>
		<FormEndereco v-model:endereco="pessoa.endereco" />
	</div>
	<div class="card mt-2">
		<div class="row">
			<div class="col-8">
				<h5 class="text-info">
					Contatos
				</h5>
			</div>
			<div class="col-4">
				<button type="button" @click="newContato()" class="btn btn-outline-primary float-end">Adicionar contato</button>
			</div>
			<div class="col-12">
				<FormContato 
					v-for="(contato, index) in pessoa.contatos"
					:contato="contato"
					:key="index"/>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Basic from '@/views/Basic.vue'; // @ is an alias to /src
import FormEndereco from '@/components/forms/FormEndereco.vue'; // @ is an alias to /src
import FormContato from '@/components/forms/FormContato.vue'; // @ is an alias to /src
import { User, Role, Pessoa, Endereco, Cidade, Estado, Pais, Contato, ContatoTipo, ContatoCategoria } from '@/types'

@Options({
	props: {
		pessoa: Object
	},
	components: {
		FormContato,
		FormEndereco
	}
})
export default class FormPessoa extends Basic {

	defaultContato: Contato = {
	    id: 0,
	    valor: '',
	    publico: false,
	    pessoa_id: 0,
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
	fotoPreview = ''

	newContato() {
		this.pessoa.contatos!.push( JSON.parse(JSON.stringify(this.defaultContato)) )
	}

	setFotoPreview(file: File) {
		this.fotoPreview = URL.createObjectURL(file)
	}

	changeFoto(event: Event) {
		try {
			this.pessoa.foto = (event.target! as HTMLInputElement).files![0] ?? ''
			this.setFotoPreview( (event.target! as HTMLInputElement).files![0] )
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