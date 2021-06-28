<template>
  	<div v-show="showModal" class="custom-modal-overlay">
    	<div class="custom-modal">
	      	<div class="row g-0">
	        	<div class="col-12">
		          	<h5 @click="closeModal" class="custom-btn-close float-end">X</h5>
		          	<h4 class="title">Contatos de {{ pessoa.nome }}</h4>
		    	</div>
		    	<div class="col-12">
		    		<div 
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
		    	</div>
      		</div>
    	</div>
  	</div>	
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { User, Role, Pessoa, Endereco, Cidade, Estado, Pais, Contato, ContatoTipo, ContatoCategoria } from '@/types'

@Options({
	props: {
		showModal: Boolean,
		pessoa: Object
	}
})
export default class ModalContatos extends Vue {

  	showModal = false;
	  	pessoa: Pessoa = {
			id: 0,
			nome: '',
			cpf: '',
			data_nascimento: '',
			foto: ''
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

.custom-btn-close {
  cursor: pointer;
  border-radius: 5px;
  padding: 2px 7px;
  width: fit-content;
  border: 1px solid white;
}

.custom-btn-close:hover {
  border: 1px solid grey;
}

.custom-modal {
  background-color: rgba(255, 255, 255, 1);
  padding: 10px;
  position: fixed;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 600px;
  overflow: auto;
}

.custom-modal-overlay {
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>