<template>
  <section class="page-section">
    <b-container>
      <form @submit.prevent="update">
        <div class="card bg-white shadow p-3">
          <h1 class="h5 pb-2 text-secondary border-bottom">
            EDITAR DADOS DA EMPRESA
          </h1>

          <div class="py-4 px-2 bg-body-secondary rounded-4">
            <div class="container-fluid">
              <div class="row row-cols-1 row-cols-lg-2 gy-4">
                <div class="col col-lg-8">
                  <div class="row row-cols-1 row-cols-lg-2 gy-4">
                    <div class="col col-lg-6">
                      <label class="form-label text-primary" for="tin">
                        <small><strong>NIF</strong></small>
                      </label>
                      <div class="input-group">
                        <span class="input-group-text text-bg-primary">
                          <i class="fa fa-vcard"></i>
                        </span>
                        <input
                          v-model="company.tin"
                          class="form-control form-control-sm"
                          id="tin"
                          placeholder="Digite o NIF do cliente"
                          required
                          maxlength="14"
                        />
                      </div>
                    </div>

                    <div class="col col-lg-6">
                      <label class="form-label text-primary" for="name">
                        <small><strong>Nome</strong></small>
                      </label>
                      <div class="input-group">
                        <span class="input-group-text text-bg-primary">
                          <i class="fa fa-user"></i>
                        </span>
                        <input
                          v-model="company.name"
                          class="form-control form-control-sm"
                          id="name"
                          placeholder="Digite o nome da empresa"
                          required
                        />
                      </div>
                    </div>

                    <div class="col col-lg-6">
                      <label class="form-label text-primary" for="slogan">
                        <small><strong>Slogan</strong></small>
                      </label>
                      <div class="input-group">
                        <span class="input-group-text text-bg-primary">
                          <i class="fa fa-vcard"></i>
                        </span>
                        <input
                          v-model="company.slogan"
                          class="form-control form-control-sm"
                          id="slogan"
                          placeholder="Digite o slogan da empresa"
                        />
                      </div>
                    </div>

                    <div class="col col-lg-6">
                      <label class="form-label text-primary" for="address">
                        <small><strong>Endereço</strong></small>
                      </label>
                      <div class="input-group">
                        <span class="input-group-text text-bg-primary">
                          <i class="fa fa-map"></i>
                        </span>
                        <input
                          v-model="company.address"
                          class="form-control form-control-sm"
                          id="address"
                          placeholder="Digite o endereço"
                        />
                      </div>
                    </div>

                    <div class="col col-lg-6">
                      <label class="form-label text-primary" for="email">
                        <small><strong>E-mail</strong></small>
                      </label>
                      <div class="input-group">
                        <span class="input-group-text text-bg-primary">
                          <i class="fa fa-envelope"></i>
                        </span>
                        <input
                          v-model="company.email"
                          class="form-control form-control-sm"
                          id="email"
                          placeholder="Digite o e-mail"
                          type="email"
                        />
                      </div>
                    </div>

                    <div class="col col-lg-6">
                      <label class="form-label text-primary" for="phone">
                        <small><strong>Telemóvel</strong></small>
                      </label>
                      <div class="input-group">
                        <span class="input-group-text text-bg-primary">
                          <i class="fa fa-phone"></i>
                        </span>
                        <input
                          v-model="company.phone"
                          class="form-control form-control-sm"
                          id="phone"
                          placeholder="Digite o número de telemóvel"
                          type="number"
                          maxlength="9"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col col-lg-4">
                  <div class="justify-content-end image-box">
                    <label class="form-label text-primary" for="picture">
                      <small><strong>Logotipo da Empresa</strong></small>
                    </label>
                    <br />

                    <label class="avatar" for="btn">
                      <img
                        alt="Foto"
                        class="rounded"
                        height="200px"
                        src="@/assets/img/no-image.png"
                      />
                    </label>

                    <input type="checkbox" id="btn" />

                    <div class="btn-box">
                      <label for="picture"
                        ><span class="fas fa-upload load-picture"></span>
                        Procurar foto...</label
                      >
                    </div>
                  </div>
                </div>

                <div class="col col-lg-4">
                  <label class="form-label text-primary" for="alternativePhone">
                    <small><strong>Telemóvel Alternativo</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fa fa-phone"></i>
                    </span>
                    <input
                      v-model="company.alternativePhone"
                      class="form-control form-control-sm"
                      id="alternativePhone"
                      placeholder="Digite o número de telemóvel alternativo"
                      type="number"
                      maxlength="9"
                    />
                  </div>
                </div>

                <div class="col col-lg-4">
                  <label class="form-label text-primary" for="fax">
                    <small><strong>FAX</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fa fa-fax"></i>
                    </span>
                    <input
                      v-model="company.fax"
                      class="form-control form-control-sm"
                      id="fax"
                      placeholder="Digite o FAX"
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
import { EDIT_COMPANY } from "@/store/companies/company.constants";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "EditCompany",
  data: () => {
    return {
      company: {}
    };
  },
  computed: {
    ...mapGetters("company", ["getCompanyById", "getMessage"])
  },
  methods: {
    update() {
      this.$store.dispatch(`company/${EDIT_COMPANY}`, this.$data.company).then(
        () => {
          this.$alert(
            this.getMessage,
            "Dados da empresa atualizados!",
            "success"
          );
          router.push({ name: "home" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  },
  created() {
    this.company = this.getCompanyById(this.$route.params.companyId);
  }
};
</script>
