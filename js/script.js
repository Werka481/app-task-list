{
    let tasks = [];
    let hideDoneTasks = false;

    const addTasks = (task) => {
        tasks = [
            ...tasks,
            { content: task },
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
    };

    const markAllTasksCompleted = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class= "container2__item ${task.done && hideDoneTasks ? "list--hidden" : ""}">
            
            <button class="button js-done button--done">
            ${task.done ? "✓" : ""}
            </button>

            <span class="list__item ${task.done ? "list__item--done" : ""}">
            ${task.content}
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
            <button class="js-button js-hidden ${!tasks.length ? "taskButton--hidden" : "taskButton"}">
            ${!hideDoneTasks ? "Ukryj" : "Pokaż"} ukończone
            </button>

            <button class="js-button js-finished ${!tasks.length ? "taskButton--hidden" : "taskButton"}"
            ${tasks.every(({ done }) => done) ? "disabled" : ""}>
            Ukończ wszystkie
            </button>
            `;
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindButtonsEvents();
        bindEvents();
    };

    const bindButtonsEvents = () => {
        const hideTaskButton = document.querySelector(".js-hidden");

        if (hideTaskButton) {
            hideTaskButton.addEventListener("click", () => {
                toggleHideDoneTask();
            })
        };

        const finishedTaskButton = document.querySelector(".js-finished");

        if (finishedTaskButton) {
            finishedTaskButton.addEventListener("click", () => {
                markAllTasksCompleted();
            })
        };
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
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const taskElement = document.querySelector(".js-input");
        const task = taskElement.value.trim();

        if (task !== "") {
            addTasks(task);
            taskElement.value = "";
        }
        taskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}