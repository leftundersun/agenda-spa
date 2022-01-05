<template>
  <router-view
    @showMessage="showMessage($event)"
    @showCarregando="carregando = true"
    @hideCarregando="carregando = false"
    />
  <Alert @closeAlert="closeAlert" :showAlert="showAlert" :message="alertMessage"/>
  <LoadingModal :showModal="carregando" />
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import LoadingModal from '@/components/overlaid/modals/LoadingModal.vue'; // @ is an alias to /src
import Alert from '@/components/overlaid/Alert.vue'; // @ is an alias to /src

@Options({
  components: {
    LoadingModal,
    Alert
  }
})
export default class App extends Vue {

  showAlert = false
  alertMessage = ''
  carregando = false

  closeAlert() {
    this.showAlert = false
  }

  openAlert() {
    this.showAlert = true
  }

  showMessage(message: string) {
    this.alertMessage = message
    this.openAlert()
  }
}

</script>
<style scoped>
</style>
