<template>
<div class="w-full min-h-[65px] bg-transparent flex flex-col justify-between md:flex-row">
    <div class="gap-8 px-6 py-3 flex flex-row flex-wrap h-[65] w-fit">
        <Select v-model="selectedBreed" :options="breedOptions" placeholder="Selecione uma raça" @update:model-value="$emit('filterByBreed', selectedBreed)" class=" !shadow-2xl h-11 text-black custom-select"></Select>
        <SelectButton v-model="selectedGender" class="!shadow-2xl h-11 custom-selectbutton" :options="genderOptions" aria-labelledby="basic" @click="$emit('filterByGender', selectedGender)"/>
        <SelectButton v-model="selectedAge" class="!shadow-2xl h-11 custom-selectbutton" :options="ageOptions" aria-labelledby="basic" @click="$emit('filterByAge', selectedAge)"/>
    </div>
    <div class="flex gap-8 px-6 py-3 w-fit h-[65px]">
        <Button class="w-44 !shadow-2xl !bg-[#7C7EF6F2] hover:!bg-white hover:!text-[#7C7EF6F2] !border-[#7C7EF6F2] active:scale-95 duration-200 btn-filter h-11"  @click="$emit('filter')" label="Aplicar Filtros"></Button>
        <Button class="w-44 !shadow-2xl !bg-transparent !border-[#7C7EF6F2] btn-filter h-11 " label="Limpar Filtros" @click="clearFilter()"></Button>
    </div>
</div>
</template>
<script lang="ts">
import { AgeRange, Breed, GenderPet } from '@/models/pet.model';

export default {
    name: "Filter",
    data() {
        return {
            selectedBreed: undefined,
            selectedGender: undefined,
            selectedAge: undefined,
            genderOptions: [GenderPet.Female, GenderPet.Male],
            ageOptions: [AgeRange.Young, AgeRange.Adult, AgeRange.Old],
            breedOptions: [Breed.Arachnids, Breed.Birds, Breed.Cats, Breed.Dogs, Breed.Fish, Breed.Frogs, Breed.Insects, Breed.Lizards, Breed.Rodents, Breed.Turtles, Breed.Others]
        }
    },
    methods: {
        clearFilter(): void {
            this.selectedBreed = undefined;
            this.selectedAge = undefined;
            this.selectedGender = undefined;
            this.$emit('clearFilter');
        }
    }
}
</script>