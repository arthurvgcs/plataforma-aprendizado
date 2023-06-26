import axios from "axios";

const API_URL = "http://localhost:8080";

export function ListarContas () {
  return axios.get(`${API_URL}/contas/listar`);
}