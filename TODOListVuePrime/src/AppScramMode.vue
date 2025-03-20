<template>
    <h1>ToDo Scram</h1>
    <form @submit.prevent="consoleShow">
        <Select v-model="selectedName" :options="nameSelection" optionLabel="value" placeholder="Whose Task?" />
        <Button size="large" type="submit" severity="info" label="Show" />
    </form>
    <div>
        <TSListView :selectedName="selectedName"></TSListView>
    </div>
</template>

<script setup>
import TSListView from './components/TSListView.vue';
import { name, nameApp } from './components/const/name.js';
import { ref, onMounted } from 'vue';
import { getTask } from './components/Util/FuncPort.js';

import Select from 'primevue/select';
import Button from 'primevue/button';

const tasks = ref([]);
const selectedName = ref('');
const nameSelection = ref([]);
const consoleVisible = ref(false);
// const selectedNameList = ref([]);

nameSelection.value = nameApp.map(item => name[item.value]);

const consoleShow = () => {
    consoleVisible.value = true;
}

onMounted(async () => {
    tasks.value = await getTask();
    console.log(tasks.value); 
});

</script>