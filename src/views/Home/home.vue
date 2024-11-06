<template>
  <main>
    <Loader v-if="isLoading" />
    <Filter :pets="pets" @filterByGender="filterByGender" @filterByAge="filterByAge" @filterByBreed="filterByBreed" @filter="filter" @clearFilter="clearFilter()"></Filter>
    <DataView :class="isLoading? 'hidden': ''" :value="pets" data-key="pets" paginator :rows="size" :always-show-paginator="false" :total-records="total">
      <template #list="slotProps">
        <div class="py-5 lg:px-24 text-center">
          <div v-for="pet in slotProps.items" :key="pet.id" class="inline-flex">
            <PetCard :pet="pet" @response="showAdoptDialogIfLogged" />
          </div>
        </div>
      </template>
      <template #empty>
        <div class="flex flex-col items-center justify-center p-8 m-5 mx-auto rounded-full w-80">
          <img src="@/assets/images/empty.png" alt="" class="w-60 h-60">
          <h4 class="text-xl font-bold text-gray-400">Ah... não tem pet aqui</h4>
        </div>
      </template>
    </DataView>
    <Dialog v-model:visible="isVisibleAdoptDialog" modal
      class="h-[50vh] !bg-white w-[480px] overflow-auto justify-between">
      <template #header>
        <span class="text-lg font-semibold w-full h-full flex items-center justify-center">
          Confimar adoção de {{ adoptedPet.name }}
        </span>
      </template>
      <section class="flex flex-col justify-center">
      <div class="w-full h-56 mb-3">
        <img :src="adoptedPet.image_url" alt="pet image" class="h-56 w-56 mx-auto rounded-md drop-shadow" >
      </div>
      <div class="text-black text-justify">{{ adoptedPet.description }}</div>
      </section>
      <template #footer>
        <div class="flex gap-4">
          <Button label="Cancelar" @click="setStateDialog(false)" class="!bg-white !border-orange-400 !text-orange-400 hover:!bg-orange-50" />
          <Button label="Confimar" @click="adoptPet(adoptedPet)" class="!bg-orange-400 !border-orange-400 hover:!bg-orange-500" />
        </div>
      </template>
    </Dialog>
  </main>
</template>
<script  lang="ts">
import Pet from '@/models/pet.model';
import {HomeService} from '../Home/home.service'
import LocalStorageUtil from '@/utils/localStorage.util';
import type User from '@/models/user.model';
export default{
  data(){
    return{
      pets: [] as Array<Pet>,
      size: 12,
      total: 0,
      isLoading: true,
      selectedBreed: undefined,
      selectedGender: undefined,
      selectedAge: undefined,
      isVisibleAdoptDialog: false,
      adoptedPet: new Pet()
    }
  },
  methods:{
    getPets(gender?: any, ageRange?: any, breed?: any): void {
      this.service.pets.pipe().subscribe({
        next: (response) => {
          this.pets = response.data;
          this.total = this.pets.length;
          this.isLoading = false;
        }
      })
      this.service.getPets(gender, ageRange, breed)
    },
    filterByGender(selectedGender: any): void {
      this.selectedGender = selectedGender
    },
    filterByAge(selectedAge: any): void {
      this.selectedAge = selectedAge
    },
    filterByBreed(selectedBreed: any): void {
      this.selectedBreed = selectedBreed
    },
    filter(): void {
      this.getPets(this.selectedGender, this.selectedAge, this.selectedBreed)
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
      const user = this.localStorage.getItem('user') as User;
      pet.owner_id = user.id;
      this.service.updatePet(pet);
      this.setStateDialog(false);
    },
    isLogged(): boolean {
      return this.localStorage.getItem('user') ? true : false;
    },
    redirectToRegister(): void {
      this.$router.push('/login');
    },
  },
  computed:{
    service(): HomeService{
      return new HomeService()
    },
    localStorage() {
      return new LocalStorageUtil();
    }
  },
  mounted(){
    this.getPets()
  }
}
</script>