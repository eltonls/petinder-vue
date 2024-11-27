<template>
    <Toast position="top-right" />
    <main class="flex flex-col w-full px-10 mt-16 font-sans md:px-48 md:mp-52">
        <div class="flex text-2xl font-bold">
            <span>Editar dados do Pet</span>
        </div>
        <form @submit.prevent="validateFields">
            <div class="flex flex-col w-full gap-6 pb-6">
                <section class="flex flex-col mt-6">
                    <fieldset class="flex flex-col">
                        <label for="name" class="text-base font-semibold text-black">
                            <span>Nome</span>
                        </label>
                        <InputText type="text" id="name" :maxlength="30" autocomplete="on" :disabled="!enableEdit" v-model="pet.name" />
                        <p :class="v$.pet.name.$error
                            ? 'opacity-100'
                            : '-translate-y-6 opacity-0 invisible'
                            " class="text-xs text-red-400 transition-all">
                            Nome inválido.
                        </p>
                    </fieldset>
                    <div class="flex flex-col gap-1 pb-6 md:pb-0 md:gap-5 md:flex-row">
                        <fieldset class="flex flex-col w-full md:w-2/4">
                                <span class="text-base font-semibold text-black">Tipo do Pet</span>
                            <Select class="h-[45px]" v-model="pet.breed" id="breed" :disabled="!enableEdit" :options="breedList" />
                            <p :class="v$.pet.breed.$error
                                ? 'opacity-100'
                                : '-translate-y-6 opacity-0 invisible'
                                " class="text-xs text-red-400 transition-all">
                                Tipo inválido.
                            </p>
                        </fieldset>
                        <fieldset class="flex flex-col w-full md:w-1/4">
                                <span class="text-base font-semibold text-black">Gênero</span>
                            <Select class="h-[45px]" v-model="pet.gender" id="gender" :disabled="!enableEdit" :options="genderList" />
                            <p :class="v$.pet.gender.$error
                                ? 'opacity-100'
                                : '-translate-y-6 opacity-0 invisible'
                                " class="text-xs text-red-400 transition-all">
                                Gênero inválido.
                            </p>
                        </fieldset>
                        <fieldset class="flex flex-col w-full md:w-1/4">
                                <span class="text-base font-semibold text-black">Idade</span>
                            <Select class="h-[45px]" v-model="pet.age" :disabled="!enableEdit" :options="ageList" />
                        </fieldset>
                    </div>
                    <fieldset class="flex flex-col">
                        <label for="description" class="text-base font-semibold text-black">
                            <span>Descrição</span>
                        </label>
                        <Textarea id="description" v-model="pet.description" :disabled="!enableEdit" rows="4" autoResize
                            :maxlength="800"></Textarea>
                    </fieldset>
                </section>
                <InputImage @onSetImage="setPetImage" @onResetImage="resetPetImage" :imageSelected="pet.image_url" />
                <p :class="v$.pet.image_url.$error
                    ? 'opacity-100'
                    : '-translate-y-6 opacity-0 invisible'
                    " class="self-center text-xs text-red-400 transition-all">
                    Imagem necessária.
                </p>
                <Button
                    class="self-center mt-6 md:self-start w-full md:w-64 !bg-orange-400 col-start-2 text-base hover:!bg-white hover:!text-orange-400 border hover:!border-orange-400 !border-orange-400 active:scale-95 duration-200 text-white px-10 py-3 rounded font-bold"
                 type="submit">Atualizar</Button>
            </div>
        </form>
    </main>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { UpdatePetService } from './pet-update.service';
import Pet from '@/models/pet.model';
import { minLength, required } from '@vuelidate/validators';
import { validateName } from '@/utils/validators.util';
import useVuelidate from '@vuelidate/core';
import { take } from 'rxjs';
import { Toasts } from '@/utils/toast.util';
import { breedList } from '@/utils/breeds.utils';
import { ageList } from '@/utils/ages.utils';
import { genderList } from '@/utils/genders.utils';

export default defineComponent({
    validations() {
        return {
            pet: {
                name: { required, minLength: minLength(3), validateName },
                breed: { required },
                age: { required },
                description: { required, minLength: minLength(5) },
                gender: { required },
                image_url: { required }
            }
        }
    },
    data() {
        return {
            pet: new Pet,
            id: this.$route.params.id as string,
            v$: useVuelidate(),
            enableEdit: true,
            showToast: new Toasts(),
            breedList: breedList,
            ageList: ageList,
            genderList: genderList,
            selectedImage: undefined,
            image: {} as File,
            nameImage: '',
            oldNameImage: '',
            hasNewImage: false
        }
    },
    methods: {
        setPetImage(image: any, name: string): void {
            this.image = image;
            this.nameImage = name;
            this.pet.image_url = this.getFullUrl(name);
            this.hasNewImage = true
        },
        getFullUrl(name: string): string {
            return this.service.getFullUrl(name);
        },
        resetPetImage(): void {
            this.pet.image_url = undefined;
        },
        getPetById(id: string): void {
            this.service.pets.pipe().subscribe({
                next: (response) => {
                    if (response.data) {
                        this.pet = response.data[0];
                        this.id = response.data[0].id;
                        this.selectedImage = response.data[0].image_url;
                        this.oldNameImage = (response.data[0].image_url).split('/').pop(); 
                    } 
                }
            });
            this.service.getPetById(id);
        },
        validateFields(): void {
            this.v$.$touch();
            if (!this.v$.pet.$error) {
                this.enableEdit = false;
                if (this.hasNewImage) {this.addImage(this.image, this.nameImage)}
                this.updatePet();
                if (this.hasNewImage && (this.nameImage != this.oldNameImage)) {this.deleteImage(this.oldNameImage)};
                this.getPetById(this.id);
                this.$router.push("/profile");
            } else {
                this.showToast.showError("Campos inválidos.", "Corrija os campos ou adicione uma imagem.")
            }
        },
        updatePet(): void {
            this.service.updatePet(this.pet);
            this.service.pets.pipe(take(1)).subscribe({
                next: (response) => {
                    if (response && response.error === null) {
                        this.showToast.showSuccess(
                            "Cadastro atualizado",
                            "pet foi atualizado com sucesso!"
                        );
                        this.v$.$reset();
                    } else {
                        this.showToast.showError("Não foi possível atualizar dados.");
                    }
                }
            })
        },
        addImage(image: File, name: string): void {
            const encodedName = encodeURIComponent(name);
            this.service.addImage(image, encodedName);
        },

        deleteImage(name: string): void {
            const decodedName = decodeURIComponent(name);
            this.service.deleteImage(decodedName);
        },
    },
    computed: {
        service(): UpdatePetService {
            return new UpdatePetService;
        }
    },
    mounted() {
        this.getPetById(this.id);
    }
})
</script>