import axios from "axios";

/*  const newTitle = '';
const newStatus = 'NOT_STARTED';
const newDeadline = '';
const newDeadlineTime = '';
const newDetails = '';
const newPriority = '';
const newCost = '';
let tasks = [];  */

export const getTask = () => {
    return axios.get('http://localhost:3000/tasks')
      .then(response => {
        const tasks = response.data;

        return tasks.map(task => {
            return {
                ...task,
                formattedDeadline: dateFormatter(task.deadline),
                formattedDeadlineTime: timeFormatter(task.deadlineTime),
                dateCheck: dayChecker(task.deadline),
                costDays: costDayPicker(task.deadline, task.cost),
            }
        });
      })
      .catch(error => {
        console.error("Error in getTask method", error);
      });
};

// check the "date" is today or not
export const dayChecker = (date) => {
    const today = new Date();
    const toDay = today.toLocaleDateString();
    const daTe = new Date(date);
    const day = daTe.toLocaleDateString();
    if (toDay == day) {
        return 1;
    }
}

export const dateFormatChecker = (date) => {
    const d = new Date(date);
    return !isNaN(d.getTime());
};

export const dateFormatter = (date) => {
    if (dateFormatChecker(date)) {
        const rowDate = new Date(date);
        return rowDate.toLocaleDateString();
    }
};

export const timeFormatter = (time) => {
    if (dateFormatChecker(time)) {
        const rowTime = new Date(time);
        return rowTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
    }
};

export const dateForOutput = (date) => {
    return date ? date : null;
}

export const timeForOutput = (time) => {
    return time ? time : null;
}

/*  const addTask = ( newTask ) => {
    /* const newTask = {
      title: newTitle,
      status: newStatus,
      deadline: newDeadline || '',
      deadlineTime: newDeadlineTime || '',
      details: newDetails || '',
      priority: newPriority || 'DAILY',
      cost: newCost || 'ONE_H'
    };
    
  
    console.log("add task:", newTask);
    axios.post('http://localhost:3000/tasks', newTask)
      .then(response => {
        tasks.value.push(response.data);
  
        getTask();
    
        /*  newTitle.value = '';
        newStatus.value = 'NOT_STARTED';
        newDeadline.value = '';
        newDeadlineTime.value = '';
        newDetails.value = '',
        newPriority.value = '',
        newCost.value = '';  
      })
      .catch(error => {
        console.error("Error in add task method", error);
      });
  };

*/
  
export const removeTask = (id, tasks) => {
    axios.delete(`http://localhost:3000/tasks/${id}`)
      .then(() => {
        axios.get('http://localhost:3000/tasks')
            tasks.value = tasks.value.filter(task => task.id !== id);
        })
      .catch(error => {
        console.error("there is ann error in task removing method", error);
      });
};

export const updateTask = (id, task) => {
    axios.put(`http://localhost:3000/tasks/${id}`, task)
        .then(() => {
            axios.get('http://localhost:3000/tasks')
                /* .then(response => {
                    const tasks = response.data;
                    const taskIndex = tasks.findIndex(item => item.id === id);
                    const editTask = {
                        id: id,
                        title: task.title,
                        status: task.status,
                        deadline: task.deadline,
                        deadlineTime: task.deadlineTime,
                        details: task.details,
                        priority: task.priority,
                        cost: task.cost,
                        formattedDeadline: dateFormatter(task.deadline),
                        formattedDeadlineTime: timeFormatter(task.deadlineTime)
                    };
                    tasks[taskIndex] = editTask;
                })
                .catch(error => {
                    console.log("Error in task Edit reload method", error);
                }) */
        })
        .catch(error => {
            console.log("Error in update method", error);
        })
};


// Put in list all of number of cost days before deadline  
export const costDayPicker = (date, cost) => {
    const costDays = [];
    const lapsDay = new Date(date);
    const days = cost.day;

    for ( let i = 0; i < days; i++) {
        const dayBefore = new Date(lapsDay);
        dayBefore.setDate(lapsDay.getDate() - i);
        const formattedDayBefore = dateFormatter(dayBefore);
        costDays.push(formattedDayBefore);
    }

    return costDays;
};

// Check "the day (today + dayNum)" contained in "cost day (deadline - costDays)"
// [dayNum = the number of day from today  ?example => tomorrow is "1", today is "0"] [constDays = [] of applyable days]
// true means the day included in applyDay 
export const dayContainChecker = (dayNum, costDays) => {
    const today = new Date();
    const applyDay = new Date(today);
    applyDay.setDate(today.getDate() + dayNum);
    const formattedApplyDay = dateFormatter(applyDay);

    for (let i = 0; i < costDays.length; i++) {
        if (costDays[i] == formattedApplyDay) {
            return true;
        }
    }

    return false;
};

// check today is deadline or not (maybe same func with "daychecker")
export const deadlineChecker = (deadline) => {
    const today = new Date();
    const formattedToday = dateFormatter(today);

    if (formattedToday == deadline) {
        return true;
    }
    else {
        return false;
    }
};

// show how many days remaine until deadline (in 1 month)
export const howFarFromDeadlineChecker = (deadline) => {
    const today = new Date();
    let farDay = 0;
    const deadlineDay = new Date(deadline)

    for (let i = 0; i < 31; i++) {
        const tempDay = new Date(today);
        tempDay.setDate(deadlineDay.getDate() - i);
        if (tempDay.getDate() == today.getDate()) {
            farDay = i;
            break;
        }
    }

    return farDay;
};

// show how many days was past from deadline (in 1 month)
export const howPastFromDeadlineChecker = (deadline) => {
    const today = new Date();
    let farDay = 0;
    const deadlineDay = new Date(deadline)

    for (let i = 0; i < 31; i++) {
        const tempDay = new Date(today);
        tempDay.setDate(deadlineDay.getDate() + i);
        if (tempDay.getDate() == today.getDate()) {
            farDay = i;
            break;
        }
    }

    return farDay;
};

export const overdueChecker = (deadline) => {
    const today = new Date();
    const deadlineDay = new Date(deadline);
    today.setHours(0, 0, 0, 0);
    deadlineDay.setHours(0, 0, 0, 0);

    if (deadlineDay.getTime() < today.getTime()) {
        return true;
    } else {
        return false;
    }
};

// show the day "num" times after today
export const dayDateGetter = (num) => {
    const today = new Date();
    const tempDay = new Date(today);
    tempDay.setDate(today.getDate() + num);

    return dateFormatter(tempDay);
};