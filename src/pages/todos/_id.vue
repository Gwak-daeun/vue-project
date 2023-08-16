<template>
  <h1>To-Do Page</h1>
  <div v-if="loading">
    Loading...
  </div>
  <form 
    v-else
    @submit.prevent="onSave"
  >
    <div class="row">
        <div class="col-6">
            <div class="form-group">
                <label>Subject</label>
                <input 
                    v-model="todo.subject" 
                    type="text" 
                    class="form-control"
                />
            </div>
        </div>
        <div class="col-6">
            <div class="form-group">
                <label>Status</label>
                <div>
                    <button 
                        type="button"
                        class="btn"
                        :class="todo.completed ? 'btn-success' : 'btn-danger'"
                        @click="toggleTodoStatus"
                    >
                        {{ todo.completed ? 'Completed' : 'InComplete'}}
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <button 
        type="submit" 
        class="btn btn-primary"
        :disabled="!todoUpdated"
    >
        Save
    </button>
    <button  
        class="btn btn-outline-dark ml-2"
        @click="moveToTodoListPage"
    >
        Cancel
    </button>
  </form>
  <Toast 
    v-if="showToast"
   :message="toastMessage" 
   :type="toastAlertType"
   />
</template>

<script>
import {useRoute, useRouter} from 'vue-router';
import axios from 'axios';
import { computed, ref } from 'vue';
import Toast from '@/components/Toast.vue';

export default {
    components : {
        Toast
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const todo = ref(null);
        const originalTodo = ref(null);
        const loading = ref(true);
        const todoId = route.params.id;
        const showToast = ref(false);
        const toastMessage = ref('');
        const toastAlertType = ref('');

        const getTodo = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
 
                todo.value = {...res.data}; 
                originalTodo.value = {...res.data};

                loading.value = false;
            } catch (err) {
                console.log(err);
                triggerToast('Something went wrong', 'danger');
            }
        
        };

        const toggleTodoStatus = () => {
            todo.value.completed = !todo.value.completed;
        };

        const moveToTodoListPage = () => {
            router.push({
                name: 'Todos'
            });
        };

        const triggerToast = (message, type = 'success') => {
            showToast.value = true;
            toastAlertType.value = type;
            toastMessage.value = message;
            setTimeout(() => {
                showToast.value = false;
                toastMessage.value = '';
                toastMessage.value = '';
            }, 2000);
        };

        const onSave = async () => {
            try{
                const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
                subject : todo.value.subject,
                completed : todo.value.completed
                });
                originalTodo.value = {...res.data};
                triggerToast('Successfully saved!');
            } catch (err) {
                console.log(err);
                triggerToast('Something went wrong', 'danger');
            }
           
        };

        const todoUpdated = computed(() => {
            return JSON.stringify(todo.value) !== JSON.stringify(originalTodo.value)
        });

        getTodo();
      
        return{
            todo,
            loading,
            toggleTodoStatus,
            moveToTodoListPage,
            onSave,
            todoUpdated,
            showToast,
            toastMessage,
            toastAlertType
        }
       
    }
}
</script>

<style>

</style>