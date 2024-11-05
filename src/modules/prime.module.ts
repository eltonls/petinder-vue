
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
import ToggleButton from 'primevue/togglebutton';
import Select from 'primevue/select';
import SelectButton from 'primevue/selectbutton';
import Dialog from 'primevue/dialog';
import Editor from 'primevue/editor';
import InputNumber from 'primevue/inputnumber';
import FileUpload from 'primevue/fileupload';
import Textarea from 'primevue/textarea';
import Message from 'primevue/message';
import type { App } from 'vue';

export default function setPrimeComponent(app: App): void {
    app.component('Menu', Menu);
    app.component('Button', Button);
    app.component('Card', Card);
    app.component('Toast', Toast);
    app.component('Tag', Tag);
    app.component('ProgressSpinner', ProgressSpinner);
    app.component('CascadeSelect',CascadeSelect)
    app.component('DataView', DataView);
    app.component('FloatLabel', FloatLabel);
    app.component('InputText', InputText);
    app.component("ToggleButton", ToggleButton);
    app.component('Select', Select);
    app.component('SelectButton', SelectButton);
    app.component('Dialog', Dialog);
    app.component('Select', Select);
    app.component('InputText', InputText);
    app.component('DataView', DataView);
    app.component('FloatLabel', FloatLabel);
    app.component("ToggleButton", ToggleButton);
    app.component("InputText", InputText);
    app.component("Editor", Editor);
    app.component("InputNumber", InputNumber);
    app.component("FileUpload", FileUpload);
    app.component("Textarea", Textarea);
    app.component("Message", Message);
}
