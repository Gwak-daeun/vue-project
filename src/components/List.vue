<template>
    <div 
        class="card mt-3"
        v-for="(item, index) in items"
        :key="item.id"
    >
     <!-- v-for를 사용할 땐 유니크한 키값을 넣어줘야 한다. 엘레멘트(각각의 노드들)를 추적하기 위해 -->
        <slot :item="item" :index="index"></slot>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            required: true
        }
    }
}
</script>

<style>

</style>