<template>
  <div v-show="showAlert" class="custom-modal-overlay">
    <div class="custom-modal">
      <div class="row g-0">
        <div class="col-12">
          <h5 @click="closeAlert" class="custom-btn-close float-end">X</h5>
          <h4 class="message">{{ message }}</h4>
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
		showAlert: Boolean,
		message: String
	}
})
export default class Alert extends BasicOverlaid {

  showAlert = false;
  message = '';

  closeAlert() {
  	this.$emit('closeAlert')
  }

}

</script>
<style scoped>

.message {
  margin: 5px 30px 0 10px;
}

.custom-modal {
  width: 600px;
}

</style>
