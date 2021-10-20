const GAUGE_MAX = 329

function setGaugePercent($node, percent) {
  const $gaugeCircle = $node.querySelector('.gauge__cirlce-arc')
  const $gaugePercent = $node.querySelector('.gauge__percent')
  
  const value = GAUGE_MAX * (percent / 100) 

  $gaugeCircle.setAttribute('stroke-dasharray', `${value} ${GAUGE_MAX}`)
  $gaugePercent.innerText = percent + '%'
}

function saveState(state) {
  localStorage.setItem('todayAppState', JSON.stringify(state))
}

function getStoredStateOrDefault(defaultState) {
  const stateAsStr = localStorage.getItem('todayAppState')
  if (stateAsStr) {
    return JSON.parse(stateAsStr)
  } else {
    return defaultState
  }
}


const createTask = () => {
  let newTodo = {
      todo: addTask.value,
      checked: false,
  };
  todoList.push(newTodo);
  addScrolled();

  refreshData();
  localStorage.setItem('todo', JSON.stringify(todoList));
  addTask.value = null;
}

const addScrolled = () => {
  console.log(todo.classList)
  if (todoList.length > 4){
      document.innerHTML = todo.classList.add('scrolling');
  }
}

const removeScrolled = () => {
  if (todoList.length <= 5 && todo.classList.contains('scrolling')){
      document.innerHTML = todo.classList.remove('scrolling');
  }
}

const changeTask = index => {
  todoList[index].checked = !todoList[index].checked;
  localStorage.setItem('todo', JSON.stringify(todoList));
  refreshData();
  if (state.counter === 100){/*
      localStorage.removeItem('todo');
      state.counter = 0;
      saveState(state);*/
      localStorage.clear();
      todoList = [];
      document.querySelectorAll("[id=first_page]").forEach(el => el.style.display = "none");
      document.querySelectorAll("[id=third_page]").forEach(el => el.style.display = "inline");
      document.querySelectorAll("[id=second_page]").forEach(el => el.style.display = "none");
  
  }
}

const deleteTask = index => {
  todoList.splice(index, 1);
  removeScrolled();
  localStorage.setItem('todo', JSON.stringify(todoList));
  refreshData();
  if (todoList.length === 0){
    localStorage.clear();
    todoList = [];
    document.querySelectorAll("[id=first_page]").forEach(el => el.style.display = "inline");
    document.querySelectorAll("[id=third_page]").forEach(el => el.style.display = "none");
    document.querySelectorAll("[id=second_page]").forEach(el => el.style.display = "none");
  }
}


const refreshData = () => {
  //displayPage();
  state.counter = Math.round((todoList.filter(x => x.checked === true).length / todoList.length)*100);
  saveState(state);
  setGaugePercent($gauge, state.counter);
  displayTasks();

}