import { OhVueIcon, addIcons } from 'oh-vue-icons';
import * as FaIcons from "oh-vue-icons/icons/fa";
import * as CoIcons from "oh-vue-icons/icons/co";
import * as GiIcons from "oh-vue-icons/icons/gi";
import * as MdIcons from "oh-vue-icons/icons/md";
import * as IoIcons from "oh-vue-icons/icons/io";
import type { App } from 'vue';

const icons = Object.values({
    ...FaIcons,
    ...CoIcons,
    ...GiIcons,
    ...MdIcons,
    ...IoIcons
  });
  addIcons(...icons);

export default function setIcons(app: App): void {
    app.component('v-icon', OhVueIcon);
}