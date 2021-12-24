<template>
  <div v-show="showModal" class="custom-modal-overlay">
    <div class="custom-modal">
      <div class="row g-0">
        <div class="col-12">
          <h6 class="message">Carregando...</h6>
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
    showModal: Boolean
  }
})
export default class LoadingModal extends BasicOverlaid {

  showModal = false

}
</script>
<style scoped>
  
.message {
  margin: 10px;
}

</style>