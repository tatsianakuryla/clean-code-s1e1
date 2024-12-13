//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const newTaskInput = document.getElementById('todo__input_new-task');
const addNewTaskButton = document.getElementById('todo__btn_add');
const uncompletedTasksList = document.getElementById('todo__list_uncompleted');
const completedTasksList = document.getElementById('todo__list_completed');


//New task item
const createNewTaskItem = function (taskValue) {

    const taskItem = document.createElement('li');
    taskItem.className = 'todo__item';

    const checkBox = document.createElement('input');//checkbox
    checkBox.type = 'checkbox';
    checkBox.className = 'todo__checkbox';

    const label = document.createElement('label');//label
    label.innerText = taskValue;
    label.className = 'todo__label';

    const editInput = document.createElement('input');//text
    editInput.type = 'text';
    editInput.className = 'todo__input';

    const editButton = document.createElement('button');//edit button
    editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
    editButton.className = 'todo__btn todo__btn_edit';

    const deleteButton = document.createElement('button');//delete button
    deleteButton.className = 'todo__btn todo__btn_delete';
    deleteButton.setAttribute('aria-label', 'Delete');

    //and appending.
    taskItem.append(checkBox, label, editInput, editButton, deleteButton);

    return taskItem;
}

const addNewTask = function () {
    console.log('Add Task...');
    //Create a new task item with the text from the taskInput.value:
    if (!newTaskInput.value) return;
    const listItem = createNewTaskItem(newTaskInput.value);

    //Append listItem to uncompletedTasksList
    uncompletedTasksList.appendChild(listItem);
    bindTaskEvents(listItem, markTaskCompleted);

    newTaskInput.value = '';
}

//Edit an existing task
const editTask = function () {
    console.log('Edit Task...');
    console.log('Change "edit" to "save"');

    const taskItem = this.parentNode;

    const editInput = taskItem.querySelector('.todo__input');
    const editLabel = taskItem.querySelector('.todo__label');
    const editBtn = taskItem.querySelector('.todo__btn_edit');
    const isEditItem = taskItem.classList.contains('todo__item_edit');

    if (isEditItem) {
        //switch to todo__item_edit
        //label becomes the inputs value.
        if (!editInput.value.trim()) {
            editInput.value = '';
            editInput.setAttribute('placeholder', 'Can\'t save empty task.');
            return;
        };
        editLabel.innerText = editInput.value;
        editBtn.innerText = 'Edit';
    }
    else {
        editInput.value = editLabel.innerText;
        editBtn.innerText = 'Save';
    }

    //toggle .editmode on the parent.
    taskItem.classList.toggle('todo__item_edit');
};

//Delete task.
const deleteTask = function () {
    console.log('Delete Task...');

    const taskItem = this.parentNode;
    const tasksList = taskItem.parentNode;

    //Remove the parent list item from the ul.
    tasksList.removeChild(taskItem);
}

//Mark task completed
const markTaskCompleted = function () {
    console.log('Complete Task...');

    //Append the task list item to the #completed-tasks
    const taskItem = this.parentNode;
    completedTasksList.appendChild(taskItem);
    bindTaskEvents(taskItem, markTaskUncompleted);
}

//Mark task uncompleted
const markTaskUncompleted = function () {
    console.log('Incomplete Task...');

    //Mark task as uncompleted.
    //When the checkbox is unchecked
    //Append the task list item to the uncompletedTasksList

    const taskItem = this.parentNode;
    uncompletedTasksList.appendChild(taskItem);
    bindTaskEvents(taskItem, markTaskCompleted);
}

const ajaxRequest = function () {
    console.log('AJAX Request');
}

//The glue to hold it all together.

//Set the click handler to the addNewTask function.
addNewTaskButton.addEventListener('click', addNewTask);
addNewTaskButton.addEventListener('click', ajaxRequest);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log('bind list item events');

    //select ListItems children
    const checkBox = taskListItem.querySelector('.todo__checkbox');
    const editButton = taskListItem.querySelector('.todo__btn_edit');
    const deleteButton = taskListItem.querySelector('.todo__btn_delete');

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < uncompletedTasksList.children.length; i++) {
    //bind events to list items children(completedTasksList)
    bindTaskEvents(uncompletedTasksList.children[i], markTaskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksList.children.length; i++) {
    //bind events to list items children(uncompletedTasksList)
    bindTaskEvents(completedTasksList.children[i], markTaskUncompleted);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.