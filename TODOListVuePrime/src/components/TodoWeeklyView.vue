<template >
    <DataTable  :value="filterdTask" showGridlines width=14%>
        <Column :header="props.todayOfWeek" >
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
import { getTask, dayContainChecker } from './Util/FuncPort.js';
// import { statusApp } from './const/status.js';
// import { priority } from './const/priority.js';
import EditWindow from './Show/EditWindow.vue';
import DetailWindow from './Show/DetailWindow.vue';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
// import ColumnGroup from 'primevue/columngroup';   // optional
// import Row from 'primevue/row';                   // optional
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import 'primeicons/primeicons.css';
// import ListBox from 'primevue/listbox';
// import { FilterMatchMode } from '@primevue/core/api';

const tasks = ref([]);

const detailVisible = ref(false);
const editVisible = ref(false);
const taskId = ref();
// const selectedTask = ref();

const props = defineProps({
    dayProp: Number,
    todayOfWeek: String,
});

/* const filters = ref({
    'priority.id': { value: 1, matchMode: FilterMatchMode.EQUALS }
});

const updateStatus = (id, task, status) => {
    const updStatus = nextStatus(status);
    task.status = updStatus;

    updateTask(id, task);

    // const taskIndex = tasks.value.findIndex(item => item.id === id);
    // tasks.value[taskIndex].status = updStatus;
}

const nextStatus = (curStatus) => {
    const curStIndex = statusApp.findIndex(item => item.value === curStatus);

    if (curStIndex === -1 || curStIndex === statusApp.length -1) {
        return statusApp[0].value;
    }

    return statusApp[curStIndex + 1].value;
} */

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
}

const filterdTask = computed(() => {
    return (tasks.value.filter(task => dayContainChecker(props.dayProp, task.costDays) == true && (task.priority.id == 1 || task.priority.id == 0)));
})

onMounted(async () => {
    tasks.value = await getTask();
    console.log(tasks.value); 
});

//Week Methods
// const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

</script>

<style scoped>
.button-class {
    width: 100%;
}


</style>