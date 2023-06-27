import axios from "axios";

const API_URL = "http://localhost:8080";

export function ListarContas () {
  return axios.get(`${API_URL}/contas/listar`);
}

export function FazerLogin (conta) {
  return axios.post(`${API_URL}/contas/login`, {
    email: conta.email,
    password: conta.password
  })
}

export function FazerCadastro (conta) {
  return axios.post(`${API_URL}/contas/cadastrar`, {
    nome: conta.name,
    email: conta.email,
    senha: conta.password
  })
}

export function CriarDuvida (duvida) {
  return axios.post(`${API_URL}/forum/topico`, {
    titulo: duvida.titulo,
    descricao: duvida.descricao,
    tags: duvida.tags,
    contaId: duvida.contaId
  })
}

export function ListarTopicos ( ) {
  return axios.get(`${API_URL}/forum/listartopico`)
}