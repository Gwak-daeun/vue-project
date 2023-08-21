import { computed } from "vue";
import { useStore } from "vuex";

export const useToast = () => {
        const store = useStore();
        const toasts = computed(() => {
            store.state.toast.toasts
        });
        // const showToast = computed(() => store.state.toast.showToast) ; // computed로 감싸줘야 vuex에서 변경된 값을 감지한다.
        // const toastMessage = computed(() => store.getters['toast/toastMessageWithSmile']);
        // const toastAlertType = computed(() => store.state.toast.toastAlertType);
        const triggerToast = (message, type = 'success') => {
            store.dispatch('toast/triggerToast', {message, type});
        };


        return{
            toasts,
            triggerToast,
        }
};