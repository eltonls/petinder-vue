import petCard from '@/components/PetCard/pet-card.vue';

import type { App } from 'vue';

export default function setComponent(app: App): void {
    app.component('PetCard', petCard);
}