import { ref, onUnmounted } from "vue";

export const useToast = () => {
    const showToast = ref(false);
        const toastMessage = ref('');
        const toastAlertType = ref('');
        const timeout = ref(null); //내부적으로만 써서 리턴하지 않는다.
        const triggerToast = (message, type = 'success') => {
            showToast.value = true;
            toastAlertType.value = type;
            toastMessage.value = message;
          timeout.value = setTimeout(() => {
                showToast.value = false;
                toastMessage.value = '';
                toastMessage.value = '';
            }, 2000);
        };

        onUnmounted (() => {
            console.log("언마운트됨");
            clearTimeout(timeout.value);
        });

        return{
            showToast,
            toastMessage,
            toastAlertType,
            triggerToast,
        }
};