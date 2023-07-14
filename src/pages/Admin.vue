<template>
  <q-layout>
    <q-page-container>
    <NavBar></NavBar>
    <q-table
      class=" q-ma-lg"
      title="Contas"
      :rows="contas"
      :columns="columns"
      row-key="id"
      hide-bottom
    >
    <template v-slot:body-cell-createdAt="props">
        <q-td class="text-center">
          <p>{{ timestampForDate(props.row.createdAt)}}</p>
        </q-td>
      </template>
    <template v-slot:body-cell-acoes="props">
        <q-td class="text-right">
          <q-btn
            flat
            round
            icon="edit"
            @click="editarConta(props.row)"
          >
          <q-tooltip>
            Editar Conta
          </q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            icon="mdi-delete"
            @click="deletarConta(props.row.codigo)"
          >
          <q-tooltip>
            Deletar Conta
          </q-tooltip>
          </q-btn>
        </q-td>
      </template>
  </q-table>
    </q-page-container>
  </q-layout>
  <ModalConta
      :modalConta="modalConta"
      :contaSelecionada="contaSelecionada"
      v-on:fechou-modal="estadoModal()"
      v-on:atualizar-duvida="contaEditada"
    />
</template>

<script>
import { ListarContas, DeletarConta, EditarConta } from 'src/service/api'
import dayjs from 'dayjs'
import NavBar from 'src/components/NavBar.vue'
import ModalConta from './ModalConta.vue'
export default ({
  name: 'Duvida',
  components: { NavBar, ModalConta },
  data () {
    return {
      contas: [],
      columns: [
        { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
        { name: 'email', label: 'Email', field: 'email', align: 'left' },
        { name: 'perfil', label: 'Perfil', field: 'perfil', align: 'center' },
        { name: 'createdAt', label: 'Data de Criação', field: 'createdAt', align: 'center' },
        { name: 'acoes', label: '', field: '#', align: 'right'}
      ],
      modalConta: false,
      contaSelecionada: {}
    }
  },
  methods: {
    timestampForDate(timestamp) {
      return dayjs(timestamp).format('DD/MM/YYYY')
    },
    async listarContas () {
      const { data } = await ListarContas()
      this.contas = data
    },
    async deletarConta (id) {
      await DeletarConta(id)
      this.listarContas()
    },
    contaEditada (conta){
      const indexConta = this.contas.findIndex(item => item.codigo == conta.codigo)
      this.contas.splice(indexConta, 1)
      this.contas.splice(indexConta, 0, conta)
      this.listarContas()
    },
    estadoModal () {
      this.modalConta = !this.modalConta
      this.listarContas()
    },
    editarConta (conta) {
      this.contaSelecionada = conta
      this.modalConta = true
    }
  },
  async mounted(){
    await this.listarContas()
  }
})
</script>
<style>

.my-card {
  width: 650px;
  max-width: 650px;
}

.my-editor {
  width: 620px;
  max-width: 620px;
}


</style>