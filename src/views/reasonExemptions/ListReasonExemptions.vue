<template>
  <section class="page-section">
    <b-container>
      <b-row class="mb-4">
        <b-col>
          <router-link
            class="mt-2 btn btn-sm btn-outline-primary"
            tag="button"
            :to="{ name: 'addReasonExemption' }"
          >
            <i class="fas fa-plus-circle"></i>
            <span> Adicionar Razão de Isenção</span>
          </router-link>
        </b-col>
      </b-row>

      <b-row class="card shadow mt-4">
        <b-col class="card-header bg-body-secondary">
          <h5 class="h5 text-secondary">
            <i class="fa user falg"></i>Razões de Isenção
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
                  v-for="reasonExemption of reasonExemptions"
                  :key="reasonExemption._id"
                >
                  <td class="pt-4">{{ reasonExemption.name }}</td>
                  <td class="pt-4">{{ reasonExemption.code }}</td>
                  <td class="text-center">
                    <router-link
                      :to="{
                        name: 'editReasonExemption',
                        params: { reasonExemptionId: reasonExemption._id }
                      }"
                      tag="button"
                      class="btn btn-sm btn-outline-primary p-1 mx-2"
                    >
                      <i class="fas fa-edit"></i> Editar
                    </router-link>
                    <button
                      @click="removeReasonExemption(reasonExemption._id)"
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
  FETCH_REASONEXEMPTIONS,
  REMOVE_REASONEXEMPTION
} from "@/store/reasonExemptions/reasonExemption.constants";
import { mapGetters } from "vuex";

export default {
  name: "ListReasonExemptions",
  data: function() {
    return {
      reasonExemptions: [],
      sortType: 1
    };
  },
  computed: {
    ...mapGetters("reasonExemption", ["getReasonExemptions", "getMessage"])
  },
  methods: {
    fetchReasonExemptions() {
      this.$store.dispatch(`reasonExemption/${FETCH_REASONEXEMPTIONS}`).then(
        () => {
          this.reasonExemptions = this.getReasonExemptions;
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    sort() {
      this.reasonExemptions.sort(this.compareNames);
      this.sortType *= -1;
    },
    compareNames(u1, u2) {
      if (u1.name > u2.name) return 1 * this.sortType;
      else if (u1.name < u2.name) return -1 * this.sortType;
      else return 0;
    },

    viewReasonExemption(id) {
      const reasonExemption = this.reasonExemptions.find(
        reasonExemption => reasonExemption._id === id
      );

      this.$fire({
        title: reasonExemption.name,
        html: this.generateTemplate(reasonExemption)
      });
    },

    generateTemplate(reasonExemption) {
      let response = `
          <h6>Descrição</h6> <p>${reasonExemption.description}<p>
        `;
      return response;
    },
    removeReasonExemption(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover a razão de isenção?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store
            .dispatch(`reasonExemption/${REMOVE_REASONEXEMPTION}`, id)
            .then(() => {
              this.$alert(
                this.getMessage,
                "Razão de isenção removida!",
                "success"
              );
              this.fetchReasonExemptions();
            });
        },
        () => {
          this.$alert("Remoção cancelada!", "Informação", "info");
        }
      );
    }
  },
  created() {
    this.fetchReasonExemptions();
  }
};
</script>
