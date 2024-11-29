import petCard from '@/components/PetCard/pet-card.vue';
import navbar from '@/components/Navbar/navbar.vue';
import loader from '@/components/Loader/loader.vue';
import filter from '@/components/Filter/filter.vue';
import DetailDialog from '@/components/DetailDialog/detailDialog.vue';

import type { App } from 'vue';

export default function setComponent(app: App): void {
    app.component('PetCard', petCard);
    app.component('nav-bar', navbar);
    app.component('Loader', loader);
    app.component('Filter', filter);
    app.component('DetailDialog', DetailDialog);
}