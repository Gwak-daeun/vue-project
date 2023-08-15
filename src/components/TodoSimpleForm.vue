<template>
      <form 
      @submit.prevent="onSubmit"
    >
    <div class="d-flex">
      <div class="flex-grow-1 mr-2">
        <input
          class="form-control"
          type="text" 
          v-model="todo" 
          placeholder="새로 할 일을 적으세요."
        />
      </div>
      <div>
        <button 
          class="btn btn-primary"
          type="submit"
        >
          추가하기
        </button>
      </div>
    </div>
      <div v-show="hasError" style="color: red;">
        This field cannot be empty
      </div>
    </form>
</template>

<script>
import { ref } from 'vue';
    export default{
      emits: [
        'add-todo'
      ],  
        setup(props, {emit}) { // 데이터를 자식 -> 부모로 보낼 때 필요한게 context에 들어있다.
            const todo = ref('');
            const hasError = ref(false);
            const todos = ref([]);

            const onSubmit = () => {
     // e.preventDefault(); // 화면 리로딩 방지 @submit.prevent와 동일하다.

            if(todo.value == ''){
                hasError.value = true;
            } else {
                emit('add-todo', {
                  id: Date.now(),  //id는 유니크해야 하기 때문에 타임스탬프로 아이디 생성
                  subject: todo.value, 
                  completed: false,
                }); //자식에서 부모로 데이터를 보낸다
            hasError.value = false;
            todo.value = '';
            }
            };

            return {
                todo,
                hasError,
                onSubmit,
                todos,
            }
        }
    }
</script>

<style>

</style>