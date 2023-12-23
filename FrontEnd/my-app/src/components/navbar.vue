<template>
  <v-app-bar id="appbar">
    <v-container style="max-width: 100%;">
      <div class="container">
        <div>
          <router-link to="/" class="text-decoration-none">
            <v-btn text>
              <v-toolbar-title>
                <span>Todo</span>
                <span>App</span>
              </v-toolbar-title>
            </v-btn>
          </router-link>
        </div>
        <div>
          <v-btn v-if="!userStore.user[0]" text>
            <router-link to="/register" class="brn">
              <v-icon left>mdi-account-circle</v-icon>
              Sign Up
            </router-link>
          </v-btn>

          <v-btn v-if="!userStore.user[0]" text>
            <router-link to="/login" class="brn">
              <v-icon left>mdi-account-circle</v-icon>
              Log In
            </router-link>
          </v-btn>

          <v-btn v-if="userStore.user[0]" text>
            <router-link to="/todos" class="text-decoration-none" style="color: black;">
              <v-icon left style="color: black;">mdi-widgets</v-icon>
              Todos
            </router-link>
          </v-btn>
        </div>
        <div v-if="userStore.user[0]">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-account-circle" v-bind="props"></v-btn>
            </template>
            <v-card min-width="200px">
              <v-list>
                <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
                  :title="userStore.user[0].username" subtitle="user">
                </v-list-item>
                <v-list-item>
                  <v-btn v-if="userStore.user[0]" icon="mdi-logout" @click="handleClick" style="left:70%" class="x-small">
                    <v-icon left></v-icon>
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script>
import { useUserStore } from '@/store/app';
export default {
  name: "Navbar",
  props: ["user"],
  setup() {
    const userStore = useUserStore()
    return {
      userStore,
    };
  },
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    handleClick() {
      sessionStorage.removeItem('userData');
      sessionStorage.removeItem('token');
      localStorage.removeItem('todo_id');
      localStorage.removeItem('userId');
      this.$router.push("/");
      window.location.reload()
    },
  },
};
//d-flex justify-content-between align-items-center
</script>

<style scoped>
#appbar {
  background-color: rgb(247, 236, 221);
}

.container {
  display: flex;
  justify-content: space-between;
  max-width: 1600px;

  span {
    color: black;
  }
}

.brn {
  color: black;
  text-decoration: none;
}
</style>

