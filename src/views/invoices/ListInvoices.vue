<template>
  <section class="page-section">
    <b-container>
      <div class="card shadow-sm bg-body-secondary">
        <div class="card-body">
          <div class="container-fluid">
            <div class="row gy-3">
              <div class="col-12 col-md-6">
                <label class="form-label text-primary" for="initialDate">
                  <small><strong>Data Inicial</strong></small>
                </label>
                <div class="input-group">
                  <span class="input-group-text text-bg-primary">
                    <i class="fas fa-search"></i>
                  </span>
                  <input
                    class="form-control form-control-sm"
                    v-model="initialDate"
                    type="date"
                  />
                </div>
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label text-primary" for="finalDate">
                  <small><strong>Data Final</strong></small>
                </label>
                <div class="input-group">
                  <span class="input-group-text text-bg-primary">
                    <i class="fas fa-search"></i>
                  </span>
                  <input
                    class="form-control form-control-sm"
                    v-model="finalDate"
                    type="date"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-3 row-cols-auto justify-content-end">
        <div class="col">
          <button class="btn btn-secondary shadow-sm btn-sm">
            <span class="fas fa-file"> </span>
            IMPRIMIR
          </button>
        </div>

        <div class="col">
          <button class="btn btn-secondary shadow-sm btn-sm">
            <span class="fas fa-file"> </span>
            EXPORTAR PARA EXCEL
          </button>
        </div>

        <div class="col">
          <button class="btn btn-secondary shadow-sm btn-sm">
            <span class="fas fa-file"> </span>
            GERAR FICHEIRRO SAF-T
          </button>
        </div>
      </div>

      <b-row class="card shadow mt-4">
        <b-col class="card-header bg-body-secondary">
          <h5 class="h5 text-secondary">
            <i class="fa user falg"></i>Movimentos
          </h5>
        </b-col>
        <b-col class="card-body">
          <b-col
            class="table-responsive"
            x-transition
            data-overlayscrollbars-initialize
          >
            <table class="table table-sm table-striped table-hover border">
              <thead class="align-middle text-center">
                <tr class="text-center">
                  <th scope="col">
                    <i class="fas fa-file-invoice"></i> Nº do Recibo
                  </th>
                  <th scope="col">
                    <i class="fas fa-text-width"></i> Descrição
                  </th>
                  <th scope="col"><i class="fas fa-user"></i> Ordenador</th>
                  <th scope="col">
                    <i class="fas fa-money-check-alt"></i> Valor de Entrada
                  </th>
                  <th scope="col">
                    <i class="fas fa-calendar"></i> Data e Hora do Movimento
                  </th>
                  <th scope="col">
                    <i class="fas fa-cash-register"></i> Forma de Pagamento
                  </th>
                  <th scope="col"><i class="fas fa-bank"></i> Banco</th>
                  <th scope="col">
                    <i class="fas fa-user-check"></i> Operador
                  </th>
                </tr>
              </thead>
              <tbody class="table-group-divider align-middle">
                <tr v-for="invoice of filteredInvoices" :key="invoice._id">
                  <td class="text-center">
                    {{ invoice.invoiceNumber }}
                  </td>
                  <td v-if="invoice.items.length > 1">Diversos</td>
                  <td v-else>{{ invoice.items[0].product }}</td>
                  <td>
                    {{ invoice.customer }}
                  </td>
                  <td class="text-center">{{ invoice.amount }}</td>
                  <td>
                    {{ invoice.invoiceDate | formatDate }}
                  </td>
                  <td v-if="invoice.payments.length > 1">Vários</td>
                  <td v-else>{{ invoice.payments[0].paymentMethod }}</td>
                  <td v-if="invoice.payments.length > 1">---</td>
                  <td v-else>{{ invoice.payments[0].bank }}</td>
                  <td>{{ invoice.user }}</td>
                </tr>
              </tbody>
            </table>
          </b-col>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { FETCH_INVOICES } from "@/store/invoices/invoice.constants";
import { mapGetters } from "vuex";
export default {
  name: "ListInvoices",
  data: function() {
    return {
      invoices: [],
      sortType: 1,
      initialDate: Date.now,
      finalDate: Date.now
    };
  },
  computed: {
    ...mapGetters("invoice", ["getInvoices", "getMessage"]),
    filteredInvoices() {
      return this.invoices.filter(invoice => {
        const invoiceDateStr = new Date(invoice.invoiceDate)
          .toISOString()
          .slice(0, 10);
        const initialDateStr = new Date(this.initialDate)
          .toISOString()
          .slice(0, 10);
        const finalDateStr = new Date(this.finalDate)
          .toISOString()
          .slice(0, 10);

        let filterInitialDateResult = invoiceDateStr >= initialDateStr;
        let filterFinalDateResult = invoiceDateStr <= finalDateStr;
        return filterInitialDateResult && filterFinalDateResult;
      });
    }
  },
  methods: {
    fetchInvoices() {
      this.$store.dispatch(`invoice/${FETCH_INVOICES}`).then(
        () => {
          this.invoices = this.getInvoices;
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  },
  created() {
    this.fetchInvoices();
    const today = new Date();
    const formattedDate = today.toISOString().substr(0, 10);
    this.initialDate = formattedDate;
    this.finalDate = formattedDate;
  }
};
</script>
