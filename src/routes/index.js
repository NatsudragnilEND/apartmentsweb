import { createWebHashHistory, createRouter } from 'vue-router'

import Home from '../pages/Home.vue'
import Products from '../pages/Products.vue'
import ProductDetails from '../components/ApartmentDetails.vue'

import DeleteProduct from '../pages/delete.vue'
const routes = [
  { path: '/', component: Home },
  { path: '/new_product', component: Products },
  { path: '/projects/:id', component: ProductDetails },
  { path: '/delete_product', component: DeleteProduct },
]

const router = createRouter({
  // Use createWebHashHistory for hash history
  history: createWebHashHistory(),
  routes,
})

export default router