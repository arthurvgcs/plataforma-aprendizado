import { Notify } from 'quasar'

// export const notificarErro = (msg, error = null, opts = {}) => {
//   let erro = ''
//   if (error) {
//     erro = error?.data?.error || error?.data?.msg || error?.data?.message || error?.response?.data.error || 'Não identificado'
//   }
//   const findErro = Errors.find(e => e.error == erro)
//   let message = ''

//   if (error && findErro?.error) {
//     message = `
//       <p class="text-bold">
//       Ops...<br>
//       <span class="text-bold">${findErro.description}.</span>
//       </p>
//       <p>${findErro.detail}</p>
//     `
//   } else {
//     message = `
//     <p class="text-bold">
//       Ops...<br>
//       <span class="text-bold">${msg}</span>
//     </p>`
//     message += error ? `<p>Detail: ${erro}</p>` : ''
//   }

//   Notify.create({
//     type: 'negative',
//     progress: true,
//     position: 'top',
//     timeout: 2500,
//     message,
//     actions: [{
//       icon: 'close',
//       round: true,
//       color: 'white'
//     }],
//     html: true,
//     ...opts
//   })
//   throw new Error(message)
// }

export const notificarSucesso = (msg, opts = {}) => {
  const message = `Tudo certo... <br>${msg}.`
  Notify.create('Teste')
  // Notify.create({
  //   type: 'positive',
  //   progress: true,
  //   position: 'top',
  //   message,
  //   classes: 'text-body1',
  //   timeout: 3000,
  //   actions: [{
  //     icon: 'close',
  //     round: true,
  //     color: 'white'
  //   }],
  //   html: true,
  //   ...opts
  // })
}