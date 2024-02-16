<template>
  <section class="page-section">
    <b-container>
      <form @submit.prevent="update">
        <div class="card bg-white shadow p-3">
          <h1 class="h5 pb-2 text-secondary border-bottom">
            EDITAR TAXA DE IMPOSTO
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
                      v-model="taxRate.description"
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
                      v-model="taxRate.taxPercentage"
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
import { EDIT_TAXRATE } from "@/store/taxRates/taxRate.constants";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "EditTaxRate",
  data: () => {
    return {
      taxRate: {}
    };
  },
  computed: {
    ...mapGetters("taxRate", ["getTaxRateById", "getMessage"]),
  },
  methods: {
    update() {
      this.$store.dispatch(`taxRate/${EDIT_TAXRATE}`, this.$data.taxRate).then(
        () => {
          this.$alert(this.getMessage, "Marca atualizada!", "success");
          router.push({ name: "listTaxRates" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  },
  created() {
    this.taxRate = this.getTaxRateById(this.$route.params.taxRateId);
  }
};
</script>
