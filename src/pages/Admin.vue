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
    <template v-slot:body-cell-acoes="props">
        <q-td class="text-right">
          <q-btn
            flat
            round
            icon="edit"
            @click="editarPerfil(props.row)"
          >
          <q-tooltip>
            Editar Perfil
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
</template>

<script>
import { ListarContas, DeletarConta } from 'src/service/api'
import NavBar from 'src/components/NavBar.vue'
export default ({
  name: 'Duvida',
  components: { NavBar },
  data () {
    return {
      contas: [],
      columns: [
        { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
        { name: 'email', label: 'Email', field: 'email', align: 'left' },
        { name: 'perfil', label: 'Perfil', field: 'perfil', align: 'center' },
        { name: 'acoes', label: '', field: '#', align: 'right'}
      ],
    }
  },
  methods: {
    async listarContas () {
      const { data } = await ListarContas()
      this.contas = data
    },
    async deletarConta (id) {
      await DeletarConta(id)
      this.listarContas()
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