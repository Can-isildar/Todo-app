
import axios from 'axios';
const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",

  },
});

apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token')

apiClient.interceptors.request.use(async req => {

  let token = sessionStorage.getItem('token')
  req.headers.Authorization = `Bearer ${token}`

  return req

})


export async function register(userData) {
  return apiClient.post(`/users/register`, userData).then(({ data }) => data).catch(error => {
    throw error
  });
}

export async function login(userData) {
  return apiClient.post(`/users/login`, userData).then(({ data }) => data).catch((error) => {
    throw error
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function getTodos() {
  return apiClient.get('/todos')
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });

}

export async function addTodos(todo) {
  return apiClient.post('todos', todo).then(({ data }) => {
    return data
  }).catch((error) => {
    throw error;
  });
}

export async function deleteTodos(id) {
  return apiClient.delete(`/todos/${id}`)
}

export async function updateTodos(id, TodoJSON) {
  return apiClient.put(`/todos/${id}`, TodoJSON)
}

/////////////////////////////////////////////////////////////////////////////////

export async function getTodoItems(todo_id) {
  return apiClient.get(`todos/${todo_id}/items`).then(({ data }) => data).catch((error) => {
    throw error;
  })
}

export async function updateTodoItems(id,todo_id,todoItem) {
return apiClient.put(`todos/${todo_id}/items/${id}`,todoItem).then(({data})=>data).catch((error)=>{
  throw error;
})
}

export async function deleteTodoItems(id, todo_id) {
  return apiClient.delete(`todos/${todo_id}/items/${id}`).then(({ data }) => data).catch((error) => {
    throw error;
  })
}

export async function addTodoItems(todo_id, todoItem) {
  return apiClient.post(`todos/${todo_id}/items`, todoItem).then(({ data }) => data).catch((error) => {
    throw error;
  })
}