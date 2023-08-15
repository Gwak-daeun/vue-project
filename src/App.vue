<template>

  <div class="container">
    <h2>To-Do List</h2>
    <input
      class="form-control"
      type="text" 
      v-model="searchText" 
      placeholder="Search"
    />

    <hr />

    <TodoSimpleForm @add-todo="addTodo" />
    <div style="color: red;">{{ error }}</div>
  
    <div v-show="!filteredTodos.length">
      <!-- todos 배열이 없을 때 나타나도록 -->
      There is nothing to display
    </div>
    <TodoList 
    :todos="filteredTodos" 
    @toggle-todo="toggleTodo" 
    @delete-todo="deleteTodo" 
    />
   
  </div>
  

</template>

<script>
import { ref, computed } from 'vue';
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

    const getTodos = async () => {
      try {
        const res = await axios.get('http://localhost:3000/todos');
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
        const res =  await axios.post('http://localhost:3000/todos', {
        subject : todo.subject, // id를 넣지 않아도 db에서 알아서 1부터 아이디를 넣어준다.
        completed : todo.completed,
        });
        todos.value.push(res.data);
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
        todos.value.splice(index, 1);
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

    const searchText = ref('');

    const filteredTodos = computed(() => {
      if(searchText.value) {
        return todos.value.filter(todo => {
          return todo.subject.includes(searchText.value);
        });
      }

      return todos.value;
    });
   
    return {
      todos,
      addTodo,
      deleteTodo,
      toggleTodo,
      searchText,
      filteredTodos,
      error,
      getTodos
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