<template>
  <div class="row mt-2">
    <div class="col-8">
      <div class="row">
        <div class="col-12">
          <button @click="firstPage()" class="btn btn-secondary">Primeira</button>
          <button @click="prevPage()" class="btn btn-secondary">Anterior</button>
          <div class="btn-group">
            <button
              v-for="page in pages" :key="page"
              @click="selectPage(page)"
              :class="{ active: page == selectedPage }" class="btn btn-secondary">{{ page }}</button>
          </div>
          <button @click="nextPage()" class="btn btn-secondary">Próxima</button>
          <button @click="lastPage()" class="btn btn-secondary">Última</button>
        </div>
        <div class="col-12">
          <span>Mostrando de {{ firstItem }} até {{ lastItem }} de {{ totalCount }} resultados</span>
        </div>
      </div>
    </div>
    <div class="col-4">
      <input @keyup="searchKeyUp($event)" type="text" class="float-end" placeholder="Procurar...">
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    totalCount: Number,
    selectedPage: Number
  }
})
export default class Paginacao extends Vue {

  perPage = 20
  totalCount = 0
  selectedPage = 1

  get firstItem() {
    return this.totalCount > 0 ? ( (this.selectedPage - 1) * this.perPage ) + 1 : 0
  }

  get lastItem() {
    return (this.selectedPage < this.pageQtd) ? (this.selectedPage * this.perPage) : this.totalCount
  }

  get pageQtd() {
    return this.totalCount > 0 ? Math.ceil(this.totalCount / this.perPage) : 1
  }
  
  get pages() {
    var pages = []
    if (this.pageQtd > 5) {
      if (this.selectedPage <= 3) {
        pages = [1, 2, 3, 4, 5]
      } else if ( this.selectedPage >= (this.pageQtd - 2) ) {
        for (var i = 4; i >= 0; i--) {
          pages.push(this.pageQtd - i)
        }
      } else {
        for (var i = -2; i <= 2; i++) {
          pages.push(this.selectedPage + i)
        }
      }
    } else {
      for (var i = 1; i <= this.pageQtd; i++) {
        pages.push(i)
      }
    }
    return pages
  }

  searchKeyUp(event: any) {
    var search = event.target.value
    if (search.length == 0 || search.length >= 3) {
      this.$emit('search', search)
    }
  }

  selectPage(page: Number) {
    if (page != this.selectedPage) {
      this.$emit('selectPage', page)
    }
  }

  firstPage() {
    if (this.selectedPage > 1) {
      this.$emit('selectPage', 1)
    }
  }

  prevPage() {
    if (this.selectedPage > 1) {
      this.$emit('selectPage', this.selectedPage - 1)
    }
  }

  nextPage() {
    if (this.selectedPage < this.pageQtd) {
      this.$emit('selectPage', this.selectedPage + 1)
    }
  }

  lastPage() {
    if (this.selectedPage < this.pageQtd) {
      this.$emit('selectPage', this.pageQtd)
    }
  }
}

</script>
<style scoped>
</style>