<template>
    <main class="m-4">
        <Card class="min-w-60 w-[20vw] max-w-80 overflow-hidden rounded border-2">
            <template #header>
                <img :src="pet.image_url" alt="pet image">
            </template>
            <template #title>
                <span class="!font-bold line-clamp-1 text-start">{{ pet.name }}</span>
            </template>
            <template #subtitle>
                <div class="gap-2 flex max-h-8">
                    <Tag class="!bg-blue-600 max-w-34 !text-white !line-clamp-1 px-1" :value="pet.breed" rounded />
                    <Tag class="!bg-blue-600 !text-white !truncate px-1" :value="pet.gender" rounded />
                    <Tag class="!bg-blue-600 !text-white !truncate px-1" :value="ageStatus" rounded />
                </div>
            </template>
            <template #content>
                <p class="hidden md:flex text-justify my-2 truncate">{{ pet.description }}</p>
            </template>
            <template #footer>
                <Button label="Quero adotar" class="w-full !bg-orange-400 hover:!bg-white hover:!text-orange-400 !border-orange-400 active:scale-95 duration-200" />
            </template>
        </Card>
    </main>
</template>

<script lang="ts">
import Pet from '@/models/pet.model';
import type { PropType } from 'vue';

export default {
    name: 'PetCard',
    props: {
        pet: {
            type: {} as PropType<Pet>,
            required: true
        }
    },
    methods: {
        formatAge(age: number): string {
            let ageStatus = '';
            if (age <= 3) {
                ageStatus = 'jovem';
            } else if (age <= 6) {
                ageStatus = 'adulto';
            } else {
                ageStatus = 'idoso';
            }
            return ageStatus;
        }
    },
    computed: {
        ageStatus(): string {
            return this.formatAge(this.pet.age);
        },
    }
}
</script>
