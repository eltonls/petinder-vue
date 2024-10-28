
import SplitButton from 'primevue/splitbutton';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Toast from 'primevue/toast';
import Tag from 'primevue/tag';
import ProgressSpinner from 'primevue/progressspinner';
import DataView from 'primevue/dataview';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';

import type { App } from 'vue';
import ToggleButton from 'primevue/togglebutton';

export default function setPrimeComponent(app: App): void {
    app.component('SplitButton', SplitButton);
    app.component('Button', Button);
    app.component('Card', Card);
    app.component('Toast', Toast);
    app.component('Tag', Tag);
    app.component('ProgressSpinner', ProgressSpinner);
    app.component('DataView', DataView);
    app.component('FloatLabel', FloatLabel);
    app.component('InputText', InputText);
    app.component("ToggleButton", ToggleButton)
}
