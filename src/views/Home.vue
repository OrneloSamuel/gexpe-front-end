<template>
  <b-container fluid>
    <div class="card shadow border mt-lg-5">
      <div class="card-header bg-body-secondary p-3">
        <span class="text-primary h5">
          <i class="fas fa-laptop"></i>
          GEXPE - GESTÃO EXPERT
        </span>
      </div>

      <div class="card-body">
        <div class="container-fluid">
          <div class="row row-cols-1 row-cols-lg-2 gy-5">
            <div class="col">
              <!-- Customers -->
              <div class="card shadow-sm">
                <div class="card-body bg-light text-primary rounded-3">
                  <div class="d-flex gap-2">
                    <!-- Icon -->
                    <div class="h3">
                      <i class="fas fa-user fa-2xl"></i>
                    </div>
                    <!-- Content -->
                    <div class="d-flex flex-column gap-2 flex-fill">
                      <!-- Badge -->
                      <span class="d-block text-end h5">
                        <strong>
                          {{ customers.length }}
                        </strong>
                      </span>
                      <!-- Title -->
                      <span class="d-block h5">
                        Clientes
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col">
              <!-- Suppliers -->
              <div class="card shadow-sm">
                <div class="card-body bg-light text-primary rounded-3">
                  <div class="d-flex gap-2">
                    <!-- Icon -->
                    <div class="h3">
                      <i class="fas fa-truck fa-2xl"></i>
                    </div>
                    <!-- Content -->
                    <div class="d-flex flex-column gap-2 flex-fill">
                      <!-- Badge -->
                      <span class="d-block text-end h5">
                        <strong>
                          {{ suppliers.length }}
                        </strong>
                      </span>
                      <!-- Title -->
                      <span class="d-block h5">
                        Fornecedores
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col">
              <!-- Empty -->
              <div class="card shadow-sm">
                <div class="card-body bg-light text-primary rounded-3">
                  <div class="d-flex gap-2">
                    <!-- Icon -->
                    <div class="h3">
                      <i class="fas fa-box fa-2xl fa-fade"></i>
                    </div>
                    <!-- Content -->
                    <div class="d-flex flex-column gap-2 flex-fill">
                      <!-- Badge -->
                      <span class="d-block text-end">
                        <strong>
                          {{ products.length }}
                        </strong>
                      </span>
                      <!-- Title -->
                      <span class="d-block h5">
                        Produtos
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col">
              <!-- Invoices -->
              <div class="card shadow-sm">
                <div class="card-body bg-light text-primary rounded-3">
                  <div class="d-flex gap-2">
                    <!-- Icon -->
                    <div class="h3">
                      <i class="fas fa-cash-register fa-2xl"></i>
                    </div>
                    <!-- Content -->
                    <div class="d-flex flex-column gap-2 flex-fill">
                      <!-- Badge -->
                      <span class="d-block text-end">
                        <strong>
                          {{ invoices.length }}
                        </strong>
                      </span>
                      <!-- Title -->
                      <span class="d-block h5">
                        Vendas
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import { FETCH_CUSTOMERS } from "@/store/customers/customer.constants";
import { FETCH_PRODUCTS } from "@/store/products/product.constants";
import { FETCH_INVOICES } from "@/store/invoices/invoice.constants";
import { FETCH_SUPPLIERS } from "@/store/suppliers/supplier.constants";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data: function() {
    return {
      customers: [],
      products: [],
      invoices: [],
      suppliers: []
    };
  },
  computed: {
    ...mapGetters("customer", ["getCustomers"]),
    ...mapGetters("product", ["getProducts"]),
    ...mapGetters("invoice", ["getInvoices"]),
    ...mapGetters("supplier", ["getSuppliers"])
  },
  created() {
    this.$store.dispatch(`customer/${FETCH_CUSTOMERS}`).then(
      () => {
        this.customers = this.getCustomers;
      },
      err => {
        this.$alert(`${err.message}`, "Erro", "error");
      }
    );
    this.$store.dispatch(`product/${FETCH_PRODUCTS}`).then(
      () => {
        this.products = this.getProducts;
      },
      err => {
        this.$alert(`${err.message}`, "Erro", "error");
      }
    );
    this.$store.dispatch(`invoice/${FETCH_INVOICES}`).then(
      () => {
        this.invoices = this.getInvoices;
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
