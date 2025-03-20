<template>
    <h1>ToDo List [{{ props.selectedName.value }}]</h1>
    <div>
        <Dialog v-model:visible="addVisible" modal>
            <TodoListInput @back-to-list="reloadList"></TodoListInput>
        </Dialog>
        <Button @click="addFuncSetup()" severity="info" icon="pi pi-plus" size="large" ></Button>
        <span> -- </span>
        <Button label="Show Scram Tasks" size="large"></Button>
        <TodoDailyView :selectedName="props.selectedName" :selectedNameList="props.selectedNameList"></TodoDailyView>
    </div>
</template>

<script setup>
import TodoListInput from './TodoListInput.vue';
import TodoDailyView from './TodoDailyView.vue';
import { getTask } from './Util/FuncPort.js';

import { ref, onMounted, computed } from 'vue';
import 'primeicons/primeicons.css';

import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

const addVisible = ref(false);
const tasks = ref([]);
const selectedNameList = ref([]);

const props = defineProps({
    selectedName: Object,
})

const addFuncSetup = () => {
    addVisible.value = true;
}

selectedNameList.value = computed(() => {
    return tasks.value.filter(item => item.name.id == props.selectedName.id);
});

const reloadList = () => {
    selectedNameList.value = tasks.value.filter(item => item.name.id == props.selectedName.id);
    addVisible.value = false;
}


// const nameFilterdTask = nameFilter(tasks);

/* const nameFilter = (Tasks) => {
    return (Tasks.value.filter(task => task == props.selectedName));
} */

onMounted(async () => {
    tasks.value = await getTask();
    selectedNameList.value = tasks.value;
    console.log(tasks.value); 
});


</script>