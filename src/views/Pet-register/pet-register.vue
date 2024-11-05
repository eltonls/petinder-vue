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
                            class="w-[423px]" />                    
                    </fieldset>
                    <fieldset>
                        <label for="genre" class="block mb-2">
                            <span>Gênero</span>
                        </label>
                        <Select 
                            id="genre" 
                            v-model="pet.gender"
                            :options="genrePet" 
                            option-label="genre" 
                            class="w-[300px]"
                            placeholder="Selecione o gênero" 
                        />
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
                </fieldset>
                <div class="flex flex-col items-start w-[1030px] mt-5">
                    <label for="inputAddImage">
                        <span>Anexar imagem</span>
                        <i class="pi pi-upload"></i>
                    </label>
                    <input 
                        id="inputAddImage" 
                        type="file" 
                        class=""
                        accept="image/*, .png, .jpg, .jpeg" 
                        @change="validateImage"
                    />
                    <!-- <FileUpload 
                        id="inputAddImage"
                        name="fileName"
                        :max-file-size="5000000"
                        mode="basic" 
                        accept="image/*, .png, .jpg, .jpeg" 
                        choose-label="Anexar imagem" 
                        choose-icon="pi pi-upload" 
                        class="!bg-transparent !text-black !border-none !p-0"
                        @upload="upload"
                    />     -->
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-300 mb-5" id="inputAddImage">PNG, JPG ou JPEG (MAX. 1MB).</p>
                </div>
                <div class="flex items-center w-[1030px]">
                    <Button 
                        @click="backToPreviousPage()"
                        class="w-44 me-4 !bg-white hover:!bg-slate-300 hover:!text-white !border-gray-300 active:scale-95 duration-200 !text-black !rounded-none">Cancelar</Button>
                    <Button @click="" type="submit" class="w-44 !bg-orange-400 hover:!bg-white hover:!text-orange-400 !border-orange-400 active:scale-95 duration-200 !rounded-none">Enviar</Button>
                    <Button @click="getUserId()">AQUIIIIII</Button>
                </div>
            </section>
        </form>
    </main>
</template>
<script lang="ts">
import router from '@/router';
import { defineComponent } from 'vue';
import { HomeService } from '../Home/home.service';
import Pet, { AgeRange, Breed, GenderPet } from '@/models/pet.model';
import supabase from '@/services/api-config/setup';
import { v4 as uuidv4 } from "uuid";
import LocalStorageUtil from '@/utils/localStorage.util';

export default defineComponent ({
    data() {
        return {
            imagePet: FileList || null,
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
            genrePet: [
                {genre: GenderPet.Male},
                {genre: GenderPet.Female}
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
                // create_at: new Date(),
                user_id: ''
            } as unknown as Pet
        }
    },
    methods: {
        registerPet(): void {
            this.service.pets.pipe().subscribe({
                next: (response) => {
                    if(response.error === null) {
                        this.$toast.add({ severity: 'info', summary: 'Sucesso!', detail: 'Pet cadastrado com sucesso.', life: 3000 });
                    }
                }
            });
            this.service.updatePet(this.pet);
            //UPLOAD DA IMAGEM.
        },
        submitFormPet(): void {
            this.registerPet();
            this.getUserId();
            // this.uploadImage(this.pet.image_url, 'pet-image')
        },
        backToPreviousPage():void {
            router.go(-1);
        },
        getUrlPublic(fileId: string, storage: string): any {
            const publicURL = supabase
                .storage
                .from(storage)
                .getPublicUrl(fileId)

            return publicURL;
        },
        uploadImage(file: File, storage: string): any {
            const fileId = uuidv4() as string;
            supabase
                .storage
                .from(storage)
                .upload(fileId, file, {
                    cacheControl: '3600',
                    upsert: false
                })

            const publicURL = this.getUrlPublic(fileId, storage);
            return publicURL;
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
            const image = (event?.target as HTMLInputElement).files;
            if(image){
                // this.imagePet = image;
                return (this.checkSizeImage(image[0]) && this.checkTypeImage(image[0]));
            } else {
                return false;
            }
        },
        getUserId(): void {
            const user: any = this.localStorage.getItem("user");
            this.pet.user_id = user.id;
            console.log('User ID: ', this.pet);
        }
    },
    computed: {
        service(): HomeService {
            return new HomeService;
        },
        localStorage() {
            return new LocalStorageUtil();
        },
    }
})

</script>
