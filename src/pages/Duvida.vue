<template>
  <q-layout>
    <q-page-container>
    <NavBar></NavBar>
    <div class="flex justify-center">
      <q-card class="my-card q-mt-md">
      <q-card-section>
        <div class="text-h6">{{ this.topico.titulo }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-badge v-for="badge in this.topico.tags" color="primary" class="q-mr-sm">
          {{ badge }}
        </q-badge>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-avatar color="primary" text-color="white" class="q-mr-sm">
          <q-icon name="mdi-account"></q-icon>
        </q-avatar>
        UserName
      </q-card-section>
      <q-card-section>
        {{ this.topico.descricao }}
      </q-card-section>
      <q-separator inset />
      <q-card-actions v-if="isResposta" class="flex justify-end">
        <q-editor class="my-editor q-ma-sm" v-model="comentario.comentario" min-height="5rem" />
        <q-card-section class="">
          <q-btn class="q-mr-md" label="Cancelar Resposta" color="negative" @click="modalResposta"></q-btn>
          <q-btn class="" label="Enviar" color="primary" @click="enviarResposta(comentario)"></q-btn>
        </q-card-section>
      </q-card-actions>
      <q-card-section v-else class="flex justify-start">
        <q-btn label="Adicione uma Resposta" color="primary" @click="modalResposta">
        </q-btn>
      </q-card-section>
      <q-card-section v-for="comentario in comentarios">
        <q-chat-message
        :name= comentario.conta.nome
        avatar="https://cdn.quasar.dev/img/avatar3.jpg"
        :text="[
          `${comentario.comentario}`,
        ]"
        size="10"
        text-color="white"
        bg-color="primary"
      />
      </q-card-section>
    </q-card>
    </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { route } from 'quasar/wrappers'
import { ListaTopicoById, AdicionarComentario, ListaComentarioByTopico } from 'src/service/api'
import NavBar from 'src/components/NavBar.vue'
import { useRoute } from 'vue-router'
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
      form: {
        email: null,
        password: null,
      },
      isPwd: true,
      loading: false,
      id: null,
      isResposta: false
    }
  },
  created() {
    this.id = this.$route.params.duvidaId;
    this.listaTopicoId(this.id)
    this.listaComentarioByTopico(this.id)
  },
  methods: {
    async listaTopicoId(id){
      const { data } = await ListaTopicoById(id)
      this.topico = data
    },
    async listaComentarioByTopico(id){
      const { data } = await ListaComentarioByTopico(id)
      this.comentarios = data
    },
    async enviarResposta(comentario){
      await AdicionarComentario(this.id, comentario)
      this.modalResposta()
    },
    modalResposta(){
      this.isResposta = !this.isResposta
    },
    fazerLogin(){
      console.log('entrou aqui')
      this.$router.push({ name: 'principal' })
    },
    listaContas(){
      console.log(this.id)
    }
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