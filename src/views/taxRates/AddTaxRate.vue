<template>
  <section class="page-section">
    <b-container>
      <form @submit.prevent="add">
        <div class="card bg-white shadow p-3">
          <h1 class="h5 pb-2 text-secondary border-bottom">
            CADASTRAR TAXAS DE IMPOSTOS
          </h1>

          <div class="py-4 px-2 bg-body-secondary rounded-4">
            <div class="container-fluid">
              <div class="row gy-2">
                <div class="col">
                  <label class="form-label text-primary" for="description">
                    <small><strong>Descrição da Taxa</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="far fa-circle"></i>
                    </span>
                    <input
                      v-model="description"
                      class="form-control form-control-sm"
                      id="description"
                      placeholder="Digite a descrição da taxa"
                      required
                    />
                  </div>
                </div>

                <div class="col">
                  <label class="form-label text-primary" for="taxPercentage">
                    <small><strong>Percentagem do Valor</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fa fa-percent"></i>
                    </span>
                    <input
                      v-model="taxPercentage"
                      class="form-control form-control-sm"
                      id="taxPercentage"
                      placeholder="Digite o nome da taxa"
                      required
                      type="number"
                      step="any"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-end align-items-baseline mt-4">
          <a
            href="javascript:history.go(-1)"
            class="btn btn-outline-danger border shadow-sm mb-2 me-4 mb-lg-0"
          >
            <i class="fa fa-window-close"></i>
            Cancelar
          </a>

          <button class="btn btn-outline-primary shadow-sm ">
            <i class="fa fa-save"></i>
            Guardar
          </button>
        </div>
      </form>
    </b-container>
  </section>
</template>

<script>
import { ADD_TAXRATE } from "@/store/taxRates/taxRate.constants";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "AddTaxRate",
  data: () => {
    return {
      description: "",
      taxPercentage: ""
    };
  },
  computed: {
    ...mapGetters("taxRate", ["getTaxRates", "getMessage"])
  },
  methods: {
    add() {
      this.$store.dispatch(`taxRate/${ADD_TAXRATE}`, this.$data).then(
        () => {
          this.$alert(this.getMessage, "Marca adicionada!", "success");
          router.push({ name: "listTaxRates" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  }
};
</script>
