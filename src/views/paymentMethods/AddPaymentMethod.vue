<template>
  <section class="page-section">
    <b-container>
      <form @submit.prevent="add">
        <div class="card bg-white shadow p-3">
          <h1 class="h5 pb-2 text-secondary border-bottom">
            CADASTRAR FORMAS DE PAGAMENTO
          </h1>

          <div class="py-4 px-2 bg-body-secondary rounded-4">
            <div class="container-fluid">
              <div class="row row-cols-1 row-cols-lg-2 gy-3">
                <div class="col">
                  <label class="form-label text-primary" for="name">
                    <small><strong>Descrção</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fas fa-money-check"></i>
                    </span>
                    <input
                      v-model="name"
                      class="form-control form-control-sm"
                      placeholder="Digite a descrição"
                      required
                    />
                  </div>
                </div>

                <div class="col">
                  <label class="form-label text-primary" for="code">
                    <small><strong>Código</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fas fa-code"></i>
                    </span>
                    <input
                      v-model="code"
                      class="form-control form-control-sm"
                      placeholder="Digite o código"
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
import { ADD_PAYMENTMETHOD } from "@/store/paymentMethods/paymentMethod.constants";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "AddPaymentMethod",
  data: () => {
    return {
      name: "",
      code: ""
    };
  },
  computed: {
    ...mapGetters("paymentMethod", ["getPaymentMethods", "getMessage"])
  },
  methods: {
    add() {
      this.$store
        .dispatch(`paymentMethod/${ADD_PAYMENTMETHOD}`, this.$data)
        .then(
          () => {
            this.$alert(
              this.getMessage,
              "Forma de pagamento adicionado!",
              "success"
            );
            router.push({ name: "listPaymentMethods" });
          },
          err => {
            this.$alert(`${err.message}`, "Erro", "error");
          }
        );
    }
  }
};
</script>
