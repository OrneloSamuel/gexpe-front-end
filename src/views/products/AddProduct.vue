<template>
  <section class="page-section">
    <b-container>
      <form @submit.prevent="add">
        <div class="card bg-white shadow p-3">
          <h1 class="h5 pb-2 text-secondary border-bottom">
            CADASTRAR PRODUTO
          </h1>

          <div class="py-4 px-2 bg-body-secondary rounded-4">
            <div class="container-fluid">
              <div class="row row-cols-1 row-cols-lg-2 gy-4">
                <div class="col col-lg-8">
                  <div class="row row-cols-1 row-cols-lg-2 gy-4">
                    <div class="col col-lg-6">
                      <label class="form-label text-primary" for="name">
                        <small><strong>Nome</strong></small>
                      </label>
                      <div class="input-group">
                        <span class="input-group-text text-bg-primary">
                          <i class="fa fa-user"></i>
                        </span>
                        <input
                          v-model="name"
                          class="form-control form-control-sm"
                          id="name"
                          placeholder="Digite o nome do produto"
                          required
                        />
                      </div>
                    </div>

                    <div class="col col-lg-6">
                      <label class="form-label text-primary" for="description">
                        <small><strong>Descrição</strong></small>
                      </label>
                      <div class="input-group">
                        <span class="input-group-text text-bg-primary">
                          <i class="far fa-circle"></i>
                        </span>
                        <input
                          v-model="description"
                          class="form-control form-control-sm"
                          id="description"
                          placeholder="Digite a descrição do produto"
                          required
                        />
                      </div>
                    </div>

                    <div class="col col-lg-6">
                      <label class="form-label text-primary" for="barcode">
                        <small><strong>Código de Barra</strong></small>
                      </label>
                      <div class="input-group">
                        <span class="input-group-text text-bg-primary">
                          <i class="fas fa-barcode"></i>
                        </span>
                        <input
                          v-model="barcode"
                          class="form-control form-control-sm"
                          id="barcode"
                          placeholder="Digite o código de barra"
                          required
                        />
                      </div>
                    </div>

                    <div class="col col-lg-6">
                      <label
                        class="form-label text-primary"
                        for="productCategoryId"
                      >
                        <small><strong>Categoria</strong></small>
                      </label>
                      <div class="input-group">
                        <span class="input-group-text text-bg-primary">
                          <i class="fas fa-bookmark"></i>
                        </span>
                        <select
                          v-model="productCategoryId"
                          class="form-control form-control-sm"
                        >
                          <option
                            v-for="productCategory in productCategories"
                            :key="productCategory._id"
                            :value="productCategory._id"
                            :selected="true"
                            >{{ productCategory.name }}</option
                          >
                        </select>
                      </div>
                    </div>

                    <div class="col col-lg-6">
                      <label class="form-label text-primary" for="brandId">
                        <small><strong>Marca</strong></small>
                      </label>
                      <div class="input-group">
                        <span class="input-group-text text-bg-primary">
                          <i class="fas fa-bookmark"></i>
                        </span>
                        <select
                          v-model="brandId"
                          class="form-control form-control-sm"
                        >
                          <option
                            v-for="brand in brands"
                            :key="brand._id"
                            :value="brand._id"
                            :selected="true"
                            >{{ brand.name }}</option
                          >
                        </select>
                      </div>
                    </div>

                    <div class="col col-lg-6">
                      <label class="form-label text-primary" for="unit">
                        <small><strong>Unidade</strong></small>
                      </label>
                      <div class="input-group">
                        <span class="input-group-text text-bg-primary">
                          <i class="far fa-circle"></i>
                        </span>
                        <input
                          v-model="unit"
                          class="form-control form-control-sm"
                          id="unit"
                          placeholder="Digite a unidade de medida"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col col-lg-4">
                  <div class="justify-content-end image-box">
                    <label class="form-label text-primary" for="picture">
                      <small><strong>Adicionar Imagem</strong></small>
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
                  <label class="form-label text-primary" for="cost">
                    <small><strong>Preço de Custo</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fas fa-money-bill"></i>
                    </span>
                    <input
                      v-model="cost"
                      class="form-control form-control-sm"
                      id="cost"
                      type="number"
                      step="any"
                    />
                  </div>
                </div>

                <div class="col col-lg-4">
                  <label class="form-label text-primary" for="price">
                    <small><strong>Preço de Venda</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fas fa-money-bill"></i>
                    </span>
                    <input
                      v-model="price"
                      class="form-control form-control-sm"
                      id="price"
                      type="number"
                      step="any"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card bg-white shadow p-3 mt-3">
          <h1 class="h5 pb-2 text-secondary border-bottom">
            Impostos
          </h1>

          <div class="py-4 px-2 bg-body-secondary rounded-4">
            <div class="container-fluid">
              <div class="row row-cols-1 row-cols-lg-2 gy-4">
                <div class="col">
                  <label class="form-label text-primary" for="taxRateId">
                    <small><strong>Imposto</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fas fa-percent"></i>
                    </span>
                    <select
                      v-model="taxRateId"
                      class="form-control form-control-sm"
                    >
                      <option
                        v-for="taxRate in taxRates"
                        :key="taxRate._id"
                        :value="taxRate._id"
                        :selected="true"
                        >{{ taxRate.description }}</option
                      >
                    </select>
                  </div>
                </div>

                <div class="col">
                  <label
                    class="form-label text-primary"
                    for="reasonExemptionId"
                  >
                    <small><strong>Motivo de insenção</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fas fa-sitemap"></i>
                    </span>
                    <select
                      v-model="reasonExemptionId"
                      class="form-control form-control-sm"
                    >
                      <option
                        v-for="reasonExemption in reasonExemptions"
                        :key="reasonExemption._id"
                        :value="reasonExemption._id"
                        :selected="true"
                        >{{ reasonExemption.name }}</option
                      >
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card bg-white shadow p-3 mt-3">
          <h1 class="h5 pb-2 text-secondary border-bottom">
            Stock
          </h1>

          <div class="py-4 px-2 bg-body-secondary rounded-4">
            <div class="container-fluid">
              <div class="row row-cols-1 row-cols-lg-2 gy-4">
                <div class="col col-lg-6">
                  <label class="form-label text-primary" for="supplierId">
                    <small><strong>Fornecedor</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fa fa-user"></i>
                    </span>
                    <select
                      v-model="supplierId"
                      class="form-control form-control-sm"
                    >
                      <option
                        v-for="supplier in suppliers"
                        :key="supplier._id"
                        :value="supplier._id"
                        :selected="true"
                        >{{ supplier.name }}</option
                      >
                    </select>
                  </div>
                </div>

                <div class="col">
                  <label class="form-label text-primary" for="currentStock">
                    <small><strong>Quantidade em Estoque</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="far fa-circle"></i>
                    </span>
                    <input
                      v-model="currentStock"
                      class="form-control form-control-sm"
                      id="currentStock"
                      type="number"
                      step="any"
                    />
                  </div>
                </div>

                <div class="col col-lg-4">
                  <label class="form-label text-primary" for="minimumStock">
                    <small><strong>Estoque Mínimo</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="far fa-circle"></i>
                    </span>
                    <input
                      v-model="minimumStock"
                      class="form-control form-control-sm"
                      id="minimumStock"
                      type="number"
                      step="any"
                    />
                  </div>
                </div>

                <div class="col col-lg-4">
                  <label class="form-label text-primary" for="weight">
                    <small><strong>Peso</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fa fa-weight"></i>
                    </span>
                    <input
                      v-model="weight"
                      class="form-control form-control-sm"
                      id="weight"
                      type="number"
                      step="any"
                    />
                  </div>
                </div>

                <div class="col col-lg-4">
                  <label class="form-label text-primary" for="expirationDate">
                    <small><strong>Data de Expiração</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fa fa-calendar"></i>
                    </span>
                    <input
                      v-model="expirationDate"
                      class="form-control form-control-sm"
                      id="expirationDate"
                      type="date"
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

          <button class="btn btn-outline-primary shadow-sm mb-3">
            <i class="fa fa-save"></i>
            Guardar
          </button>
        </div>
      </form>
    </b-container>
  </section>
