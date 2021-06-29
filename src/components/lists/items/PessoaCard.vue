<template>
<div class="col-3">
	<div class="card">
		<img :src="foto" class="card-img-top" alt="...">
		<div class="card-body">
			<h6>{{ pessoa.nome }}</h6>
			<h6>{{ resumoEndereco }}</h6>
			<button @click="showInfo" class="btn btn-outline-secondary">Ver mais informações</button>
			<button @click="editarPessoa" class="btn btn-outline-secondary">Editar</button>
			<button @click="excluirPessoa" class="btn btn-outline-secondary">Excluir</button>
		</div>
	</div>
</div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Basic from '@/views/Basic.vue'; // @ is an alias to /src
import { User, Role, Pessoa, Endereco, Cidade, Estado, Pais, Contato, ContatoTipo, ContatoCategoria } from '@/types'
var Buffer = require('buffer/').Buffer

@Options({
	props: {
		pessoa: Object
	}
})
export default class PessoaCard extends Basic {

	pessoa: Pessoa = {
	    id: 0,
	    nome: '',
	    cpf: '',
	    data_nascimento: '',
	    foto: ''
	}

	get foto() {
		return this.pessoa.foto != '' ? `data:${this.pessoa.foto.mimetype};base64,${Buffer.from(this.pessoa.foto.data).toString('base64')}` : require('@/assets/user-default.jpeg')
	}

	get resumoEndereco() {
		return this.pessoa.endereco!.cidade!.nome + ', ' + this.pessoa.endereco!.logradouro + ', ' + this.pessoa.endereco!.numero + ' - ' + this.pessoa.endereco!.bairro
	}

	showInfo() {
		this.$emit('showInfo', this.pessoa)
	}

	editarPessoa() {
		this.$emit('showMessage', 'Not implemented')
	}

	excluirPessoa() {
		this.$emit('excluirPessoa', this.pessoa.id)
	}
}
</script>
<style scoped>
	.btn {
		width: 100%;
		text-align: center;
	}

	.card {
		padding: 0;
	}

	.favorito {
		cursor: pointer;
	}

	.card-body {
		padding: 10px;
	}
</style>