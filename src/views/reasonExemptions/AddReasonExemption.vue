<template>
  <section class="page-section">
    <b-container>
      <form @submit.prevent="add">
        <div class="card bg-white shadow p-3">
          <h1 class="h5 pb-2 text-secondary border-bottom">
            CADASTRAR RAZÕES DE INSENÇÃO
          </h1>

          <div class="py-4 px-2 bg-body-secondary rounded-4">
            <div class="container-fluid">
              <div class="row gy-2">
                <div class="col">
                  <label class="form-label text-primary" for="name">
                    <small><strong>Descrição</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="far fa-circle"></i>
                    </span>
                    <input
                      v-model="name"
                      class="form-control form-control-sm"
                      id="name"
                      placeholder="Digite a descrição da razão de isenção"
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
                      <i class="fa fa-code"></i>
                    </span>
                    <input
                      v-model="code"
                      class="form-control form-control-sm"
                      id="code"
                      placeholder="Digite o código da isenção"
                      required
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
import { ADD_REASONEXEMPTION } from "@/store/reasonExemptions/reasonExemption.constants";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "AddReasonExemption",
  data: () => {
    return {
      name: "",
      code: ""
    };
  },
  computed: {
    ...mapGetters("reasonExemption", ["getReasonExemptions", "getMessage"])
  },
  methods: {
    add() {
      this.$store
        .dispatch(`reasonExemption/${ADD_REASONEXEMPTION}`, this.$data)
        .then(
          () => {
            this.$alert(
              this.getMessage,
              "Razão de isenção adicionada!",
              "success"
            );
            router.push({ name: "listReasonExemptions" });
          },
          err => {
            this.$alert(`${err.message}`, "Erro", "error");
          }
        );
    }
  }
};
</script>
