<template>

<nav aria-label="Page navigation example">
          <ul class="pagination">
            <li
            v-if="currentPage !== 1"
            ><a class="page-link" @click="onClick(currentPage - 1)" style="cursor: pointer;">Previous</a></li>
            <li 
              v-for="page in numberOfPages"
              :key="page"
              class="page-item"
              :class="currentPage === page ? 'active' : null" 
            >
            
            <a class="page-link" @click="onClick(page)">{{ page }}</a>
            </li>
            <li 
            v-if="numberOfPages !== currentPage"
            class="page-item"><a class="page-link" @click="onClick(currentPage + 1)" style="cursor: pointer;">Next</a></li>
          </ul>
        </nav>
</template>

<script>
import {getCurrentInstance } from 'vue';
    export default {
        props:{
            numberOfPages: {
                type: Number,
                required: true
            },
            currentPage: {
                type: Number,
                required: true
            },
        },
        emits: ['click'],
        setup() {
            const {emit} = getCurrentInstance ();

            const onClick = (page) => {
                emit('click', page);
            };

            return{
                onClick,
            }
        }
    }
</script>

<style>

</style>