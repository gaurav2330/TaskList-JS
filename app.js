//declare ui varibles
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all events
loadEventListeners();

function loadEventListeners(){
    document.addEventListener('DOMContentLoaded',getTasks);
    form.addEventListener('submit',addTask);
    taskList.addEventListener('click',remove);
    clearBtn.addEventListener('click',clearTasks);
    filter.addEventListener('keyup',filterTasks);
}

// get tasks
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks=[];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement('li');
        // form class
        li.className = 'collection-item';
        // create text node and append to li
        li.appendChild(document.createTextNode(task));
        // create link element
        const link = document.createElement('a');
        // form class
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = '<i class="fa fa-remove"><i>';
        // append the link to li
        li.appendChild(link);
        // append li to the ul
        taskList.appendChild(li);   
    })
}

// add task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }

    // create li element
    const li = document.createElement('li');
    // form class
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create link element
    const link = document.createElement('a');
    // form class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"><i>';
    // append the link to li
    li.appendChild(link);
    // append li to the ul
    taskList.appendChild(li);

    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = '';

    e.preventDefault();
}


// store task in local storage
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks=[];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

// remove task from DOM
function remove(e){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks=[];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            const text = e.target.parentElement.parentElement.textContent;
            tasks.forEach(function(task,index){
                if(e.target.parentElement.parentElement.textContent === task){
                    tasks.splice(index,1);
                }
            })
            localStorage.setItem('tasks',JSON.stringify(tasks));
            e.target.parentElement.parentElement.remove();
        }
    }
}

// clear tasks
function clearTasks(){
    //slower
    // taskList.innerHTML = '';

    // faster
    //sconsole.log(child);
    while(taskList.lastChild){
      taskList.removeChild(taskList.lastChild);
    }
    localStorage.clear();
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) === -1){
                task.style.display = 'none';
            }
            else{
                task.style.display = 'block';
            }
        }
    )
}