<template>
  <v-app>
    <v-container class="cont" fluid>
      <div class="text-center">
        <v-card class="elevation-12 todo-card" outlined>
          <v-card-title class="text-h6 font-weight-bold" style="margin-left: 80px;">
            Todo Items
            <v-menu v-model="menu" :close-on-content-click="false" location="end">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" icon class="filter-icon"> <v-icon > mdi-filter </v-icon></v-btn>
              </template>
              <v-card min-width="300">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <nav class="filter-nav">
                    <v-btn @click="updateFilter('all')" :class="{ active: current === 'all' }"
                      style="font-size: x-small;">All Items</v-btn>
                    <v-btn @click="updateFilter('completed')" :class="{ active: current === 'completed' }"
                      style="font-size: x-small;">completed
                      Items</v-btn>
                    <v-btn @click="updateFilter('ongoing')" :class="{ active: current === 'ongoing' }"
                      style="font-size:x-small;">Ongoing Items</v-btn>
                  </nav>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-item-group v-if="todoItemsList">
              <v-list-item v-for="(todoItem, index) in filteredTodoItemsList" :key="index" class="todo-list-item">
                <v-list-item-content class="list-item-content">
                  <div>
                    <v-checkbox class="checkbox" v-model="todoItem.completed" color="success"
                      @change="toggleCompleted(todoItem)">
                    </v-checkbox>
                  </div>
                  <!-- Eğer düzenleme modu aktifse ve şu anki todo edit ediliyorsa -->
                  <template v-if="todoItem.editing">
                    <input v-model="newUpdateDescription" :placeholder="newUpdateTodoPlcaeHolder"
                      class="form-control updateNewTodo" @keydown.enter="confirmUpdate(todoItem.id, todoItem)"
                      @keydown.esc="cancelEdit(todoItem)">
                    <v-btn><v-icon class="checkButton"
                        @click="confirmUpdate(todoItem.id, todoItem)">mdi-check-circle</v-icon></v-btn>
                    <v-btn @click="cancelEdit(todoItem)"><v-icon class="closeButton">mdi-close-circle</v-icon></v-btn>
                  </template>
                  <!-- Eğer düzenleme modu kapalıysa veya şu anki todo edit edilmiyorsa -->
                  <template v-else>
                    <div class="description" :style="{ 'text-decoration': todoItem.completed ? 'line-through' : 'none' }">
                      <p class="description-text"> {{ `${todoItem.description.toUpperCase()}` }}</p>
                    </div>
                  </template>
                  <div class="delete-button">
                    <v-menu>
                      <template v-slot:activator="{ props }">
                        <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
                      </template>
                      <v-btn @click="removeTodoItem(todoItem.id)" class="delete-btn" style="color:rgb(165, 2, 2)" icon>
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                      <v-btn @click="openEditButton(todoItem)" class="edit-btn" icon>
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </v-menu>
                  </div>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <v-list-item v-else>
              <v-list-item-content>No todo items available</v-list-item-content>
            </v-list-item>
          </v-list>
          <div class="addTodoItem">
            <v-text-field v-model="newTodoItemsDescription" :placeholder="newTodoPlaceholder" @keydown.enter="addTodoItem"
              outlined class="todo-input" style="width: 70%"></v-text-field>
            <!-- <v-checkbox v-model="newTodoItemsCompleted" label="Completed"></v-checkbox> -->
            <v-btn @click="addTodoItem" color="primary" class="todo-button">
              Add
            </v-btn>
          </div>
        </v-card>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import Error from "@/components/error.vue";
import { onMounted, ref } from 'vue';
import { getTodoItems, deleteTodoItems, addTodoItems, updateTodoItems } from '@/services/api';

