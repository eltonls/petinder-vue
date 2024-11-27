<template>
    <main class="mt-16 font-sans flex-row">
        <div class="text-2xl font-bold flex justify-center">
            <span class="w-[1030px]">Cadastrar Pet</span>
        </div>
        <form @submit.prevent="submitFormPet">
            <section class="flex flex-col items-center justify-center mt-6">
                <fieldset>
                    <label for="pet-name" class="block mb-2">
                        <span>Nome</span>
                    </label>
                    <InputText 
                        type="text" 
                        id="pet-name" 
                        :maxlength="30" 
                        class="w-[1030px] mb-6"
                        v-model="pet.name"
                    />   
                    <p :class="v$.pet.name.$error
                        ? 'opacity-100'
                        : '-translate-y-6 opacity-0 invisible'
                        " class="text-xs text-red-400 transition-all">
                        Nome inválido.
                    </p>             
                </fieldset>
                <section class="card flex flex-wrap gap-4 w-[1030px] justify-between">
                    <fieldset>
                        <label for="pet-type" class="block mb-2">
                            <span>Tipo do Pet</span>
                        </label>
                        <Select 
                            v-model="pet.breed" 
                            :options="breedPet" 
                            optionLabel="name" 
                            placeholder="Selecione o tipo de pet" 
                            class="w-[423px]" 
                        />
                        <p :class="v$.pet.name.$error
                            ? 'opacity-100'
                            : '-translate-y-6 opacity-0 invisible'
                            " class="text-xs text-red-400 transition-all">
                            Selecione um tipo de pet.
                        </p>                    
                    </fieldset>
                    <fieldset>
                        <label for="genre" class="block mb-2">
                            <span>Gênero</span>
                        </label>
                        <Select 
                            id="genre" 
                            v-model="pet.gender"
                            :options="genderPet" 
                            option-label="gender" 
                            class="w-[300px]"
                            placeholder="Selecione o gênero" 
                        />
                        <p :class="v$.pet.name.$error
                            ? 'opacity-100'
                            : '-translate-y-6 opacity-0 invisible'
                            " class="text-xs text-red-400 transition-all">
                            Selecione um gênero.
                        </p>
                    </fieldset>
                    <fieldset>
                        <label for="age" class="block mb-2">
                            <span>Idade</span>
                        </label>
                        <Select 
                            id="age" 
                            v-model="pet.age"
                            :options="agePet" 
                            option-label="age" 
                            class="w-[250px]"
                            placeholder="Selecione a idade" 
                        />
                        <p :class="v$.pet.name.$error
                            ? 'opacity-100'
                            : '-translate-y-6 opacity-0 invisible'
                            " class="text-xs text-red-400 transition-all">
                            Selecione uma idade.
                        </p>
                    </fieldset>
                </section>
                <fieldset class="mt-6">
                    <label for="editor" class="block mb-2">
                        <span>Descrição</span>
                    </label>
                    <Textarea
                        v-model="pet.description"
                        class="w-[1030px] h-40"
                        rows="5"
                        cols="30"
                        style="resize: none;"
                    /> 
                    <p :class="v$.pet.name.$error
                            ? 'opacity-100'
                            : '-translate-y-6 opacity-0 invisible'
                            " class="text-xs text-red-400 transition-all">
                            Digite uma descrição válida.
                        </p>         
                </fieldset>
                <div class="flex flex-col items-start w-[1030px] mt-5">
                    <InputImage @onSetImage="setPetImage" @onResetImage="resetPetImage" :imageSelected="pet.image_url"/>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-300 mb-5" id="inputAddImage">PNG, JPG ou JPEG (MAX. 1MB).</p>
                </div>
                <div class="flex items-center w-[1030px]">
                    <Button 
                        @click="backToPreviousPage()"
                        class="w-44 me-4 !bg-white hover:!bg-slate-300 hover:!text-white !border-gray-300 active:scale-95 duration-200 !text-black !rounded-none">Cancelar</Button>
                    <Button @click="" type="submit" class="w-44 !bg-orange-400 hover:!bg-white hover:!text-orange-400 !border-orange-400 active:scale-95 duration-200 !rounded-none">Enviar</Button>
                    <Button @click="console.log()">AQUIIIII</Button>
                </div>
            </section>
        </form>
    </main>
