import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/banks",
    name: "listBanks",
    component: () => import("@/views/banks/ListBanks.vue")
  },
  {
    path: "/banks/:bankId",
    name: "editBank",
    component: () => import("@/views/banks/EditBank.vue")
  },
  {
    path: "/banks/add",
    name: "addBank",
    component: () => import("@/views/banks/AddBank.vue")
  },
  {
    path: "/brands",
    name: "listBrands",
    component: () => import("@/views/brands/ListBrands.vue")
  },
  {
    path: "/brands/:brandId",
    name: "editBrand",
    component: () => import("@/views/brands/EditBrand.vue")
  },
  {
    path: "/brands/add",
    name: "addBrand",
    component: () => import("@/views/brands/AddBrand.vue")
  },
  {
    path: "/companies",
    name: "editCompany",
    component: () => import("@/views/companies/EditCompany.vue")
  },
  {
    path: "/customers",
    name: "listCustomers",
    component: () => import("@/views/customers/ListCustomers.vue")
  },
  {
    path: "/customers/:customerId",
    name: "editCustomer",
    component: () => import("@/views/customers/EditCustomer.vue")
  },
  {
    path: "/customers/add",
    name: "addCustomer",
    component: () => import("@/views/customers/AddCustomer.vue")
  } /*
  {
    path: "/employees/:eemployeeId",
    name: "eemployee",
    component: () => import("@/views/employees/ViewEmployee.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/employees",
    name: "listEmployees",
    component: () => import("@/views/employees/ListEmployees.vue")
  },
  {
    path: "/employees/:eemployeeId",
    name: "editEmployee",
    component: () => import("@/views/employees/EditEmployee.vue")
  },
  {
    path: "/employees/add",
    name: "addEmployee",
    component: () => import("@/views/employees/AddEmployee.vue")
  }*/,
  {
    path: "/invoices",
    name: "listInvoices",
    component: () => import("@/views/invoices/ListInvoices.vue")
  },
  {
    path: "/invoices/add",
    name: "addInvoice",
    component: () => import("@/views/invoices/AddInvoice.vue")
  } /*,
  {
    path: "/naturalities/:naturalityId",
    name: "naturality",
    component: () => import("@/views/naturalities/ViewNaturality.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/naturalities",
    name: "listNaturalities",
    component: () => import("@/views/naturalities/ListNaturalities.vue")
  },
  {
    path: "/naturalities/:naturalityId",
    name: "editNaturality",
    component: () => import("@/views/naturalities/EditNaturality.vue")
  },
  {
    path: "/naturalities/add",
    name: "addNaturality",
    component: () => import("@/views/naturalities/AddNaturality.vue")
  },
  {
    path: "/permissions/:permissionId",
    name: "permission",
    component: () => import("@/views/permissions/ViewPermission.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/permissions",
    name: "listPermissions",
    component: () => import("@/views/permissions/ListPermissions.vue")
  },
  {
    path: "/permissions/:permissionId",
    name: "editPermission",
    component: () => import("@/views/permissions/EditPermission.vue")
  },
  {
    path: "/permissions/add",
    name: "addPermission",
    component: () => import("@/views/permissions/AddPermission.vue")
  },*/,
  {
    path: "/product-categories",
    name: "listProductCategories",
    component: () =>
      import("@/views/productCategories/ListProductCategories.vue")
  },
  {
    path: "/productCategories/:productCategoryId",
    name: "editProductCategory",
    component: () => import("@/views/productCategories/EditProductCategory.vue")
  },
  {
    path: "/productCategories/add",
    name: "addProductCategory",
    component: () => import("@/views/productCategories/AddProductCategory.vue")
  },
  {
    path: "/products",
    name: "listProducts",
    component: () => import("@/views/products/ListProducts.vue")
  },
  {
    path: "/products/:productId",
    name: "editProduct",
    component: () => import("@/views/products/EditProduct.vue")
  },
  {
    path: "/products/add",
    name: "addProduct",
    component: () => import("@/views/products/AddProduct.vue")
  },
  {
    path: "/payment-methods",
    name: "listPaymentMethods",
    component: () => import("@/views/paymentMethods/ListPaymentMethods.vue")
  },
  {
    path: "/payment-methods/:paymentMethodId",
    name: "editPaymentMethod",
    component: () => import("@/views/paymentMethods/EditPaymentMethod.vue")
  },
  {
    path: "/payment-methods/add",
    name: "addPaymentMethod",
    component: () => import("@/views/paymentMethods/AddPaymentMethod.vue")
  },
  /*
  {
    path: "/productEntries/:productEntryId",
    name: "productEntry",
    component: () => import("@/views/productEntries/ViewProductEntry.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/productEntries",
    name: "listProductEntries",
    component: () => import("@/views/productEntries/ListProductEntries.vue")
  },
  {
    path: "/productEntries/:productEntryId",
    name: "editProductEntry",
    component: () => import("@/views/productEntries/EditProductEntry.vue")
  },
  {
    path: "/productEntries/add",
    name: "addProductEntry",
    component: () => import("@/views/productEntries/AddProductEntry.vue")
  },
  {
    path: "/productOutputs/:productOutputId",
    name: "productOutput",
    component: () => import("@/views/productOutputs/ViewProductOutput.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/productOutputs",
    name: "listProductOutputs",
    component: () => import("@/views/productOutputs/ListProductOutputs.vue")
  },
  {
    path: "/productOutputs/:productOutputId",
    name: "editProductOutput",
    component: () => import("@/views/productOutputs/EditProductOutput.vue")
  },
  {
    path: "/productOutputs/add",
    name: "addProductOutput",
    component: () => import("@/views/productOutputs/AddProductOutput.vue")
  },
  {
    path: "/provinces/:provinceId",
    name: "province",
    component: () => import("@/views/provinces/ViewProvince.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/provinces",
    name: "listProvinces",
    component: () => import("@/views/provinces/ListProvinces.vue")
  },
  {
    path: "/provinces/:provinceId",
    name: "editProvince",
    component: () => import("@/views/provinces/EditProvince.vue")
  },
  {
    path: "/provinces/add",
    name: "addProvince",
    component: () => import("@/views/provinces/AddProvince.vue")
  }*/
  {
    path: "/reason-exemptions",
    name: "listReasonExemptions",
    component: () => import("@/views/reasonExemptions/ListReasonExemptions.vue")
  },
  {
    path: "/reason-exemptions/:reasonExemptionId",
    name: "editReasonExemption",
    component: () => import("@/views/reasonExemptions/EditReasonExemption.vue")
  },
  {
    path: "/reason-exemptions/add",
    name: "addReasonExemption",
    component: () => import("@/views/reasonExemptions/AddReasonExemption.vue")
  } /*
  {
    path: "/roles/:roleId",
    name: "role",
    component: () => import("@/views/roles/ViewRole.vue"),
    meta: {
      rule: "user"
    }
  },
  {
    path: "/roles",
    name: "listRoles",
    component: () => import("@/views/roles/ListRoles.vue")
  },
  {
    path: "/roles/:roleId",
    name: "editRole",
    component: () => import("@/views/roles/EditRole.vue")
  },
  {
    path: "/roles/add",
    name: "addRole",
    component: () => import("@/views/roles/AddRole.vue")
  },*/,
  {
    path: "/suppliers",
    name: "listSuppliers",
    component: () => import("@/views/suppliers/ListSuppliers.vue")
  },
  {
    path: "/suppliers/:supplierId",
    name: "editSupplier",
    component: () => import("@/views/suppliers/EditSupplier.vue")
  },
  {
    path: "/suppliers/add",
    name: "addSupplier",
    component: () => import("@/views/suppliers/AddSupplier.vue")
  },
  {
    path: "/tax-rates",
    name: "listTaxRates",
    component: () => import("@/views/taxRates/ListTaxRates.vue")
  },
  {
    path: "/tax-rates/:taxRateId",
    name: "editTaxRate",
    component: () => import("@/views/taxRates/EditTaxRate.vue")
  },
  {
    path: "/tax-rates/add",
    name: "addTaxRate",
    component: () => import("@/views/taxRates/AddTaxRate.vue")
  },
  // Redirect to 404 page, if no match found
  {
    path: "*",
    component: () => import("@/views/Error404.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
