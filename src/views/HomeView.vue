<script setup lang="ts">
import { onMounted, ref } from "vue";
const baseUrl: string = 'https://blushing-newt-kerchief.cyclic.cloud/todos'
import axios from "axios";
import type TodoType from "@/types/TodoType";

const todos = ref<TodoType[]>([]);
const isLoaded = ref<boolean>(true);
const newTodoTerm = ref<string>("");
const newTodoIsCompleted = ref<boolean>(false);

async function fetchTodos() {
  const response = await axios.get(baseUrl);
  todos.value = response.data;
  isLoaded.value = true;
}

async function addTodo() {
  isLoaded.value = false;
  await axios.post(baseUrl + "/new", {
    title: newTodoTerm.value,
    completed: newTodoIsCompleted.value,
  });
  newTodoTerm.value = "";
  newTodoIsCompleted.value = false;
  fetchTodos();
}

async function updateTodo(e: Event, todo: TodoType) {
  isLoaded.value = false;
  await axios.put(`${baseUrl}/${todo._id}`, {
    completed: (<HTMLInputElement>e.target).checked,
  });
  fetchTodos();
}

async function deleteTodo(todo: TodoType) {
  isLoaded.value = false;
  await axios.delete(`${baseUrl}/${todo._id}`)
  fetchTodos();
}

onMounted(() => fetchTodos());
</script>

<template>
  <main class="max-w-screen-sm w-full mx-auto px-2 py-6 font-mono">
    <form
      class="flex items-center rounded-md overflow-hidden relative w-full mb-4"
      @submit.prevent="addTodo"
    >
      <input
        v-model="newTodoIsCompleted"
        class="cursor-pointer absolute left-4"
        type="checkbox"
      />
      <input
        v-model="newTodoTerm"
        class="w-full rounded-l-md px-10 py-2 border focus:outline-none"
        required
        placeholder="Enter a title"
      />
      <button type="submit" class="px-4 py-2 bg-green-500 rounded-r-md">
        Save
      </button>
    </form>
    <div class="text-center">
      <h3 v-if="todos.length == 0">Todos are empty</h3>
      <ul v-else-if="isLoaded" class="space-y-2">
        <li
          class="flex items-center space-x-2 justify-between bg-green-100 rounded-md px-4 py-2"
          v-for="todo in todos"
          :key="todo._id"
        >
          <div class="flex items-center gap-3">
            <input
              @change="(e) => updateTodo(e, todo)"
              type="checkbox"
              :checked="todo.completed"
            />
            <p :class="[todo.completed ? 'line-through' : '']">
              {{ todo.title }}
            </p>
            <span class="text-gray-600">{{
              new Date(todo.updatedAt).toLocaleDateString()
            }}</span>
          </div>

          <div class="cursor-pointer" @click="deleteTodo(todo)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-trash text-red-600"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M4 7l16 0"></path>
              <path d="M10 11l0 6"></path>
              <path d="M14 11l0 6"></path>
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
            </svg>
          </div>
        </li>
      </ul>
      <h1 v-else>Loading...</h1>
    </div>
  </main>
</template>
