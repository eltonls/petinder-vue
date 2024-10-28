<script  lang="ts">
import type Pet from '@/models/pet.model';
import {HomeService} from '../Home/home.service'
export default{
  data(){
    return{
      pets: [] as Array<Pet>,
      size: 10,
      total: 0,
    }
  },

  methods:{
    getAllPets():void {
      this.service.pets.pipe().subscribe({
        next: (response) => {
          this.pets = response;
          this.total = this.pets.length;
        }
      });

      this.service.getAllPets(); 
  },
  },
  computed:{
    service(): HomeService{
      return new HomeService()
    }
  },
  mounted(){
    this.getAllPets()
  }
}
</script>

<template>
  <main>
   <h1>Home</h1> 
    <DataView :value="pets" data-key="pets" paginator :rows="size" :always-show-paginator="false" :total-records="total">
      <template #list="slotProps">
        <div class="flex flex-row p-5">
          <!-- TODO: Add your pet card here  -->
          <div v-for="pet in slotProps.items" :key="pet.id" class="p-5 bg-blue-500 text-white m-2 w-[1/4] h-48 flex items-center">{{ pet.name }}</div>
        </div>
      </template>
      <template #empty>
        <div class="mx-auto flex flex-col justify-center items-center p-8 m-5 rounded-full w-80">
          <img src="@/assets/images/empty.png" alt="" class="w-60 h-60">
          <h4 class="font-bold text-xl text-gray-400">Ah... não tem pet aqui</h4>
        </div>
      </template>
    </DataView>
  </main>
</template>
