import Button from "primevue/button";
import Card from "primevue/card";
import Toast from "primevue/toast";
import Tag from "primevue/tag";
import ProgressSpinner from "primevue/progressspinner";
import Menu from "primevue/menu";
import CascadeSelect from "primevue/cascadeselect";
import DataView from "primevue/dataview";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import ToggleButton from "primevue/togglebutton";
import Select from "primevue/select";
import SelectButton from "primevue/selectbutton";
import Dialog from "primevue/dialog";
import OverlayBadge from "primevue/overlaybadge";
import Popover from "primevue/popover";
import Menubar from "primevue/menubar";
import Avatar from "primevue/avatar";
import Badge from "primevue/badge";
import Textarea from "primevue/textarea";
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

import type { App } from "vue";

export default function setPrimeComponent(app: App): void {
  app.component("OverlayBadge", OverlayBadge);
  app.component("Popover", Popover);
  app.component("MenuBar", Menubar);
  app.component("Avatar", Avatar);
  app.component("Badge", Badge);
  app.component("Textarea", Textarea);
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
  app.component('Tabs', Tabs);
  app.component('TabList', TabList);
  app.component('Tab', Tab);
  app.component('TabPanel', TabPanel);
  app.component('TabPanels', TabPanels);
}
