<template>
  <section class="page-section">
    <b-container>
      <form @submit.prevent="update">
        <div class="card bg-white shadow p-3">
          <h1 class="h5 pb-2 text-secondary border-bottom">
            EDITAR CLIENTE
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
                      <i class="fa fa-vcard"></i>
                    </span>
                    <input
                      v-model="customer.tin"
                      class="form-control form-control-sm"
                      id="tin"
                      placeholder="Digite o NIF do cliente"
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
                      v-model="customer.name"
                      class="form-control form-control-sm"
                      id="name"
                      placeholder="Digite o nome do cliente"
                      required
                    />
                  </div>
                </div>

                <div class="col">
                  <label class="form-label text-primary" for="idCard">
                    <small><strong>BI</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fa fa-vcard"></i>
                    </span>
                    <input
                      v-model="customer.idCard"
                      class="form-control form-control-sm"
                      id="idCard"
                      placeholder="Digite o número do BI"
                      required
                      maxlength="14"
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
                      v-model="customer.naturalityId"
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
                      v-model="customer.address"
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
                      v-model="customer.email"
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
                      v-model="customer.phone"
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
                      v-model="customer.alternativePhone"
                      class="form-control form-control-sm"
                      id="alternativePhone"
                      placeholder="Digite o número de telemóvel alternativo"
                      type="number"
                      maxlength="9"
                    />
                  </div>
                </div>

                <div class="col">
                  <label class="form-label d-block pe-0 pe-lg-3 text-primary">
                    <small><strong>Retenção de fonte</strong></small>
                  </label>

                  <b-row>
                    <b-col>
                      <div class="input-group">
                        <span class="input-group-text text-bg-primary">
                          <i class="fa fa-percent"></i>
                        </span>
                        <input
                          v-model="customer.withholdingTaxPercentage"
                          class="form-control form-control-sm"
                          id="withholdingTaxPercentage"
                          type="number"
                          placeholder="0.0"
                          step="any"
                        />
                      </div>
                    </b-col>

                    <div class="col-12 col-lg-6 d-flex align-items-end">
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="withholdingTax"
                          id="option1"
                          v-model="selectedOption"
                          value="1"
                        />

                        <label
                          class="form-check-label"
                          for="option1"
                          style="cursor: pointer;"
                        >
                          Sim
                        </label>
                      </div>

                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="withholdingTax"
                          id="option2"
                          v-model="selectedOption"
                          value="0"
                        />

                        <label
                          class="form-check-label"
                          for="option2"
                          style="cursor: pointer;"
                        >
                          Não
                        </label>
                      </div>
                    </div>
                  </b-row>
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
import { EDIT_CUSTOMER } from "@/store/customers/customer.constants";
import router from "@/router";
import { mapGetters } from "vuex";
import { FETCH_NATURALITIES } from "@/store/naturalities/naturality.constants";

export default {
  name: "EditCustomer",
  data: () => {
    return {
      customer: {},
      naturalities: []
    };
  },
  computed: {
    ...mapGetters("customer", ["getCustomerById", "getMessage"]),
    ...mapGetters("naturality", ["getNaturalities"]),
    selectedOption() {
      return this.customer.withholdingTax === 1 ||
        this.customer.withholdingTax === true
        ? "1"
        : "0";
    }
  },
  methods: {
    update() {
      this.$store
        .dispatch(`customer/${EDIT_CUSTOMER}`, this.$data.customer)
        .then(
          () => {
            this.$alert(this.getMessage, "Cliente atualizado!", "success");
            router.push({ name: "listCustomers" });
          },
          err => {
            this.$alert(`${err.message}`, "Erro", "error");
          }
        );
    }
  },
  created() {
    this.customer = this.getCustomerById(this.$route.params.customerId);
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
