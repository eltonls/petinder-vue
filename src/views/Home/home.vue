<template>
  <main>
    <Loader v-if="isLoading" />
    <Filter :pets="pets" @filterByGender="filterByGender" @filterByAge="filterByAge" @filterByBreed="filterByBreed" @filter="filter" @clearFilter="clearFilter()"></Filter>
    <DataView :class="isLoading? 'hidden': ''" :value="pets" data-key="pets" paginator :rows="size" :always-show-paginator="false" :total-records="total">
      <template #list="slotProps">
        <div class="px-24 py-5 text-center">
          <div v-for="pet in slotProps.items" :key="pet.id" class="inline-flex">
            <PetCard :pet="pet"/>
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
  </main>
</template>
<script  lang="ts">
import Pet, { AgeRange, Breed, GenderPet } from '@/models/pet.model';
import {HomeService} from '../Home/home.service'
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
    }
  },
  computed:{
    service(): HomeService{
      return new HomeService()
    }
  },
  mounted(){
    this.getPets()
  }
}
</script>