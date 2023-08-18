<template>
  <div class="modal-wrapper">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">
          <slot name="title"></slot>
        </h5>
        <button type="button" class="close" aria-label="Close">
          <span @click="onClose">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       <slot name="body"></slot>
      </div>
      <div class="modal-footer">
        <slot name="footer"></slot>
        
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  setup(props, {emit}) {
    const onClose = () => {
      emit('close');
    };

    return {
      onClose,
    
    }
  }
}
</script>

<style scoped>
 .modal-wrapper {
  position: fixed;
  z-index: 100; 
  /* 모달 창이 페이지네이션 버튼 보다 바깥에 위치하게 해서 모달창이 떴을 때 페이지네이션 버튼을 비활성화 하도록 한다.  */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
 }
</style>