<template>
  <div class="row g-3">
    <div class="col-6">
      <label for="bairro" class="form-label">Bairro</label>
      <input name="bairro" v-model="endereco.bairro" type="text" class="form-control" :disabled="readonly">
    </div>
    <div class="col-6">
      <label for="logradouro" class="form-label">Logradouro</label>
      <input name="logradouro" v-model="endereco.logradouro" type="text" class="form-control" :disabled="readonly">
    </div>
    <div class="col-4">
      <label for="numero" class="form-label">Número</label>
      <input name="numero" v-model="endereco.numero" type="text" class="form-control" :disabled="readonly">
    </div>
    <div class="col-4">
      <label for="complemento" class="form-label">Complemento</label>
      <input name="complemento" class="form-control" v-model="endereco.complemento" type="text" :disabled="readonly">
    </div>
    <div class="col-4">
      <label for="cep" class="form-label">CEP</label>
      <input name="cep" v-maska="'#####-###'" class="form-control" v-model="endereco.cep" type="text" :disabled="readonly">
    </div>
    <div class="col-4">
      <label for="pais" class="form-label">País</label>
      <select @change="changePais()" name="pais" class="form-select" v-model="endereco.cidade.estado.pais.id" :disabled="readonly">
        <option value="0">Selecione um país</option>
        <option v-for="pais in paises" :key="pais.id" :value="pais.id">{{ pais.nome }}</option>
      </select>
    </div>
    <div class="col-4">
      <label for="estado" class="form-label">Estado</label>
      <select name="estado" class="form-select" v-model="endereco.cidade.estado.id" :disabled="readonly">
        <option v-if="estados.length > 0" value="0">Selecione um estado</option>
        <option v-for="estado in estados" :key="estado.id" :value="estado.id">{{ estado.nome }}</option>
      </select>
    </div>
    <div class="col-4">
      <label for="cidade" class="form-label">Cidade</label>
      <input type="text" v-model="endereco.cidade.nome" @keyup="cidadeKeyUp($event)" class="form-control" :disabled="readonly">
      <select name="cidade" class="form-select" v-model="endereco.cidade.id" :disabled="readonly">
        <option v-if="cidades.length > 0" value="0">Selecione uma cidade</option>
        <option v-for="cidade in cidades" :key="cidade.id" :value="cidade.id">{{ cidade.nome }}</option>
      </select>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Basic from '@/views/Basic.vue'; // @ is an alias to /src
import { User, Role, Pessoa, Endereco, Cidade, Estado, Pais, Contato, ContatoTipo, ContatoCategoria } from '@/types'

@Options({
  props: {
    endereco: Object,
    readonly: Boolean
  }
})
export default class FormEndereco extends Basic {

  readonly: Boolean = false

  endereco: Endereco = {
    id: 0,
    bairro: '',
    logradouro: '',
    numero: '',
    cep: '',
    complemento: '',
    cidade_id: 0,
    pessoa_id: 0,
    cidade: {
      id: 0,
      nome: '',
      estado_id: 0,
      estado: {
        id: 0,
        nome: '',
        uf: '',
        pais_id: 0,
        pais: {
          id: 0,
          nome: ''
        }
      }
    }
  }

  paises: Array<Pais> = []
  estados: Array<Estado> = []
  cidades: Array<Cidade> = []
  cidadeLastSearch = ''

  mounted() {
    this.getPaises()
  }

  changePais() {
    this.getEstados(this.endereco.cidade!.estado!.pais!.id)
  }

  cidadeKeyUp(event: Event) {
    var search = (event.target! as HTMLInputElement).value
    if (search.length == 0) {
      this.cidades = []
    } else if (search.length >= 3) {
      if (search != this.cidadeLastSearch) {
        this.cidadeLastSearch = search
        if (this.endereco.cidade!.estado!.id > 0) {
          this.getCidades(this.endereco.cidade!.estado!.id, search)
        }
      }
    }
  }

  getPaises() {
    this.axiosInstance.get('/resources/paises').then( (response: any) => {
      this.paises = response.data.paises
    }).catch( (err: any) => {
      this.tratarErro(err)
    })
  }

  getEstados(paisId: Number) {
    console.log('############# paisId')
    console.log(paisId)
    this.axiosInstance.get('/resources/estados/' + paisId).then( (response: any) => {
      this.estados = response.data.estados
    }).catch( (err: any) => {
      this.tratarErro(err)
    })
  }

  getCidades(estadoId: Number, search: String) {
    this.axiosInstance.get('/resources/cidades/' + estadoId + '?search=' + search).then( (response: any) => {
      this.cidades = response.data.cidades
    }).catch( (err: any) => {
      this.tratarErro(err)
    })
  }
}
</script>
<style scoped></style>