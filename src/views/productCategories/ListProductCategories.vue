<template>
  <section class="page-section">
    <b-container>
      <b-row class="mb-4">
        <b-col>
          <router-link
            class="mt-2 btn btn-sm btn-outline-primary"
            tag="button"
            :to="{ name: 'addProductCategory' }"
          >
            <i class="fas fa-plus-circle"></i>
            <span> Adicionar Categoria de Produto</span>
          </router-link>
        </b-col>
      </b-row>

      <b-row class="card shadow mt-4">
        <b-col class="card-header bg-body-secondary">
          <h5 class="h5 text-secondary">
            <i class="fa user falg"></i>Categoria de Produtos
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
                <tr
                  v-for="productCategory of productCategories"
                  :key="productCategory._id"
                >
                  <td class="pt-4">{{ productCategory.name }}</td>
                  <td class="text-center">
                    <router-link
                      :to="{
                        name: 'editProductCategory',
                        params: { productCategoryId: productCategory._id }
                      }"
                      tag="button"
                      class="btn btn-sm btn-outline-primary p-1 mx-2"
                    >
                      <i class="fas fa-edit"></i> Editar
                    </router-link>
                    <button
                      @click="removeProductCategory(productCategory._id)"
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
import {
  FETCH_PRODUCTCATEGORIES,
  REMOVE_PRODUCTCATEGORY
} from "@/store/productCategories/productCategory.constants";
import { mapGetters } from "vuex";
export default {
  name: "ListProductCategories",
  data: function() {
    return {
      productCategories: [],
      sortType: 1
    };
  },
  computed: {
    ...mapGetters("productCategory", ["getProductCategories", "getMessage"])
  },
  methods: {
    fetchProductCategories() {
      this.$store.dispatch(`productCategory/${FETCH_PRODUCTCATEGORIES}`).then(
        () => {
          this.productCategories = this.getProductCategories;
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    sort() {
      this.productCategories.sort(this.compareNames);
      this.sortType *= -1;
    },
    compareNames(q1, q2) {
      if (q1.name > q2.name) return 1 * this.sortType;
      else if (q1.name < q2.name) return -1 * this.sortType;
      else return 0;
    },
    removeProductCategory(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover a categoria de produto?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store
            .dispatch(`productCategory/${REMOVE_PRODUCTCATEGORY}`, id)
            .then(() => {
              this.$alert(
                this.getMessage,
                "Categoria de Produto removido!",
                "success"
              );
              this.fetchProductCategories();
            });
        },
        () => {
          this.$alert("Remoção cancelada!", "Informação", "info");
        }
      );
    }
  },
  created() {
    this.fetchProductCategories();
  }
};
</script>
