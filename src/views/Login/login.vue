<template>
  <main>
    <div
      class="p-10 rounded lg:w-1/2 h-[100vh] bg-white bg-opacity-5 flex flex-col justify-center items-center"
    >
    <RouterLink to="/" >
      <button
        class="items-center absolute top-0 left-0 flex text-2xl font-medium gap-3 text-orange-400 py-3 rounded px-10"
      >
        <i class="pi pi-arrow-left" style="font-size: 1.3rem"></i>
        <p>Voltar</p>
      </button>
    </RouterLink>
      <div class="flex gap-2">
        <h1 class="font-bold tracking-wide mb-10 text-2xl">
          <span class="text-orange-400">Pet</span>inder
        </h1>
      </div>
      <h2 class="mb-10">Bem-vindo de volta!</h2>
      <form @submit.prevent="submitLogin" class="flex flex-col gap-5">
        <div class="mb-3">
          <FloatLabel class="mb-1">
            <InputText
                class="w-full"
              id="email"
              v-model="emailInput"
              :class="v$.emailInput.$error ?? '!border-red-300'"
            />
            <label for="email">Email</label>
          </FloatLabel>
          <p
            class="text-xs text-red-400 transition-all"
            :class="
              v$.emailInput.$error ? 'opacity-100' : '-translate-y-6 opacity-0 invisible'
            "
          >
            Digite um email válido
          </p>
        </div>

        <div>
          <FloatLabel class="mb-1">
            <InputText id="password" type="password" v-model="passwordInput" class="w-full" />
            <label for="password">Senha</label>
          </FloatLabel>
          <p
            class="text-xs text-red-400"
            :class="
              v$.passwordInput.$error ? 'opacity-100' : '-translate-y-6 opacity-0 invisible'
            "
          >
            Digite sua senha
          </p>
        </div>

        <div class="flex items-center gap-5">
          <p>Quer ser lembrado por nós?</p>
          <ToggleButton
            v-model="rememberUser"
            class="!text-orange-400"
            onLabel="Sim"
            offLabel="Não"
          />
        </div>
        <span class="flex gap-2 mb-4 justify-center">
          <p>Não possui cadastro?</p>
          <RouterLink to="/register" class="text-blue-600">Cadastre-se</RouterLink>
        </span>
        <button
          type="submit"
          class="bg-orange-400 px-10 py-3 rounded font-bold text-white"
        >
          Login
        </button>
      </form>
    </div>
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
import { defineComponent } from "vue";
import LoginService from "./login.service";
import { take } from "rxjs";
import LocalStorageUtil from "@/utils/localStorage.util";
import useVuelidate from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";

export default defineComponent({
  data() {
    return {
      passwordInput: "",
      emailInput: "",
      rememberUser: false,
    };
  },
  methods: {
    submitLogin() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.service.user.pipe(take(1)).subscribe((user) => {
          this.localStorage.setItem("user", user.data.session.user);

          if(user.error === null) {
            this.$router.push({ name: "home" });
          }
        });

        this.service.login(this.emailInput, this.passwordInput);
      }
    },
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      emailInput: { required, email },
      passwordInput: { required },
    };
  },
  computed: {
    service() {
      return new LoginService();
    },
    localStorage() {
      return new LocalStorageUtil();
    },
  },
});
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
  
