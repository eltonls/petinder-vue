<template>
  <main>
    <nav
      class="flex items-center justify-between flex-wrap bg-blue-950 p-4 flex-shrink-0"
    >
      <div class="font-bold m-4 animate-slide-in-left">
        <RouterLink to="/">
          <span
            class="text-white !text-4xl animate-slide-in-left hover:text-[#FF8C00] duration-500"
            >Petinder</span
          >
        </RouterLink>
      </div>
      <div class="m-4 items-center animate-slide-in-right" v-if="isLogged">
        <Button
          icon="pi pi-sign-out"
          severity="warn"
          text
          rounded
          label="Sair"
          size="large"
          class="!text-white hover:!text-[#FF8C00] hover:duration-500"
          @click="logout()"
        />
      </div>
      <div class="m-4 items-center animate-slide-in-right" v-else>
        <Button
          icon="pi pi-user"
          severity="warn"
          text
          rounded
          label="Fazer login"
          size="large"
          class="!text-white hover:!text-[#FF8C00] hover:duration-500"
          @click="redirectToLogin()"
        />
      </div>
    </nav>
  </main>
</template>
<script lang="ts">
import User from "@/models/user.model";
import LocalStorageUtil from "@/utils/localStorage.util";
export default {
  name: "NavBar",
  data() {
    return {
      itemsMenuUser: [
        { label: "Profile", icon: "pi pi-user" },
        { label: "Exit", icon: "pi pi-search" },
      ],
      isLogged: false,
      localStorage: new LocalStorageUtil(),
      user: new User(),
    };
  },
  methods: {
    logout(): void {
      this.localStorage.removeIten("user");
      this.localStorage.removeIten("sb-antssactxehyqfavecgh-auth-token");
      this.isLogged = false;
    },
    redirectToLogin(): void {
      this.$router.push("/login");
    },
    hasUserLogged(): void {
      const user: any = this.localStorage.getItem("user");
      if (user) {
        this.isLogged = true;
      }
    },
  },
  mounted() {
    this.hasUserLogged();
  },
};
</script>
