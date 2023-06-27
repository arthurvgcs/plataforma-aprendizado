<template>
  <q-layout>
    <q-page-container>
      <div>
    <q-toolbar class="bg-dark text-white">
      <q-btn flat round dense icon="menu" class="q-mr-sm" />
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
      </q-avatar>

      <q-toolbar-title>Activison</q-toolbar-title>

      <div>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/avatar.png">
        </q-avatar>
        <q-btn-dropdown color="white" label="Olá, Mary" flat>
        <q-list>
          <q-item clickable v-close-popup >
            <q-item-section>
              <q-item-label>Photos</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        </q-btn-dropdown>
      </div>
    </q-toolbar>
    <div class="flex justify-center">
      <q-card flat bordered class="my-card q-mt-md">
      <q-card-section>
        <div class="text-h6">Como posso iniciar um servidor em JavaScript?</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-badge color="blue">
          Programação Web
        </q-badge>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/avatar.png">
        </q-avatar>
        Mary
      </q-card-section>
      <q-card-section>
        Boa noite, estou com dificuldades de iniciar um servidor em JavaScript, como posso iniciar?
      </q-card-section>
      <q-separator inset />
      <div class="flex justify-start q-mt-sm q-ml-md">
      <q-chat-message
        name="Matilde"
        avatar="https://cdn.quasar.dev/img/avatar5.jpg"
        :text="[
          'Podemos resolver isso utilizando o express',
          'Para isso você pode utilizar a documentação do express, acredito'
        ]"
        size="10"
        stamp="4 minutes ago"
        text-color="white"
        bg-color="primary"
      />

      <q-btn class="q-my-xs"
              style="width: 100%"
              color="primary"
              :loading="loading"
              @click="listaContas()">
              Teste
            </q-btn>
    </div>
    </q-card>
    </div>
  </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ListarContas } from 'src/service/api'
export default ({
  name: 'Duvida',
  data () {
    return {
      form: {
        email: null,
        password: null,
      },
      isPwd: true,
      loading: false
    }
  },
  methods: {
    fazerLogin(){
      console.log('entrou aqui')
      this.$router.push({ name: 'principal' })
    },
    async listaContas(){
      const { data } = await ListarContas()
      console.log(data)
    }
  }
})
</script>