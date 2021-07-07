<template>
<div v-show="showModal" class="custom-modal-overlay">
  	<div class="custom-modal">
    	<div class="row g-0">
	      	<div class="col-12">
	        	<h5 @click="closeModal" class="custom-btn-close float-end">X</h5>
                <h4 class="title">{{ contato.pessoa.nome }}</h4>
	    	</div>
            <div class="col-12">
                <h5>Cadastrado por {{ contato.user.pessoa.nome }}</h5>
            </div>
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
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BasicOverlaid from '@/components/overlaid/BasicOverlaid.vue'; // @ is an alias to /src
import { User, Role, Pessoa, Endereco, Cidade, Estado, Pais, Contato, ContatoTipo, ContatoCategoria } from '@/types'

@Options({
	props: {
		showModal: Boolean,
		contato: Object
	}
})
export default class ModalContatoInfo extends BasicOverlaid {
	
	showModal = false;
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
        user: {
            id: 0,
            username: '',
            pessoa_id: 0,
            pessoa: {   
                id: 0,
                nome: '',
                cpf: '',
                data_nascimento: '',
                foto: '',
            }
        },
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

.custom-modal {
  width: 800px;
}
</style>