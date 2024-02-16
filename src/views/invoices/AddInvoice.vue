<template>
  <section class="page-section">
    <b-container>
      <form @submit.prevent="add">
        <div class="card bg-white shadow p-3">
          <h1 class="h5 pb-2 text-secondary border-bottom">
            CADASTRAR VENDAS
          </h1>

          <div class="py-4 px-2 bg-body-secondary rounded-4">
            <div class="container-fluid">
              <div class="row gy-4">
                <div class="col-12 col-lg-12">
                  <label class="form-label text-primary" for="getCustomerId">
                    <small><strong>Seleccione o cliente</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fas fa-user"></i>
                    </span>
                    <select
                      v-model="getCustomerId"
                      class="form-control form-control-sm"
                      required
                      :disabled="getCustomerIdDisabled"
                    >
                      <option
                        v-for="customer in customers"
                        :key="customer._id"
                        :value="customer._id"
                        :selected="true"
                        >{{ customer.name }}</option
                      >
                    </select>
                  </div>
                </div>
              </div>

              <div class="row row-cols-1 row-cols-lg-4 pt-2 gy-4">
                <div class="col">
                  <label class="form-label text-primary" for="tin">
                    <small><strong>NIF</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fas fa-circle"></i>
                    </span>
                    <input
                      v-model="tin"
                      class="form-control form-control-sm"
                      readonly
                    />
                  </div>
                </div>

                <div class="col">
                  <label class="form-label text-primary" for="idCard">
                    <small><strong>BI</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fas fa-circle"></i>
                    </span>
                    <input
                      class="form-control form-control-sm"
                      readonly
                      v-model="idCard"
                    />
                  </div>
                </div>

                <div class="col">
                  <label class="form-label text-primary" for="phone">
                    <small><strong>Telemóvel</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fa fa-mobile-alt"></i>
                    </span>
                    <input
                      class="form-control form-control-sm"
                      readonly
                      v-model="phone"
                    />
                  </div>
                </div>

                <div class="col">
                  <button
                    @click="startPayment"
                    class="mt-4 btn btn-primary"
                    type="button"
                  >
                    <i
                      :class="
                        paymentStarted ? 'fa fa-undo' : 'fa fa-check-circle'
                      "
                    ></i>
                    <span v-if="!paymentStarted"> Iniciar Pagamento</span>
                    <span v-else> Reiniciar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card bg-white shadow p-2 mt-3">
          <div class="py-4 px-2 bg-body-secondary rounded-4">
            <div class="container-fluid">
              <div class="row gy-4 pb-3 border-primary">
                <div class="col-12 col-lg-4">
                  <label class="form-label text-primary" for="productId">
                    <small><strong>Produto</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fas fa-bookmark"></i>
                    </span>
                    <select
                      v-model="productId"
                      class="form-control form-control-sm"
                      :disabled="productDisabled"
                    >
                      <option
                        v-for="product in products"
                        :key="product._id"
                        :value="product._id"
                        :selected="true"
                        >{{ product.name }}</option
                      >
                    </select>
                  </div>
                </div>

                <div class="col">
                  <label class="form-label text-primary" for="getPrice">
                    <small><strong>Preço</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fas fa-money-bill"></i>
                    </span>
                    <input
                      class="form-control form-control-sm"
                      readonly
                      type="number"
                      v-model="getPrice"
                    />
                  </div>
                </div>

                <div class="col">
                  <label class="form-label text-primary" for="getQuantity">
                    <small><strong>Quantidade</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fas fa-circle"></i>
                    </span>
                    <input
                      class="form-control form-control-sm"
                      :disabled="getQuantityDisabled"
                      v-model="getQuantity"
                      type="number"
                      min="1"
                    />
                  </div>
                </div>

                <div class="col">
                  <label
                    class="form-label text-primary"
                    for="getDiscountPercentage"
                  >
                    <small><strong>Desconto %</strong></small>
                  </label>
                  <div class="input-group">
                    <span class="input-group-text text-bg-primary">
                      <i class="fas fa-money-bill"></i>
                    </span>
                    <input
                      class="form-control form-control-sm"
                      readonly
                      type="number"
                      v-model="getDiscountPercentage"
                    />
                  </div>
                </div>

                <div class="col-12 col-lg-2 d-inline-flex align-items-end">
                  <button
                    class="btn btn-sm btn-primary"
                    type="button"
                    @click="addInvoiceItem"
                    :disabled="addInvoiceItemDisabled"
                  >
                    <i class="fas fa-plus-circle"></i> Adicionar
                  </button>
                </div>
              </div>

              <div
                class="table-responsive"
                x-transition
                data-overlayscrollbars-initialize
              >
                <table
                  class="table table-sm table-striped border"
                  v-if="items.length"
                >
                  <tr>
                    <td class="text-center">
                      Produto
                    </td>
                    <td class="text-center">
                      Desconto %
                    </td>
                    <td class="text-center">
                      IVA %
                    </td>
                    <td class="text-center">
                      P. Unit.
                    </td>
                    <td class="text-center">
                      Qtd.
                    </td>
                    <td class="text-center">
                      Total
                    </td>
                    <td class="text-center">
                      Opções
                    </td>
                  </tr>
                  <tbody>
                    <tr v-for="(item, index) in items" :key="index">
                      <td>{{ item.product }}</td>
                      <td class="text-center">{{ item.discountAmount }}</td>
                      <td class="text-center">{{ item.taxPercentage }}</td>
                      <td class="text-center">{{ item.price }}</td>
                      <td class="text-center">{{ item.quantity }}</td>
                      <td class="text-center">{{ item.totalAmount }}</td>
                      <td class="text-center">
                        <button
                          class="btn btn-danger btn-sm"
                          @click="removeInvoiceItem(index)"
                        >
                          <span class="fas fa-eraser"></span>
                          Remover
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="d-flex justify-content-end align-items-baseline">
                <button
                  class="btn btn-sm btn-primary shadow-sm"
                  type="button"
                  @click="cleanInvoiceItem"
                  :disabled="cleanInvoiceItemDisabled"
                  v-if="items.length"
                >
                  <i class="fa fa-eraser"></i> Limpar Itens
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="card bg-white shadow p-2 mt-3">
          <div class="py-4 px-2 bg-body-secondary rounded-4">
            <div class="container-fluid">
              <div class="row row-cols-1 row-cols-lg-2 gy-4">
                <div class="col col-lg-9">
                  <div class="row row-cols-1 row-cols-lg-2 gy-4">
                    <div class="col col-lg-6">
                      <label
                        class="form-label text-primary"
                        for="paymentMethodId"
                      >
                        <small><strong>Forma de Pagamento</strong></small>
                      </label>
                      <div class="input-group">
                        <span class="input-group-text text-bg-primary">
                          <i class="fas fa-money-bill"></i>
                        </span>
                        <select
                          v-model="paymentMethodId"
                          class="form-control form-control-sm"
                          :disabled="paymentMethodIdDisabled"
                        >
                          <option
                            v-for="paymentMethod in paymentMethods"
                            :key="paymentMethod._id"
                            :value="paymentMethod._id"
                            :selected="true"
                            >{{ paymentMethod.name }}</option
                          >
                        </select>
                      </div>
                    </div>

                    <div class="col col-lg-6">
                      <label class="form-label text-primary" for="bankId">
                        <small><strong>Banco</strong></small>
                      </label>
                      <div class="input-group">
                        <span class="input-group-text text-bg-primary">
                          <i class="fas fa-piggy-bank"></i>
                        </span>
                        <select
                          v-model="bankId"
                          class="form-control form-control-sm"
                          :disabled="bankIdDisabled"
                        >
                          <option
                            v-for="bank in banks"
                            :key="bank._id"
                            :value="bank._id"
                            :selected="true"
                            >{{ bank.name }}</option
                          >
                        </select>
                      </div>
                    </div>

                    <div class="col">
                      <label class="form-label text-primary" for="amountPaid">
                        <small><strong>Valor Pago</strong></small>
                      </label>
                      <div class="input-group">
                        <span class="input-group-text text-bg-primary">
                          <i class="fas fa-money-bill"></i>
                        </span>
                        <input
                          class="form-control form-control-sm"
                          v-model="amountPaid"
                          type="number"
                          :disabled="amountPaidDisabled"
                        />
                      </div>
                    </div>

                    <div class="col col-lg-6 d-inline-flex align-items-end">
                      <button
                        class="btn btn-sm btn-primary"
                        type="button"
                        :disabled="addPaymentMethodDisabled"
                        @click="addPaymentMethod"
                      >
                        <i class="fa fa-plus-circle"></i> Adicionar
                      </button>
                    </div>

                    <div class="col col-lg-12">
                      <div
                        class="table-responsive"
                        x-transition
                        data-overlayscrollbars-initialize
                        v-if="payments.length"
                      >
                        <table class="table table-sm table-striped border">
                          <tr>
                            <td class="text-center">Forma de Pagamento</td>
                            <td class="text-center">Banco</td>
                            <td class="text-center">Valor Pago</td>
                            <td class="text-center">Acção</td>
                          </tr>
                          <tbody>
                            <tr
                              v-for="(payment, index) in payments"
                              :key="index"
                            >
                              <td>{{ payment.paymentMethod }}</td>
                              <td>{{ payment.bank }}</td>
                              <td class="text-center">
                                {{ payment.amountPaid }}
                              </td>
                              <td class="text-center">
                                <button
                                  class="btn btn-danger btn-sm"
                                  @click="removePayment(index)"
                                >
                                  <span class="fas fa-eraser"></span> Remover
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col col-lg-3">
                  <label>
                    <strong>Total: </strong
                    ><span style="font-weight: normal">{{
                      total
                    }}</span> </label
                  ><br />
                  <label>
                    <strong>Desconto: </strong
                    ><span style="font-weight: normal">{{
                      totalDiscount
                    }}</span> </label
                  ><br />
                  <label>
                    <strong>Valor a Pagar: </strong
                    ><span style="font-weight: normal">{{
                      totalPay
                    }}</span> </label
                  ><br />
                  <label style="color: blue">
                    <strong>Saldo: </strong
                    ><span style="font-weight: normal">{{
                      balance
                    }}</span> </label
                  ><br />
                  <label>
                    <strong>Pago: </strong
                    ><span style="font-weight: normal">{{
                      amount
                    }}</span> </label
                  ><br />
                  <label style="color: red">
                    <strong>Em Falta: </strong
                    ><span style="font-weight: normal">
                      {{ remains }}</span
                    > </label
                  ><br />
                  <label>
                    <strong>Saldo Novo: </strong
                    ><span style="font-weight: normal">{{
                      change
                    }}</span> </label
                  ><br />
                  <button
                    class="btn btn-sm btn-primary mt-2"
                    type="button"
                    onclick="invoice.calculator()"
                  >
                    <i class="fa fa-calculator"></i> Calculadora
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-end align-items-baseline mt-4">
          <button
            class="btn btn-outline-danger border shadow-sm me-4 mb-lg-0"
            @click="restart"
            :disabled="restartDisabled"
          >
            <i class="fa fa-undo"></i>
            Reiniciar
          </button>

          <button
            class="btn btn-outline-primary shadow-sm mb-3"
            type="button"
            @click="save"
            :disabled="saveDisabled"
          >
            <i class="fa fa-save"></i>
            Guardar
          </button>
        </div>
      </form>
    </b-container>
  </section>
