import {createStore} from 'vuex';
import modules from './modules';

export default createStore({
    // modules: modules //js에서는 앞과 뒤가 같으면 생략이 가능하다.
    modules
});