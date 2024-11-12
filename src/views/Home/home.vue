<template>
  <main>
    <Loader v-if="isLoading" />
    <Filter
      :pets="pets"
      @filterByGender="filterByGender"
      @filterByAge="filterByAge"
      @filterByBreed="filterByBreed"
      @filter="filter"
      @clearFilter="clearFilter()"
    ></Filter>
    <DataView
      :class="isLoading ? 'hidden' : ''"
      :value="pets"
      data-key="pets"
      paginator
      :rows="size"
      :always-show-paginator="false"
      :total-records="total"
    >
      <template #list="slotProps">
        <div class="py-5 lg:px-16 text-center">
          <div v-for="pet in slotProps.items" :key="pet.id" class="inline-flex">
            <PetCard :pet="pet" @response="showAdoptDialogIfLogged" />
          </div>
        </div>
      </template>
      <template #empty>
        <div
          class="flex flex-col items-center justify-center p-8 m-5 mx-auto rounded-full w-80"
        >
          <img src="@/assets/images/empty.png" alt="" class="w-60 h-60" />
          <h4 class="text-xl font-bold text-gray-400">
            Ah... não tem pet aqui
          </h4>
        </div>
      </template>
    </DataView>
    <Dialog
      v-model:visible="isVisibleAdoptDialog"
      modal
      class="h-[50vh] !bg-white w-[480px] overflow-auto justify-between"
    >
      <template #header>
        <span class="flex items-center justify-center w-full h-full text-lg font-semibold">
          Confimar adoção de {{ adoptedPet.name }}
        </span>
      </template>
      <section class="flex flex-col justify-center">
      <div class="w-full h-56 mb-3">
        <img :src="adoptedPet.image_url" alt="pet image" class="w-auto h-56 mx-auto rounded-md drop-shadow" >
      </div>
      <div class="text-justify text-black">{{ adoptedPet.description }}</div>
      </section>
      <template #footer>
        <div class="flex gap-4">
          <Button
            label="Cancelar"
            @click="setStateDialog(false)"
            class="!bg-white !border-orange-400 !text-orange-400 hover:!bg-orange-50"
          />
          <Button
            label="Confimar"
            @click="adoptPet(adoptedPet)"
            class="!bg-orange-400 !border-orange-400 hover:!bg-orange-500"
          />
        </div>
      </template>
    </Dialog>
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
      isVisibleAdoptDialog: false,
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
      this.isVisibleAdoptDialog = state;
    },
    adoptPet(pet: Pet): void {
      const user = this.localStorage.getItem("user") as User;
      this.adoption.pet_id = pet.id as number;
      this.adoption.user_id = user.id as string;
      if(!this.completeUserRegistration){
        this.$router.push('/account')
      }
      else{

        this.getAdoptionById(this.adoption.user_id, this.adoption.pet_id);
      }
      this.setStateDialog(false);
    },
    getUserById():void{
      if(this.isLogged()){
        this.service.user.pipe(take(1)).subscribe({
          next:(response)=>{
            if(response.data.length===1){
              this.completeUserRegistration = true       
            }else{
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
    userId():string{
      const user = this.localStorage.getItem("user") as User;
      return user.id as string
    }
  },
  mounted() {
    this.getPets();
    this.getUserById()
  },
};
</script>
