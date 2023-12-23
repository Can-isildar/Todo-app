<template>
  <v-card class="mx-auto" max-width="344" title="User Registration">
    <v-snackbar v-model="snackbar" :timeout="3000" color="success">Başarıyla giriş yapıldı</v-snackbar>
    <error v-if="error" :error="error"></error>
    <v-container>
      <v-text-field v-model="fullname" color="primary" label="fullname" variant="underlined"></v-text-field>

      <v-text-field v-model="username" color="primary" label="username" variant="underlined"></v-text-field>

      <v-text-field v-model="age" color="primary" label="age" variant="underlined"></v-text-field>

      <v-text-field v-model="email" color="primary" label="Email" variant="underlined"></v-text-field>

      <v-text-field v-model="password" color="primary" label="Password" placeholder="Enter your password"
        variant="underlined"></v-text-field>

      <v-checkbox v-model="terms" color="secondary" label="I agree to site terms and conditions"></v-checkbox>
    </v-container>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="success" @click="registerUser">
        Complete Registration

        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import Error from "@/components/error.vue";
import router from "@/router";
import { register } from "@/services/api"

export default {
  data: () => ({
    fullname: null,
    username: null,
    age: null,
    email: null,
    password: null,
    terms: false,
    error: "",
  }),
  components: {
    Error,
  },
  methods: {
    async registerUser() {
      const user = {
        email: this.email,
        password: this.password,
        fullname: this.fullname,
        username: this.username,
        age: +this.age
      };
      try {
        const response = await register(user)
        const { token, username, userId } = response
        const userData = {
          token, userId, username
        };
        sessionStorage.setItem("userData", JSON.stringify(userData))
        router.push('/login')
      } catch (error) {
        this.error = "You entered incomplete or incorrect data."
        setTimeout(() => {
          this.error = "";
        }, 5000);
      }
    }
  },
};
</script>
