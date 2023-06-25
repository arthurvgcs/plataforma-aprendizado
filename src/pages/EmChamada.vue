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
              <div>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/avatar.png">
                </q-avatar>
                <q-btn-dropdown color="white" label="Olá, Mary" flat>
                  <q-list>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>Sair</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </div>
            </q-toolbar>
          </div>
          <div class="flex justify-center">
            <q-card flat bordered class="my-card q-mt-md">
              <q-card-section>
                <div class="text-h6">Como posso iniciar um servidor em JavaScript?</div>
              </q-card-section>
              <q-card-section class="q-pt-none">
                <q-badge color="blue">Programação Web</q-badge>
              </q-card-section>
              <q-card-section class="q-pt-none usuarios-container">
                <div class="usuario-direita">
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/avatar.png">
                  </q-avatar>
                  <div class="nome-usuario">Voce</div>
                </div>
                <div class="usuario-esquerda">
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/avatar.png">
                  </q-avatar>
                  <div class="nome-usuario">Fulano</div>
                </div>
              </q-card-section>
              <q-card-section class="q-pt-none">
                <div class="icon-container">
                    <q-btn round
                    icon="call_end"
                    color="red"
                    class="icon-spacing"
                    @click="endCall"
                    ></q-btn>
                    <q-btn round
                    icon="mic_off"
                    color="red"
                    @click="toggleMic"
                    ></q-btn>
                </div>
                </q-card-section>
              <q-separator inset />
              <q-card-section>
                <q-chat-message
                    v-for="(message, index) in chatMessages"
                    :key="index"
                    :name="message.receive ? 'Fulano' : 'Você'"
                    :avatar="message.receive ? 'https://cdn.quasar.dev/img/avatar.png' : 'https://cdn.quasar.dev/img/avatar.png'"
                    :text="message.text"
                    :receive="message.receive"
                    :bg-color="message.receive ? 'secondary' : 'primary'"
                    text-color="white"
                    :stamp="message.timestamp"
                />
              </q-card-section>
              <q-card-section>
                <q-input
                  v-model="newMessage"
                  @keydown.enter="sendMessage"
                  outlined
                  label="Digite sua mensagem"
                />
              </q-card-section>
            </q-card>
          </div>
        </q-page-container>
      </q-layout>
    </div>
  </template>
  
  <script>
export default {
  name: 'EmChamada',
  data() {
    return {
      newMessage: '',
      chatMessages: [],
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.chatMessages.push({
          receive: false,
          text: [this.newMessage],
          timestamp: new Date().toLocaleTimeString(),
        });
        this.newMessage = '';
      }
    },
    endCall() {
      // Lógica para encerrar a chamada
    },
    toggleMic() {
      // Lógica para ativar/desativar o microfone
    },
  },
};
</script>
  
  <style>
  .usuario {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .usuario-esquerda {
    align-self: flex-start;
  }
  
  .usuario-direita {
    align-self: flex-end;
  }
  
  .nome-usuario {
    margin-top: 5px;
  }
  
  .usuarios-container {
    display: flex;
    justify-content: space-between;
  }
  
  .icon-container {
    display: flex;
    justify-content: center;
  }
  
  .icon-spacing {
    margin-right: 25px;
  }
  </style>
  