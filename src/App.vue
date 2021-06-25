<template>
  <router-view/>
  <div v-show="showAlert" class="custom-modal-overlay">
    <div class="custom-modal">
      <div class="row no-gutters">
        <div class="col-12">
          <h5 class="float-right">X</h5>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

export default class App extends Vue {

  showAlert = true

}

</script>
<style>

.custom-modal {
  background-color: rgba(255, 255, 255, 1);
  padding: 10px;
  position: fixed;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 400px;
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
