<script lang="ts">
import { defineComponent } from 'vue';
import TestService from './test.service';

export default defineComponent({
  data() {
    return {
      pets: []
    }
  },
  methods: {
    getPetById() {
      this.petService.pets.pipe().subscribe({
        next: (pets) => {
          console.log(pets);
          this.pets = pets;
        }
      });

      this.petService.getAllpets();
    }
  },
  mounted() {
    this.getPetById();
  },
  computed: {
    petService(): TestService {
      return new TestService();
    }
  },
});

</script>

<template>
  <main>

    <h2>PETS: </h2>
    <div>
      {{  pets ?? 'No pets found' }}
    </div>
  </main>
</template>
