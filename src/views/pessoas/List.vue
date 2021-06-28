<template>
  	<div class="card">
    	<div class="row">
		  	<div class="col-12">
		    	<h4>Pessoas</h4>
		  	</div>
		</div>
		<div class="row">
		  	<PessoaCard
		        @showMessage="showMessage($event)"
		        @showInfo="setPessoaModal($event)"
		        v-for="pessoa in pessoas"
		        :pessoa="pessoa"
		        :key="pessoa.id"/>
		</div>
  	</div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Basic from '@/views/Basic.vue'; // @ is an alias to /src
import PessoaCard from '@/components/PessoaCard.vue'; // @ is an alias to /src
import { User, Role, Pessoa, Endereco, Cidade, Estado, Pais, Contato, ContatoTipo, ContatoCategoria } from '@/types'

@Options({
	components: {
		PessoaCard
	}
})
export default class ListPessoas extends Basic {

	pessoas: Array<Pessoa> = []

	showMessage(event: string) {
		this.$emit('showMessage', event)
	}

	mounted() {
		var options = { 
			params: { 
				page: 1
			}
		}
	    this.axiosInstance.get('/pessoa/list', options).then( (response: any) => {
		    console.log('########## response')
	      	console.log(response)
		    this.pessoas = response.data.pessoas
	    }).catch( (err: any) => {
	      	this.tratarErro(err)
	    })
	}

	setPessoaModal() {
		this.$emit('showMessage', 'Not implemented')
	}

}

</script>
<style scoped></style>