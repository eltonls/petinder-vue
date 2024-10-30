<template>
    <main class="m-4">
        <Card class="min-w-60 !bg-white !w-[40vw] sm:!w-[20vw] max-w-80 !max-h-[446px] overflow-hidden rounded border-2">
            <template #header>
                <div class="w-full max-w-80 h-56 flex">
                    <img :src="pet.image_url" alt="pet image" class="bg-cover h-56 w-full">
                </div>
            </template>
            <template #title>
                <span class="!font-bold line-clamp-1 text-start text-black">{{ pet.name }}</span>
            </template>
            <template #subtitle>
                <div class="gap-2 flex max-h-8">
                    <Tag class="!bg-blue-600 max-w-34 !text-white !line-clamp-1 px-2" :value="pet.breed" rounded />
                    <Tag class="!bg-blue-600 !text-white px-2" :value="pet.gender" rounded />
                    <Tag class="!bg-blue-600 !text-white px-2" :value="ageStatus" rounded />
                </div>
            </template>
            <template #content>
                <p class="hidden xl:flex text-justify my-2 truncate text-black">{{ pet.description }}</p>
            </template>
            <template #footer>
                <Button label="Quero adotar" @click="sendPet()" class="!drop-shadow-lg w-full !bg-orange-400 hover:!bg-white hover:!text-orange-400 !border-orange-400 active:scale-95 duration-200" />
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
                ageStatus = 'Jovem';
            } else if (age <= 6) {
                ageStatus = 'Adulto';
            } else {
                ageStatus = 'Idoso';
            }
            return ageStatus;
        },
        sendPet(): void {
            this.$emit("response", this.pet);
        }
    },
    computed: {
        ageStatus(): string {
            return this.formatAge(this.pet.age!);
        },
    }
}
</script>

<style scoped>
.p-card > .p-card-header {
    height: 50px !important;
}
</style>
