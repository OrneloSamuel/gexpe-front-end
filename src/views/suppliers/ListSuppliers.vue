<template>
  <section class="page-section">
    <b-container>
      <b-row class="mb-4">
        <b-col>
          <router-link
            class="mt-2 btn btn-sm btn-outline-primary"
            tag="button"
            :to="{ name: 'addSupplier' }"
          >
            <i class="fas fa-plus-circle"></i>
            <span> Adicionar Fornecedor</span>
          </router-link>
        </b-col>
      </b-row>

      <b-row class="card shadow mt-4">
        <b-col class="card-header bg-body-secondary">
          <h5 class="h5 text-secondary">
            <i class="fa user falg"></i>Fornecedores
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
                  <th scope="col">
                    <i class="fas fa-id-card"></i>
                    NIF
                  </th>
                  <th scope="col">
                    <i class="fa fa-user"></i>
                    Nome
                    <i
                      class="fas fa-arrow-up"
                      v-if="sortType === 1"
                      @click="sort()"
                    ></i>
                    <i class="fas fa-arrow-down" v-else @click="sort()"></i>
                  </th>
                  <th scope="col">
                    <i class="fa fa-map"></i>
                    Endereço
                  </th>
                  <th scope="col">
                    <i class="fa fa-phone"></i>
                    Telefone
                  </th>
                  <th scope="col">
                    <i class="fa fa-cog"></i>
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody class="table-group-divider align-middle">
                <tr v-for="supplier of suppliers" :key="supplier._id">
                  <td class="pt-4">{{ supplier.tin }}</td>
                  <td class="pt-4">{{ supplier.name }}</td>
                  <td class="pt-4">{{ supplier.address }}</td>
                  <td class="pt-4">{{ supplier.phone }}</td>
                  <td class="text-center">
                    <router-link
                      :to="{
                        name: 'editSupplier',
                        params: { supplierId: supplier._id }
                      }"
                      tag="button"
                      class="btn btn-sm btn-outline-primary p-1 mx-2"
                    >
                      <i class="fas fa-edit"></i> Editar
                    </router-link>
                    <button
                      @click="removeSupplier(supplier._id)"
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
  FETCH_SUPPLIERS,
  REMOVE_SUPPLIER
} from "@/store/suppliers/supplier.constants";
import { mapGetters } from "vuex";
export default {
  name: "ListSuppliers",
  data: function() {
    return {
      suppliers: [],
      sortType: 1
    };
  },
  computed: {
    ...mapGetters("supplier", ["getSuppliers", "getMessage"])
  },
  methods: {
    fetchSuppliers() {
      this.$store.dispatch(`supplier/${FETCH_SUPPLIERS}`).then(
        () => {
          this.suppliers = this.getSuppliers;
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    sort() {
      this.suppliers.sort(this.compareNames);
      this.sortType *= -1;
    },
    compareNames(q1, q2) {
      if (q1.name > q2.name) return 1 * this.sortType;
      else if (q1.name < q2.name) return -1 * this.sortType;
      else return 0;
    },
    removeSupplier(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover o fornecedor?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.dispatch(`supplier/${REMOVE_SUPPLIER}`, id).then(() => {
            this.$alert(this.getMessage, "Fornecedor removido!", "success");
            this.fetchSuppliers();
          });
        },
        () => {
          this.$alert("Remoção cancelada!", "Informação", "info");
        }
      );
    }
  },
  created() {
    this.fetchSuppliers();
  }
};
</script>
