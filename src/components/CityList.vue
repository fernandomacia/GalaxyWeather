<template>
    <div class="dropdown  w-100">
        <button class="btn btn-primary dropdown-toggle w-100" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            Cities Consulted
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li v-for="city in cities" :key="city" class="dropdown-item">
                <div class="d-flex justify-content-between align-items-center">
                    <span @click="selectCity(city)" class="city-name">{{ city }}</span>
                    <i @click.stop="removeCity(city)" class="trash"><font-awesome-icon :icon="['fas', 'trash-can']" /></i>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import { library } from '@fortawesome/fontawesome-svg-core';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

    library.add(faTrashCan);

    export default {
        components: {
            'font-awesome-icon': FontAwesomeIcon,
        },
        props: ['cities'],
        methods: {
            selectCity(city) { this.$emit('citySelected', city); },
            removeCity(city) { this.$emit('cityRemoved', city); },
        },
    };
</script>

<style scoped>
    .city-name {
        cursor: pointer;
        flex-grow: 1;
    }

    .dropdown-menu {
        width: 100%;
        overflow-y: auto;
    }
    .trash {
        color: #B71C1C;
        cursor: pointer;
    }
        .trash :hover {
        color: red;
    }
</style>


  
  