const addTask = document.querySelector('input'), 
    addButton = document.querySelector('.add-task-button'),
    todo = document.querySelector('.task-list'),
    taskToday = document.querySelector('.days-to-go'),
    $gauge = document.querySelector('.gauge');

const state = getStoredStateOrDefault({ 
        counter: 0
      })

let todoList = [];

if(localStorage.getItem('todo')){
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayTasks();
}

document.addEventListener('DOMContentLoaded', function () {
    setGaugePercent($gauge, state.counter)
})

addTask.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        createTask();
    }
  });

addButton.addEventListener('click', function(){
    createTask();
  });

function displayTasks(){
    let displayTask = '';
    for(const [index, task] of todoList.entries()){
        displayTask += `<div class="task">
        <div class="checker-text">
        <input  type="checkbox" class="task-checker" id='item_${index}' ${task.checked ? "checked": ""}>
        <label for='item_${index}'><svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.91006 7.49585L1.7071 5.29291C1.31658 4.90239 0.683416 4.90239 0.292893 5.29291C-0.0976309 5.68343 -0.0976309 6.3166 0.292893 6.70712L3.29288 9.70709C3.7168 10.131 4.4159 10.0892 4.7863 9.61781L11.7863 1.61786C12.1275 1.18359 12.0521 0.554936 11.6178 0.213723C11.1835 -0.127489 10.5549 -0.0520504 10.2136 0.38222L3.91006 7.49585Z" fill="#A5A5A5"/>
        </svg> 
        </label>
        <div class="task-text  ${task.checked ? 'checked-text' : ''}">${task.todo}</div>
        </div>
        <button class="task-deleter"><svg class='deleter-svg' id='item_${index}' width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.41401 6L11.707 1.707C12.098 1.316 12.098 0.684 11.707 0.293C11.316 -0.0979999 10.684 -0.0979999 10.293 0.293L6.00001 4.586L1.70701 0.293C1.31601 -0.0979999 0.684006 -0.0979999 0.293006 0.293C-0.0979941 0.684 -0.0979941 1.316 0.293006 1.707L4.58601 6L0.293006 10.293C-0.0979941 10.684 -0.0979941 11.316 0.293006 11.707C0.488006 11.902 0.744006 12 1.00001 12C1.25601 12 1.51201 11.902 1.70701 11.707L6.00001 7.414L10.293 11.707C10.488 11.902 10.744 12 11 12C11.256 12 11.512 11.902 11.707 11.707C12.098 11.316 12.098 10.684 11.707 10.293L7.41401 6Z" fill="#252526"/>
          </svg></button>
      </div>`;
      todo.innerHTML = displayTask;
    }
    taskToday.innerHTML = `${todoList.length}  days to go`;
}


//onclick='deleteTask(${index})'
todo.addEventListener('click', function(event){
    if (event.target.classList[0] === "task-checker"){
        changeTask(parseInt(event.target.id.split('_')[1]))
    }
    if (event.target.classList[0] === "deleter-svg"){
        deleteTask(parseInt(event.target.id.split('_')[1]))
    }
})
