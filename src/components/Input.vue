<template>
  <div class="form-group">
        <label>{{ label }}</label>
        <input 
            v-model="todo.subject" 
            type="text" 
            class="form-control"
        />
        <div 
            v-if="error"
            style="color: red;"
        >
            {{ error }}
        </div>
</div>
</template>

<script>
export default {
    props : {
        label : {
            type: String,
            required: true
        },
        error : {
            type: String,
            required: true
        },
    }
}
</script>

<style>

</style>