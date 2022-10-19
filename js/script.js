{
    let tasks = [];
    let hideDoneTasks = false;

    const addTasks = (newTask) => {
        tasks = [
            ...tasks,
            { content: newTask },
        ];

        render();
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ];

        render();
    };

    const toggleTaskDone = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            {
                ...tasks[index],
                done: !tasks[index].done,
            },
            ...tasks.slice(index + 1),
        ];

        render();
    };

    const toggleHideDoneTask = () => {
        hideDoneTasks = !hideDoneTasks;

        render();
    }

    const renderTasks = () => {
        let htmlString = "";

        for (const newTask of tasks) {
            htmlString += `
            <li class= "container2__item">
            
            <button class="button js-done button--done">
            ${newTask.done ? "✓" : ""}
            </button>

            <span class="list__item ${newTask.done ? "list__item--done" : ""}">
            ${newTask.content}
            </span> 
        
            <button class="button button--remove js-remove">🗑️</button>
            </li>
            `;
        }

        document.querySelector(".js-list").innerHTML = htmlString;
    };

    const renderButtons = () => {
        const taskButton = document.querySelector(".js-button");

        if (!tasks.length) {
            taskButton.innerHTML = "";
            return;
        }

        taskButton.innerHTML = `
            <button class="js-button js-hiden ${!tasks.length ? "taskButton--hidden" : "taskButton"}">
            ${tasks.done && !hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>

            <button class="js-button js-finished ${!tasks.length ? "taskButton--hidden" : "taskButton"}">
            Ukończ wszystkie
            </button>
            `;
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindEvents();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            })
        })

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            })
        })
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-input");
        const newTask = newTaskElement.value.trim();

        if (newTask !== "") {
            addTasks(newTask);
            newTaskElement.value = "";
        }
        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}