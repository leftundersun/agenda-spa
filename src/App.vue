<template>
  <router-view @showMessage="showMessage($event)" />
  <Alert @closeAlert="closeAlert" :showAlert="showAlert" :message="alertMessage"/>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Alert from '@/components/overlaid/Alert.vue'; // @ is an alias to /src

@Options({
  components: {
    Alert
  }
})
export default class App extends Vue {
  showAlert = false
  alertMessage = ''

  closeAlert() {
    this.showAlert = false
  }

  openAlert() {
    this.showAlert = true
  }

  showMessage(message: string) {
    console.log('############## app showMessage')
    this.alertMessage = message
    this.openAlert()
  }
}

</script>
<style scoped>
</style>
