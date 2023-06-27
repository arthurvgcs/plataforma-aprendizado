import { notificarErro, notificarSucesso } from 'src/utils/helpersNotifications'

export default ({
  Vue
}) => {
  Vue.prototype.$notificarErro = notificarErro
  Vue.prototype.$notificarSucesso = notificarSucesso
}