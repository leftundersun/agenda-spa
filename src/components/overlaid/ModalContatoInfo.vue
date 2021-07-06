<template></template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BasicOverlaid from '@/components/overlaid/BasicOverlaid.vue'; // @ is an alias to /src
import { User, Role, Pessoa, Endereco, Cidade, Estado, Pais, Contato, ContatoTipo, ContatoCategoria } from '@/types'

export default class ModalContatoInfo extends BasicOverlaid {}
</script>
<style scoped></style>