<template>
  <Toast position="top-right" />
  <main class="h-screen w-screen flex flex-col">
    <RouterLink to="/">
      <button
        class="items-center flex text-2xl font-medium gap-3 text-orange-400 py-3 rounded px-10"
      >
        <i class="pi pi-arrow-left" style="font-size: 1.3rem"></i>
        <p>Voltar</p>
      </button>
    </RouterLink>
    <section
      class="rounded w-full md:w-1/2 h-full bg-white bg-opacity-5 flex flex-col justify-center items-center"
    >
      <form
        action=""
        @submit.prevent="validateFields"
        class="text-gray-600 px-3 l absolute md:flex flex-col gap-5 justify-center items-center"
      >
        <h1
          class="text-orange-400 tracking-wide my-3 text-4xl font-semibold flex justify-center"
        >
          Cadastre-se
        </h1>
        <div>
          <FloatLabel>
            <InputText id="email" v-model="newUser.email" />
            <label for="email">Email</label>
          </FloatLabel>
          <p
            :class="
              v$.newUser.email.$error
                ? 'opacity-100'
                : '-translate-y-6 opacity-0 invisible'
            "
            class="text-xs text-red-400 transition-all"
          >
            Email inválido.
          </p>
        </div>
        <div>
          <FloatLabel>
            <InputText
              id="password"
              v-model="newUser.password"
              type="password"
            />
            <label for="password">Senha</label>
          </FloatLabel>
          <p
            :class="
              v$.newUser.password.$error
                ? 'opacity-100'
                : '-translate-y-6 opacity-0 invisible'
            "
            class="text-xs text-red-400 transition-all"
          >
            Senha inválida. Obrigatório letras e números
          </p>
        </div>

        <span class="flex gap-2">
          <p>Já possui cadastro?</p>
          <RouterLink to="/login" class="text-blue-600 cursor-pointer">
            Entrar</RouterLink
          >
        </span>

        <button
          type="submit"
          class="!bg-orange-400 hover:!bg-white hover:!text-orange-400 border hover:!border-orange-400 active:scale-95 duration-200 w-full md:w-[274px] text-white px-10 py-3 rounded font-bold"
        >
          Cadastrar
        </button>
      </form>
    </section>
    <div class="hidden lg:w-1/2 h-screen absolute right-0 bottom-0 bg-orange-400 lg:flex justify-center items-end">
      <img
        src="@/assets/images/pug2.png"
        alt=""
        class="object-cover"
      />
    </div>
  </main>
</template>
<script lang="ts">
import User from "@/models/user.model";
import { citiesList } from "@/utils/cities.util";
import RegisterService from "./register.service";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { defineComponent } from "vue";
import { validatePassword } from "@/utils/validators.util";
import { Toasts } from "@/utils/toast.util";

export default defineComponent({
  validations() {
    return {
      newUser: {
        email: { required },
        password: { required, validatePassword },
      },
    };
  },
  data() {
    return {
      citiesList: citiesList,
      newUser: new User(),
      v$: useVuelidate(),
      showToast: new Toasts(),
    };
  },
  methods: {
    registerEmail(): void {
      this.service.user.pipe().subscribe({
        next: (response) => {
          if (response.error === null) {
            this.showToast.showSuccess(
              "Cadastro realizado",
              "O usuário foi cadastrado com sucesso!"
            );
            this.v$.$reset();
            this.newUser = new User();
          } else {
            this.showToast.showError();
          }
        },
      });
      this.service.signUp(
        this.newUser.email as string,
        this.newUser.password as string
      );
    },
    validateFields(): void {
      this.v$.$touch();
      if (!this.v$.newUser.$invalid) {
        this.registerEmail();
      }
    },
  },
  computed: {
    service(): RegisterService {
      return new RegisterService();
    },
  },
});
</script>