</template>

<script>
import { ADD_PRODUCT } from "@/store/products/product.constants";
import router from "@/router";
import { mapGetters } from "vuex";
import { FETCH_PRODUCTCATEGORIES } from "@/store/productCategories/productCategory.constants";
import { FETCH_BRANDS } from "@/store/brands/brand.constants";
import { FETCH_TAXRATES } from "@/store/taxRates/taxRate.constants";
import { FETCH_REASONEXEMPTIONS } from "@/store/reasonExemptions/reasonExemption.constants";
import { FETCH_SUPPLIERS } from "@/store/suppliers/supplier.constants";

export default {
  name: "AddSupllier",
  data: () => {
    return {
      name: "",
      description: "",
      barcode: "",
      productCategoryId: "",
      unit: "",
      cost: "",
      taxRateId: "",
      supplierId: "",
      currentStock: "",
      minimumStock: "",
      weight: "",
      price: "",
      type: "P",
      expirationDate: "",
      reasonExemptionId: "",
      brandId: "",
      productCategories: [],
      brands: [],
      taxRates: [],
      reasonExemptions: [],
      suppliers: []
    };
  },
  computed: {
    ...mapGetters("product", ["getMessage"]),
    ...mapGetters("productCategory", ["getProductCategories"]),
    ...mapGetters("brand", ["getBrands"]),
    ...mapGetters("taxRate", ["getTaxRates"]),
    ...mapGetters("reasonExemption", ["getReasonExemptions"]),
    ...mapGetters("supplier", ["getSuppliers"])
  },
  methods: {
    add() {
      this.$store.dispatch(`product/${ADD_PRODUCT}`, this.$data).then(
        () => {
          this.$alert(this.getMessage, "Produto adicionado!", "success");
          router.push({ name: "listProducts" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  },
  created() {
    this.$store.dispatch(`productCategory/${FETCH_PRODUCTCATEGORIES}`).then(
      () => {
        this.productCategories = this.getProductCategories;
      },
      err => {
        this.$alert(`${err.message}`, "Erro", "error");
      }
    );
    this.$store.dispatch(`brand/${FETCH_BRANDS}`).then(
      () => {
        this.brands = this.getBrands;
      },
      err => {
        this.$alert(`${err.message}`, "Erro", "error");
      }
    );
    this.$store.dispatch(`taxRate/${FETCH_TAXRATES}`).then(
      () => {
        this.taxRates = this.getTaxRates;
      },
      err => {
        this.$alert(`${err.message}`, "Erro", "error");
      }
    );
    this.$store.dispatch(`reasonExemption/${FETCH_REASONEXEMPTIONS}`).then(
      () => {
        this.reasonExemptions = this.getReasonExemptions;
      },
      err => {
        this.$alert(`${err.message}`, "Erro", "error");
      }
    );
    this.$store.dispatch(`supplier/${FETCH_SUPPLIERS}`).then(
      () => {
        this.suppliers = this.getSuppliers;
      },
      err => {
        this.$alert(`${err.message}`, "Erro", "error");
      }
    );
  }
};
</script>
