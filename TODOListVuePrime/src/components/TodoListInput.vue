<template>
    <div>
        <form @submit="onSubmitForm">
            <p>Create Task</p>
            <FloatLabel variant="in">
                <InputText id="TaskInput" type="text" v-model="inputTitle" />
                <label for="TaskInput">New Task</label>
            </FloatLabel>
            <p>If Collabolate with someone</p>
            <Select v-model="inputName" :options="nameSelection" optionLabel="value" placeholder="Who's Task" />
            <p>Options</p>
            <FloatLabel variant="on">
                <DatePicker id="DayInput" v-model="inputDeadline" showIcon iconDisplay="input" />
                <label for="DayInput">Deadline Day</label>
            </FloatLabel>
            <FloatLabel variant="on">
                <DatePicker id="TimeInput" v-model="inputDeadlineTime" showIcon iconDisplay="input" timeOnly />
                <label for="TimeInput">Deadline Time</label>
            </FloatLabel>
            <FloatLabel variant="on">
                <Textarea id="DetailInput" v-model="inputDetail" outResize row="3" cols="35" />
                <label for="DetailInput">Details</label>
            </FloatLabel>
            <Select v-model="inputPriority" :options="prioritySelection" optionLabel="value" placeholder="Which Calender?" />
            <Select v-model="inputCost" :options="costSelection" optionLabel="value" placeholder="How long takes?" />
            <Button size="large" type="submit" icon="pi pi-check-circle" iconPos="right" severity="info" label="Add Task" />
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { priority } from './const/priority.js';
import { cost } from './const/cost.js';
import { priorityApp } from './const/priority.js';
import { costApp } from './const/cost.js';
// import { addTask } from './Util/FuncPort.js';
import axios from 'axios';
import { getTask } from './Util/FuncPort.js';
import { status } from './const/status.js';
import { name, nameApp } from './const/name.js';

import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import DatePicker from 'primevue/datepicker';
import Button from 'primevue/button';
import Select from 'primevue/select';
import Textarea from 'primevue/textarea';
import 'primeicons/primeicons.css';

const inputTitle = ref('');
const inputStatus = ref(status['NOT_STARTED']);
const inputName = ref('');
const inputDeadline = ref('');
const inputDeadlineTime = ref('');
const inputDetail = ref('');
const inputCost = ref('');
const inputPriority = ref('');
const inputTemp = ref('');

const prioritySelection = ref([]);
const costSelection = ref([]);
const nameSelection = ref([]);

const tasks = ref([]);

const emit = defineEmits(['back-to-list']);

prioritySelection.value = priorityApp.map(item => priority[item.value]);
costSelection.value = costApp.map(item => cost[item.value]);
nameSelection.value = nameApp.map(item => name[item.value]);


const onSubmitForm = () => {
    const newTask = {
        title: inputTitle.value,
        status: inputStatus.value,
        name: inputName.value,
        deadline: inputDeadline.value || '',
        deadlineTime: inputDeadlineTime.value || '',
        details: inputDetail.value || '',
        priority: inputPriority.value || priority['DAILY'],
        cost: inputCost.value || cost['ONE_D'],
        temp: inputTemp.value || '',
    };

    console.log("add task:", newTask);
    axios.post('http://localhost:3000/tasks', newTask)
      .then(response => {
        tasks.value.push(response.data);

        //  make a event to reload ViewList
    
        inputTitle.value = '';
        inputStatus.value = status['NOT_STARTED'];
        inputDeadline.value = '';
        inputDeadlineTime.value = '';
        inputDetail.value = '',
        inputPriority.value = '',
        inputCost.value = '';  

        emit('back-to-list');
      })
      .catch(error => {
        console.error("Error in add task method", error.response ? error.response.data : error.massage);
      });
};

onMounted(async () => {
    tasks.value = await getTask();
    console.log("Fetched tasks:", tasks.value);
})

</script>