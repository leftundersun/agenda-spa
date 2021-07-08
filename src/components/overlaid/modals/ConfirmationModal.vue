<template>
	<div v-show="showModal" class="custom-modal-overlay">
	  	<div class="custom-modal">
	    	<div class="row g-0">
		      	<div class="col-12">
		        	<h5 @click="closeModal" class="custom-btn-close float-end">X</h5>
		        	<h4 class="title">Atenção</h4>
		    	</div>
		    	<div class="col-12">
		    		<h5>
		    			{{ question }}
		    		</h5>
		    	</div>
		    	<div class="col-12">
		    		<button @click="callback()" class="btn btn-danger float-end">Sim</button>
		    		<span class="float-end">
		    			&nbsp;
		    		</span>
		    		<button @click="closeModal()" class="btn btn-success float-end">Não</button>
		    	</div>
	  		</div>
		</div>
	</div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BasicOverlaid from '@/components/overlaid/BasicOverlaid.vue'; // @ is an alias to /src

@Options({
	props: {
		showModal: Boolean,
		question: String
	}
})
export default class ConfirmationModal extends BasicOverlaid {

	showModal = false;
	question = "";

	callback = () => {
		this.$emit('callback')
	}

	closeModal() {
		this.$emit('closeModal')
	}

}
</script>
<style scoped>

.title {
  margin: 5px 30px 0 0;
}

.custom-modal {
  width: 600px;
}

</style>