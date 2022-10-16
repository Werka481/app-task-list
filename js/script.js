{
    const tasks = [];

    const addTasks = (newTask) => {
        tasks.push({
            content: newTask,
        });

        render();
    }

    const removeTask = (index) => {
        tasks.splice(index, 1);
        
        render();
    }

    const render = () => {
        let htmlString = "";

        for (const newTask of tasks) {
            htmlString += `
            <li class= "container2__item list__item">
            <button class="button js-done button__task ${newTask.done ? "button__task--done" : ""}">
            </button>
            
            ${newTask.content}
        
            <button class="button button--remove js-remove">🗑️</button>
            </li>
            `;
        }

        document.querySelector(".js-list").innerHTML = htmlString;

        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            })
        })
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-input").value.trim();

        if (newTask === "") {
            return;
        }

        addTasks(newTask);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}