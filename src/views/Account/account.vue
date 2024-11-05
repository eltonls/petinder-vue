<template>
  <Toast position="top-right" />
  <main class="w-screen flex flex-col">
    <section
      class="rounded w-full h-full bg-white bg-opacity-5 flex flex-col justify-center items-center"
    >
      <h1
        class="text-orange-400 tracking-wide my-20 text-4xl font-semibold flex justify-center"
      >
        Dados pessoais
      </h1>
      <form
        action=""
        @submit.prevent="validateFields"
        class="text-gray-600 px-3 grid grid-cols-3 gap-5"
      >
        <div>
          <FloatLabel>
            <InputText id="name" v-model="user.username" />
            <label for="name">Nome</label>
          </FloatLabel>
          <p
            :class="
              v$.user.username.$error
                ? 'opacity-100'
                : '-translate-y-6 opacity-0 invisible'
            "
            class="text-xs text-red-400 transition-all"
          >
            Nome inválido.
          </p>
        </div>
        <div>
          <FloatLabel>
            <InputText id="telephone" v-model="user.phone" />
            <label for="telephone">Telefone</label>
          </FloatLabel>
          <p
            :class="
              v$.user.phone.$error
                ? 'opacity-100'
                : '-translate-y-6 opacity-0 invisible'
            "
            class="text-xs text-red-400 transition-all"
          >
            Telefone inválido. (XX)XXXXX-XXXX
          </p>
        </div>
        <div>
          <Select
            labelClass="font-medium"
            v-model="user.adress"
            :options="citiesList"
            placeholder="Selecione a cidade"
            class="!bg-white !text-black w-full md:w-[274px]"
          />
          <p
            :class="
              v$.user.adress.$error
                ? 'opacity-100'
                : '-translate-y-6 opacity-0 invisible'
            "
            class="text-xs text-red-400 transition-all"
          >
            Cidade inválida. Selecione uma cidade.
          </p>
        </div>

        <div class="grid grid-cols-subgrid gap-4 col-span-3"></div>
        <button
          type="submit"
          class="!bg-orange-400 col-start-2 hover:!bg-white hover:!text-orange-400 border hover:!border-orange-400 active:scale-95 duration-200 w-full md:w-[274px] text-white px-10 py-3 rounded font-bold"
        >
          Atualizar
        </button>
      </form>
    </section>
  </main>
</template>
<script lang="ts">
import User from "@/models/user.model";
import { citiesList } from "@/utils/cities.util";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { defineComponent } from "vue";
import { validateName, validatePhone } from "@/utils/validators.util";
import { Toasts } from "@/utils/toast.util";
import { take } from "rxjs";
import LocalStorageUtil from "@/utils/localStorage.util";
import AccountService from "./account.service";

export default defineComponent({
  validations() {
    return {
      user: {
        username: { required, minLength: minLength(3), validateName },
        phone: { required, minLength: minLength(10), validatePhone },
        adress: { required },
      },
    };
  },
  data() {
    return {
      citiesList: citiesList,
      user: new User(),
      v$: useVuelidate(),
      showToast: new Toasts(),
      localStorage: new LocalStorageUtil(),
      isUpdateUser: false,
    };
  },
  methods: {
    validateFields(): void {
      this.v$.$touch();
      if (!this.v$.user.$invalid) {
        this.user.auth_id = this.userId();
        if (this.isUpdateUser) {
          this.updateUserInformations();
        } else {
          this.registerUserInformations();
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
      if(this.userId()){
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
    userId() {
      const user: any = this.localStorage.getItem("user");
      return user?.id;
    },
  },
  computed: {
    service(): AccountService {
      return new AccountService();
    },
  },
  mounted() {
    this.getUserById();
  },
});
</script>
