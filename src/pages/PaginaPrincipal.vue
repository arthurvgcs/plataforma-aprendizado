<template>
  <div class="barra_principal">
    <h2>LOGO</h2>
    <div class="usuario">
      <q-icon name="person" style="font-size: 30px;" class="usuario_icon" />
      <h3>Usuario</h3>
    </div>
  </div>

  <div class="conteudo">
    <div class="forum">
      <div class="forum_titulo">
        <h2>Foruns</h2>
      </div>
      <q-select
        filled
        v-model="forumFilter"
        label="Selecione o forum"
        :options="filteredForums"
        use-input
        input-debounce="0"
        behavior="menu"
        class="forum_filter"
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
    </div>

    <div class="duvida">
      <form @submit.prevent="submitForm">
        <div>
          <q-input
            filled
            outlined
            dense
            v-model="duvida"
            label="Digite sua duvida"
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
            label="Insira as tags da duvida"
            class="input_tags"
          />
        </div>
        <div class="centralizado">
          <q-btn
            color="aqua"
            label="Enviar"
            class="input_submit"
            type="submit"
          />
        </div>
      </form>
    </div>
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
  margin-right: 20px;
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
}

.input_submit {
  margin-top: 5px;
  width: 10%;
  height: 40px;
  font-size: 1.5em;
  background-color: aqua;
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
  background-color: aqua;
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
