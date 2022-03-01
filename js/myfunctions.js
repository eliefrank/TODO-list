"use strict";
(function() {
    // class to do with variables: title,description,priority
    class Todo {
        constructor(title, description, priority) {
            this.title = title;
            this.description = description;
            this.priority = priority;
        }
    }

    const myList = []

    document.addEventListener('DOMContentLoaded', () => {
        // add listener for add button, func - adds a new to do to the array and DOM if it's valid
        document.getElementById("addButton").addEventListener("click", function() {
            errorMessagesClean();
            const title = document.getElementById("title");
            const descr = document.getElementById("description");
            const priority = document.getElementById("priority");

            if(validation(title.value.trim(), descr.value.trim())) {
                const newTodo = new Todo(title.value.trim(), descr.value.trim(), priority.checked);
                myList.push(newTodo);
                insertTodo(newTodo)
                //input clean
                title.value = '';
                descr.value = '';
                priority.checked = false;
            }
        } );

        // add listener for sort button, func - Sort the array, delete all showMyList and re-insert in the sorted order
        document.getElementById("sort").addEventListener("click", function() {
            myList.sort(function(todo1,todo2) {
                return (todo1.title < todo2.title ? -1 : 1);
            });

            const list = document.getElementById('showMyList');
            while(list.firstElementChild)
                list.firstElementChild.remove();

            // myList.forEach(todo => { insertTodo(todo); });
            for (let todo of myList)
                insertTodo(todo);
        });

        document.getElementById("showHighPriority").addEventListener("click", showHiPrAndBack);
        document.getElementById("back").addEventListener("click", showHiPrAndBack);
    });

    // Hides or shows the buttons and form and cards that are not high priority, depending on the requested action
    function showHiPrAndBack() {
        // Toggle element visibility
        const toggle = (elem) => { elem.classList.toggle('d-none');}

        toggle(document.getElementById("showHighPriority").parentElement.parentElement);
        toggle(document.getElementById("back").parentElement);
        toggle(document.getElementById("form"));

        for(let todo of document.getElementById('showMyList').children)
            if(!todo.classList.contains('bg-danger'))
                toggle(todo);
    }

    // Checking if the input is valid or not, if not, adds an error message
    function validation(title, descr) {
        let msg = '';
        if(title === '')
            msg += '<p>Please enter a non empty title with letters and digits only</p>';

        if(descr === '')
            msg += '<p>Please enter a non empty text description</p>';

        for(const i of myList)
            if(i.title === title) {
                msg += '<p>Please enter another title. This title already exists</p>';
                break;
            }

        if(msg !== '') {
            document.getElementById("errorMessages").innerHTML = `<div class="card bg-danger p-2 text-dark bg-opacity-25 mb-3">${msg}</div>`;
            document.addEventListener('keypress', errorMessagesClean,{once: true});
            return false;
        }
        return true;
    }

    // error messages clearing (if any)
    function errorMessagesClean() {
        document.getElementById('errorMessages').firstElementChild?.remove();
    }

    //insertTodo to HTML and add delete Listener
    function insertTodo(todo) {
        const list = document.getElementById('showMyList');

        list.insertAdjacentHTML('beforeend',`<div class="${todo.priority ? "card bg-danger p-2 text-dark bg-opacity-25 mb-2": "card mb-2"}">
                            <div class="card-body">
                                <h5 class="card-title">${todo.title}</h5>
                                <p class="card-text">${todo.description}</p>
                                <button type="button" class="btn btn-danger">delete</button>
                            </div>
                        </div>`);

        // add listener for delete button, func - delete _todo_ from DOM and array
        list.lastElementChild.lastElementChild.lastElementChild.addEventListener('click', function(event) {
            errorMessagesClean();
            myList.splice(myList.indexOf(todo), 1);
            event.target.parentElement.parentElement.remove();
        });
    }
})()
