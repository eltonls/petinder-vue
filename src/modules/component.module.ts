import petCard from '@/components/PetCard/pet-card.vue';
import navbar from '@/components/Navbar/navbar.vue';

import type { App } from 'vue';

export default function setComponent(app: App): void {
    app.component('PetCard', petCard);
    app.component('nav-bar', navbar);
}