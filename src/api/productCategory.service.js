import API_URL from "./config.js";

export const productCategoryService = {
  async getProductCategories(token) {
    let response = await fetch(`${API_URL}/product-categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  },

  async addProductCategory(token, payload) {
    const response = await fetch(`${API_URL}/product-categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(payload)
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  },

  async editProductCategory(token, payload) {
    const response = await fetch(
      `${API_URL}/product-categories/${payload._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify(payload)
      }
    );
    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  },

  async removeProductCategory(token, id) {
    const response = await fetch(`${API_URL}/product-categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  }
};

function handleResponses(code) {
  let message = "";
  switch (code) {
    case 401:
      message = "Não está autorizado a executar esta ação!";
      break;
    default:
      message = "Mensagem desconhecida";
      break;
  }
  return message;
}

export default productCategoryService;
