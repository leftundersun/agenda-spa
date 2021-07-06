<template></template>
<script type="text/javascript">
import { Options, Vue } from 'vue-class-component';
import Basic from '@/views/Basic.vue'; // @ is an alias to /src
import { User, Role, Pessoa, Endereco, Cidade, Estado, Pais, Contato, ContatoTipo, ContatoCategoria } from '@/types'
var Buffer = require('buffer/').Buffer

export default class ContatoCard extends Basic {}
</script>
<style scoped></style>