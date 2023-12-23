<template>
  <div>
    <!-- Hoş Geldiniz Mesajı -->
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg" style="background-color: #8B4513;">
      <v-img class="mx-auto my-6" max-width="228"
        src="../logo/Blue Professional Modern Space Planet Rocket Software Logo.png"></v-img>

<div class="class1">
      <h1 v-if="userStore.user[0]" class="animated fadeInDown text-white" style="font-style: italic;">Welcome,{{ userStore.user[0].username }}</h1>
      <h1 v-if="!userStore.user[0]" class="animated fadeInDown text-white" style="font-style: italic;">Welcome,You must Log in</h1>

      <p class="animated fadeInUp text-white" style="font-style: italic;">You can start preparing your todo list in the TodoApp application.</p>

</div>

    </v-card>
  </div>
</template>

<script>
import { useUserStore } from '@/store/app';
export default {

  setup() {
    const userStore = useUserStore()
    return {
      userStore,
    };
  },
};

</script>

<style>
.animated {
  animation-duration: 1s;
}

.fadeInDown {
  animation-name: fadeInDown;
}

.fadeInUp {
  animation-name: fadeInUp;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
</style>
