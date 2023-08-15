<template>
<router-view />
  <div class="container">
    <h2>To-Do List</h2>
    <input
      class="form-control"
      type="text" 
      v-model="searchText" 
      placeholder="Search"
      @keyup.enter="searchTodo"
    />

    <hr />

    <TodoSimpleForm @add-todo="addTodo" />
    <div style="color: red;">{{ error }}</div>
  
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
      <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li
        v-if="currentPage !== 1"
        ><a class="page-link" @click="getTodos(currentPage - 1)" style="cursor: pointer;">Previous</a></li>
        <li 
          v-for="page in numerOfPages"
          :key="page"
          class="page-item"
          :class="currentPage === page ? 'active' : null" 
          
          >
        
        <a class="page-link" @click="getTodos(page)">{{ page }}</a>
        </li>
        <li 
        v-if="numerOfPages !== currentPage"
        class="page-item"><a class="page-link" @click="getTodos(currentPage + 1)" style="cursor: pointer;">Next</a></li>
      </ul>
    </nav>
  </div>
  

</template>

<script>
import { ref, computed, watch} from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
import axios from 'axios';


export default {
  components: {
    TodoSimpleForm,
    TodoList
  },
  setup() {
    
    const todos = ref([]);
    const error = ref('');
    const numberOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);
    const searchText = ref('');


    const numerOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value/limit);
    });

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(`http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`); // 한페이지당 데이터가 5개 보이도록
        numberOfTodos.value = res.headers['x-total-count'];
        todos.value = res.data;
      } catch (err) {
        console.log(err);
        error.value = "Somthing went wrong";
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
      }
    };

    const deleteTodo = async (index) => {
      error.value = '';
      const id = todos.value[index].id;
      try {
        await axios.delete('http://localhost:3000/todos/' + id); // 요청이 성공을 하면 다음 줄의 코드를 실행하고,
                                                                            //실패하면 catch로 넘어간다.
        getTodos(1);
      } catch (err) {
        error.value = "Somthing went wrong";
      }
    };

    const toggleTodo = async (index) => {
      error.value = '';
      const id = todos.value[index].id;
      try {
        await axios.patch('http://localhost:3000/todos/' + id, {
          completed : !todos.value[index].completed
        });
        todos.value[index].completed = !todos.value[index].completed;
      } catch (err) {
        error.value = "Somthing went wrong";
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

    // const filteredTodos = computed(() => {
    //   if(searchText.value) {
    //     return todos.value.filter(todo => {
    //       return todo.subject.includes(searchText.value);
    //     });
    //   }

    //   return todos.value;
    // });
   
    return {
      todos,
      addTodo,
      deleteTodo,
      toggleTodo,
      searchText,
      // filteredTodos,
      error,
      getTodos,
      numerOfPages,
      currentPage,
      searchTodo,
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