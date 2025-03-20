<template>
    <div class="todo-weekly-list-container">
        <TodoMonthlyView :dayProp="dayProper(0)" :todayOfWeek="dayOfWeek(0)" :showChecker="dayOfWeek(0)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(1)" :todayOfWeek="dayOfWeek(1)" :showChecker="dayOfWeek(1)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(2)" :todayOfWeek="dayOfWeek(2)" :showChecker="dayOfWeek(2)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(3)" :todayOfWeek="dayOfWeek(3)" :showChecker="dayOfWeek(3)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(4)" :todayOfWeek="dayOfWeek(4)" :showChecker="dayOfWeek(4)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(5)" :todayOfWeek="dayOfWeek(5)" :showChecker="dayOfWeek(5)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(6)" :todayOfWeek="dayOfWeek(6)" :showChecker="dayOfWeek(6)"></TodoMonthlyView>
    </div>
    <div class="todo-weekly-list-container">
        <TodoMonthlyView :dayProp="dayProper(7)" :todayOfWeek="dayOfWeek(0)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(8)" :todayOfWeek="dayOfWeek(1)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(9)" :todayOfWeek="dayOfWeek(2)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(10)" :todayOfWeek="dayOfWeek(3)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(11)" :todayOfWeek="dayOfWeek(4)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(12)" :todayOfWeek="dayOfWeek(5)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(13)" :todayOfWeek="dayOfWeek(6)"></TodoMonthlyView>
    </div>
    <div class="todo-weekly-list-container">
        <TodoMonthlyView :dayProp="dayProper(14)" :todayOfWeek="dayOfWeek(0)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(15)" :todayOfWeek="dayOfWeek(1)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(16)" :todayOfWeek="dayOfWeek(2)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(17)" :todayOfWeek="dayOfWeek(3)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(18)" :todayOfWeek="dayOfWeek(4)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(19)" :todayOfWeek="dayOfWeek(5)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(20)" :todayOfWeek="dayOfWeek(6)"></TodoMonthlyView>
    </div>
    <div class="todo-weekly-list-container">
        <TodoMonthlyView :dayProp="dayProper(21)" :todayOfWeek="dayOfWeek(0)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(22)" :todayOfWeek="dayOfWeek(1)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(23)" :todayOfWeek="dayOfWeek(2)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(24)" :todayOfWeek="dayOfWeek(3)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(25)" :todayOfWeek="dayOfWeek(4)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(26)" :todayOfWeek="dayOfWeek(5)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(27)" :todayOfWeek="dayOfWeek(6)"></TodoMonthlyView>
    </div>
    <div class="todo-weekly-list-container">
        <TodoMonthlyView :dayProp="dayProper(28)" :todayOfWeek="dayOfWeek(0)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(29)" :todayOfWeek="dayOfWeek(1)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(30)" :todayOfWeek="dayOfWeek(2)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(31)" :todayOfWeek="dayOfWeek(3)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(32)" :todayOfWeek="dayOfWeek(4)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(33)" :todayOfWeek="dayOfWeek(5)"></TodoMonthlyView>
        <TodoMonthlyView :dayProp="dayProper(34)" :todayOfWeek="dayOfWeek(6)"></TodoMonthlyView>
    </div >
</template>

<script setup>
import TodoMonthlyView from './TodoMonthlyView.vue';
import { ref, onMounted } from 'vue';

const todayOfWeek = ref();

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const dayOfWeek = (num) => {
    if (num > 6) {
        num -= 7;
    }
    return daysOfWeek[num];
};

const dayProper = (num) => {
    const today = new Date();
    let propNum = num - today.getDay();
    
    return propNum;
};

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

.todo-weekly-list-container TodoMonthlyView {
    flex: 1 0 calc(100% / 7 - 10px);
    box-sizing: border-box;
}
</style>