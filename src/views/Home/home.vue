<script  lang="ts">
import type Pet from '@/models/pet.model';
import {HomeService} from '../Home/home.service'
export default{
  data(){
    return{
      pets: [] as Array<Pet>,
    }
  },

  methods:{
    getAllPets():void {
      this.service.pets.pipe().subscribe({
        next: (response) => {
          this.pets = response;
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
  </main>
</template>
