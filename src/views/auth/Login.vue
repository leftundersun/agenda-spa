<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-4 offset-4">
				<div class="card">
					<div class="row">
						<div class="col-12">
							<h4>
								Login
							</h4>
							<form @submit.prevent="login">
								<div class="form-group">
									<label for="username">Nome de usuário</label>
									<input v-model="credentials.user" name="username" type="text" class="form-control">
								</div>
								<div class="form-group">
									<label for="password">Senha</label>
									<input v-model="credentials.pass" name="password" type="password" class="form-control">
								</div>
								<div class="form-group">
									<button class="btn btn-primary">Entrar</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>	
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Basic from '@/views/Basic.vue'; // @ is an alias to /src
import axios from 'axios';

export default class Login extends Basic {
	credentials = {
		user: '',
		pass: ''
	}

	mounted() {
		this.credentials.user = localStorage.getItem('username') ?? ''
		this.credentials.pass = localStorage.getItem('password') ?? ''
	}

	login() {
		axios({
			method: 'get',
			url: 'http://localhost:3000/auth/login',
			headers: {
				'authorization': 'Basic ' + btoa( this.credentials.user.trim() + ':' + this.credentials.pass.trim())
			}
		}).then( (response: any) => {
			console.log('############## response')
			console.log(response)
		}).catch( (err: any) => {
			console.log('############## err')
			console.log(err)
			console.log(err.response)
		})
	}
}

</script>
<style scoped>
	
.card {
	margin-top: 100px;
}

</style>