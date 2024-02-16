<template>
  <section class="page-section">
    <b-container>
      <form @submit.prevent="add">
        <div class="card bg-white shadow p-3">
          <h1 class="h5 pb-2 text-secondary border-bottom">
            CADASTRAR BANCO
          </h1>

          <div class="py-4 px-2 bg-body-secondary rounded-4">
            <div class="container-fluid">
              <div class="row row-cols-1 row-cols-lg-2 gy-4">
                <div class="col">
                  <label class="form-label text-primary" for="name">
                    <small><strong>Nome</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fas fa-building"></i>
                    </span>
                    <input
                      v-model="name"
                      class="form-control form-control-sm"
                      placeholder="Digite o nome do banco"
                      required
                    />
                  </div>
                </div>

                <div class="col">
                  <label class="form-label text-primary" for="abbreviation">
                    <small><strong>Abreviatura</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fas fa-building"></i>
                    </span>
                    <input
                      v-model="abbreviation"
                      class="form-control form-control-sm"
                      placeholder="Digite o nome abreviado"
                    />
                  </div>
                </div>

                <div class="col">
                  <label class="form-label text-primary" for="accountNumber">
                    <small><strong>Nº de Conta</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fas fa-code"></i>
                    </span>
                    <input
                      v-model="accountNumber"
                      class="form-control form-control-sm"
                      placeholder="Digite o nº de conta"
                    />
                  </div>
                </div>

                <div class="col">
                  <label class="form-label text-primary" for="iban">
                    <small><strong>IBAN</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fas fa-code"></i>
                    </span>
                    <input
                      v-model="iban"
                      class="form-control form-control-sm"
                      placeholder="Digite o IBAN"
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
import { ADD_BANK } from "@/store/banks/bank.constants";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "AddBank",
  data: () => {
    return {
      name: "",
      abbreviation: "",
      accountNumber: "",
      iban: ""
    };
  },
  computed: {
    ...mapGetters("bank", ["getBanks", "getMessage"])
  },
  methods: {
    add() {
      this.$store.dispatch(`bank/${ADD_BANK}`, this.$data).then(
        () => {
          this.$alert(this.getMessage, "Banco adicionado!", "success");
          router.push({ name: "listBanks" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  }
};
</script>
