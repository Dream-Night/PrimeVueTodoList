<template>
    <DataTable :value="OverdueFilterdTasks" showGridlines stripedRows>
        <Column field="status" header="Status">
            <template #body="slotProps">
                <div>
                    <Button severity="danger" v-if="slotProps.data.status.id == 0" icon="pi pi-expand" @click="updateStatus(slotProps.data.id, slotProps.data, slotProps.data.status)" />
                    <Button severity="danger" v-if="slotProps.data.status.id == 2" icon="pi pi-play" @click="updateStatus(slotProps.data.id, slotProps.data, slotProps.data.status)" />
                    <Button severity="info" v-if="slotProps.data.status.id == 3" icon="pi pi-check-circle" @click="updateStatus(slotProps.data.id, slotProps.data, slotProps.data.status)" />
                    <Button severity="danger" v-if="slotProps.data.status.id == 1" icon="pi pi-replay" @click="updateStatus(slotProps.data.id, slotProps.data, slotProps.data.status)" />
                </div>
            </template>
        </Column>
        <Column field="title" header="Task"></Column>
        <Column field="formattedDeadline" header="Deadline(Past Days)">
            <template #body="slotProps">
                <div>{{ slotProps.data.formattedDeadline }} ( {{ howPastFromDeadlineChecker(slotProps.data.deadline) }} day past)</div>
            </template>
        </Column>
        <Column header="Action">
            <template v-slot:body="slotProps">
            <Button icon="pi pi-file-edit" severity="help" @click="editSetup(slotProps.data)" />
                <Dialog v-model:visible="editVisible" modal>
                    <EditWindow :task="taskId" @update-items="updateItems"></EditWindow>
                </Dialog>
            <Button icon="pi pi-trash" severity="danger" @click="TaskRemover(slotProps.data.id)" /> 
            <Button icon="pi pi-list" severity="info" @click="detailSetup(slotProps.data)" />
                <Dialog v-model:visible="detailVisible" modal>
                    <DetailWindow :Task="taskId" @move-toEdit="moveToEdit">
                    </DetailWindow>
                </Dialog>  
            </template>
        </Column>
    </DataTable>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { status, statusApp } from './const/status.js'
import { getTask, updateTask, overdueChecker, howPastFromDeadlineChecker, removeTask } from './Util/FuncPort.js';
import EditWindow from './Show/EditWindow.vue';
import DetailWindow from './Show/DetailWindow.vue';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import 'primeicons/primeicons.css';


// constant
const tasks = ref([]);
const editVisible = ref(false);
const detailVisible = ref(false);
const taskId = ref();

const TaskRemover = (id) => {
    removeTask( id, tasks );
}

const editSetup = (task) => {
    taskId.value = task;
    editVisible.value = true;
}

const detailSetup = (task) => {
    taskId.value = task;
    detailVisible.value = true;
}

const updateStatus = (id, task, status) => {
    const updStatus = nextStatus(status);
    task.status = updStatus;

    updateTask(id, task);
}

const nextStatus = (curStatus) => {
    const curStIndex = statusApp.findIndex(item => item.id == curStatus.id);
    
    if (curStIndex === -1 || curStIndex === statusApp.length -1) {
        return status[statusApp[0].value];
    }

    return status[statusApp[curStIndex + 1].value];
}

const moveToEdit = (task) => {
    detailVisible.value = false;
    editSetup(task);
};

const updateItems = (async () => {
    tasks.value = await getTask();
});

//

const OverdueFilterdTasks = computed(() => {
    return (tasks.value.filter(task => overdueChecker(task.deadline) == true && !(task.status.id == 3)));
})

onMounted(async () => {
    tasks.value = await getTask();
    console.log(tasks.value);
})
</script>