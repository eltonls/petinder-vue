
import Button from 'primevue/button';
import Card from 'primevue/card';
import Toast from 'primevue/toast';
import Tag from 'primevue/tag';
import ProgressSpinner from 'primevue/progressspinner';
import Menu from 'primevue/menu';
import CascadeSelect from 'primevue/cascadeselect';
import DataView from 'primevue/dataview';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import ToggleButton from 'primevue/togglebutton';

import type { App } from 'vue';

export default function setPrimeComponent(app: App): void {
    app.component('Menu', Menu);
    app.component('Button', Button);
    app.component('Card', Card);
    app.component('Toast', Toast);
    app.component('Tag', Tag);
    app.component('ProgressSpinner', ProgressSpinner);
    app.component('CascadeSelect',CascadeSelect)
    app.component('Select', Select)
    app.component('InputText', InputText);
    app.component('DataView', DataView);
    app.component('FloatLabel', FloatLabel);
    app.component("ToggleButton", ToggleButton)

}
