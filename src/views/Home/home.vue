<template>
  <main class="relative overflow-hidden bg-[url('@/assets/images/bg.png')] bg-contain">
    <Loader v-if="isLoading" />
    <section :class="isLoading ? 'hidden' : ''" class="px-2 lg:px-32 bg-black bg-opacity-50 relative min-h-full ">
      <Filter :pets="pets" @filterByGender="filterByGender" @filterByAge="filterByAge" @filterByBreed="filterByBreed"
        @filter="filter" @clearFilter="clearFilter()"></Filter>
      <DataView :value="pets" data-key="pets" paginator class="custom-table"
        :rows="size" :always-show-paginator="false" :total-records="total">
        <template #list="slotProps">
          <div class="py-2 text-center ">
            <div v-for="pet in slotProps.items" :key="pet.id" class="inline-flex " >
              <PetCard :pet="pet" @response="showAdoptDialogIfLogged" class=""/>
            </div>
          </div>
        </template>
        <template #empty>
          <div class="flex flex-col items-center justify-center p-8 m-5 mx-auto rounded-full w-80">
            <img src="@/assets/images/empty.png" alt="" class="w-60 h-60" />
            <h4 class="text-xl font-bold text-gray-400">
              Ah... não tem pet aqui
            </h4>
          </div>
        </template>
      </DataView>
      <DetailDialog :isVisible="isVisibleDetailDialog" :pet="adoptedPet" :pageType="'home'" @closeDialog="setStateDialog" @adoptPet="adoptPet" />
    </section>
  </main>
</template>
<script lang="ts">
import Pet from "@/models/pet.model";
import { HomeService } from "../Home/home.service";
import LocalStorageUtil from "@/utils/localStorage.util";
import type User from "@/models/user.model";
import Adoption from "@/models/adoption.model";
import { take } from "rxjs";
import { Toasts } from "@/utils/toast.util";
import DetailDialog from "@/components/DetailDialog/detailDialog.vue";
export default {
  data() {
    return {
      pets: [] as Array<Pet>,
      size: 12,
      total: 0,
      isLoading: true,
      selectedBreed: undefined,
      selectedGender: undefined,
      selectedAge: undefined,
      isVisibleDetailDialog: false,
      adoptedPet: new Pet(),
      showToast: new Toasts(),
      adoption: new Adoption(),
      completeUserRegistration: false,
    };
  },
  methods: {
    getPets(gender?: any, ageRange?: any, breed?: any): void {
      this.service.pets.pipe().subscribe({
        next: (response) => {
          this.pets = response.data;
          this.total = this.pets.length;
          this.isLoading = false;
        },
      });
      this.service.getPets(gender, ageRange, breed);
    },
    filterByGender(selectedGender: any): void {
      this.selectedGender = selectedGender;
    },
    filterByAge(selectedAge: any): void {
      this.selectedAge = selectedAge;
    },
    filterByBreed(selectedBreed: any): void {
      this.selectedBreed = selectedBreed;
    },
    filter(): void {
      this.getPets(this.selectedGender, this.selectedAge, this.selectedBreed);
    },
    clearFilter(): void {
      this.selectedBreed = undefined;
      this.selectedAge = undefined;
      this.selectedGender = undefined;
      this.getPets(this.selectedGender, this.selectedAge, this.selectedBreed);
    },
    showAdoptDialogIfLogged(pet: Pet): void {
      if (this.isLogged()) {
        this.adoptedPet = pet;
        this.setStateDialog(true);
      } else {
        this.redirectToRegister();
      }
    },
    setStateDialog(state: boolean): void {
      this.isVisibleDetailDialog = state;
    },
    adoptPet(pet: Pet): void {
      const user = this.localStorage.getItem("user") as User;
      this.adoption.pet_id = pet.id as number;
      this.adoption.user_id = user.id as string;
      if(!this.completeUserRegistration){
        this.$router.push('/profile')
      }
      else {

        this.getAdoptionById(this.adoption.user_id, this.adoption.pet_id);
      }
      this.setStateDialog(false);
    },
    getUserById(): void {
      if (this.isLogged()) {
        this.service.user.pipe(take(1)).subscribe({
          next: (response) => {
            if (response.data.length === 1) {
              this.completeUserRegistration = true
            } else {
              this.completeUserRegistration = false

            }
          }
        })
        this.service.getUserById(this.userId)
      }
    },
    getAdoptionById(userId: string, petId: number): void {
      this.service.adoption.pipe(take(1)).subscribe({
        next: (response) => {
          if (response.data.length > 0) {
            this.showToast.showWarn(
              "Adoção duplicada!",
              "Você já realizou essa operação."
            );
          } else {
            this.registerAdoption();
          }
        }
      });

      this.service.getAdoptionById(userId, petId);
    },
    registerAdoption(): void {
      this.service.adoption.pipe(take(1)).subscribe({
        next: (response) => {
          if (response.error === null) {
            this.showToast.showSuccess(
              "Solicitação enviada",
              "Sua solicitação de adoção foi enviada com sucesso!"
            );
            this.adoption = new Adoption();
          } else {
            this.showToast.showError();
          }
        },
      });
      this.service.registerAdoption(this.adoption);
    },
    isLogged(): boolean {
      return this.localStorage.getItem("user") ? true : false;
    },
    redirectToRegister(): void {
      this.$router.push("/login");
    },
  },
  computed: {
    service(): HomeService {
      return new HomeService();
    },
    localStorage() {
      return new LocalStorageUtil();
    },
    userId(): string {
      const user = this.localStorage.getItem("user") as User;
      return user.id as string
    }
  },
  mounted() {
    this.getPets();
    this.getUserById();
  },
};
</script>