import './style.css'
import './assets/main.css'

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
        preset: Aura,
        options: {
          darkModeSelector: false || 'none'
        }
    }
});

setPrimeComponent(app);
setComponent(app);

app.use(ToastService);
app.use(router);
app.mount('#app');

export default app;