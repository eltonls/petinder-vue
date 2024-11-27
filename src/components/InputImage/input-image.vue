<template>
    <section class="self-center border-2 border-dotted w-64 px-3 md:w-[400px] h-60 border-slate-400 flex flex-col">
        <div v-if='!imageName' class="w-full">
            <div class="flex flex-col py-8 text-center">
                <p class="self-center mb-1 font-extrabold">Selecione uma imagem</p>
                <small class="h-3 text-sm text-h-neutral-700">Formatos permitidos: PNG, JPG, JPEG. O tamanho máximo
                    permitido é de 1 MB.</small>
                <v-icon name="md-uploadfile" scale="2" class="self-center mt-12 mb-6" />
                <label for="imageFileInput"
                    class="px-2 py-1 mx-auto text-white bg-orange-400 border border-orange-400 rounded-md cursor-pointer hover:bg-white hover:border-orange-400 hover:text-orange-400 w-fit">Selecione</label>
                <input type="file" id="imageFileInput" class="hidden" @change="changeFile"
                    accept="image/*,.jpg,.png,.jpeg" />
            </div>
        </div>
        
        <div v-else>
            <div class="relative py-20">
                <div class="absolute bg-transparent rounded-full cursor-pointer w-fill h-fill top-2 right-2"
                    @click="resetImageFile">
                    <v-icon name="io-close-circle" scale="1.5" fill="orange" class="w-full" />
                </div>
                <v-icon name="md-image-round" height="40px" width="40px" class="w-full text-h-primary-700" />
                <span class="w-full px-5 text-center break-all line-clamp-1">
                    {{ imageName }}
                </span>
            </div>
        </div>
    </section>
</template>
<script lang="ts">
import { Toasts } from '@/utils/toast.util';
import { defineComponent } from 'vue'

export default defineComponent({
    name: "InputImage",
    props: {
        imageSelected: {
            type: String,
            require: false,
            default: ""
        }
    },
    data() {
        return {
            imageName: '',
            showToast: new Toasts(),
        }
    },
    watch: {
        imageSelected: {
            immediate: true,
            handler(newVal) {
                if (newVal) {
                    const imageName = newVal.split('/').pop(); 
                    this.imageName = imageName;
                } else { 
                    this.imageName = ''; 
                }
            }
        }
    },
    methods: {
        changeFile(event: Event): void {
            const imageFiles = (event.target as HTMLInputElement).files || null;

            if (imageFiles?.length === 0 || imageFiles === null) return;

            const file = imageFiles[0];

            if (this.isFileNameInvalid(file.name)) {
                this.showToast.showError("Nome do arquivo inválido.", "Caracteres especiais não são permitidos.")
                return;
            }

            if (this.isImageIncorrect(file)) return;

            this.$emit("onSetImage", file, file.name)

            this.imageName = file.name;
        },
        isImageIncorrect(image: File): boolean {
            if (!this.checkImageSizeRequirement(image)) {
                this.showToast.showError("Tamanho da imagem acima do permitido.", "Deve ter no máximo 1 MB.")
                return true;
            };

            if (!this.checkImageTypeRequirement(image)) {
                this.showToast.showError("Formato do arquivo não aceito.", "Deve ser do tipo png, jpg ou jpeg.")
                return true;
            };

            return false;
        },
        isFileNameInvalid(fileName: string): boolean {
        const validFileNameRegex = /^[a-zA-Z0-9-_\.]+$/;
        return !validFileNameRegex.test(fileName); 
    },
        resetImageFile(): void {
            this.$emit("onResetImage");
            this.imageName = '';
        },
        checkImageSizeRequirement(image: File): boolean {
            return this.convertBytesToMB(image.size) < 1;
        },
        checkImageTypeRequirement(image: File): boolean {
            const type = image.type.split("/")?.pop();
            return (
                type === "png" || type === "jpg" || type === "jpeg"
            );
        },
        convertBytesToMB(number: number): number {
            return number / 1e6;
        },
    },
})
</script>