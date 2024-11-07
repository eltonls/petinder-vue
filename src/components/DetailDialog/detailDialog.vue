<template>
    <Dialog :visible="isVisible" modal class="h-[50vh] !bg-white w-[480px] overflow-auto justify-between"
        :closable="false">
        <template #header>
            <span class="flex items-center justify-center w-full h-full text-lg font-semibold">
                Confimar adoção de {{ pet.name }}
            </span>
        </template>
        <section class="flex flex-col justify-center">
            <div class="w-full h-56 mb-3">
                <img :src="pet.image_url" alt="pet image" class="w-auto h-56 mx-auto rounded-md drop-shadow">
            </div>
            <div class="text-justify text-black">{{ pet.description }}</div>
        </section>
        <template #footer>
            <div class="flex gap-4">
                <Button label="Cancelar" @click="setStateDialog()"
                    class="!bg-white !border-orange-400 !text-orange-400 hover:!bg-orange-50" />
                <Button v-if="pageType === 'home'" label="Confimar" @click="adoptPet(pet)"
                    class="!bg-orange-400 !border-orange-400 hover:!bg-orange-500" />
                <Button v-if="pageType === 'profile'" label="Editar" @click="redirectToPetUpdate()"
                    class="!bg-[#7C7EF6F2] !border-[#7C7EF6F2]" />
                <Button v-if="pageType === 'profile'" label="Deletar" @click="deletePet()"
                    class="!bg-red-600 !border-red-600 " />
            </div>
        </template>
    </Dialog>
</template>

<script lang="ts">
import type Pet from '@/models/pet.model';
import { HomeService } from '@/views/Home/home.service';
import type { PropType } from 'vue';

export default {
    props: {
        isVisible: {
            type: Boolean as PropType<boolean>,
            required: true
        },
        pet: {
            type: {} as PropType<Pet>,
            required: true
        },
        pageType: {
            type: String as PropType<string>,
            required: true
        }
    },
    methods: {
        setStateDialog(): void {
            this.$emit("closeDialog", false);
        },
        adoptPet(pet: Pet) {
            this.$emit("adoptPet", pet);
        },
        deletePet(): void {
            this.service.pets.subscribe({
                next: () => {
                    this.service.deletePet(this.pet);
                    this.setStateDialog()
                }
            })
            this.service.deleteAdoption(this.pet.id!)
        },
        redirectToPetUpdate(): void {
            this.$router.push(`/pet-update/${this.pet.id}`);
        }
    },
    computed: {
        service(): HomeService {
            return new HomeService();
        }
    }
}
</script>