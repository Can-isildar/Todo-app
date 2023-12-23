<template>
  <div>
    <v-img class="mx-auto my-6" max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img>

    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>
      <error v-if="error" :error="error"></error>

      <v-text-field v-model="email" density="compact" placeholder="Email address" prepend-inner-icon="mdi-email-outline"
        variant="outlined"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between" v-if="togglePasswordVisibility">
        Password

        <router-link to="forgot" class="text-caption text-decoration-none text-blue" rel="noopener noreferrer"
          target="_blank">
          Forgot login password?</router-link>
      </div>

      <v-text-field
        v-model="password"
        :type="isVisible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        :append-inner-icon="isVisible ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="togglePasswordVisibility"
        variant="outlined"
        class="passwordHolder"
      ></v-text-field>

      <v-card class="mb-12" color="surface-variant" variant="tonal"> </v-card>

      <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="loginUser">
        Log In
      </v-btn>

      <v-card-text class="text-center">
        <a class="text-blue text-decoration-none" href="http://localhost:3000/register" rel="noopener noreferrer"
          target="_blank">
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>

import Error from "@/components/error.vue";
import router from "@/router";
import { login } from "@/services/api";
import { useUserStore } from "@/store/app"

export default {
  data: () => ({
    email: null,
    password: null,
    error: "",
    isVisible: false,
    Error,
  }),

  components: {
    Error,
  },

  methods: {
    async loginUser() {
      const userStore = useUserStore();
      const user = {
        email: this.email,
        password: this.password
      };
      try {
        const response = await login(user)
        const { token, userId, username, email } = response
        const userData = {
          token, userId, username, email
        };
        sessionStorage.setItem("userData", JSON.stringify(userData));
        sessionStorage.setItem('token', token)
        userStore.$patch((state) => {
          state.user.push(userData)
        })
        router.push('/todos')

      } catch (error) {
        this.error = "Invalid username or password";
        console.error("login Failed", error);
        setTimeout(() => {
          this.error = "";
        }, 5000);
      }
    },
    onFormSubmit() {
      console.log("onFormSubmit");
      this.loginUser();
    },

    togglePasswordVisibility() {
      this.isVisible = !this.isVisible;
    }

  },
};
</script>

