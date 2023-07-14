<template>
  <div>
    <q-layout>
      <q-page-container>
        <NavBar></NavBar>
        <div class="flex justify-center">
          <div class="col-1"></div>
          <div class="col-10 justify-center q-pa-md">
              <div class="flex row justify-center">
                <q-input
                  dark
                  filled
                  outlined
                  v-model="duvidaFilter"
                  label="Busque sua dúvida no nosso forum"
                  class="input_duvida"
                >
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>
              <div class="flex row justify-center">
                <q-select
                  dark
                  filled
                  outlined
                  v-model="selectedTags"
                  :options="options"
                  use-input
                  use-chips
                  input-debounce="300"
                  behavior="menu"
                  multiple
                  label="Filtre suas dúvidas pelas tags"
                  class="input_duvida q-mt-md"
                  :filter="filterTags"
                />
              </div>
            <div class="flex row justify-end">
              <q-btn class="flex justify-end q-mt-md" color="blue" label="Quero criar uma nova Duvida" text-color="white" @click="estadoModal">
              </q-btn>
            </div>
            <div v-if="filteredDuvidas.length < 1" class="text-h6">
              Não temos dúvidas no momento.
            </div>
            <div v-else v-for="duvida in filteredDuvidas">
              <q-card  :key="duvida.codigo" v-if="duvidaFilter === '' || duvida.titulo.toLowerCase().includes(duvidaFilter.toLowerCase())" class="my-card flex column q-mt-md">
                <q-card-section class="">
                  <div class="text-h6">{{ duvida.titulo }}</div>
                  <div class="text-subtitle2">Por {{ duvida.conta.nome }}</div>
                  <q-badge v-for="badge in duvida.tags[0].split(',')" rounded color="blue" class="q-mr-sm">
                    {{ badge.trim() }}
                  </q-badge>
                  <div class="text-subtitle3 q-mt-sm">{{ formatDate(duvida.createdAt) }}</div>
                </q-card-section>
                <q-separator dark inset />
                <q-card-section class="flex row">
                  {{ duvida.descricao }}
                </q-card-section>
                <q-card-section class="flex row justify-end">
                  <q-btn label="Ver Duvida"
                      class="q-px-md flex"
                      color="blue"
                      @click="pageDuvida(duvida)" />
                </q-card-section>
              </q-card>
            </div>
        </div>
        <div class="col-1"></div>
        </div>
        
      </q-page-container>
    </q-layout>
    <ModalDuvida
      :modalDuvida="modalDuvida"
      v-on:fechou-modal="estadoModal()"
      v-on:atualizar-duvida="duvidaCriada"
    />
  </div>
</template>
<script>
import moment from 'moment'
import ModalDuvida from 'src/pages/ModalDuvida.vue'
import NavBar from 'src/components/NavBar.vue';
import { ListarTopicos } from 'src/service/api'
export default {
  name: 'PaginaPrincipal',
  components: { ModalDuvida, NavBar },
  data() {
    return {
      duvidaFilter: '',
      duvidas: [],
      user: {
        id: undefined,
        nome: undefined,
        email: undefined,
        perfil: undefined
      },
      modalDuvida: false,
      options: [ 'Web 1', 'Java/Spring', 'PHP/Laravel', 'JavaScript'],
      forumFilter: '',
      forums: [
        { id: 1, label: 'Materia 1', value: 'Materia 1' },
        { id: 2, label: 'Materia 2', value: 'Materia 2' },
        { id: 3, label: 'Materia 3', value: 'Materia 3' },
        { id: 4, label: 'Materia 4', value: 'Materia 4' },
      ],
      filteredForums: [],
      selectedTags: [],
    };
  },
  computed: {
    separedTags() {
      if (this.duvida.tags && this.duvida.tags.length > 0) {
        const tagsString = this.duvida.tags[0];
        return tagsString.split(",");
      }
      return [];
    },
    filteredDuvidas(){
      if (this.selectedTags.length === 0) {
        return this.duvidas;
      }

      return this.duvidas.filter((duvida) => {
        return this.selectedTags.every((tag) => {
          return duvida.tags[0].toLowerCase().includes(tag.toLowerCase());
        });
      });
    },
  },
  methods: {
    formatDate(timestamp) {
      const now = moment()
      const createdAt = moment(timestamp)
      const duration = moment.duration(now.diff(createdAt))

      if (duration.asSeconds() < 60) {
        return 'Recém-criado'
      } else if (duration.asMinutes() < 60) {
        return `Criado há ${Math.round(duration.asMinutes())} minutos`
      } else if (duration.asHours() < 24) {
        return `Criado há ${Math.round(duration.asHours())} horas`
      } else {
        return `Criado há ${Math.round(duration.asDays())} dias`
      }
    },
    filterTags(val, update, item) {
      if (val === "") {
        update(() => {
          item.visible = true;
        });
        return;
      }

      const searchValue = val.toLowerCase();
      update(() => {
        item.visible = item.label.toLowerCase().includes(searchValue);
      });
    },
    submitForm() {
      const formData = new FormData();
      formData.append('duvida', this.duvida);
      for (let i = 0; i < this.selectedTags.length; i++) {
        formData.append('tags[]', this.selectedTags[i]);
      }

      const data = [];
      for (const [name, value] of formData.entries()) {
        data.push({
          name,
          value,
        });
      }
    },
    async listarDuvidas () {
      const { data } = await ListarTopicos()
      this.duvidas = data
    },
    estadoModal () {
      this.modalDuvida = !this.modalDuvida
    },
    duvidaCriada (duvida) {
      this.listarDuvidas()
    },
    pageDuvida (duvida) {
      this.$router.push({ path: `/duvida/${duvida.codigo}` })
    },
    redirectChamada(event) {
      event.preventDefault();
      this.$router.push('/chamada');
    },
  },
  async mounted () {
    await this.listarDuvidas()
    this.user = {
      id: localStorage.getItem("id"),
      nome: localStorage.getItem("nome"),
      email: localStorage.getItem("email"),
      perfil: localStorage.getItem("perfil")
    }
  },
  watch: {
    forumFilter() {
      this.selectedTags = [];
    },
  },
};
</script>
<style>
.my-card {
  width: auto;
  max-width: 650px;
}
.input_duvida {
  width: 650px;
}


</style>
