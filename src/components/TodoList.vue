<template>
      <div 
      class="card mt-3"
      v-for="(todo, index) in todos"
      :key="todo.id"
    >
    <!-- v-for를 사용할 땐 유니크한 키값을 넣어줘야 한다. 엘레멘트(각각의 노드들)를 추적하기 위해 -->
      <div class="car-body p-2 d-flex align-items-center">
        <div class="form-check flex-grow-1">
          <input 
            class="form-check-input"  
            type="checkbox" 
            v-model="todo.completed"
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
              @click="deleteTodo(index)"
            >
              Delete
            </button>
          </div>
      </div>
    </div>
</template>

<script>
export default {
    props:  {
        todos: {
            type: Array,
            required: true
        }
    }
}
</script>

<style>

</style>