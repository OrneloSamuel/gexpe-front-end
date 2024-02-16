<template>
  <section class="page-section">
    <b-container>
      <b-row class="mb-4">
        <b-col>
          <router-link
            class="mt-2 btn btn-sm btn-outline-primary"
            tag="button"
            :to="{ name: 'addProduct' }"
          >
            <i class="fas fa-plus-circle"></i>
            <span> Adicionar Produto</span>
          </router-link>
        </b-col>
      </b-row>

      <b-row class="card shadow mt-4">
        <b-col class="card-header bg-body-secondary">
          <h5 class="h5 text-secondary">
            <i class="fa user falg"></i>Produtos
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
                    <i class="fab fa-shopify"></i>
                    Nome
                    <i
                      class="fas fa-arrow-up"
                      v-if="sortType === 1"
                      @click="sort()"
                    ></i>
                    <i class="fas fa-arrow-down" v-else @click="sort()"></i>
                  </th>
                  <th scope="col" class="text-center">
                    <i class="far fa-circle"></i>
                    Quantidade
                  </th>
                  <th scope="col" class="text-center">
                    <i class="fas fa-money-bill"></i>
                    Preço
                  </th>
                  <th scope="col" class="text-center">
                    <i class="fas fa-cog"></i>
                    Opções
                  </th>
                </tr>
              </thead>
              <tbody class="table-group-divider align-middle">
                <tr v-for="product of products" :key="product._id">
                  <td class="pt-4">{{ product.name }}</td>
                  <td class="pt-4 text-center">{{ product.currentStock }}</td>
                  <td class="pt-4 text-center">{{ product.price }}</td>
                  <td class="text-center">
                    <router-link
                      :to="{
                        name: 'editProduct',
                        params: { productId: product._id }
                      }"
                      tag="button"
                      class="btn btn-sm btn-outline-primary p-1 mx-2"
                    >
                      <i class="fas fa-edit"></i> Editar
                    </router-link>
                    <button
                      @click="removeProduct(product._id)"
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
  FETCH_PRODUCTS,
  REMOVE_PRODUCT
} from "@/store/products/product.constants";
import { mapGetters } from "vuex";
export default {
  name: "ListProducts",
  data: function() {
    return {
      products: [],
      sortType: 1
    };
  },
  computed: {
    ...mapGetters("product", ["getProducts", "getMessage"])
  },
  methods: {
    fetchProducts() {
      this.$store.dispatch(`product/${FETCH_PRODUCTS}`).then(
        () => {
          this.products = this.getProducts;
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    sort() {
      this.products.sort(this.compareNames);
      this.sortType *= -1;
    },
    compareNames(q1, q2) {
      if (q1.name > q2.name) return 1 * this.sortType;
      else if (q1.name < q2.name) return -1 * this.sortType;
      else return 0;
    },
    removeProduct(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover o produto?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.dispatch(`product/${REMOVE_PRODUCT}`, id).then(() => {
            this.$alert(this.getMessage, "Produto removido!", "success");
            this.fetchProducts();
          });
        },
        () => {
          this.$alert("Remoção cancelada!", "Informação", "info");
        }
      );
    }
  },
  created() {
    this.fetchProducts();
  }
};
</script>
