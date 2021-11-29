const inpMain = document.querySelector('#inp_main');
const createBtn = document.querySelector('#create_btn');
const selectTasks = document.querySelector('#tasks');
const tasksList = document.querySelector('#tasks_list');
// const arrayOfTasksObj = [];

// function createTaskObj () {
//     let dataObj = {
//         task: inpMain.value,
//         status: "new", 
//     }
//     return dataObj
// }

function createLiTask () {
    let newLi = document.createElement('li');

    let textTask = createElem ('p', inpMain.value, 'text_task');
    let doneBtn = createElem ('button', 'Сделано', 'done_btn');
    let delBtn = createElem ('button','Удалить', 'del_btn');

    newLi.classList.add('new_task');

    tasksList.prepend(newLi);
    newLi.append(textTask);
    textTask.after(doneBtn);
    doneBtn.after(delBtn);
};

function createElem (tag, value, addClass) {
    let elem = document.createElement(tag);
    elem.innerText = value;
    elem.classList.add(addClass);
    return elem
};

function hide (name) {
    let collection = document.querySelectorAll('li');
    collection.forEach( (i) => {
        if (i.classList.contains(name)) i.classList.remove('hide');
        else i.classList.add('hide');
    })
};

function showAll () {
    let collection = document.querySelectorAll('li');
    collection.forEach( (i) => {
        i.classList.remove('hide')
    })
};

// --- create task
createBtn.addEventListener('click', function() {
    if (inpMain.value == '') return
    createLiTask ()


    inpMain.value = null
});


// -- function button
tasksList.addEventListener ('click', function(e) {
    let closestLi = e.target.closest('li');

    if (e.target.className === 'done_btn') {
        closestLi.classList.remove('new_task');
        closestLi.classList.add('done_task');
        e.target.disabled = true
    }
    else if (e.target.className === 'del_btn') {
        closestLi.className = '';
        closestLi.classList.add('delete_task');
        closestLi.children[1].disabled = true;
        e.target.disabled = true;
    }
});

/// --- function select
selectTasks.addEventListener ('change', function () {
    if (this.value == 'done_tasks') {
        hide('done_task');
    }
    else if (this.value == 'deleted_tasks') {
        hide('delete_task');
    }
    else if (this.value == 'all_tasks') {
       showAll()
    }
});

