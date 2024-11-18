<template>
  <main>
    <nav
      class="flex items-center justify-between flex-wrap py-5 px-2 font-sans bg-indigo-500"
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

      <section class="flex items-center gap-5 my-auto" v-if="isLogged">
        <div class="flex gap-5">
          <i
            class="pi pi-envelope text-white cursor-pointer !transition-all !duration-200 hover:rounded-none hover:text-orange-400"
            style="font-size: 1.7rem"
          ></i>
          <span class="relative">

            <Badge
              severity="danger"
              :value="
                totalAdoptionsNotifications
              "
              v-if="totalAdoptionsNotifications>0"
              size="small"
              class="absolute translate-x-[17px] translate-y-[12px]"
            >
          </Badge>
          <i
            class="pi pi-bell text-white cursor-pointer !transition-all !duration-200 hover:rounded-none hover:text-orange-400"
            style="font-size: 1.7rem"
            @click="showNotifications"
          ></i>
          </span>

          <Popover ref="op">
            <section class="flex flex-col gap-2" v-if="totalAdoptionsNotifications>0">
              <ul v-for="(adoption, i) in adoptionNotifications">
                <li
                  :key="i"
                  class="cursor-pointer h-14 bg-[#D9D9D9] rounded-md p-1 flex gap-3"
                  @click="redirectToChat"
                >
                  <img
                    src="/src/assets/images/user.jpg"
                    alt=""
                    class="w-12 h-12 rounded-full"
                  />
                  <span class="flex flex-col">
                    <p class="">
                      Olá! {{ adoption.users?.username }} quer adotar o
                      {{ adoption.pets?.name }}.
                    </p>
                    <p>({{ adoption.users?.adress }})</p>
                  </span>
                </li>
              </ul>
            </section>
            <section v-else>
              <p class="h-10 bg-[#D9D9D9] rounded-md px-2 flex items-center">Nenhuma notificação no momento.</p>
            </section>
          </Popover>
        </div>
        <MenuBar
          :model="itemsMenuUser"
          class="!bg-transparent !border-none !text-white !p-0 animate-slide-in-right z-50"
          v-if="isLogged"
        >
          <template #item="{ item, props, hasSubmenu, root }">
            <a v-ripple class="flex items-center" v-bind="props.action">
              <span v-if="item.label" class="font-bold tracking-wide">{{
                item.label
              }}</span>
              <i
                v-if="item.icon && item.icon !== 'pi pi-user'"
                :class="item.icon"
              ></i>
              <div
                v-if="item.icon === 'pi pi-user'"
                class="flex gap-2 items-center justify-center hover:bg-transparent"
              >
                <Avatar
                  image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                  shape="circle"
                />
                <div class="flex flex-col text-xs font-bold">
                  <p>{{ userName ? userName : "Visitante" }}</p>
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
      </section>

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
import User from "@/models/user.model";
import LocalStorageUtil from "@/utils/localStorage.util";
import { NavbarService } from "./navbar.service";
import type Adoption from "@/models/adoption.model";
import { defineComponent } from "vue";
import { take } from "rxjs";
export default defineComponent({
  name: "NavBar",
  data() {
    return {
      isLogged: false,
      localStorage: new LocalStorageUtil(),
      user: new User(),
      totalAdoptionsNotifications: 0,
      adoptionNotifications: [] as Array<Adoption>,
      itemsMenuUser: [
        {
          label: "",
          icon: "pi pi-user",
          items: [
            {
              label: "Perfil",
              icon: "",
              command:()=>{ this.redirectToProfile()}
            },
            {
              label: "Fazer Logoff",
              icon: "",
              command: () => {
                this.logout();
              },
            },
          ],
        },
      ],
      userName: "",
      userEmail: "",
    };
  },
  methods: {
    getUserInfo(): void {
      const user = this.localStorage.getItem("user") as User;
      if (user !== null) {
        this.userEmail = user.email as string;
        this.isLogged = true;
      }
      this.getUserById();
    },
    getUserById() {
      if(this.isLogged){        
        this.service.user.pipe(take(1)).subscribe({
          next: (response) => {
            if (response.data) {
              this.userName = response.data[0].username;
            }
          },
        });
        this.service.getUserById(this.userId);

      }
    },
    logout(): void {
      this.localStorage.removeIten("user");
      this.localStorage.removeIten("sb-antssactxehyqfavecgh-auth-token");
      this.isLogged = false;
      window.location.reload()
    },
    redirectToLogin(): void {
      this.$router.push("/login");
    },
    redirectToChat(): void {
      this.$router.push("/chat");
    },
    redirectToRegister(): void {
      this.$router.push("/register");
    },
    redirectToProfile(): void {
      this.$router.push("/profile");
    },
    getAllAdoptions(): void {
      if(this.isLogged){

        this.service.adoptions.pipe().subscribe({
          next: (response) => {
            this.totalAdoptionsNotifications = response.data.length;
            this.adoptionNotifications = response.data;
          },
        });
        this.service.getAllAdoptionsRequest(this.userId);
      }
    },
    showNotifications(event: any): void {
      const refs = this.$refs.op as any;
      refs.toggle(event);
    }
  },
  computed: {
    service(): NavbarService {
      return new NavbarService();
    },
    userId(): string {
      const user = this.localStorage.getItem("user") as User;
      return user.id as string;
    },
  },
  mounted() {
    this.getAllAdoptions();
    this.getUserInfo();
  },
});
</script>
