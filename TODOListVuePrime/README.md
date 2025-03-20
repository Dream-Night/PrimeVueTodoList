# TODOListVuePrime

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Version

├── @eslint/js@9.21.0
├── @primeuix/themes@1.0.0
├── @primevue/themes@4.3.1
├── @vitejs/plugin-vue-jsx@4.1.1
├── @vitejs/plugin-vue@5.2.1
├── axios@1.7.9
├── eslint-plugin-vue@9.32.0
├── eslint@9.21.0
├── primeicons@7.0.0
├── primevue@4.3.1
├── vite-plugin-vue-devtools@7.7.2
├── vite@6.2.0
├── vue-router@4.5.0
└── vue@3.5.13


### What is the aim of this app


"Task Management Application Overview"

This application is designed to help users manage tasks efficiently by offering various features and views for tracking and organizing tasks. The main features include task input, detailed management options, and multiple task lists for viewing tasks in different contexts.


Key Features

1. Task Input and Details
When entering a task, the user can specify several important details:

Deadline: Set a due date for the task.
Description: Add extra details or notes about the task.
Calendar Display Options: Choose whether the task will appear on the weekly or monthly calendar.
Notification Period: Specify how many days in advance the task should be displayed or notified.


2. Task Lists (5 Different Views)
The application provides 5 different task lists for easy task management:

Weekly List: Displays tasks from both the weekly and monthly calendars for the upcoming week. Tasks can be clicked to view details and make edits.
Daily List: Shows tasks that are due today (with status buttons changing color and showing deadlines) and tasks that are in the notification period (showing how many days are left until the deadline).
Overdue List: Displays tasks that are overdue but have not been marked as "Completed".
Monthly List: Displays tasks added to the monthly calendar.
All Tasks List: Displays all tasks regardless of their status. Tasks can be sorted by due date or status.


3. Task Information
Tasks can be managed using the following features:

Status Button: Click the status button to cycle through the following statuses: Not Started → In Progress → Completed → Redo.
Edit Button: In Edit Mode, all task information can be updated. (Unchanged fields will remain as they were).
Trash Button: Delete a task.
List Button: View task details. You can transition to Edit Mode from this window.
Component Structure


<App.vue>
This is the main framework of the application. Major feature changes and new components should be added here.

<AppTodoMode.vue>
Defines the order of displaying the different task lists.

<TodoWeeklyFrame.vue>
Manages the layout for the weekly calendar. It passes the relevant day and date to child components.

<TodoWeeklyView.vue>
Manages the display of tasks for each day within the weekly calendar. It shows the tasks added to the weekly and monthly calendars.

<TodoListInput.vue>
This component is used for inputting new tasks. It provides default values for the task options such as Status, Priority, and Cost. The Add method is also managed within this component.

<TodoDailyViewV2.vue>
An improved version of <TodoListDailyView>. It displays tasks with today’s deadline (the status button color changes and the deadline time is shown) and tasks within the notification period (showing the number of days left until the deadline).

<TodoListLapsedView.vue>
Displays tasks that have passed their deadlines but have not been marked as "Completed". Once the status button is clicked and the task is marked as "Completed", it is automatically removed from this list.

<TodoMonthlyFrame.vue>
Displays today’s week plus the following month (totaling 5 weeks) in a monthly calendar. Each day's tasks are managed and displayed by <TodoMonthlyView>. Each <TodoMonthlyView> component receives the corresponding date and weekday as props.

<TodoListMonthlyView.vue>
Displays tasks added to the monthly calendar.

<Show/EditWindow.vue>
A dialog component accessed from other components to handle task edits and modifications.

<Show/DetailWindow.vue>
A dialog component accessed from other components to display task details. It also emits events to transition to the Edit Window.

<Util/FuncPort.js>
A utility file for managing commonly used functions that are shared across multiple components.

<const/xxx.js>
Manages constants for cost, mode, name, priority, and status.

<AppTodoScram>
This is being adjusted alongside <TodoListDailyView>.