<template>
  <section class="page-section">
    <b-container>
      <b-row class="mb-4">
        <b-col>
          <router-link
            class="mt-2 btn btn-sm btn-outline-primary"
            tag="button"
            :to="{ name: 'addPaymentMethod' }"
          >
            <i class="fas fa-plus-circle"></i>
            <span> Adicionar Forma de Pagamento</span>
          </router-link>
        </b-col>
      </b-row>

      <b-row class="card shadow mt-4">
        <b-col class="card-header bg-body-secondary">
          <h5 class="h5 text-secondary">
            <i class="fas fa-money-check"></i> Formas de Pagamento
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
                    <i class="fas fa-money-check"></i>
                    Descrição
                    <i
                      class="fas fa-arrow-up"
                      v-if="sortType === 1"
                      @click="sort()"
                    ></i>
                    <i class="fas fa-arrow-down" v-else @click="sort()"></i>
                  </th>
                  <th scope="col" class="text-center">
                    <i class="fas fa-code"></i>
                    Código
                  </th>
                  <th scope="col" class="text-center">
                    <i class="fa fa-cog"></i>
                    Opções
                  </th>
                </tr>
              </thead>
              <tbody class="table-group-divider align-middle">
                <tr
                  v-for="paymentMethod of paymentMethods"
                  :key="paymentMethod._id"
                >
                  <td>{{ paymentMethod.name }}</td>
                  <td class="text-center">{{ paymentMethod.code }}</td>
                  <td class="text-center">
                    <router-link
                      :to="{
                        name: 'editPaymentMethod',
                        params: { paymentMethodId: paymentMethod._id }
                      }"
                      tag="button"
                      class="btn btn-sm btn-outline-primary p-1 mx-2"
                    >
                      <i class="fas fa-edit"></i> Editar
                    </router-link>
                    <button
                      @click="removePaymentMethod(paymentMethod._id)"
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
  FETCH_PAYMENTMETHODS,
  REMOVE_PAYMENTMETHOD
} from "@/store/paymentMethods/paymentMethod.constants";
import { mapGetters } from "vuex";

export default {
  name: "ListPaymentMethods",
  data: function() {
    return {
      paymentMethods: [],
      sortType: 1
    };
  },
  computed: {
    ...mapGetters("paymentMethod", ["getPaymentMethods", "getMessage"])
  },
  methods: {
    fetchPaymentMethods() {
      this.$store.dispatch(`paymentMethod/${FETCH_PAYMENTMETHODS}`).then(
        () => {
          this.paymentMethods = this.getPaymentMethods;
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    sort() {
      this.paymentMethods.sort(this.compareNames);
      this.sortType *= -1;
    },
    compareNames(u1, u2) {
      if (u1.name > u2.name) return 1 * this.sortType;
      else if (u1.name < u2.name) return -1 * this.sortType;
      else return 0;
    },
    removePaymentMethod(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover a forma de pagamento?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store
            .dispatch(`paymentMethod/${REMOVE_PAYMENTMETHOD}`, id)
            .then(() => {
              this.$alert(
                this.getMessage,
                "Forma de pagamento removida!",
                "success"
              );
              this.fetchPaymentMethods();
            });
        },
        () => {
          this.$alert("Remoção cancelada!", "Informação", "info");
        }
      );
    }
  },
  created() {
    this.fetchPaymentMethods();
  }
};
</script>
