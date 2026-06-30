import { Hono } from 'hono'
import { catalogListHandler } from './catalog/list.route'
import { orderDetailHandler } from './order/detail.route'
import { healthHandler } from './system/health.route'
import { pingHandler, pingValidation } from './system/ping.route'
import { userProfileHandler } from './user/profile.route'

type Bindings = {
  APP_ENV: 'development' | 'test' | 'production'
}

const routes = new Hono<{ Bindings: Bindings }>()

const appRoutes = routes
  .get('/health', healthHandler)
  .post('/rpc/system/ping', pingValidation, pingHandler)
  .get('/rpc/catalog', catalogListHandler)
  .get('/rpc/user', userProfileHandler)
  .get('/rpc/order/:id', orderDetailHandler)

export default appRoutes
