<template>
  <q-layout style="background: #f8f8f8">
    <q-page-container>
      <q-page class="flex justify-center items-center">
        <q-card bordered
          class="card q-pa-md shadow-10"
          style="border-top: 5px solid #054e8e; width: 400px">
          <q-card-section class="text-blue text-center">
            <q-img
              spinner-color="blue"
              src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
              contain
              style="height: 110px; max-width: 110px"
              class="q-mb-lg q-px-md" />
            <q-separator spaced />
          </q-card-section>
          <q-card-section class="text-blue">
            <div class="text-h6">Cadastro</div>
            <div class="text-caption text-grey">Faça seu cadastro...</div>
          </q-card-section>

          <q-card-section>
            <q-input class="q-mb-md"
              clearable
              v-model="form.name"
              placeholder="Nome"
              color="blue"
              error-message="Digite um nome"
              outlined
              @keypress.enter="fazerCadastro">
              <template v-slot:prepend>
                <q-icon name="mdi-account"
                  color='blue' />
              </template>
            </q-input>
            <q-input class="q-mb-md"
              clearable
              v-model="form.email"
              color="blue"
              placeholder="meu@email.com"
              error-message="Deve ser um e-mail válido."
              outlined
              @keypress.enter="fazerCadastro">
              <template v-slot:prepend>
                <q-icon name="email"
                  color='blue' />
              </template>
            </q-input>

            <q-input outlined
              v-model="form.password"
              placeholder="Senha"
              color="blue"
              :type="isPwd ? 'password' : 'text'"
              @keypress.enter="fazerCadastro">
              <template v-slot:prepend>
                <q-icon name="shield"
                  class="cursor-pointer"
                  color='blue' />
              </template>
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd" />
              </template>
            </q-input>
          </q-card-section>
          <q-card-actions>
            <q-space />
            <q-btn class="q-my-xs"
              style="width: 100%"
              color="blue"
              :loading="loading"
              @click="fazerCadastro(form)">
              Cadastrar-se
            </q-btn>
          </q-card-actions>
          <q-inner-loading :showing="loading" />
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { FazerCadastro } from 'src/service/api';
 
export default ({
  name: 'Cadastro',
  data () {
    return {
      form: {
        name: null,
        email: null,
        password: null,
      },
      isPwd: true,
      loading: false
    }
  },
  methods: {
    async fazerCadastro(form){
      await FazerCadastro(form).then(res => {
        this.$router.push({ name: 'login' })
    }).catch(error => {
        console.error(error)
      })
    }
  }
})

</script>