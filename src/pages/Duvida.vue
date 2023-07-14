<template>
  <q-layout>
    <q-page-container>
    <NavBar></NavBar>
    <div class="flex column">
      <div class="flex justify-center">
      <q-card class="my-card q-mt-md">
      <q-card-section class="flex row">
        <div class="text-h6 flex column col-8">{{ topico.titulo }}
        </div>
        <div v-if="user.id == contaTopico.codigo || user.perfil == 'Moderador'" class="q-ml-lg flex justify-end col-3">
          <q-btn rounded color="negative" @click="deletarTopico(this.id)">
            <q-icon name="mdi-delete"></q-icon>
          </q-btn>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-badge v-if="topico.tags && topico.tags.length > 0" v-for="badge in topico.tags[0].split(',')" rounded color="blue" class="q-mr-sm">
          {{ badge.trim() }}
        </q-badge>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-avatar color="blue" text-color="white" class="q-mr-sm">
          <q-icon name="mdi-account"></q-icon>
        </q-avatar>
        {{ contaTopico.nome }}
        <div class="text-subtitle3 q-mt-sm">{{ formatDate(topico.createdAt) }}</div>
      </q-card-section>
      <q-card-section>
        {{ this.topico.descricao }}
      </q-card-section>
      <q-separator inset />
      <div v-if="user.perfil == 'Especialista'">
        <q-card-actions v-if="isResposta" class="flex justify-end">
        <q-editor class="my-editor q-ma-sm" v-model="comentario.comentario" min-height="5rem" />
        <q-card-section class="">
          <q-btn class="q-mr-md" label="Cancelar Resposta" color="negative" @click="modalResposta"></q-btn>
          <q-btn class="" label="Enviar" color="blue" @click="enviarResposta(comentario, user.id)"></q-btn>
        </q-card-section>
        </q-card-actions>
        <q-card-section v-else class="flex justify-start">
          <q-btn label="Adicione uma Resposta" color="blue" @click="modalResposta">
          </q-btn>
        </q-card-section>
      </div>
      <div class="flex justify-start" style="width: 650px;">
      <q-card-section v-if="comentarios.length > 0">
        <div class="text-h6">Respostas:</div>
      </q-card-section>
      <q-card-section v-else>
        <div class="text-h6">Não temos resposta nesse topico, aguarde um especialista responder.</div>
      </q-card-section>
      </div>
    </q-card>
    </div>
    <div class="flex justify-center" v-for="comentario in comentarios">
      <q-card class="my-card q-mt-md">
      <q-card-section>
        <div class="text-subtitle1"><q-avatar color="blue" text-color="white" class="q-mr-sm">
          <q-icon name="mdi-account"></q-icon>
        </q-avatar>{{ comentario.conta.nome }}</div>
        <div class="text-subtitle3 q-mt-sm">{{ formatDateResposta(comentario.createdAt) }}</div>
      </q-card-section>
      <q-card-section>
        <q-badge rounded color="secondary" class="q-mr-sm">
          Especialista
        </q-badge>
      </q-card-section>
      <q-separator dark inset />
      <q-card-section class="text-subtitle2">
        {{ comentario.comentario }}
      </q-card-section>
    </q-card>
    </div>
    </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { route } from 'quasar/wrappers'
import moment from 'moment'
import { ListaTopicoById, AdicionarComentario, ListaComentarioByTopico, DeletarTopico } from 'src/service/api'
import NavBar from 'src/components/NavBar.vue'
import { useRoute } from 'vue-router'
import { onUpdated } from 'vue'
export default ({
  name: 'Duvida',
  components: { NavBar },
  data () {
    return {
      comentario: {
        comentario: null,
        contaId: localStorage.getItem("id")
      },
      comentarios: [],
      topico: {},
      contaTopico: {},
      form: {
        email: null,
        password: null,
      },
      user: {
        id: undefined,
        nome: undefined,
        email: undefined,
        perfil: undefined
      },
      isPwd: true,
      loading: false,
      id: null,
      isResposta: false,
      isAluno: false
    }
  },
  created() {
    this.id = this.$route.params.duvidaId;
    this.listaComentarioByTopico(this.id);
    this.listaTopicoId(this.id)
  },
  methods: {
    formatDate(timestamp) {
      const now = moment()
      const createdAt = moment(timestamp)
      const duration = moment.duration(now.diff(createdAt))

      if (duration.asSeconds() < 60) {
        return 'Criado há menos de um minuto'
      } else if (duration.asMinutes() < 60) {
        return `Criado há ${Math.round(duration.asMinutes())} minutos`
      } else if (duration.asHours() < 24) {
        return `Criado há ${Math.round(duration.asHours())} horas`
      } else {
        return `Criado há ${Math.round(duration.asDays())} dias`
      }
    },
    formatDateResposta(timestamp) {
      const now = moment()
      const createdAt = moment(timestamp)
      const duration = moment.duration(now.diff(createdAt))

      if (duration.asSeconds() < 60) {
        return 'Respondido há menos de um minuto'
      } else if (duration.asMinutes() < 60) {
        return `Respondido há ${Math.round(duration.asMinutes())} minutos`
      } else if (duration.asHours() < 24) {
        return `Respondido há ${Math.round(duration.asHours())} horas`
      } else {
        return `Respondido há ${Math.round(duration.asDays())} dias`
      }
    },
    async listaTopicoId(id){
      const { data } = await ListaTopicoById(id)
      this.topico = data
      this.contaTopico = data.conta
    },
    async listaComentarioByTopico(id){
      const { data } = await ListaComentarioByTopico(id)
      this.comentarios = data
    },
    async enviarResposta(comentario){
      await AdicionarComentario(this.id, comentario)
      this.modalResposta()
      this.listaComentarioByTopico(this.id)
      this.comentario = {
        comentario: null
      }
    },
    async deletarTopico(id) {
      await DeletarTopico(id).then(res => {
        this.$router.push({ name: 'principal' })
    })
    },
    modalResposta(){
      this.isResposta = !this.isResposta
    },
  },
  mounted () {
    this.listaTopicoId(this.id)
    this.user = {
      id: localStorage.getItem("id"),
      nome: localStorage.getItem("nome"),
      email: localStorage.getItem("email"),
      perfil: localStorage.getItem("perfil")
    }
  },
  onUpdated(){
    this.listaTopicoId(this.id)
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