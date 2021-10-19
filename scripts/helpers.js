const GAUGE_MAX = 329

function setGaugePercent($node, percent) {
  const $gaugeCircle = $node.querySelector('.gauge__cirlce-arc')
  const $gaugePercent = $node.querySelector('.gauge__percent')
  
  const value = GAUGE_MAX * (percent / 100) 

  $gaugeCircle.setAttribute('stroke-dasharray', `${value} ${GAUGE_MAX}`)
  $gaugePercent.innerText = percent
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
  if (todoList.length > 4){
      todo.innerHTML = todo.classList.add('scrolling');
  }
}

const removeScrolled = () => {
  if (todoList.length <= 5 && todo.classList.contains('scrolling')){
      todo.innerHTML = todo.classList.remove('scrolling');
  }
}

const changeTask = index => {
  todoList[index].checked = !todoList[index].checked;
  localStorage.setItem('todo', JSON.stringify(todoList));
  refreshData();
  if (state.counter === 100){
      localStorage.removeItem('todo');
      state.counter = 0;
      saveState(state);
      document.location.assign('lastPage.html')
  }
}

const deleteTask = index => {
  todoList.splice(index, 1);
  removeScrolled();
  localStorage.setItem('todo', JSON.stringify(todoList));
  refreshData();
}


const refreshData = () => {
  state.counter = Math.round((todoList.filter(x => x.checked === true).length / todoList.length)*100);
  saveState(state);
  setGaugePercent($gauge, state.counter);
  displayTasks();

}