</template>

<script>
import { ADD_INVOICE } from "@/store/invoices/invoice.constants";
import { mapGetters } from "vuex";
import { FETCH_PRODUCTS } from "@/store/products/product.constants";
import { FETCH_PAYMENTMETHODS } from "@/store/paymentMethods/paymentMethod.constants";
import { FETCH_BANKS } from "@/store/banks/bank.constants";
import { FETCH_CUSTOMERS } from "@/store/customers/customer.constants";

export default {
  name: "AddInvoice",
  data: () => {
    return {
      getCustomerId: null,
      customerId: null,
      customer: null,
      name: null,
      address: null,
      phone: null,
      change: 0.0,
      amount: 0.0,
      amountPaid: null,
      withholdingTax: null,
      withholdingTaxAmount: 0.0,
      invoiceType: "FR",
      tin: null,
      productId: null,
      bankId: null,
      paymentMethodId: null,
      getQuantity: 1,
      products: [],
      banks: [],
      paymentMethods: [],
      customers: [],
      paymentStarted: false,
      discountPercentage: 0.0,
      items: [],
      product: null,
      taxPercentage: 0.0,
      reasonExemption: "",
      reasonExemptionCode: "",
      productType: "P",
      currentStock: null,
      total: 0.0,
      totalDiscount: 0.0,
      changeStatus: 0,
      totalPay: 0.0,
      saveDisabled: true,
      remains: 0.0,
      addPaymentMethodDisabled: true,
      getCustomerIdDisabled: false,
      idCard: null,
      addInvoiceItemDisabled: true,
      productDisabled: true,
      getQuantityDisabled: true,
      getDiscountPercentage: 0,
      getPrice: null,
      paymentMethodIdDisabled: true,
      bankIdDisabled: true,
      amountPaidDisabled: true,
      cleanInvoiceItemDisabled: true,
      payments: [],
      balance: 0.0,
      paymentMethod: null,
      bank: null,
      restartDisabled: true,
      withholdingTaxPercentage: 0.0
    };
  },
  computed: {
    ...mapGetters("invoice", ["getMessage"]),
    ...mapGetters("product", ["getProducts"]),
    ...mapGetters("paymentMethod", ["getPaymentMethods"]),
    ...mapGetters("bank", ["getBanks"]),
    ...mapGetters("customer", ["getCustomers"])
  },
  methods: {
    add() {
      this.$store.dispatch(`invoice/${ADD_INVOICE}`, this.$data).then(
        () => {
          this.$alert(this.getMessage, "Pagamento adicionado!", "success");
          this.restart();
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    startPayment() {
      if (this.getCustomerId) {
        this.paymentStarted = !this.paymentStarted;
        this.getCustomerIdDisabled = !this.getCustomerIdDisabled;
        this.addInvoiceItemDisabled = !this.addInvoiceItemDisabled;
        this.productDisabled = !this.productDisabled;
        this.getQuantityDisabled = !this.getQuantityDisabled;
        if (!this.paymentStarted) {
          this.restart();
        } else {
          this.restartDisabled = false;
        }
      } else {
        this.showMessage("Seleccione o cliente!");
      }
    },
    showMessage(message) {
      alert(message);
    },
    addInvoiceItem() {
      let discountAmount = (this.getPrice * this.getDiscountPercentage) / 100;
      const totalAmount = this.getPrice * this.getQuantity;

      if (isNaN(discountAmount)) {
        discountAmount = 0.0;
      }

      if (this.getPrice > 0 && this.getQuantity > 0) {
        if (this.currentStock > 0) {
          if (this.getQuantity > this.currentStock) {
            this.getQuantity = this.currentStock;
            this.showMessage(
              "O stock do produto é de " + this.currentStock + "!"
            );
          }

          this.items.push({
            productId: this.productId,
            product: this.product,
            discountAmount,
            discountPercentage: this.discountPercentage,
            taxPercentage: this.taxPercentage,
            reasonExemption: this.reasonExemption,
            reasonExemptionCode: this.reasonExemptionCode,
            price: this.getPrice,
            quantity: this.getQuantity,
            totalAmount
          });

          this.calcInvoiceItem(totalAmount, discountAmount);

          this.getDiscountPercentage = null;
          this.getQuantity = 1;

          this.addPaymentMethodDisabled = false;
          this.paymentMethodIdDisabled = false;
          this.bankIdDisabled = false;
          this.amountPaidDisabled = false;
          this.cleanInvoiceItemDisabled = false;
        } else {
          this.showMessage("Produto esgotado no stock!");
        }
      } else {
        this.showMessage("Verifique o preço e a quantidade do produto!");
      }
    },
    calcInvoiceItem(amount, discount) {
      this.total += parseFloat(amount);
      this.totalDiscount += parseFloat(discount);
      this.totalPay = this.total - this.totalDiscount;
      this.remains = this.totalPay;
    },
    removeInvoiceItem(index) {
      const item = this.items[index];
      const amount = item.totalAmount * -1;
      const discount = item.discountAmount * -1;

      this.items.splice(index, 1);

      this.calcInvoiceItem(amount, discount);

      if (this.items.length === 1) {
        this.addPaymentMethodDisabled = true;
      }
    },
    cleanInvoiceItem() {
      this.items.splice(0);

      this.total = 0.0;
      this.totalDiscount = 0.0;
      this.totalPay = 0.0;

      this.cleanInvoiceItemDisabled = true;
      this.addPaymentMethodDisabled = true;
      this.paymentMethodIdDisabled = true;
      this.bankIdDisabled = true;
      this.amountPaidDisabled = true;
    },
    restart() {
      this.$router.go(0);
    },
    addPaymentMethod() {
      if (this.amountPaid > 0) {
        const isDuplicatePaymentMethod = this.paymentMethods.some(
          method => method.paymentMethodId === this.paymentMethodId
        );

        const isChangePaymentMethod =
          this.paymentMethod == "Descontos no Saldo" &&
          this.amountPaid > this.invoice.change;
        const isDuplicateChangeMethod =
          this.paymentMethod == "Descontos no Saldo" &&
          isDuplicatePaymentMethod;

        if (isDuplicatePaymentMethod) {
          this.showMessage(
            `Não pode adicionar dois pagamentos em <b>${this.paymentMethod}</b>!`
          );
        } else if (isChangePaymentMethod) {
          this.showMessage("O valor não pode ser maior que o saldo atual!");
        } else if (isDuplicateChangeMethod) {
          this.showMessage(
            `Não pode adicionar dois pagamentos em <b>${this.paymentMethod}</b>!`
          );
        } else {
          if (
            ["Numerário", "Descontos no Saldo"].includes(this.paymentMethod)
          ) {
            this.bankId = null;
            this.bank = "-";
          }

          this.payments.push({
            paymentMethodId: this.paymentMethodId,
            paymentMethod: this.paymentMethod,
            bankId: this.bankId,
            bank: this.bank,
            amountPaid: this.amountPaid
          });

          const discountChange = this.paymentMethod == "Descontos no Saldo";
          this.calcPayment(this.amountPaid, discountChange);
          this.amountPaid = null;

          this.saveDisabled = false;
        }
      } else {
        this.showMessage("Digite o valor pago!");
      }
    },
    calcPayment(amountPaid, discountChange) {
      if (amountPaid < 0) {
        this.change -= parseFloat(this.amount) - parseFloat(this.totalPay);
      }

      this.amount += parseFloat(amountPaid);

      this.remains = parseFloat(this.totalPay) - parseFloat(this.amount);
      this.change = discountChange
        ? parseFloat(this.change) - parseFloat(amountPaid)
        : parseFloat(this.change);

      if (this.remains < 0) {
        this.change -= this.remains;
        this.remains = 0.0;
      }
    },
    removePayment(index) {
      const amount = this.payments[index].amountPaid * -1;
      const paymentMethod = this.payments[index].paymentMethod;

      this.payments.splice(index, 1);

      const discountChange = paymentMethod == "Descontos no Saldo";
      this.calcPayment(amount, discountChange);

      this.saveDisabled = this.payments.length === 0;
    },
    save() {
      if (this.remains > 0) {
        this.showMessage("O valor pago não está completo!");
      } else {
        this.add();
      }
    }
  },
  created() {
    this.$store.dispatch(`product/${FETCH_PRODUCTS}`).then(
      () => {
        this.products = this.getProducts;
      },
      err => {
        this.$alert(`${err.message}`, "Erro", "error");
      }
    );
    this.$store.dispatch(`paymentMethod/${FETCH_PAYMENTMETHODS}`).then(
      () => {
        this.paymentMethods = this.getPaymentMethods;
      },
      err => {
        this.$alert(`${err.message}`, "Erro", "error");
      }
    );
    this.$store.dispatch(`bank/${FETCH_BANKS}`).then(
      () => {
        this.banks = this.getBanks;
      },
      err => {
        this.$alert(`${err.message}`, "Erro", "error");
      }
    );
    this.$store.dispatch(`customer/${FETCH_CUSTOMERS}`).then(
      () => {
        this.customers = this.getCustomers;
      },
      err => {
        this.$alert(`${err.message}`, "Erro", "error");
      }
    );
  },
  watch: {
    getCustomerId(newVal) {
      const selectedCustomer = this.customers.find(
        customer => customer._id === newVal
      );
      if (selectedCustomer) {
        this.customerId = selectedCustomer._id;
        this.tin = selectedCustomer.tin;
        this.idCard = selectedCustomer.idCard;
        this.phone = selectedCustomer.phone;
        this.customer = selectedCustomer.name;
        this.balance = selectedCustomer.balance;
        this.withholdingTax = selectedCustomer.withholdingTax;
        this.withholdingTaxPercentage = selectedCustomer.withholdingTaxPercentage
          ? selectedCustomer.withholdingTaxPercentage
          : 0.0;
        this.address = selectedCustomer.address;
      }
    },
    productId(newVal) {
      const selectedProduct = this.products.find(
        product => product._id === newVal
      );
      if (selectedProduct) {
        this.productId = selectedProduct._id;
        this.getPrice = selectedProduct.price;
        this.getDiscountPercentage = selectedProduct.getDiscountPercentage;
        this.product = selectedProduct.name;
        this.currentStock = selectedProduct.currentStock;
        this.reasonExemption = selectedProduct.reasonExemption
          ? selectedProduct.reasonExemption
          : "";
        this.reasonExemptionCode = selectedProduct.reasonExemptionCode
          ? selectedProduct.reasonExemptionCode
          : "";
      } else {
        this.getPrice = null;
        this.discount = null;
        this.currentStock = null;
      }
    },
    paymentMethodId(newVal) {
      const selectedPaymentMethod = this.paymentMethods.find(
        paymentMethod => paymentMethod._id === newVal
      );
      if (selectedPaymentMethod) {
        this.paymentMethodId = selectedPaymentMethod._id;
        this.paymentMethod = selectedPaymentMethod.name;
      } else {
        this.paymentMethod = null;
      }
    },
    bankId(newVal) {
      const selectedBank = this.banks.find(bank => bank._id === newVal);
      if (selectedBank) {
        this.bankId = selectedBank._id;
        this.bank = selectedBank.name;
      } else {
        this.bankId = null;
        this.bank = null;
      }
    }
  }
};
</script>
