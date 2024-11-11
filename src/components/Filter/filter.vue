<template>
<div class="w-full min-h-[65px] bg-filterBar-home flex flex-col md:flex-row">
    <div class="gap-8 px-6 py-3 flex flex-row flex-wrap h-[65] w-fit">
        <Select v-model="selectedBreed" :options="breedOptions" placeholder="Selecione uma raça" @update:model-value="$emit('filterByBreed', selectedBreed)" class="w-52"></Select>
        <SelectButton v-model="selectedGender" :options="genderOptions" aria-labelledby="basic" @click="$emit('filterByGender', selectedGender)"/>
        <SelectButton v-model="selectedAge" :options="ageOptions" aria-labelledby="basic" @click="$emit('filterByAge', selectedAge)"/>
    </div>
    <div class="flex gap-8 px-6 py-3 w-fit h-[65px]">
        <Button class="w-28 !bg-orange-400 hover:!bg-white hover:!text-orange-400 !border-orange-400 active:scale-95 duration-200" @click="$emit('filter')" label="Pesquisar"></Button>
        <Button class="w-28 !bg-blue-600 !border-blue-600" label="Limpar" @click="clearFilter()"></Button>
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
