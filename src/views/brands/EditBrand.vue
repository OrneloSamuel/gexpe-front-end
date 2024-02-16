<template>
  <section class="page-section">
    <b-container>
      <form @submit.prevent="update">
        <div class="card bg-white shadow p-3">
          <h1 class="h5 pb-2 text-secondary border-bottom">
            EDITAR MARCA DE PRODUTO
          </h1>

          <div class="py-4 px-2 bg-body-secondary rounded-4">
            <div class="container-fluid">
              <div class="row gy-3">
                <div class="col">
                  <label class="form-label text-primary" for="name">
                    <small><strong>Nome</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fa fa-vcard"></i>
                    </span>
                    <input
                      v-model="brand.name"
                      class="form-control form-control-sm"
                      id="name"
                      placeholder="Digite o nome da marca"
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
import { EDIT_BRAND } from "@/store/brands/brand.constants";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "EditBrand",
  data: () => {
    return {
      brand: {}
    };
  },
  computed: {
    ...mapGetters("brand", ["getBrandById", "getMessage"]),
  },
  methods: {
    update() {
      this.$store.dispatch(`brand/${EDIT_BRAND}`, this.$data.brand).then(
        () => {
          this.$alert(this.getMessage, "Marca atualizada!", "success");
          router.push({ name: "listBrands" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  },
  created() {
    this.brand = this.getBrandById(this.$route.params.brandId);
  }
};
</script>
