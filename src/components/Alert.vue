<template>
  <div v-show="showAlert" class="custom-alert-overlay">
    <div class="custom-alert">
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

@Options({
	props: {
		showAlert: Boolean,
		message: String
	}
})
export default class Alert extends Vue {

  showAlert = false;
  message = '';

  closeAlert() {
  	this.$emit('closeAlert')
  }

}

</script>
<style>

.message {
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

.custom-alert {
  background-color: rgba(255, 255, 255, 1);
  padding: 10px;
  position: fixed;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  overflow: auto;
}

.custom-alert-overlay {
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

</style>
