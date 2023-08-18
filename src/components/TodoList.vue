<template>
      <!-- <div 
      class="card mt-3"
      v-for="(todo, index) in todos"
      :key="todo.id"
    > -->
    <List
        :items="todos"
    >
    <template #default="{item, index}">
      <div 
        class="car-body p-2 d-flex align-items-center"
        style="cursor: pointer;"
        @click="moveToPage(item.id)"
      >
        <div class=" flex-grow-1">
          <input 
            class="ml-2 mr-2"
            type="checkbox" 
            :checked="item.completed"
            @change="toggleTodo(index, $event)"
            @click.stop
          />
          <span 
            :class="{todo: item.completed}"
           >
            {{ item.subject }}
          </span>
        </div>
        <div>
            <button 
              class="btn btn-danger btn-sm"
              @click.stop="openModal(item.id)"
            >
              Delete
            </button>
          </div>
      </div>
    </template>
    </List>
    <teleport to="#modal">
      <DeleteModal 
        v-if="showModal" 
        @close="closeModal"
        @delete="deleteTodo"
      />
    </teleport>

</template>

<script>
import {useRouter} from 'vue-router';
import DeleteModal from '@/components/DeleteModal.vue';
import { ref } from 'vue';
import List from './List.vue';
export default {
  components: {
    DeleteModal,
    List
  },  
    props:  {
        todos: {
            type: Array, // 부모컴포넌트에서 보낸 데이터 타입이 배열이기 때문
            required: true
        }
    },
    emits : ['toggle-todo', 'delete-todo'],
    setup(props, {emit}) {

      const router = useRouter();
      const showModal = ref(false);
      const todoDeleteId = ref(null);

      const toggleTodo = (index, event) => {
        emit('toggle-todo', index, event.target.checked);
      };

      const openModal = (id) => {
        todoDeleteId.value = id;
        showModal.value = true;
      };

      const closeModal = () => {
        todoDeleteId.value = null;
        showModal.value = false;
      };

      const deleteTodo = () => {
        emit('delete-todo', todoDeleteId.value);
        showModal.value = false;
        todoDeleteId.value = null;
      
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
      showModal,
      openModal,
      closeModal,
    };
    }
}
</script>

<style>

</style>