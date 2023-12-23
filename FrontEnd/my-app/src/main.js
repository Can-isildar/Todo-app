/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */


// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

import 'bootstrap/dist/css/bootstrap.min.css'

import 'bootstrap'
import { useUserStore } from './store/app'
const app = createApp(App)

registerPlugins(app)

app.mixin({
  created() {
    const userStore = useUserStore();

    // sessionStorage'den kullanıcı verisini al
    const storedUser = sessionStorage.getItem('userData');

    // Kullanıcı verisi zaten mağazada değilse ekleyin
    if (storedUser && !userStore.user.some(u => u.id === JSON.parse(storedUser).id)) {
      userStore.$patch((state) => {
        state.user.push(JSON.parse(storedUser));
      });
    }
  },
});

app.mount('#app')
