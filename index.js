const inpMain = document.querySelector('#inp_main');
const createBtn = document.querySelector('#create_btn');
const selectTasks = document.querySelector('#tasks');
const tasksList = document.querySelector('#tasks_list');
const arrayOfTasksObj = [];

if (localStorage.tasks != null) {
    let locTasks = JSON.parse(localStorage.getItem('tasks'));
    
    locTasks.forEach( (i) => {
        createLiTask(i.task);
        if(i.complited) {
            let li = document.querySelector('li');
            let bntDone = document.querySelector('.done_btn');
            li.className = '';
            li.classList.add('done_task');
            bntDone.disabled = true; 
        } 
        arrayOfTasksObj.push(i);
    });
}

function createTaskObj (value) {
    let dataObj = {
        task: value,
        complited: false, 
    }
    return dataObj
};

function createElem (tag, value, addClass) {
    let elem = document.createElement(tag);
    elem.innerText = value;
    elem.classList.add(addClass);
    return elem
};

function createLiTask (value) {
    let newLi = document.createElement('li');

    let textTask = createElem ('p', value, 'text_task');
    let doneBtn = createElem ('button', 'Сделано', 'done_btn');
    let delBtn = createElem ('button','Удалить', 'del_btn');

    newLi.classList.add('new_task');

    tasksList.prepend(newLi);
    newLi.append(textTask);
    textTask.after(doneBtn);
    doneBtn.after(delBtn);
};

function hide (name) {
    let collection = document.querySelectorAll('li');
    collection.forEach(i => {
        if (i.classList.contains(name)) i.classList.remove('hide');
        else i.classList.add('hide');
    });
};

function showAll () {
    let collection = document.querySelectorAll('li');
    collection.forEach(i => {
        i.classList.remove('hide')
    });
};

let setTasksLocalStorage = () =>
    localStorage.setItem('tasks', JSON.stringify(arrayOfTasksObj));

const createTask = () => {
    createLiTask (inpMain.value);
    arrayOfTasksObj.push(createTaskObj(inpMain.value));
    setTasksLocalStorage()
    inpMain.value = null
};

doneTaskArray = (item) => {
    arrayOfTasksObj.forEach(i => {
            if (i.task == item) i.complited = true
    } )
};

deleteTaskArray = (item) => {
    arrayOfTasksObj.forEach (i => {
        if (i.task == item)  arrayOfTasksObj.splice(arrayOfTasksObj.indexOf(i), 1)
    });
};

// --- create task
createBtn.addEventListener('click', function() {
    if (inpMain.value == '') return
      createTask()
});
inpMain.addEventListener('keyup',function (e) {
     if (e.keyCode === 13) createTask()
});

// -- function button
tasksList.addEventListener ('click', function(e) {
    let closestLi = e.target.closest('li');
    let taskValue = closestLi.firstChild.textContent;

    if (e.target.className === 'done_btn') {
        closestLi.classList.remove('new_task');
        closestLi.classList.add('done_task');
        e.target.disabled = true;

        doneTaskArray(taskValue);
        setTasksLocalStorage()
    }
    else if (e.target.className === 'del_btn') {
        closestLi.className = '';
        closestLi.classList.add('delete_task');
        closestLi.children[1].disabled = true;
        e.target.disabled = true;

        deleteTaskArray(taskValue);
        setTasksLocalStorage()
    }
});

/// --- function select
selectTasks.addEventListener ('change', function () {
    if (this.value == 'done_tasks')  hide('done_task');
    else if (this.value == 'deleted_tasks') hide('delete_task');
    else if (this.value == 'all_tasks') showAll();
});