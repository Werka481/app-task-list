{
    const tasks = [];

    const render = () => {
        let htmlString = "";

        for (const newTask of tasks) {
            htmlString += `
            <li>
                ${newTask.content}
            </li>
            `;
        }

        document.querySelector(".js-list").innerHTML = htmlString;
    };


    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const newTask = document.querySelector(".js-input").value.trim();

            if (newTask === "") {
                return;
            }

            tasks.push({
                content: newTask,
            });

            render();
        });
    };

    init();
}