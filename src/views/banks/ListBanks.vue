<template>
  <section class="page-section">
    <b-container>
      <b-row class="mb-4">
        <b-col>
          <router-link
            class="mt-2 btn btn-sm btn-outline-primary"
            tag="button"
            :to="{ name: 'addBank' }"
          >
            <i class="fas fa-plus-circle"></i>
            <span> Adicionar Banco</span>
          </router-link>
        </b-col>
      </b-row>

      <b-row class="card shadow mt-4">
        <b-col class="card-header bg-body-secondary">
          <h5 class="h5 text-secondary">
            <i class="fas fa-building"></i> Bancos
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
                    <i class="fas fa-building"></i>
                    Nome
                    <i
                      class="fas fa-arrow-up"
                      v-if="sortType === 1"
                      @click="sort()"
                    ></i>
                    <i class="fas fa-arrow-down" v-else @click="sort()"></i>
                  </th>
                  <th scope="col" class="text-center">
                    <i class="fas fa-building"></i>
                    Abreviatura
                  </th>
                  <th scope="col" class="text-center">
                    <i class="fas fa-code"></i>
                    Nº de Conta
                  </th>
                  <th scope="col" class="text-center">
                    <i class="fas fa-code"></i>
                    IBAN
                  </th>
                  <th scope="col" class="text-center">
                    <i class="fa fa-cog"></i>
                    Opções
                  </th>
                </tr>
              </thead>
              <tbody class="table-group-divider align-middle">
                <tr v-for="bank of banks" :key="bank._id">
                  <td class="pt-4">{{ bank.name }}</td>
                  <td class="pt-4">{{ bank.abbreviation }}</td>
                  <td class="pt-4">{{ bank.accountNumber }}</td>
                  <td class="pt-4">{{ bank.iban }}%</td>
                  <td class="text-center">
                    <router-link
                      :to="{
                        name: 'editBank',
                        params: { bankId: bank._id }
                      }"
                      tag="button"
                      class="btn btn-sm btn-outline-primary p-1 mx-2"
                    >
                      <i class="fas fa-edit"></i> Editar
                    </router-link>
                    <button
                      @click="removeBank(bank._id)"
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
import { FETCH_BANKS, REMOVE_BANK } from "@/store/banks/bank.constants";
import { mapGetters } from "vuex";

export default {
  name: "ListBanks",
  data: function() {
    return {
      banks: [],
      sortType: 1
    };
  },
  computed: {
    ...mapGetters("bank", ["getBanks", "getMessage"])
  },
  methods: {
    fetchBanks() {
      this.$store.dispatch(`bank/${FETCH_BANKS}`).then(
        () => {
          this.banks = this.getBanks;
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    sort() {
      this.banks.sort(this.compareNames);
      this.sortType *= -1;
    },
    compareNames(u1, u2) {
      if (u1.name > u2.name) return 1 * this.sortType;
      else if (u1.name < u2.name) return -1 * this.sortType;
      else return 0;
    },
    removeBank(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover o banco?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.dispatch(`bank/${REMOVE_BANK}`, id).then(() => {
            this.$alert(this.getMessage, "Banco removido!", "success");
            this.fetchBanks();
          });
        },
        () => {
          this.$alert("Remoção cancelada!", "Informação", "info");
        }
      );
    }
  },
  created() {
    this.fetchBanks();
  }
};
</script>