export default {
  data() {
    return {
      current: 'all',
      Error,
      fav: true,
      menu: false,
      message: false,
      hints: true,
    }
  },
  props: ['user'],
  setup() {
    const todoItemsList = ref([]);
    const newTodoItemsDescription = ref("");
    const updateTodoItems = ref("")
    const newUpdateDescription = ref("");
    const newTodoItemsCompleted = ref(false);

    onMounted(async () => {
      try {
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        if (userData) {
          const id = localStorage.getItem('todo_id')
          console.log(id);
          const fetchedTodoItems = await getTodoItems(id);

          todoItemsList.value = fetchedTodoItems
        } else {
          // Kullanıcı verisi bulunamadı, yönlendirme veya hata işlemleri yapılabilir.
        }
      } catch (error) {
        console.error("Error fetching todo items:", error);
      }
    });

    return {
      todoItemsList,
      newTodoItemsDescription,
      updateTodoItems,
      newTodoItemsCompleted,
      newUpdateDescription
    };
  },
  computed: {
    newTodoPlaceholder() {
      return this.newTodoItemsDescription ? "" : "Enter a new todoItem";
    },
    newUpdateTodoPlcaeHolder() {
      return this.newUpdateDescription ? "" : "Enter a new Item";
    },
    filteredTodoItemsList() {
      if (this.current === 'completed') {
        return this.todoItemsList.filter(todoItem => todoItem.completed);
      } else if (this.current === 'ongoing') {
        return this.todoItemsList.filter(todoItem => !todoItem.completed);
      } else {
        return this.todoItemsList;
      }
    },
  },
  methods: {
    updateFilter(filter) {
      // Filtreyi güncelle
      this.current = filter;
    },
    async addTodoItem() {
      const todoItem = {
        description: this.newTodoItemsDescription,
        completed: this.newTodoItemsCompleted
      }
      if (this.newTodoItemsDescription) {
        const todo_id = localStorage.getItem('todo_id')
        await addTodoItems(todo_id, todoItem).then((val) => {
          this.todoItemsList.push({ id: val.todoItem.id, description: val.todoItem.description, completed: val.todoItem.completed })
        })
      }
      this.newTodoItemsDescription = "";
      this.newTodoItemsCompleted = false;
    },
    async removeTodoItem(id) {
      const todo_id = localStorage.getItem('todo_id')
      await deleteTodoItems(id, todo_id)
      this.todoItemsList.splice(this.todoItemsList.findIndex((item) => item.id == id), 1);

    },
    async confirmUpdate(id, todoItem) {
      console.log(id);
      const todo_id = localStorage.getItem('todo_id')
      const updateItem = {
        description: this.newUpdateDescription
      }
      const TodoJSON = JSON.stringify(updateItem)
      await updateTodoItems(id, todo_id, TodoJSON)
      todoItem.description = updateItem.description
      this.cancelEdit(todoItem)

    },
    openEditButton(todoItem) {
      todoItem.editing = true

    },
    cancelEdit(todoItem) {
      todoItem.editing = false
    },
    async toggleCompleted(todoItem) {
      const completed = {
        completed: todoItem.completed
      }
      const id = todoItem.id
      const todo_id = todoItem.todo_id
      await updateTodoItems(id, todo_id, completed)

    },
  }

};
</script>

<style scoped>
.addTodoItem {
  margin-top: 10px;
}

.description-text {
  margin: auto;
  padding: auto;
}

.cont {
  background-color: rgb(249, 239, 227);
  min-height: 100%;
}

.checkbox {
  margin-top: 50%;
}

.edit-btn {
  color: blue;
}

.todo-card {
  width: 800px;
  min-height: 100%;
  left: 220px;
  margin-top: 20px;
  border-radius: 10px;
  padding: 20px;
}

.delete-button {
  justify-content: end;
}

.list-item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.description {
  font-weight: bold;
}

.filter-nav {
  text-align: center;
}

.filter-nav button {
  font-size: large;
  margin: 10px;
  font-weight: bold;
  color: antiquewhite;
  background-color: rgb(104, 36, 36);
}

.todo-button {
  width: 15%;
  left: 40%;
  bottom: 67px;
}

.todo-list-item {
  justify-content: space-between;
  align-items: center;
}

.delete-btn {
  color: #f44336;
}

.todo-list-item {
  width: auto;
  height: auto;
  border: 2px solid rgb(66, 66, 66);
  padding: auto;
  margin: auto;
  background-color: whitesmoke;
}

.filter-icon {
  left: 230px;
  color: blue;
}
</style>
