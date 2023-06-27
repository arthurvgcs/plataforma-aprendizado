<template>
  <q-layout style="background: #f8f8f8">
    <q-page-container>
      <q-page class="flex justify-center items-center">
        <q-card bordered
          class="card q-pa-md shadow-10"
          style="border-top: 5px solid #054e8e; width: 400px">
          <q-card-section class="text-primary text-center">
            <q-img
              spinner-color="white"
              contain
              style="height: 110px; max-width: 300px"
              class="q-mb-lg q-px-md" />
            <q-separator spaced />
          </q-card-section>
          <q-card-section class="text-primary">
            <div class="text-h6">Cadastro</div>
            <div class="text-caption text-grey">Faça seu cadastro...</div>
          </q-card-section>

          <q-card-section>
            <q-input class="q-mb-md"
              clearable
              v-model="form.name"
              placeholder="Nome"
              error-message="Digite um nome"
              outlined
              @keypress.enter="fazerCadastro">
              <template v-slot:prepend>
                <q-icon name="mdi-account"
                  color='primary' />
              </template>
            </q-input>
            <q-input class="q-mb-md"
              clearable
              v-model="form.email"
              placeholder="meu@email.com"
              error-message="Deve ser um e-mail válido."
              outlined
              @keypress.enter="fazerCadastro">
              <template v-slot:prepend>
                <q-icon name="email"
                  color='primary' />
              </template>
            </q-input>

            <q-input outlined
              v-model="form.password"
              placeholder="Senha"
              :type="isPwd ? 'password' : 'text'"
              @keypress.enter="fazerCadastro">
              <template v-slot:prepend>
                <q-icon name="shield"
                  class="cursor-pointer"
                  color='primary' />
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
              color="primary"
              :loading="loading"
              @click="fazerCadastro(form)">
              Cadastrar-se
            </q-btn>
          </q-card-actions>
          <q-inner-loading :showing="loading" />
        </q-card>
      </q-page>

      <!-- <q-page class="flex justify-center items-center"
        v-else>
        <q-ajax-bar position="top"
          color="primary"
          size="5px" />
        <q-card bordered
          class="card q-pa-md shadow-10"
          style="border-top: 5px solid #3E72AF; width: 400px">

          <q-card-section class="text-primary text-center">
            <q-img :src="$getLogo($q.dark.isActive)"
              spinner-color="white"
              contain
              style="height: 110px; max-width: 300px"
              class="q-mb-lg q-px-md" />
            <q-separator spaced />
          </q-card-section>
          <q-card-section class="text-primary">
            <div class="text-h6">Recuperar senha</div>
            <div class="text-caption text-grey">Digite seu email</div>
          </q-card-section>
          <q-input class="q-mb-xs"
            clearable
            v-model="form.email"
            placeholder="meu@email.com"
            @blur="$v.form.email.$touch"
            :error="$v.form.email.$error"
            error-message="Deve ser um e-mail válido."
            outlined
            @keypress.enter="recuperarSenha">
            <template v-slot:prepend>
              <q-icon name="mdi-email-outline"
                class="cursor-pointer"
                color='primary' />
            </template>
          </q-input>

          <q-btn class=" q-mt-md"
            style="width: 100%"
            color="primary"
            :loading="loading"
            @click="recuperarSenha">
            Enviar
            <span slot="loading">
              <q-spinner-puff class="on-left" />Enviando...
            </span>
          </q-btn>
          <q-btn flat
            color="info"
            no-caps
            dense
            class="q-px-sm q-mt-md"
            label="Voltar"
            @click="modalEsqueciSenha = false" />
        </q-card>
      </q-page> -->
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
        this.$router.push({ name: 'principal' })
    }).catch(error => {
        console.error(error)
      })
    }
  }
})

</script>