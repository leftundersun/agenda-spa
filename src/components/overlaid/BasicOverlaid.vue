<template></template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class BasicOverlaid extends Vue {}
</script>
<style>
	
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

.custom-modal {
  background-color: rgba(255, 255, 255, 1);
  padding: 10px;
  position: fixed;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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