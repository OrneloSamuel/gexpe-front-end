<template>
  <section class="page-section">
    <b-container>
      <b-row class="mb-4">
        <b-col>
          <router-link
            class="mt-2 btn btn-sm btn-outline-primary"
            tag="button"
            :to="{ name: 'addBrand' }"
          >
            <i class="fas fa-plus-circle"></i>
            <span> Adicionar Marca de Produto</span>
          </router-link>
        </b-col>
      </b-row>

      <b-row class="card shadow mt-4">
        <b-col class="card-header bg-body-secondary">
          <h5 class="h5 text-secondary">
            <i class="fa user falg"></i>Marcas de Produtos
          </h5>
        </b-col>
        <b-col class="card-body">
          <b-col
            class="table-responsive"
            x-transition
            data-overlayscrollbars-initialize
          >
            <table class="table table-sm table-striped table-hover border">
              <thead class="align-middle text-center">
                <tr>
                  <th scope="col" class="text-center">
                    <i class="fab fa-bookmark"></i>
                    Nome
                    <i
                      class="fas fa-arrow-up"
                      v-if="sortType === 1"
                      @click="sort()"
                    ></i>
                    <i class="fas fa-arrow-down" v-else @click="sort()"></i>
                  </th>
                  <th scope="col" class="text-center">
                    <i class="fas fa-cog"></i>
                    Opções
                  </th>
                </tr>
              </thead>
              <tbody class="table-group-divider align-middle">
                <tr v-for="brand of brands" :key="brand._id">
                  <td class="pt-4">{{ brand.name }}</td>
                  <td class="text-center">
                    <router-link
                      :to="{
                        name: 'editBrand',
                        params: { brandId: brand._id }
                      }"
                      tag="button"
                      class="btn btn-sm btn-outline-primary p-1 mx-2"
                    >
                      <i class="fas fa-edit"></i> Editar
                    </router-link>
                    <button
                      @click="removeBrand(brand._id)"
                      type="button"
                      class="btn btn-sm btn-outline-danger p-1 mx-2"
                    >
                      <i class="fas fa-trash-alt"></i> Remover
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </b-col>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { FETCH_BRANDS, REMOVE_BRAND } from "@/store/brands/brand.constants";
import { mapGetters } from "vuex";

export default {
  name: "ListBrands",
  data: function() {
    return {
      brands: [],
      sortType: 1
    };
  },
  computed: {
    ...mapGetters("brand", ["getBrands", "getMessage"])
  },
  methods: {
    fetchBrands() {
      this.$store.dispatch(`brand/${FETCH_BRANDS}`).then(
        () => {
          this.brands = this.getBrands;
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    sort() {
      this.brands.sort(this.compareNames);
      this.sortType *= -1;
    },
    compareNames(u1, u2) {
      if (u1.name > u2.name) return 1 * this.sortType;
      else if (u1.name < u2.name) return -1 * this.sortType;
      else return 0;
    },

    viewBrand(id) {
      const brand = this.brands.find(brand => brand._id === id);

      this.$fire({
        title: brand.name,
        html: this.generateTemplate(brand)
      });
    },

    generateTemplate(brand) {
      let response = `
          <h6>Descrição</h6> <p>${brand.description}<p>
        `;
      return response;
    },
    removeBrand(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover a marca?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.dispatch(`brand/${REMOVE_BRAND}`, id).then(() => {
            this.$alert(this.getMessage, "Marca removida!", "success");
            this.fetchBrands();
          });
        },
        () => {
          this.$alert("Remoção cancelada!", "Informação", "info");
        }
      );
    }
  },
  created() {
    this.fetchBrands();
  }
};
</script>
