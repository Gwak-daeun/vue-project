export default {
    namespaced: true, // 이렇게 해야 폴더처럼 사용할 수 있다.
    state: {
        toasts: [],
        // showToast : false, 
        // toastMessage : '',
        // toastAlertType : '',
    },
    mutations: {
        // UPDATE_TOAST_MESSAGE(state, payload) { // 두번째 인자로 원하는 데이터를 받아볼 수 있다.
        //     state.toastMessage = payload;
        // },
        // UPDATE_TOAST_ALERT_TYPE(state, payload) {
        //     state.toastAlertType = payload;
        // },
        // UPDATE_TOAST_STATUS(state, payload) {
        //     state.showToast = payload;
        // },
        ADD_TOAST(state, payload) {
            state.toasts.push(payload);
        },  
        REMOVE_TOAST(state) {
            state.toasts.shift();
        }
    },
    actions: {
     triggerToast({commit}, payload){
                // commit('UPDATE_TOAST_STATUS', true);
                // commit('UPDATE_TOAST_ALERT_TYPE', type);
                // commit('UPDATE_TOAST_MESSAGE', message);
                commit('ADD_TOAST', {
                    id: Date.now(),
                    message: payload.message,
                    type: payload.type
                });

                setTimeout(() => {
                // commit('UPDATE_TOAST_STATUS', false);
                // commit('UPDATE_TOAST_MESSAGE', '');
                // commit('UPDATE_TOAST_ALERT_TYPE', '');

                commit('REMOVE_TOAST');

            }, 2000)

        }
    },
    getters: { //vuex에서 사용하는 computed라고 보면 된다. 
        toastMessageWithSmile(state) {
            return state.toastMessage + '^-^s';
        }
    },
};