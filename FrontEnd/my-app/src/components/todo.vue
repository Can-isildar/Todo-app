<template>
  <div class="todo-app">
    <div class="todo-container">
      <div class="d-flex justify-center">
        <div class="col-12 col-md-8">
          <div class="elevation-12 todo-card" style="
              background-color: rgba(255, 255, 255, 0.95);
              margin-top: 20px;
              border-radius: 10px;
              padding: 20px;
            ">
            <div class="text-h6 font-weight-bold text-center">
              Todo list
            </div>
            <hr />
            <div class="list-group" v-if="todoList">
              <div v-for="(todo, index) in todoList" :key="index" class="list-group-item todo-list-item">
                <div>
                  <!-- Eğer düzenleme modu aktifse ve şu anki todo edit ediliyorsa -->
                  <template v-if="todo.editing">
                    <input v-model="updateNewTodo" :placeholder="newUpdateTodoPlcaeHolder"
                      class="form-control updateNewTodo" @keydown.enter="confirmUpdate(todo.id, todo)"
                      @keydown.esc="cancelEdit(todo)">
                    <v-btn @click="confirmUpdate(todo.id, todo)" icon class="checkButton small "><v-icon
                        >mdi-check</v-icon></v-btn>
                    <v-btn @click="cancelEdit(todo)" icon><v-icon class="closeButton">mdi-close</v-icon></v-btn>
                  </template>
                  <!-- Eğer düzenleme modu kapalıysa veya şu anki todo edit edilmiyorsa -->
                  <template v-else>
                    <span class="todo-text-bold">{{ todo.names }}</span>
                  </template>
                </div>
                <div class="d-flex">
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
                    </template>
                    <template v-if="!todo.editing">
                      <v-btn @click="startEdit(todo)" icon>
                        <v-icon style="color:darkblue">mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <v-btn @click="removeTodo(todo.id)" icon>
                      <v-icon style="color:rgb(165, 2, 2);">mdi-delete</v-icon>
                    </v-btn>
                    <!-- Yeni eklenecek buton -->
                    <v-btn @click="showTodoItems(todo.id)" icon>
                      <v-icon>mdi-eye</v-icon>
                    </v-btn>
                  </v-menu>
                  <!-- Eğer düzenleme modu kapalıysa, edit butonu göster -->
                </div>
              </div>
            </div>
            <hr />
            <div class="d-flex align-center">
              <div class="col-12 col-md-8">
                <input v-model="newTodo" :placeholder="newTodoPlaceholder" @keydown.enter="addTodo"
                  class="form-control todo-input" style="width: 100%;">
              </div>
              <div class="col-12 col-md-6 text-center">
                <v-btn @click="addTodo" class="btn btn-primary todo-button">
                  Add Todo
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Error from "@/components/error.vue";
import { addTodos, getTodos, deleteTodos, updateTodos } from '@/services/api';
import { onMounted, ref } from 'vue';
import router from "@/router";
export default {
  name: 'todo',
  props: ['user'],
  setup() {
    const todoList = ref([]);
    const newTodo = ref("");
    const updateNewTodo = ref("");

    onMounted(async () => {
      try {
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        if (userData) {
          const fetchedTodos = await getTodos(userData.token);
          todoList.value = fetchedTodos;
        } else {
          // Kullanıcı verisi bulunamadı, yönlendirme veya hata işlemleri yapılabilir.
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    });

    return {
      todoList,
      newTodo,
      updateNewTodo
    };
  },
  computed: {
    newTodoPlaceholder() {
      return this.newTodo ? "" : "Enter a new todo";
    },
    newUpdateTodoPlcaeHolder() {
      return this.updateNewTodo ? "" : "update todo";
    },
  },
  methods: {
    async addTodo() {
      const todo = {
        names: this.newTodo
      }
      if (this.newTodo) {
        await addTodos(todo).then((val) => {
          this.todoList.push({ id: val.id, names: this.newTodo });
          this.newTodo = "";
        })
      }
    },
    async removeTodo(id) {
      await deleteTodos(id)
      this.todoList.splice(this.todoList.findIndex((item) => item.id == id), 1);
    },
    startEdit(todo) {
      // Düzenleme modunu başlatma işlemleri
      todo.editing = true;
    },
    async confirmUpdate(id, todo) {
      const updateTodo = {
        names: this.updateNewTodo
      }
      const TodoJSON = JSON.stringify(updateTodo)
      await updateTodos(id, TodoJSON)
      todo.names = updateTodo.names
      this.cancelEdit(todo)
    },
    cancelEdit(todo) {
      // Düzenleme modunu iptal etme işlemleri
      todo.editing = false;
    },
    async showTodoItems(id) {
      router.push('/todos/items')
      localStorage.setItem('todo_id', id)
    }
  },
};
</script>

<style scoped>

.closeButton{
  color: darkred;
}
.checkButton {
  color: #45a049;
}

.todo-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  height: 65px;

}

.todo-text-bold {
  font-weight: bold;
}

.edit-btn {
  margin-right: 8px;
  background-color: #4CAF50;

  color: white;

  border: none;

  padding: 8px 12px;

  border-radius: 4px;

  cursor: pointer;

}
.todo-container {
  background-color: antiquewhite;
  width: 100%;
  /* Eklediğim stil: Container arka plan rengi */

}

pg .todo-card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 30px;
  /* Kartın içeriğine biraz daha dolgu ekledim */
  margin-top: 30px;
  /* Kartın üst kısmına biraz daha boşluk ekledim */
  border-radius: 15px;
  /* Kartın köşelerini biraz daha yuvarladım */
  width: 100%;
  /* Kartın genişliğini ekran genişliğine uyacak şekilde ayarladım */
}
</style>