import API_URL from "./config.js";

export const paymentMethodService = {
  async getPaymentMethods(token) {
    let response = await fetch(`${API_URL}/payment-methods`, {
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

  async addPaymentMethod(token, payload) {
    const response = await fetch(`${API_URL}/payment-methods`, {
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

  async editPaymentMethod(token, payload) {
    const response = await fetch(`${API_URL}/payment-methods/${payload._id}`, {
      method: "PUT",
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

  async removePaymentMethod(token, id) {
    const response = await fetch(`${API_URL}/payment-methods/${id}`, {
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

export default paymentMethodService;
