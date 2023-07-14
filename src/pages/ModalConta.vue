<template>
  <q-dialog persistent
    v-model="modalVisible">
    <q-card style="width: 600px">
      <q-card-section>
        <div class="text-h6">Editar Usuário</div>
      </q-card-section>
      <q-card-section class="q-col-gutter-sm">
        <div class="row q-col-gutter-sm">
            <div class="col-12">
              <q-input disable color="blue" readonly outlined label="Nome" v-model="conta.nome" :error="erroNome"/>
            </div>
          </div>
          <div class="row q-col-gutter-sm">
            <div class="col-12">
              <q-input disable color="blue" readonly outlined label="Email" v-model="conta.email" :error="erroPerfil"/>
            </div>
          </div>
          <div class="row q-col-gutter-sm">
            <div class="col-12">
              <q-select
                outlined
                v-model="conta.perfil"
                label="Escolha o perfil"
                :options="perfis"
                use-chips
                color="blue"
                emit-value
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
        <q-btn label="Salvar"
          class="q-px-md"
          color="blue"
          @click="editarConta(conta)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { CriarDuvida, EditarConta} from 'src/service/api'

export default {
  name: 'ModalConta',
  props: {
    modalConta: {
      type: Boolean,
      default: false
    },
    contaSelecionada: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    modalVisible: {
      get() {
        return this.modalConta;
      },
      set(value) {
        this.$emit('update:modalConta', value);
      }
    }
  },
  data () {
    return {
      user: {},
      conta: {
        nome: undefined,
        email: undefined,
        perfil: undefined
      },
      erroNome: false,
      erroEmail: false,
      erroPerfil: false,
      perfis: ["Aluno", "Moderador", "Especialista"]
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
    async editarConta(conta) {
      await EditarConta(conta.codigo, conta).then(res =>{
        this.$emit('atualizar-valor', res.data)
        this.fecharModal()
      })
    },
    resetModel () {
      this.conta = {
        nome: undefined,
        email: undefined,
        perfil: undefined
      }
      this.erroNome = false
      this.erroEmail = false
      this.erroPerfil = false
    },
    fecharModal () {
      this.resetModel()
      this.$emit('fechou-modal')
    },
  },
  watch: {
    modalConta () {
      if(this.contaSelecionada != {}) {
        this.conta = {...this.contaSelecionada}
      }else {
        this.resetModel()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>