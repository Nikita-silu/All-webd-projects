document.addEventListener('DOMContentLoaded',()=>{
    //1...
    const todoInput = document.getElementById("todo-input");
    const addtaskbutton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    //parse for its original datatype
   //getting from local storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    //6...
    tasks.forEach(task=>renderTask(task));
   //2...
    addtaskbutton.addEventListener("click", () => {
      const taskText = todoInput.value.trim();
      //trim for withe sapce removing from start and end
      if (taskText === "") return;

      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
      };

      tasks.push(newTask);
      //4...
      saveTasks();
       renderTask(newTask);
      todoInput.value = "";
      
    });

    //5...
    function renderTask(task) {
        const li=document.createElement('li')
        if(task.completed)li.classList.add('completed');
        li.setAttribute('data-id',task.id)
        li.innerHTML=`
        <span>${task.text}</span>
        <button>delete</button>
        `
        li.addEventListener('click',(e)=>{
          if(e.target.tagName==='BUTTON')return;
          task.completed=!task.completed;
          li.classList.toggle('completed')
          saveTasks();
        })

        li.querySelector('button').addEventListener('click',(e)=>{
            e.stopPropagation();
            //prevent toggle from firing
            tasks=tasks.filter(t=>t.id !==task.id)
            li.remove();
            saveTasks();
        })
        todoList.appendChild(li);
     
    }

    //3...
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
})