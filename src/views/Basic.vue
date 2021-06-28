<template>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';
	
export default class Basic extends Vue {

	axiosInstance: any;

	beforeMount() {
		var token = localStorage.getItem('token')
		if (token != null && token != undefined && token != '') {
			this.axiosInstance = axios.create({
				baseURL: 'http://localhost:3000',
				headers: {
					'authorization': 'Bearer ' + token
				}
			})
		} else {
			this.$router.replace('/login')
		}
	}

	tratarErro(err: any) {
		console.log('########## err')
		console.log(err)
		/*Object.entries(err).forEach( (entry) => {
			console.log(entry[0])
			console.log(entry[1])
		})*/
		console.log('############## emit')
		this.$emit('showMessage', err.response.data.message ?? 'Erro')
		console.log('############## emited')
	}

}

</script>
<style>
	
.card {
	padding: 10px;
}

.form-group {
	margin-top: 10px;
}

</style>