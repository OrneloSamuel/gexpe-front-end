<template>
  <div class="mb-5">
    <b-navbar toggleable="lg" style="background-color: #d57806;">
      <b-navbar-brand
        :to="{ name: 'home' }"
        class="mx-5"
        style="font-weight: bolder;"
      >
        GExpe
      </b-navbar-brand>
      <!--:src="require('@/assets/img/favicon-32x32.png')"-->

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse text-right" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto mr-5">
          <b-nav-item :to="{ name: 'listCustomers' }">Clientes</b-nav-item>
          <b-nav-item :to="{ name: 'listSuppliers' }">Fornecedores</b-nav-item>
          <b-nav-item-dropdown
            id="my-nav-dropdown"
            text="Produtos"
            toggle-class="nav-link-custom"
            right
          >
            <b-dropdown-item :to="{ name: 'listProducts' }"
              >Cadastrar Produto</b-dropdown-item
            >
            <b-dropdown-item to="{ name: 'product-entry' }"
              >Entrada de Produto</b-dropdown-item
            >
            <b-dropdown-item to="{ name: 'product-output' }"
              >Saída de Produto</b-dropdown-item
            >
            <b-dropdown-item :to="{ name: 'listProductCategories' }"
              >Categoria de Produto</b-dropdown-item
            >
            <b-dropdown-item :to="{ name: 'listBrands' }"
              >Marcas de Produto</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item :to="{ name: 'addInvoice' }">Realizar Vendas</b-nav-item>
          <b-nav-item-dropdown
            id="my-nav-dropdown"
            text="Relatórios"
            toggle-class="nav-link-custom"
            right
          >
            <b-dropdown-item :to="{ name: 'listInvoices' }"
              >Movimentos do Caixa</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item-dropdown
            id="my-nav-dropdown"
            text="Configurações"
            toggle-class="nav-link-custom"
            right
          >
            <b-dropdown-item
              :to="{
                name: 'editCompany',
                params: { companyId: companies[0]._id }
              }"
              >Dados da Empresa</b-dropdown-item
            >
            <b-dropdown-item :to="{ name: 'listBanks' }"
              >Bancos</b-dropdown-item
            >
            <b-dropdown-item :to="{ name: 'listPaymentMethods' }"
              >Formas de Pagamento</b-dropdown-item
            >
            <b-dropdown-item :to="{ name: 'listTaxRates' }"
              >Taxas de Impostos</b-dropdown-item
            >
            <b-dropdown-item :to="{ name: 'listReasonExemptions' }"
              >Razões de Isenção</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { FETCH_COMPANIES } from "@/store/companies/company.constants";
import { mapGetters } from "vuex";
export default {
  name: "NavBar",
  data: function() {
    return {
      companies: []
    };
  },
  computed: {
    ...mapGetters("company", ["getCompanies", "getMessage"])
  },
  created() {
    this.$store.dispatch(`company/${FETCH_COMPANIES}`).then(
      () => {
        this.companies = this.getCompanies;
      },
      err => {
        this.$alert(`${err.message}`, "Erro", "error");
      }
    );
  }
};
</script>
