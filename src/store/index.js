import Vue from "vue";
import Vuex from "vuex";

import moduleBase from "./module";
import moduleAuth from "./auth/auth.module";
import moduleUser from "./users/user.module";
import moduleBank from "./banks/bank.module";
import moduleBrand from "./brands/brand.module";
import moduleCompany from "./companies/company.module";
import moduleCustomer from "./customers/customer.module";
import moduleEmployee from "./employees/employee.module";
import moduleInvoice from "./invoices/invoice.module";
import moduleNaturality from "./naturalities/naturality.module";
import modulePaymentMethod from "./paymentMethods/paymentMethod.module";
import modulePermission from "./permissions/permission.module";
import moduleProductCategory from "./productCategories/productCategory.module";
import moduleProductEntry from "./productEntries/productEntry.module";
import moduleProductOutput from "./productOutputs/productOutput.module";
import moduleProduct from "./products/product.module";
import moduleProvince from "./provinces/province.module";
import moduleReasonExemption from "./reasonExemptions/reasonExemption.module";
import moduleRole from "./roles/role.module";
import moduleSupplier from "./suppliers/supplier.module";
import moduleTaxRate from "./taxRates/taxRate.module";

Vue.use(Vuex);

export default new Vuex.Store({
  getters: moduleBase.getters,
  mutations: moduleBase.mutations,
  state: moduleBase.state,
  actions: moduleBase.actions,
  modules: {
    auth: moduleAuth,
    bank: moduleBank,
    user: moduleUser,
    brand: moduleBrand,
    company: moduleCompany,
    customer: moduleCustomer,
    employee: moduleEmployee,
    invoice: moduleInvoice,
    naturality: moduleNaturality,
    paymentMethod: modulePaymentMethod,
    permission: modulePermission,
    productCategory: moduleProductCategory,
    productEntry: moduleProductEntry,
    productOutput: moduleProductOutput,
    product: moduleProduct,
    province: moduleProvince,
    reasonExemption: moduleReasonExemption,
    role: moduleRole,
    supplier: moduleSupplier,
    taxRate: moduleTaxRate
  }
});