</template>
<script lang="ts">
import router from '@/router';
import { defineComponent } from 'vue';
import Pet, { AgeRange, Breed, GenderPet } from '@/models/pet.model';
import { minLength, required } from '@vuelidate/validators';
import { validateName } from '@/utils/validators.util';
import { PetRegisterService } from './pet-register.service';
import useVuelidate from '@vuelidate/core';

export default defineComponent ({
    validations() {
        return {
            pet: {
                name: {required, minLength: minLength(3), validateName},
                breed: {required},
                age: {required},
                description: {required, minLength: minLength(5)},
                gender: {required},
                image_url: {required}
            }
        }
    },
    data() {
        return {
            nameImage: '',
            image: {} as File,
            newImage: false,
            v$: useVuelidate(),
            breedPet: [
                {name: Breed.Dogs},
                {name: Breed.Cats},
                {name: Breed.Rodents},
                {name: Breed.Birds},
                {name: Breed.Fish},
                {name: Breed.Frogs},
                {name: Breed.Lizards},
                {name: Breed.Turtles},
                {name: Breed.Insects},
                {name: Breed.Arachnids},
                {name: Breed.Others}
            ],
            genderPet: [
                {gender: GenderPet.Male},
                {gender: GenderPet.Female}
            ],
            agePet: [
                {age: AgeRange.Young},
                {age: AgeRange.Adult},
                {age: AgeRange.Old}
            ],
            pet: {
                name: '',
                breed: Breed,
                age: 0,
                description: '',
                gender: GenderPet,
                image_url: '',
            } as unknown as Pet
        }
    },
    methods: {
        //Manda o objeto pet para o Supabasse
        registerPet(): void {
            this.service.pet.pipe().subscribe({
                next: (response) => {
                    if(response.error === null) {
                        this.$toast.add({ severity: 'info', summary: 'Sucesso!', detail: 'Pet cadastrado com sucesso.', life: 3000 });                        
                    } else {
                        this.$toast.add({ severity: 'error', summary: 'Erro!', detail: 'Não foi possível cadastrar o pet.', life: 3000 });                        
                    }
                }
            });
            // this.acessObjectPet(this.pet);
            this.service.registerPet(this.pet);
        },
        submitFormPet(): void {
            this.acessObjectPet(this.pet);
            //upload da imagem
            //pegar o link da img e colocar no objeto pet
            this.registerPet();
        },
        backToPreviousPage():void {
            router.go(-1);
        },
        //Pega a URL da imagem no Supabase
        getUrlPublic(): string {
            return this.service.getImageURL(this.nameImage);
        },
        //Sobe a imagem para o bucket
        uploadImage(image: File): void {
            this.service.addImage(image, this.nameImage);
        },
        checkSizeImage(image: File): boolean {
            if(image !== null) {
                if(image.size > 1048576) {
                    this.$toast.add({ severity: 'error', summary: 'Erro!', detail: 'Tamanho da imagem excedido!', life: 3000 });
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        },
        checkTypeImage(image: File): boolean {
            const imageType = image.type.split("/")?.pop();
            return (imageType === "png" || imageType === "jpg" || imageType === "jpeg");
        },
        validateImage(event: Event): boolean {
            const image = (event?.target as HTMLInputElement).files || null;
            if(image){
                this.nameImage = image[0].name;
                return (this.checkSizeImage(image[0]) && this.checkTypeImage(image[0]));
            } else {
                return false;
            }
        },
        acessObjectPet(petRecived: any): void {
            this.pet.age = petRecived.age.age;
            this.pet.gender = petRecived.gender.gender;
            this.pet.breed = petRecived.breed.name;
        },
        setPetImage(image: File): void {
            this.image = image;
            this.nameImage = image.name;
            this.pet.image_url = this.getUrlPublic();
            this.newImage = true;
        },
        resetPetImage(): void {
            this.pet.image_url = '';
        }
    },
    computed: {
        service(): PetRegisterService {
            return new PetRegisterService;
        },
    }
})

</script>
