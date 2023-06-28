<template>
  <div>
    <q-toolbar class="bg-dark text-white">
      <q-avatar clickable @click="this.$router.push({ name: 'principal'})" style="cursor: pointer;">
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
      </q-avatar>

      <q-toolbar-title clickable @click="this.$router.push({ name: 'principal'})" style="cursor: pointer;">Activison</q-toolbar-title>

      <div class="usuario">
        <q-avatar color="blue" text-color="white" class="q-mr-sm">
          <q-icon name="mdi-account"></q-icon>
        </q-avatar>
        <q-btn-dropdown color="white" :label='`Olá, ${user.nome} `' flat>
          <q-list>
            <q-item v-if="user.perfil == 'Administrador'" clickable v-close-popup @click="irParaAdmin" >
              <q-item-section>
                <q-item-label><q-icon name="mdi-account" class="q-mr-sm"></q-icon>Administrar</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="efetuarLogOut" >
              <q-item-section>
                <q-item-label><q-icon name="mdi-logout" class="q-mr-sm"></q-icon>Sair</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </q-toolbar>
  </div>
</template>
<script>

export default {
  name: 'navBar',
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      user: {},
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
    efetuarLogOut(){
      localStorage.removeItem("nome")
      localStorage.removeItem("email")
      localStorage.removeItem("perfil")
      localStorage.removeItem("id")

      this.$router.push({ name: 'login', replace: true})
    },
    irParaAdmin(){
      this.$router.push({ name: 'admin'})
    }
  },
}
</script>

<style lang="scss" scoped>
</style>