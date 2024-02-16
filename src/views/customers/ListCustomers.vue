<template>
  <section class="page-section">
    <b-container>
      <b-row class="mb-4">
        <b-col>
          <router-link
            class="mt-2 btn btn-sm btn-outline-primary"
            tag="button"
            :to="{ name: 'addCustomer' }"
          >
            <i class="fas fa-plus-circle"></i>
            <span> Adicionar Cliente</span>
          </router-link>
        </b-col>
      </b-row>

      <b-row class="card shadow mt-4">
        <b-col class="card-header bg-body-secondary">
          <h5 class="h5 text-secondary">
            <i class="fa user falg"></i>Clientes
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
                    <i class="fa fa-user"></i>
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
                <tr v-for="customer of customers" :key="customer._id">
                  <td class="pt-4">{{ customer.tin }}</td>
                  <td class="pt-4">{{ customer.name }}</td>
                  <td class="pt-4">{{ customer.address }}</td>
                  <td class="pt-4">{{ customer.phone }}</td>
                  <td class="text-center">
                    <router-link
                      :to="{
                        name: 'editCustomer',
                        params: { customerId: customer._id }
                      }"
                      tag="button"
                      class="btn btn-sm btn-outline-primary p-1 mx-2"
                    >
                      <i class="fas fa-edit"></i> Editar
                    </router-link>
                    <button
                      @click="removeCustomer(customer._id)"
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
  FETCH_CUSTOMERS,
  REMOVE_CUSTOMER
} from "@/store/customers/customer.constants";
import { mapGetters } from "vuex";
export default {
  name: "ListCustomers",
  data: function() {
    return {
      customers: [],
      sortType: 1
    };
  },
  computed: {
    ...mapGetters("customer", ["getCustomers", "getMessage"])
  },
  methods: {
    fetchCustomers() {
      this.$store.dispatch(`customer/${FETCH_CUSTOMERS}`).then(
        () => {
          this.customers = this.getCustomers;
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    sort() {
      this.customers.sort(this.compareNames);
      this.sortType *= -1;
    },
    compareNames(q1, q2) {
      if (q1.name > q2.name) return 1 * this.sortType;
      else if (q1.name < q2.name) return -1 * this.sortType;
      else return 0;
    },
    removeCustomer(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover o cliente?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.dispatch(`customer/${REMOVE_CUSTOMER}`, id).then(() => {
            this.$alert(this.getMessage, "Cliente removido!", "success");
            this.fetchCustomers();
          });
        },
        () => {
          this.$alert("Remoção cancelada!", "Informação", "info");
        }
      );
    }
  },
  created() {
    this.fetchCustomers();
  }
};
</script>
