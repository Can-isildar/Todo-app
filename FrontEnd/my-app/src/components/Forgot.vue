<template>
  <v-card class="mx-auto" color="primary" style="max-width: 400px; padding: 20px">
    <v-form>
      <v-container>
        <v-row justify="center">
          <v-col cols="12">
            <h3 class="white--text text-center">Forgot Password</h3>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="12">
            <v-text-field
              v-model="email"
              label="Email"
              placeholder="Email"
              class="white--text"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="12">
            <v-btn class="white--text" @click="submitForm">Submit</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import axios from "axios";
const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});
export default {
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async handleSubmit(payload) {
      const response = await apiClient.post("forgot", payload);
      console.log(response);
    },
  },
};
</script>

<style scoped>
.v-card {
  transition: max-width 0.5s, padding 0.5s;
}

.text-center {
  text-align: center;
}
</style>
@/AuthService/axios
