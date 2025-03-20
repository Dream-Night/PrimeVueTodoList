<template>
    <div class="todo-weekly-list-container">
        <TodoWeeklyView :dayProp="0" :todayOfWeek="todayOfWeek" ></TodoWeeklyView>
        <TodoWeeklyView :dayProp="1" :todayOfWeek="dayOfWeek(1)"></TodoWeeklyView>
        <TodoWeeklyView :dayProp="2" :todayOfWeek="dayOfWeek(2)"></TodoWeeklyView>
        <TodoWeeklyView :dayProp="3" :todayOfWeek="dayOfWeek(3)"></TodoWeeklyView>
        <TodoWeeklyView :dayProp="4" :todayOfWeek="dayOfWeek(4)"></TodoWeeklyView>
        <TodoWeeklyView :dayProp="5" :todayOfWeek="dayOfWeek(5)"></TodoWeeklyView>
        <TodoWeeklyView :dayProp="6" :todayOfWeek="dayOfWeek(6)"></TodoWeeklyView>
    </div>
</template>

<script setup>
import TodoWeeklyView from "./TodoWeeklyView.vue";
import { ref, onMounted } from 'vue';

const todayOfWeek = ref();

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// return the day of the week after "num" days
const dayOfWeek = (num) => {
    const today = new Date();
    let date = today.getDay() + num;
    if (date > 6) {
        date -= 7;
    }
    return daysOfWeek[date];
}

onMounted(async () => {
    const today = new Date();
    todayOfWeek.value = daysOfWeek[today.getDay()];
});
</script>

<style scoped>
.todo-weekly-list-container {
    display: flex;
    width: 100%;
}

.todo-weekly-list-container TodoWeeklyView {
    flex: 0 1 clac(100% / 7 - 10px);
    box-sizing: border-box;
}
</style>