<template>
    <Toast position="top-right" />
    <main class="flex flex-col w-auto mx-10 my-14 md:mx-52">
        <h1 class="pb-6 text-2xl font-bold tracking-wide text-black xl:pb-0">Dados do usuário</h1>
        <form @submit.prevent="validateFields">
            <section class="flex flex-col gap-6 xl:flex-row">
                <div v-if="!user.image_url" class="flex flex-col self-center w-64 h-64 min-h-64 min-w-64">
                    <img class="object-cover w-full h-full border-4" src="/src/assets/images/user.jpg"
                        alt="Foto de perfil do usuário">
                </div>
                <div v-else-if="user.image_url" class="flex flex-col self-center w-64 h-64 min-h-64 min-w-64">
                    <img class="object-cover w-full h-full border-4" :src="user.image_url"
                        alt="Foto de perfil do usuário">
                </div>
                <div class="flex flex-col w-full gap-5 pb-6">
                    <div class="flex flex-col w-full gap-1">
                        <label for="name" class="text-base font-semibold text-black">Nome</label>
                        <InputText id="name" v-model="user.username" :disabled="!editEnabled" />
                        <p :class="v$.user.username.$error
                            ? 'opacity-100'
                            : '-translate-y-6 opacity-0 invisible'
                            " class="text-xs text-red-400 transition-all">
                            Nome inválido.
                        </p>
                    </div>
                    <div class="flex flex-col gap-5 xl:flex-row">
                        <div class="flex flex-col w-full gap-1 xl:w-1/3">
                            <label for="telephone" class="text-base font-semibold text-black">Telefone</label>
                            <InputText id="telephone" v-model="user.phone" :disabled="!editEnabled" />
                            <p :class="v$.user.phone.$error
                                ? 'opacity-100'
                                : '-translate-y-6 opacity-0 invisible'
                                " class="text-xs text-red-400 transition-all">
                                Telefone inválido. (XX)XXXXX-XXXX
                            </p>
                        </div>
                        <div class="flex flex-col w-full gap-1 xl:w-2/3">
                            <label class="text-base font-semibold text-black">Endereço</label>
                            <Select labelClass="font-medium" v-model="user.adress" :options="citiesList"
                                :disabled="!editEnabled" placeholder="Selecione a cidade"
                                class="!bg-white !text-black h-[45px] w-full" />
                            <p :class="v$.user.adress.$error
                                    ? 'opacity-100'
                                    : '-translate-y-6 opacity-0 invisible'
                                " class="text-xs text-red-400 transition-all">
                                Cidade inválida. Selecione uma cidade.
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-col w-full gap-1">
                        <label class="text-base font-semibold text-black">E-mail</label>
                        <InputText v-model="userEmail" disabled />
                    </div>
                </div>
            </section>
            <Button v-if="!editEnabled"
                class="self-center mt-6 md:self-start w-full md:w-64 !bg-orange-400 col-start-2 text-base hover:!bg-white hover:!text-orange-400 border hover:!border-orange-400 !border-orange-400 active:scale-95 duration-200 text-white px-10 py-3 rounded font-bold"
                label="Editar" @click="editEnabled = true" />
            <div v-if="editEnabled" class="flex flex-col justify-end w-full gap-5 md:flex-row">
                <Button
                    class="self-center mt-6 md:self-start w-full md:w-64 !bg-orange-400 col-start-2 text-base hover:!bg-white hover:!text-orange-400 border hover:!border-orange-400 !border-orange-400 active:scale-95 duration-200 text-white px-10 py-3 rounded font-bold"
                    label="Atualizar" @click="" type="submit" />
                <Button
                    class="self-center mt-6 md:self-start w-full md:w-64 !bg-white col-start-2 text-base hover:!bg-orange-400 hover:!text-white border hover:!border-white !border-orange-400 active:scale-95 duration-200 !text-orange-400 px-10 py-3 rounded font-bold"
                    label="Cancelar" @click="editEnabled = false" />
            </div>
        </form>
    </main>
</template>
<script lang="ts">
import User from "@/models/user.model";
import { citiesList } from "@/utils/cities.util";
import useVuelidate from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import { defineComponent } from "vue";
import { validateName, validatePhone } from "@/utils/validators.util";
import { Toasts } from "@/utils/toast.util";
import { take } from "rxjs";
import LocalStorageUtil from "@/utils/localStorage.util";
import ProfileService from "./profile.service";

export default defineComponent({
    validations() {
        return {
            user: {
                username: { required, minLength: minLength(3), validateName },
                phone: { required, minLength: minLength(10), validatePhone },
                adress: { required }
            },
        };
    },
    data() {
        return {
            localStorage: new LocalStorageUtil(),
            user: new User,
            userEmail: '',
            citiesList: citiesList,
            v$: useVuelidate(),
            showToast: new Toasts(),
            editEnabled: false,
            isUpdateUser: false,
        }
    },
    methods: {
        validateFields(): void {
            this.v$.$touch();
            if (!this.v$.user.$invalid) {
                this.user.auth_id = this.userId();
                if (this.isUpdateUser) {
                    this.updateUserInformations();
                    this.editEnabled = false;
                } else {
                    this.registerUserInformations();
                    this.editEnabled = false;
                }
            }
        },
        registerUserInformations() {
            this.service.user.pipe(take(1)).subscribe({
                next: (response) => {
                    if (response.error === null) {
                        this.showToast.showSuccess(
                            "Cadastro realizado",
                            "perfil foi atualizado com sucesso!"
                        );
                        this.v$.$reset();
                        this.getUserById();
                    } else {
                        this.showToast.showError();
                    }
                },
            });

            this.service.registerUser(this.user);
        },
        updateUserInformations() {
            const userFormated = {
                username: this.user.username,
                adress: this.user.adress,
                phone: this.user.phone,
            };
            this.service.user.pipe(take(1)).subscribe({
                next: (response) => {
                    if (response.error === null) {
                        this.showToast.showSuccess(
                            "Cadastro atualizado ",
                            "perfil foi atualizado com sucesso!"
                        );
                        this.v$.$reset();
                        this.getUserById();
                    } else {
                        this.showToast.showError();
                    }
                },
            });
            this.service.updateUser(this.userId() as string, userFormated);
        },
        getUserById() {
            if (this.userId()) {
                this.service.user.pipe(take(1)).subscribe({
                    next: (response) => {
                        if (response.data.length > 0) {
                            this.user = response.data[0];
                            this.isUpdateUser = true;
                        }
                    },
                });
                this.service.getUserById(this.userId());

            }
        },
        userId(): string {
            const user: any = this.localStorage.getItem("user");
            this.userEmail = user.email;
            return user?.id;
        }
    },
    computed: {
        service(): ProfileService {
            return new ProfileService();
        },
    },
    mounted() {
        this.getUserById();
    }
})
</script>
<!-- <style scoped>
.p-select.p-disabled {
    background-color: #e2e8f0 !important
}
</style> -->