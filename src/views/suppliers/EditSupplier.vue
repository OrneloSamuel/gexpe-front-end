<template>
  <section class="page-section">
    <b-container>
      <form @submit.prevent="update">
        <div class="card bg-white shadow p-3">
          <h1 class="h5 pb-2 text-secondary border-bottom">
            EDITAR FORNECEDOR
          </h1>

          <div class="py-4 px-2 bg-body-secondary rounded-4">
            <div class="container-fluid">
              <div class="row row-cols-1 row-cols-lg-3 gy-4">
                <div class="col">
                  <label class="form-label text-primary" for="tin">
                    <small><strong>NIF</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fas fa-id-card"></i>
                    </span>
                    <input
                      v-model="supplier.tin"
                      class="form-control form-control-sm"
                      id="tin"
                      placeholder="Digite o NIF do fornecedor"
                      required
                      maxlength="14"
                    />
                  </div>
                </div>

                <div class="col">
                  <label class="form-label text-primary" for="name">
                    <small><strong>Nome</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fa fa-user"></i>
                    </span>
                    <input
                      v-model="supplier.name"
                      class="form-control form-control-sm"
                      id="name"
                      placeholder="Digite o nome do fornecedor"
                      required
                    />
                  </div>
                </div>

                <div class="col">
                  <label class="form-label text-primary" for="naturalityId">
                    <small><strong>Naturalidade</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fa fa-map"></i>
                    </span>
                    <select
                      v-model="supplier.naturalityId"
                      class="form-control form-control-sm"
                    >
                      <option
                        v-for="naturality in naturalities"
                        :key="naturality._id"
                        :value="naturality._id"
                        :selected="true"
                        >{{ naturality.name }}</option
                      >
                    </select>
                  </div>
                </div>

                <div class="col">
                  <label class="form-label text-primary" for="address">
                    <small><strong>Endereço</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fa fa-map"></i>
                    </span>
                    <input
                      v-model="supplier.address"
                      class="form-control form-control-sm"
                      id="address"
                      placeholder="Digite o endereço"
                    />
                  </div>
                </div>

                <div class="col">
                  <label class="form-label text-primary" for="email">
                    <small><strong>E-mail</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fa fa-envelope"></i>
                    </span>
                    <input
                      v-model="supplier.email"
                      class="form-control form-control-sm"
                      id="email"
                      placeholder="Digite o e-mail"
                      type="email"
                    />
                  </div>
                </div>

                <div class="col">
                  <label class="form-label text-primary" for="phone">
                    <small><strong>Telemóvel</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fa fa-phone"></i>
                    </span>
                    <input
                      v-model="supplier.phone"
                      class="form-control form-control-sm"
                      id="phone"
                      placeholder="Digite o número de telemóvel"
                      type="number"
                      maxlength="9"
                    />
                  </div>
                </div>

                <div class="col">
                  <label class="form-label text-primary" for="alternativePhone">
                    <small><strong>Telemóvel Alternativo</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fa fa-phone"></i>
                    </span>
                    <input
                      v-model="supplier.alternativePhone"
                      class="form-control form-control-sm"
                      id="alternativePhone"
                      placeholder="Digite o número de telemóvel alternativo"
                      type="number"
                      maxlength="9"
                    />
                  </div>
                </div>

                <div class="col">
                  <label class="form-label text-primary" for="fax">
                    <small><strong>FAX</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fa fa-fax"></i>
                    </span>
                    <input
                      v-model="supplier.fax"
                      class="form-control form-control-sm"
                      id="fax"
                      placeholder="Digite o número de FAX"
                      type="number"
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
import { EDIT_SUPPLIER } from "@/store/suppliers/supplier.constants";
import router from "@/router";
import { mapGetters } from "vuex";
import { FETCH_NATURALITIES } from "@/store/naturalities/naturality.constants";

export default {
  name: "EditSupplier",
  data: () => {
    return {
      supplier: {},
      naturalities: []
    };
  },
  computed: {
    ...mapGetters("supplier", ["getSupplierById", "getMessage"]),
    ...mapGetters("naturality", ["getNaturalities"])
  },
  methods: {
    update() {
      this.$store
        .dispatch(`supplier/${EDIT_SUPPLIER}`, this.$data.supplier)
        .then(
          () => {
            this.$alert(this.getMessage, "Fornecedor atualizado!", "success");
            router.push({ name: "listSuppliers" });
          },
          err => {
            this.$alert(`${err.message}`, "Erro", "error");
          }
        );
    }
  },
  created() {
    this.supplier = this.getSupplierById(this.$route.params.supplierId);
    this.$store.dispatch(`naturality/${FETCH_NATURALITIES}`).then(
      () => {
        this.naturalities = this.getNaturalities;
      },
      err => {
        this.$alert(`${err.message}`, "Erro", "error");
      }
    );
  }
};
</script>
