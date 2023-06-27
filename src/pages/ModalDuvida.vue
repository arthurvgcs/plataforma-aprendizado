<template>
  <q-dialog persistent
    v-model="modalVisible">
    <q-card style="width: 600px">
      <q-card-section>
        <div class="text-h6">Cadastrar Duvida</div>
      </q-card-section>
      <q-card-section class="q-col-gutter-sm">
        <div class="row q-col-gutter-sm">
            <div class="col-12">
              <q-input outlined label="Titulo da duvida" v-model="duvida.titulo" :error="erroTitulo"/>
            </div>
          </div>
          <div class="row q-col-gutter-sm">
            <div class="col-12">
              <q-input outlined label="Descrição da Duvida" v-model="duvida.descricao" :error="erroDescricao"/>
            </div>
          </div>
          <div class="row q-col-gutter-sm">
            <div class="col-12">
              <q-select
                outlined
                v-model="duvida.tags"
                multiple=""
                label="Tags"
                :options="tags"
                use-input
                use-chips
                stack-label
               />
            </div>
          </div>
        </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Sair"
          class="q-px-md q-mr-sm"
          color="negative"
          @click="fecharModal"
          v-close-popup />
        <q-btn label="Enviar Duvida"
          class="q-px-md"
          color="primary"
          @click="criarDuvida(duvida)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { CriarDuvida} from 'src/service/api'

export default {
  name: 'ModalDuvida',
  props: {
    modalDuvida: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    modalVisible: {
      get() {
        return this.modalDuvida;
      },
      set(value) {
        this.$emit('update:modalDuvida', value);
      }
    }
  },
  data () {
    return {
      user: {},
      duvida: {
        titulo: undefined,
        descricao: undefined,
        tags: [],
        status: false,
        contaId: localStorage.getItem("id")
      },
      erroTitulo: false,
      erroTag: false,
      erroDescricao: false,
      tags: [ 'Web 1', 'Java/Spring', 'PHP/Laravel', 'JavaScript']
    }
  },
  mounted() {
    this.user = {
      id: localStorage.getItem("id"),
      nome: localStorage.getItem("nome"),
      email: localStorage.getItem("email"),
      perfil: localStorage.getItem("perfil")
    }
  },
  methods: {
    resetModel () {
      this.duvida = {
        titulo: undefined,
        descricao: undefined,
        tags: [],
        status: false,
        contaId: localStorage.getItem("id")
      }
      this.erroTitulo = false
      this.erroTag = false
      this.erroDescricao = false
    },
    fecharModal () {
      this.resetModel()
      this.$emit('fechou-modal')
    },
    async criarDuvida(duvida) {
      if (this.duvida.descricao == undefined) this.erroDescricao = true
      if (this.duvida.tags == []) this.erroTag = true
      try {
          await CriarDuvida(duvida).then(res => {
            this.$emit('atualizar-duvida', res.data)
          })
        this.$emit('fechou-modal')
        this.resetModel()
      } catch (e) {
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>