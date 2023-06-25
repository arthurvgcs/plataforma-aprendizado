<template>
  <div>
    <q-layout>
      <q-page-container>
        <div>
          <q-toolbar class="bg-dark text-white">
            <q-btn flat round dense icon="menu" class="q-mr-sm" />
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
            </q-avatar>

            <q-toolbar-title>Activison</q-toolbar-title>

            <div class="usuario">
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar.png">
              </q-avatar>
              <q-btn-dropdown color="white" label="Olá, Mary" flat>
                <q-list>
                  <q-item clickable v-close-popup >
                    <q-item-section>
                      <q-item-label>Sair</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
          </q-toolbar>
        </div>
        <div class="conteudo">
          <div class="forum">
            <q-card class="my-card">
              <q-card-section class="bg-secondary text-white">
                <div class="text-h6">Fóruns</div>
              </q-card-section>

              <q-separator />

              <q-select
                filled
                v-model="forumFilter"
                label="Selecione o fórum"
                :options="filteredForums"
                use-input
                input-debounce="0"
                behavior="menu"
                class="forum_filter"
                style="min-width: 350px; max-width: 350px;"
                @filter="filterForums"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      Nenhum resultado
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </q-card>
          </div>
          <div>
            <form @submit.prevent="submitForm">
              <div class="duvida">
                <q-input
                  required
                  filled
                  outlined
                  dense
                  v-model="duvida"
                  label="Digite sua dúvida"
                  class="input_duvida"
                >
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>
              <div class="tags_container">
                <q-select
                  filled
                  outlined
                  dense
                  v-model="selectedOptions"
                  :options="options"
                  multiple
                  label="Insira as tags da dúvida"
                  class="input_tags"
                />
              </div>
              <div class="centralizado">
                <q-btn
                  color="aqua"
                  label="Enviar"
                  class="input_submit"
                  type="submit"
                  @click="redirectChamada"
                />
              </div>
            </form>
          </div>
        </div>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
export default {
  name: 'PaginaPrincipal',
  data() {
    return {
      duvida: '',
      options: ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4'],
      forumFilter: '',
      forums: [
        { id: 1, label: 'Materia 1', value: 'Materia 1' },
        { id: 2, label: 'Materia 2', value: 'Materia 2' },
        { id: 3, label: 'Materia 3', value: 'Materia 3' },
        { id: 4, label: 'Materia 4', value: 'Materia 4' },
      ],
      filteredForums: [],
      selectedOptions: [],
    };
  },
  mounted() {
    this.filteredForums = [...this.forums];
  },
  methods: {
    submitForm() {
      const formData = new FormData();
      formData.append('duvida', this.duvida);
      for (let i = 0; i < this.selectedOptions.length; i++) {
        formData.append('tags[]', this.selectedOptions[i]);
      }

      const data = [];
      for (const [name, value] of formData.entries()) {
        data.push({
          name,
          value,
        });
      }

      console.log(data);
    },
    filterForums(val, update) {
      if (val === '') {
        update(() => {
          this.filteredForums = [...this.forums];
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.filteredForums = this.forums.filter((forum) =>
          forum.label.toLowerCase().includes(needle)
        );
      });
    },
    redirectChamada(event) {
      event.preventDefault();
      this.$router.push('/chamada');
    },
  },
  watch: {
    forumFilter() {
      this.selectedOptions = [];
    },
  },
};
</script>
<style>
.barra_principal {
  display: flex;
  background-color: aqua;
  text-align: left;
  padding: 10px;
  justify-content: space-between;
}

.usuario {
  display: flex;
  align-items: center;
}

.usuario_icon {
  margin-right: 10px;
  margin-bottom: 5px;
}

.usuario_seta {
  padding-left: 10px;
  margin-bottom: 5px;
}

.conteudo {
  display: flex;
}

.forum {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 100px;
}

.forum_titulo {
  display: flex;
  align-items: center;
}

.forum_seta {
  padding-top: 5px;
  padding-left: 5px;
  color: aqua;
}

.forum p {
  margin-top: 10px;
  margin-bottom: 10px;
  color: blueviolet;
  text-decoration: underline;
}

.duvida {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.input_tags {
  width: 1000px;
  font-size: 1.5em;
}

.input_duvida {
  width: 1000px;
  font-size: 1.5em;
  margin-bottom: 5px;
  margin-top: 25%;
}

.input_submit {
  margin-top: 5px;
  width: 10%;
  height: 40px;
  font-size: 1.5em;
  background-color: darkcyan;
  border: 1px solid black;
  cursor: pointer;
  display: flex;
}

.centralizado {
  display: flex;
  justify-content: center;
}

.tags_container {
  display: flex;
  align-items: center;
  position: relative;
}

.dropdown {
  position: absolute;
  right: 0;
  border: none;
  padding: 5px;
  display: flex;
  align-items: center;
}

.dropdown_icon {
  margin-left: 5px;
  cursor: pointer;
}

.selected_options {
  margin-top: 10px;
}

.selected_options_container {
  display: flex;
  flex-wrap: wrap;
}

.selected_option_box {
  display: flex;
  align-items: center;
  background-color: darkcyan;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
}

.selected_option {
  margin-right: 5px;
}

.remove_option {
  cursor: pointer;
  margin-left: 5px;
}
</style>
