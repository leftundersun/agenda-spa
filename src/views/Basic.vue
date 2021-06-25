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