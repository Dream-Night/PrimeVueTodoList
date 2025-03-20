<template >
    <DataTable  :value="filterdTask" showGridlines width=14%>
        <template #header v-if="props.showChecker">
            <div>
                <span>{{ props.showChecker }}</span>
            </div>
        </template>
        <Column :header="dayDateGetter(props.dayProp)" >
            <template #body="slotProps">
                <Dialog v-model:visible="editVisible" modal>
                    <EditWindow :task="taskId" @update-items="updateItems"></EditWindow>
                </Dialog>
                <Dialog v-model:visible="detailVisible" modal>
                    <DetailWindow :Task="taskId" @move-toEdit="moveToEdit" >
                    </DetailWindow>
                </Dialog>  
                <Button variant="text" @click="detailSetup(slotProps.data)" class="button-class">{{ slotProps.data.title }}</Button>
            </template>
        </Column>
    </DataTable>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getTask, dayContainChecker, dayDateGetter } from './Util/FuncPort.js';
import EditWindow from './Show/EditWindow.vue';
import DetailWindow from './Show/DetailWindow.vue';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import 'primeicons/primeicons.css';


// Constant
const tasks = ref([]);

const detailVisible = ref(false);
const editVisible = ref(false);
const taskId = ref();

const props = defineProps({
    dayProp: Number,
    todayOfWeek: String,
    showChecker: String,
});

const detailSetup = (task) => {
    taskId.value = task;
    detailVisible.value = true;
}

const moveToEdit = (task) => {
    detailVisible.value = false;
    editSetup(task);
};

const editSetup = (task) => {
    taskId.value = task;
    editVisible.value = true;
};

//

const filterdTask = computed(() => {
    return (tasks.value.filter(task => dayContainChecker(props.dayProp, task.costDays) == true && task.priority.id == 0));
})

// Constant

onMounted(async () => {
    tasks.value = await getTask();
    console.log(tasks.value); 
});

//

</script>

<style scoped>
.button-class {
    width: 100%;
}
</style>