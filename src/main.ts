import './style.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Aura from '@primevue/themes/aura';
import setPrimeComponent from './modules/prime.module';
import setComponent from './modules/component.module';
import 'primeicons/primeicons.css'

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

setPrimeComponent(app);
setComponent(app);

app.use(ToastService);
app.use(PrimeVue);
app.use(router);
app.mount('#app');
