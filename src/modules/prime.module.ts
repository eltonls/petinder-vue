
import SplitButton from 'primevue/splitbutton';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Toast from 'primevue/toast';
import Tag from 'primevue/tag';
import ProgressSpinner from 'primevue/progressspinner';


import type { App } from 'vue';

export default function setPrimeComponent(app: App): void {
    app.component('SplitButton', SplitButton);
    app.component('Button', Button);
    app.component('Card', Card);
    app.component('Toast', Toast);
    app.component('Tag', Tag);
    app.component('ProgressSpinner', ProgressSpinner);
}