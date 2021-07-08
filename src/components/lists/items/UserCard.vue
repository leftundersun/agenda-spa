<template>
<div class="col-3">
	<div class="card">
		<img :src="foto" class="card-img-top" alt="...">
		<div class="card-body">
			<h6>@{{ user.username }}</h6>
			<button @click="showInfo" class="btn btn-outline-secondary">Ver mais informações</button>
			<button @click="editarUser" class="btn btn-outline-secondary">Editar</button>
			<button @click="excluirUser" class="btn btn-outline-secondary">Excluir</button>
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
		user: Object
	}
})
export default class UserCard extends Basic {

	user: User = {
        id: 0,
        username: '',
        pessoa_id: 0,
        pessoa: {
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
            }
        }
    }

	get foto() {
		return this.user.pessoa!.foto != '' ? `data:image;base64,${Buffer.from(this.user.pessoa!.foto.data).toString('base64')}` : require('@/assets/user-default.jpeg')
	}

	showInfo() {
		this.$emit('showInfo', this.user)
	}

	editarUser() {
		this.$emit('editarUser', this.user.id)
	}

	excluirUser() {
		this.$emit('excluirUser', this.user.id)
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

	.col-3 {
		margin-top: 10px;
	}
</style>