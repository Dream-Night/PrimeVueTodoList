<template>
    <form @submit="onEditForm(props.task.id)">
        <h1>Task: {{ task.title }}</h1>
        <FloatLabel variant="on">
            <TextInput id="TitleEditor" type="text" v-model="editedTitle" />
            <label for="TitleEditor">{{ task.title }}</label>
        </FloatLabel>
        <h3>Status: {{ task.status.display }}</h3>
        <Select v-model="editedStatus" :options="statusSelection" optionLabel="display" placeholder="Change Status" />
        <br>
        <br>
        <p>Submit Day
            <FloatLabel variant="on">
                <DatePicker inputId="DayEdit" v-model="editedDay" showIcon iconDisplay="input" />
                <label for="DayEdit">{{ task.formattedDeadline }}</label>
            </FloatLabel>
        </p>
        <p>Submit Time</p>
        <FloatLabel variant="on">
            <DatePicker inputId="TimeEdit" v-model="editedTime" showIcon iconDisplay="input" timeOnly/>
            <label for="TimeEdit">{{ task.formattedDeadlineTime }}</label>
        </FloatLabel>
        <p v-if="task.details">Detail: {{ task.details }}</p>
        <p v-else>Create New detail</p>
        <FloatLabel variant="on">
            <Textarea id="EditDetail" v-model="editedDetail" outResize rows="3" cols="30" />
            <label for="EditDetail">New Detail</label>
        </FloatLabel>
        <p v-if="task.priority !== 'DAILY'">Colender: {{ task.priority.value }}</p>
        <Select v-model="editedPriority" :options="prioritySelection" optionLabel="value" placeholder="Which Colendor?" />
        <p v-if="task.cost !== 'ONE_H'">"{{ task.cost.value }}" to complete this task</p>
        <Select v-model="editedCost" :options="costSelection" optionLabel="value" placeholder="How long takes?" />
        <Button type="submit" size="large" icon="pi pi-check-circle" iconPos="right" severity="info" label="Edit Task" />
        <br>
        <br>
        <p>Remove This Task ?
            <Button icon="pi pi-trash" severity="danger" @click="TaskRemover(slotProps.data.id)" /> 
        </p>
    </form>
</template>

<script setup>
import { ref, watch } from 'vue';
import { updateTask, removeTask } from '../Util/FuncPort.js';
import { priority, priorityApp } from '../const/priority.js';
import { cost, costApp } from '../const/cost.js';
import { status, statusApp } from '../const/status.js';

import TextInput from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import DatePicker from 'primevue/datepicker';
import Textarea from 'primevue/textarea';
import Select from 'primevue/select';
import Button from 'primevue/button';

// const tasks = ref([]);
// const task = ref({});
const editedTask = ref("");
const prioritySelection = ref([]);
const costSelection = ref([]);
const statusSelection = ref([]);

const editedTitle = ref(''); //maybe it shouled be empty inside the ref() and move the props to onEditForm
const editedDay = ref('');
const editedTime = ref('');
const editedDetail = ref('');
const editedPriority = ref('');
const editedCost = ref('');
const editedStatus = ref('');

const props = defineProps({
    task: Object,
});

const emit = defineEmits(['update-items']);

prioritySelection.value = priorityApp.map(item => priority[item.value]);
costSelection.value = costApp.map(item => cost[item.value]);
statusSelection.value = statusApp.map(item => status[item.value]);

watch(() => props.task, (newTask) => {
  if (newTask) {
    editedTask.value = newTask.title;  // task.titleをeditedTaskにセット
  }
});

const itemUpdater = () => {
    emit('update-items');
}

const onEditForm = (id) => {
    const editedTask = {
        title: editedTitle.value || props.task.title,
        status: editedStatus.value || props.task.status,
        deadline: editedDay.value || props.task.deadline,
        deadlineTime: editedTime.value || props.task.deadlineTime,
        details: editedDetail.value || props.task.details,
        priority: editedPriority.value || props.task.priority,
        cost: editedCost.value || props.task.cost,
    };

    updateTask( id, editedTask );

    itemUpdater();
};

const TaskRemover = (id) => {
    removeTask( id, props.task );
}


/* onMounted(async () => {
    tasks.value = await getTask();
    console.log(tasks.value);

    task.value = tasks.value.find(item => item.id === taskId);

}) */
</script>