<template>
	<div class="card mt-2">
		<div class="row g-3">
			<div v-if="contato.id > 0" class="col-12">
				<div class="row">
					<div class="col-8">
						<h4 class="text-info mb-0">#{{ contato.id }}</h4>
					</div>
					<div class="col-4">
						<button type="button" @click="excluirContato()" class="btn btn-outline-danger float-end">
							Excluir
						</button>
					</div>
				</div>
			</div>
			<div v-else class="col-12">
				<div class="row">
					<div class="col-8">
						<h4 class="text-info">Novo contato</h4>
					</div>
					<div class="col-4">
						<button type="button" @click="removeContato()" class="btn btn-outline-danger float-end">
							Remover
						</button>
					</div>
				</div>
			</div>
			<FormContatoFields 
				:contato="contato"
				:key="index"/>
		</div>
	</div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Basic from '@/views/Basic.vue'; // @ is an alias to /src
import FormContatoFields from '@/components/forms/FormContatoFields.vue'; // @ is an alias to /src
import { User, Role, Pessoa, Endereco, Cidade, Estado, Pais, Contato, ContatoTipo, ContatoCategoria } from '@/types'

@Options({
	props: {
		contato: Object,
		index: Number
	},
	components: {
		FormContatoFields
	}
})
export default class FormContato extends Basic {

	index: Number = 0
	contato: Contato = {
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

	removeContato() {
		console.log('########### this.index')
		console.log(this.index)
		this.$emit('removeContato', this.index)
	}

	excluirContato() {
		this.$emit('excluirContato', this.contato.id)
	}
}
</script>
<style scoped></style>