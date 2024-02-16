<template>
  <section class="page-section">
    <b-container>
      <b-row class="mb-4">
        <b-col>
          <router-link
            class="mt-2 btn btn-sm btn-outline-primary"
            tag="button"
            :to="{ name: 'addTaxRate' }"
          >
            <i class="fas fa-plus-circle"></i>
            <span> Adicionar Taxa de Imposto</span>
          </router-link>
        </b-col>
      </b-row>

      <b-row class="card shadow mt-4">
        <b-col class="card-header bg-body-secondary">
          <h5 class="h5 text-secondary">
            <i class="fa user falg"></i>Taxas de Imposto
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
                    <i class="far fa-circle"></i>
                    Descrição
                    <i
                      class="fas fa-arrow-up"
                      v-if="sortType === 1"
                      @click="sort()"
                    ></i>
                    <i class="fas fa-arrow-down" v-else @click="sort()"></i>
                  </th>
                  <th scope="col" class="text-center">
                    <i class="fas fa-percent"></i>
                    Percentagem do Valor
                  </th>
                  <th scope="col" class="text-center">
                    <i class="fa fa-cog"></i>
                    Opções
                  </th>
                </tr>
              </thead>
              <tbody class="table-group-divider align-middle">
                <tr v-for="taxRate of taxRates" :key="taxRate._id">
                  <td class="pt-4">{{ taxRate.description }}</td>
                  <td class="pt-4">{{ taxRate.taxPercentage }}%</td>
                  <td class="text-center">
                    <router-link
                      :to="{
                        name: 'editTaxRate',
                        params: { taxRateId: taxRate._id }
                      }"
                      tag="button"
                      class="btn btn-sm btn-outline-primary p-1 mx-2"
                    >
                      <i class="fas fa-edit"></i> Editar
                    </router-link>
                    <button
                      @click="removeTaxRate(taxRate._id)"
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
  FETCH_TAXRATES,
  REMOVE_TAXRATE
} from "@/store/taxRates/taxRate.constants";
import { mapGetters } from "vuex";

export default {
  name: "ListTaxRates",
  data: function() {
    return {
      taxRates: [],
      sortType: 1
    };
  },
  computed: {
    ...mapGetters("taxRate", ["getTaxRates", "getMessage"])
  },
  methods: {
    fetchTaxRates() {
      this.$store.dispatch(`taxRate/${FETCH_TAXRATES}`).then(
        () => {
          this.taxRates = this.getTaxRates;
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    sort() {
      this.taxRates.sort(this.compareNames);
      this.sortType *= -1;
    },
    compareNames(u1, u2) {
      if (u1.name > u2.name) return 1 * this.sortType;
      else if (u1.name < u2.name) return -1 * this.sortType;
      else return 0;
    },

    viewTaxRate(id) {
      const taxRate = this.taxRates.find(taxRate => taxRate._id === id);

      this.$fire({
        title: taxRate.name,
        html: this.generateTemplate(taxRate)
      });
    },

    generateTemplate(taxRate) {
      let response = `
          <h6>Descrição</h6> <p>${taxRate.description}<p>
        `;
      return response;
    },
    removeTaxRate(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover a taxa de imposto?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.dispatch(`taxRate/${REMOVE_TAXRATE}`, id).then(() => {
            this.$alert(
              this.getMessage,
              "Taxa de imposto removida!",
              "success"
            );
            this.fetchTaxRates();
          });
        },
        () => {
          this.$alert("Remoção cancelada!", "Informação", "info");
        }
      );
    }
  },
  created() {
    this.fetchTaxRates();
  }
};
</script>
