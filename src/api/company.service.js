import API_URL from "./config.js";

export const companyService = {
  async getCompanies(token) {
    const response = await fetch(`${API_URL}/companies`, {
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

  async addCompany(token, payload) {
    const response = await fetch(`${API_URL}/companies`, {
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

  async editCompany(token, payload) {
    const response = await fetch(`${API_URL}/companies/${payload._id}`, {
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

  async removeCompany(token, id) {
    const response = await fetch(`${API_URL}/companies/${id}`, {
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

export default companyService;
