<template>
    <div>
      <h2>Weekly Tasks</h2>
      <TodoWeekFrame></TodoWeekFrame>
      <h1>ToDo List</h1>
      <TodoListInput></TodoListInput>
      <h2>Today Task</h2>
      <TodoDailyViewV2></TodoDailyViewV2>
      <h2>Overdue Task</h2>
        <TodoListLapsedView></TodoListLapsedView>
        <h2>Calendor</h2>
        <TodoMonthlyFrame></TodoMonthlyFrame>
      <br>
      <br>
      <div>
        <h2>All Tasks</h2>
        <TodoListView></TodoListView>
      </div>
    </div>
  </template>
  
  <script setup>
  // import { ref } from 'vue';
  import TodoListInput from './components/TodoListInput.vue';
  import TodoListView from './components/TodoListView.vue';
  // import TodoWeeklyView from './components/TodoWeeklyView.vue';
  import TodoDailyViewV2 from './components/TodoDailyViewV2.vue';
  import TodoWeekFrame from './components/TodoWeekFrame.vue';
  import TodoListLapsedView from './components/TodoListLapsedView.vue';
  import TodoMonthlyFrame from './components/TodoMonthlyFrame.vue';
  </script>
  
  <style scoped>
  
  
  </style>