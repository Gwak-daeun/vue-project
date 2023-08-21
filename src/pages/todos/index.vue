<template>
      <div>
        <div class="d-flex justify-content-between mb-3">
          <h2>To-Do List</h2>
          <button 
            class="btn btn-primary"
            @click="moveToCreatePage"
          >
            Create Todo
          </button>
        </div>
        
        <input
          class="form-control"
          type="text" 
          v-model="searchText" 
          placeholder="Search"
          @keyup.enter="searchTodo"
        />
    
        <hr />

        <div v-show="!todos.length">
          <!-- todos 배열이 없을 때 나타나도록 -->
          There is nothing to display
        </div>
        <TodoList 
        :todos="todos" 
        @toggle-todo="toggleTodo" 
        @delete-todo="deleteTodo" 
        />
        <hr />
        
        <Pagination
        v-if="todos.length"
        :numberOfPages="numberOfPages"
        :currentPage="currentPage"
        @click="getTodos"
        />

      </div>

    
    </template>
    
    <script>
    import { ref, computed, watch} from 'vue';
    import TodoList from '@/components/TodoList.vue';
    import axios from 'axios';
    import {useToast} from '@/composables/toast';
    import { useRouter } from 'vue-router';
    import Pagination from '@/components/Pagination.vue';

    
    export default {
      components: {
        TodoList,
        Pagination
      },
      setup() {
        
        const router = useRouter();
        const todos = ref([]);
        const error = ref('');
        const numberOfTodos = ref(0);
        const limit = 5;
        const currentPage = ref(1);
        const searchText = ref('');
 
        const numberOfPages = computed(() => {
          return Math.ceil(numberOfTodos.value/limit);
        });

        const {
          showToast,
          toastMessage,
          toastAlertType,
          triggerToast,
          } = useToast();
    
        const getTodos = async (page = currentPage.value) => {
          currentPage.value = page;
          try {
            const res = await axios.get(`http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`); // 한페이지당 데이터가 5개 보이도록
            numberOfTodos.value = res.headers['x-total-count'];
            todos.value = res.data;
          } catch (err) {
            console.log(err);
            error.value = "Somthing went wrong";
            triggerToast('Something went wrong', 'danger');
          }
        };
    
        getTodos();
       
      
        const addTodo = async (todo) => {
          //데이터베이스에 투두 저장
          error.value = '';
          try {
            await axios.post('http://localhost:3000/todos', {
            subject : todo.subject, // id를 넣지 않아도 db에서 알아서 1부터 아이디를 넣어준다.
            completed : todo.completed,
            });
            getTodos(1);
          } catch (err) {
            console.log(err);
            error.value = "Somthing went wrong";
            triggerToast('Something went wrong', 'danger');
          }
        };
    
        const deleteTodo = async (id) => {
          error.value = '';
          
          try {
            await axios.delete('http://localhost:3000/todos/' + id); // 요청이 성공을 하면 다음 줄의 코드를 실행하고,
                                                                                //실패하면 catch로 넘어간다.
            getTodos(1);
          } catch (err) {
            error.value = "Somthing went wrong";
            triggerToast('Something went wrong', 'danger');
          }
        };
    
        const toggleTodo = async (index, checked) => {
          console.log(checked);
          error.value = '';
          const id = todos.value[index].id;
          try {
            await axios.patch('http://localhost:3000/todos/' + id, {
              completed : checked
            });
            todos.value[index].completed = checked
          } catch (err) {
            error.value = "Somthing went wrong";
            triggerToast('Something went wrong', 'danger');
          }
    
        };
    
    
        let timeout = null;
    
        const searchTodo = () => {
          clearTimeout(timeout);
          getTodos(1);
        };
    
        watch(searchText, () => {
          clearTimeout(timeout); 
          timeout = setTimeout(() => {
            getTodos(1); 
    
          }, 1000);
        });

        const moveToCreatePage = () => {
          router.push({
            name : 'TodoCreate'
          });
        };
    
        return {
          todos,
          addTodo,
          deleteTodo,
          toggleTodo,
          searchText,
          error,
          getTodos,
          numberOfPages,
          currentPage,
          searchTodo,
          toastMessage,
          toastAlertType,
          showToast,
          triggerToast,
          moveToCreatePage,
        };
      }
    }
    </script>
    
    <style>
      .todo {
        color: gray;
        text-decoration: line-through;
      }
    </style>