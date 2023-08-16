<template>
      <div 
      class="card mt-3"
      v-for="(todo, index) in todos"
      :key="todo.id"
    >
    <!-- v-for를 사용할 땐 유니크한 키값을 넣어줘야 한다. 엘레멘트(각각의 노드들)를 추적하기 위해 -->
      <div 
        class="car-body p-2 d-flex align-items-center"
        style="cursor: pointer;"
        @click="moveToPage(todo.id)"
      >
        <div class="form-check flex-grow-1">
          <input 
            class="form-check-input"  
            type="checkbox" 
            :checked="todo.completed"
            @change="toggleTodo(index, $event)"
            @click.stop
          />
          <label 
            class="form-check-label"
            :class="{todo: todo.completed}"
           >
            {{ todo.subject }}
          </label>
        </div>
        <div>
            <button 
              class="btn btn-danger btn-sm"
              @click.stop="deleteTodo(index)"
            >
              Delete
            </button>
          </div>
      </div>
    </div>
</template>

<script>
import {useRouter} from 'vue-router';
export default {
    props:  {
        todos: {
            type: Array, // 부모컴포넌트에서 보낸 데이터 타입이 배열이기 때문
            required: true
        }
    },
    emits : ['toggle-todo', 'delete-todo'],
    setup(props, {emit}) {

      const router = useRouter();

      const toggleTodo = (index, event) => {
        emit('toggle-todo', index, event.target.checked);
      };

      const deleteTodo = (index) => {
        emit('delete-todo', index);
      
    };

    const moveToPage = (todoId) => {
      console.log(todoId);
      // router.push('/todos/' + todoId);
      router.push({
        name : 'Todo',
        params: {
          id: todoId
        }
      });
    };

    return{
      deleteTodo,
      toggleTodo,
      moveToPage,
    };
    }
}
</script>

<style>

</style>