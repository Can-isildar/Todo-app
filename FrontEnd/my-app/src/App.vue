<template>
  <v-app  class="user">
    <Navbar :user="user" />
    <v-main >
      <!-- v-main içinde v-container veya başka bir Vuetify bileşeni kullanabilirsiniz -->
      <v-container class="container">
        <router-view :user="user" class="router"></router-view>
        
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import { ref, onMounted, onUnmounted } from 'vue';
export default {
  name: "app",
  components: {
    Navbar,
  },
  setup() {
    const user = ref(sessionStorage.getItem('user'));

    const updateUserFromSessionStorage = () => {
      user.value = sessionStorage.getItem('user');
    };

    // Component mount olduğunda başlat
    onMounted(() => {
      // Her saniye updateUserFromSessionStorage fonksiyonunu çağır
      const intervalId = setInterval(updateUserFromSessionStorage, 1000);

      // Component unmount olduğunda interval'i temizle
      onUnmounted(() => {
        clearInterval(intervalId);
      });
    });

    return {
      user,
    };
  },
};

</script>

<style scoped>
.user{
  background-color: rgb(112, 38, 38);
}
</style>
