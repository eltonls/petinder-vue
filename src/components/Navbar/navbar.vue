<template>
  <main>
    <nav
      class="flex items-center justify-between flex-wrap py-5 px-2 font-sans bg-[#7c7ef6]"
    >
      <div class="font-bold animate-slide-in-left">
        <RouterLink to="/">
          <p class="text-2xl font-display text-white">Petinder</p>
        </RouterLink>
      </div>
      <ul class="flex gap-5 text-white font-bold">
        <li>
          <RouterLink to="/pets" class="hover:text-orange-400">
            <p>Pets</p>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/about" class="hover:text-orange-400">
            <p>Sobre Nós</p>
          </RouterLink>
        </li>
      </ul>
      <MenuBar
        :model="itemsMenuUser"
        class="!bg-transparent !border-none !text-white !p-0 animate-slide-in-right z-50"
        v-if="!isLogged"
      >
        <template #item="{ item, props, hasSubmenu, root }">
          <a v-ripple class="flex items-center" v-bind="props.action">
            <span v-if="item.label" class="font-bold tracking-wide">{{
              item.label
            }}</span>
            <i
              v-if="item.icon && item.icon !== 'pi pi-user'"
              class="hover:text-orange-500"
              :class="item.icon"
              style="font-size: 1.5rem"
            ></i>
            <div
              v-if="item.icon === 'pi pi-user'"
              class="flex gap-2 items-center justify-center hover:bg-transparent"
            >
              <Avatar
                image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                shape="circle"
              />
              <div class="flex flex-col text-xs">
                <p>{{  userName }}</p>
                <p>{{ userEmail }}</p>
              </div>
              <i
                v-if="hasSubmenu"
                :class="[
                  'pi pi-angle-down ml-auto',
                  { 'pi-angle-down': root, 'pi-angle-right': !root },
                ]"
              ></i>
            </div>
            <Badge
              v-if="item.badge"
              :class="{ 'ml-auto': !root, 'ml-2': root }"
              :value="item.badge"
            />
            <span
              v-if="item.shortcut"
              class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
              >{{ item.shortcut }}</span
            >
          </a>
        </template>
      </MenuBar>
      <div v-else class="flex gap-4">
        <Button
          class="!bg-transparent !border-orange-500 !outline-none !transition-all !duration-200 hover:rounded-none"
          @click="redirectToRegister"
        >
          Cadastrar-se
        </Button>
        <Button
          class="!bg-orange-500 !border-none !outline-none !transition-all !duration-200 hover:rounded-none"
          @click="redirectToLogin"
        >
          Fazer Login
        </Button>
      </div>
    </nav>
  </main>
</template>
<script lang="ts">
import LocalStorageUtil from "@/utils/localStorage.util";

export default {
  name: "NavBar",
  data() {
    return {
      itemsMenuUser: [
        {
          label: "Mensagens",
          icon: "pi pi-envelope",
        },
        {
          label: "Notificações",
          icon: "pi pi-bell",
        },
        {
          label: "",
          icon: "pi pi-user",
          items: [
            {
              label: "Perfil",
              icon: "",
            },
            {
              label: "Fazer Logoff",
              icon: "",
              command: () => { this.logout() }
            },
          ],
        },
      ],
      userName: "",
      userEmail: "",
      isLogged: false,
    };
  },
  methods: {
    logout(): void {
      this.localStorage.removeItem("user");
      this.localStorage.removeItem("sb-antssactxehyqfavecgh-auth-token");
      this.isLogged = true;
    },
    getUserInfo(): void {
      const user = this.localStorage.getItem("user");
      this.userName = "Elton R. Soares";
      this.userEmail = user.email;
    },
    redirectToLogin(): void {
      this.$router.push("/login");
    },
    redirectToRegister(): void {
      this.$router.push("/register");
    },
  },
  mounted() {
    this.getUserInfo();
  },
  computed: {
    localStorage(): LocalStorageUtil<any> {
      return new LocalStorageUtil<any>();
    },
  },
};
</script>
