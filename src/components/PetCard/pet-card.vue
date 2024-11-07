<template>
    <main class="m-2 md:m-4">
        <section
            class="w-32 h-48 sm:w-52 sm:h-72 xl:w-[290px] xl:h-[385px] overflow-hidden rounded-xl shadow border border-gray-400 relative cursor-pointer"
            @mouseover="showDetail(true)" @mouseleave="showDetail(false)" @click="sendPet()">
            <div class="absolute top-0 left-0 w-full h-full">
                <img :src="pet.image_url" alt="pet image" class="object-cover w-full h-full">
            </div>
            <div class="absolute bottom-0 w-full bg-black opacity-50"
                :class="[isVisible ? 'h-48 sm:h-72 xl:h-[385px]' : 'h-20 sm:h-28 xl:h-[154px]', 'transition-all duration-200 ease-linear']" />
            <div class="absolute bottom-0 w-full px-2 py-4 text-white bg-transparent"
                :class="[isVisible ? 'h-48 sm:h-72 xl:h-[385px]' : 'h-20 sm:h-28 xl:h-[154px]', 'transition-all duration-300 ease-int-out']">
                <div :class="isVisible ? 'flex-col sm:flex-row' : 'sm:flex'"
                    class="gap-2 flex items-center sm:max-h-8 mb-1.5">
                    <Tag class="!bg-orange-600 w-fit max-w-34 !text-white !line-clamp-1 px-1"
                        :value="pet.breed" rounded>
                        <v-icon v-if="isMobile()" :name="setIconBreed(pet.breed!)"></v-icon>
                    </Tag>
                    <Tag class=" !bg-orange-600 w-fit !text-white !truncate px-1" :value="pet.gender" rounded>
                        <v-icon v-if="isMobile()" :name="setIconGender(pet.gender!)"></v-icon>
                    </Tag>
                    <Tag class="!bg-orange-600 w-fit !text-white !truncate px-1" :value="pet.age" rounded>
                        <v-icon v-if="isMobile()" :name="setIconAge(pet.age!)" ></v-icon>
                    </Tag>
                </div>
                <div class="w-full">
                    <h2 class="w-full text-lg font-bold text-start"
                        :class="[isVisible ? 'line-clamp-2' : 'line-clamp-1']">{{ pet.name }}</h2>
                    <p class="text-justify h-auto my-1.5 hidden xl:flex"
                        :class="[isVisible ? 'text-ellipsis sm:flex' : 'truncate', 'transition-all duration-200 ease-linear ']">
                        {{ pet.description }}</p>
                </div>
            </div>
        </section>
    </main>
</template>

<script lang="ts">
import Pet, { Breed, GenderPet, AgeRange } from '@/models/pet.model';
import type { PropType } from 'vue';

export default {
    name: 'PetCard',
    props: {
        pet: {
            type: {} as PropType<Pet>,
            required: true
        },
        pageType: {
            type: String as PropType<string>,
            required: true
        }
    },
    data() {
        return {
            isVisible: false
        }
    },
    methods: {
        sendPet(): void {
            this.$emit("response", this.pet);
        },
        showDetail(state: boolean) {
            this.isVisible = state;
        },
        isMobile(): boolean {
            const width = window.innerWidth;
            return width < 640 ?  true : false;
        },
        setIconAge(age: AgeRange): string {
            switch (age) {
                case 'Idoso': {
                    return 'md-elderly';
                }
                case 'Adulto': {
                    return 'md-man';
                }
                default: {
                    return 'fa-baby';
                }
            }
        },
        setIconGender(gender: GenderPet): string {
            switch (gender) {
                case GenderPet.Male: {
                    return 'gi-male';
                }
                default: {
                    return 'gi-female';
                }
            }
        },
        setIconBreed(breed: Breed): string {
            switch (breed) {
                case Breed.Arachnids: {
                    return 'fa-spider';
                }
                case Breed.Birds: {
                    return 'fa-crow';
                }
                case Breed.Cats: {
                    return 'fa-cat';
                }
                case Breed.Dogs: {
                    return 'co-dog';
                }
                case Breed.Fish: {
                    return 'fa-fish';
                }
                case Breed.Frogs: {
                    return 'fa-frog';
                }
                case Breed.Insects: {
                    return 'fa-bug';
                }
                case Breed.Lizards: {
                    return 'gi-gecko';
                }
                case Breed.Rodents: {
                    return 'md-pestcontrolrodent';
                }
                case Breed.Turtles: {
                    return 'gi-turtle-shell';
                }
                default: {
                    return 'co-animal';
                }
            }
        }
    },
}
</script>
