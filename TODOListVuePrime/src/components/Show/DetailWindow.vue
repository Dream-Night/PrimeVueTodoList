<template>
    <header>
        <h4>Confirm The Detail</h4>
        <h1>{{ props.Task.title }}</h1>
    </header>
    <main>
        <h2 v-if="Task.details">Detail: 
            {{ props.Task.details }}
        </h2>
        <h2 v-else>No Detail (click the right button to create)
            <Button icon="pi pi-file-edit" severity="help" @click="moveToEdit()" />
        </h2>
        <p>-----------------</p>
        <p>Name: {{ Task.name.value }}</p>
        <p>Status: {{ Task.status.display }}</p>
        <p v-if="Task.deadline">Deadline Day: {{ Task.formattedDeadline }}</p>
        <p v-if="Task.deadlineTime">Deadline Time: {{ Task.formattedDeadlineTime }}</p>
        <p>{{ Task.priority.value }} Colender</p>
        <p>It takes {{ Task.cost.value }} to finish</p>
        <p>-----------------</p>
    </main>
    <footer>
        <p v-if="Task.details">Edit Detail 
            <Button icon="pi pi-file-edit" severity="help" @click="moveToEdit()" />
        </p>
        <p v-else>Edit Mode
            <Button icon="pi pi-file-edit" severity="help" @click="moveToEdit()" />
        </p>
    </footer>
</template>

<script setup>
// import { status } from '../const/status.js';
// import { priority } from '../const/priority.js';
// import { cost } from '../const/cost.js';

import Button from 'primevue/button';
// import EditWindow from './EditWindow.vue';

// import { ref } from 'vue';

// const editVisible = ref(false);
// const taskId = ref();

// const taskholder = ref();

const props = defineProps({
    Task: Object,
});

const emit = defineEmits(['move-toEdit']);

const moveToEdit = () => {
    const taskData = props.Task;
    emit('move-toEdit', taskData);
}

/*  const editSetup = () => {
    taskId.value = props.task;
    editVisible.value = true;
} */
</script>