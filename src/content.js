
import project from "./project";
import todo from "./todo";

// list of all projects
export let list_of_projects = new Set();
// list of individual tasks
export let list_of_tasks = new Set();
let list_of_completed_tasks = [];
function createTododiv()
{
    let todo_div = document.createElement("div");
    todo_div.className = "todo";
    return todo_div;
}
export function createProject(projectName)
{
    let Project = getProject(projectName);
    let ul = document.createElement("ul");
    ul.id=Project.getTitle();
    ul.textContent = Project.getTitle();
    ul.appendChild(deleteButton(ul));
    let list = Project.getList();
    list.forEach((item)=>
    {
        let li = createItem(item);
        li.classList.add("projectItem")
        li.classList.add(Project.getTitle());
        ul.appendChild(li);
    });
    return ul;
}

function createItem(item)
{
    let li = document.createElement("li");
    let input = document.createElement("input");
    let label = document.createElement("label");
    let span  = document.createElement("span");

    input.type = "checkbox";
    li.style="list-style-type: none";
    span.textContent = item.getTitle();

    input.addEventListener("change",()=>{
        span.classList.toggle("completed");
    });
    label.appendChild(input);
    label.appendChild(span);
    li.appendChild(label);
    li.appendChild(deleteButton(li));
    li.appendChild(editButton(li));
    return li;
}
function editButton(item)
{
    let button = document.createElement("button");
    button.textContent = "✏️";
    button.className = "edit";
    button.addEventListener("click",()=>
    {
        console.log("Editing",item.childNodes[0].textContent);
        let input = document.createElement("input");
        input.type = "text";
        let oldTitle=item.childNodes[0].textContent;
        input.value = oldTitle;
        item.replaceChild(input,item.childNodes[0]);
        let doneButton = document.createElement("button");
        doneButton.textContent = "✔️";  
        doneButton.className = "done";

        doneButton.addEventListener("click",()=>
        {
            let editedTask = input.value;
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            let label = document.createElement("label");
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(editedTask));
            item.replaceChild(label,input);
            item.replaceChild(button,doneButton);
            
            editTask(oldTitle,editedTask);
        });
        item.replaceChild(doneButton,button);
    });
    return button;
}

function editTask(oldTitle,taskTitle)
{
    let taskToEdit;
    list_of_projects.forEach((project)=>
    {   
        taskToEdit=getTask(oldTitle,project.getList());
        if(taskToEdit!=null)
        {
            taskToEdit.setTitle(taskTitle);
        }
        console.log("List of project tasks after editing",list_of_projects);
    });
    if(taskToEdit==null)
    {
        getTask(oldTitle,list_of_tasks).setTitle(taskTitle);
        console.log("List of individual tasks after editing",list_of_tasks);
    }
}
export function setup(projectTitle)
{
    console.log("in setup",getProject(projectTitle));
    let div = createTododiv();
    let ul = createProject(projectTitle);
    // getProject(projectTitle).getList().forEach(taskItem=>
    //     {
    //         console.log("todo items",taskItem)
    //         let li = createItem(taskItem);
    //         ul.appendChild(li);
        // });
    div.appendChild(ul);
    
        // let p = new project("Project");
    // list_of_projects.add(p);
    // let t = new todo("Todo",1,2,3);
    // let t2 = new todo("Todo3",1,2,3);
    // p.addItem(t);
    // p.addItem(t2);
    // let ul = createProject(p);
    // let test_todo = new todo("Todo2",1,2,3)
    // let test = createItem(test_todo);
    // list_of_tasks.add(test_todo);
    // div.appendChild(ul);
    // div.appendChild(test);
    // console.log("in setup list of projects" ,list_of_projects);
    // let add_button = addButton();
    // let p = new project(projectTitle);
    // list_of_projects.add(p);
    // div.appendChild(createProject(p));
    
    div.appendChild(addButton());
    return div;
}

function del(item)
{
    let taskToDelete=item.childNodes[0].textContent;
    console.log("deleting",taskToDelete);
    item.remove();
    console.log( "List of individual tasks before deleting",list_of_tasks );

    list_of_tasks.delete(getTask(taskToDelete,list_of_tasks))
    console.log( "List of individual tasks after deleting", list_of_tasks);
}
function deleteFromProject(item)
{    
    let todoTitle = item.childNodes[0].textContent;
    let projectTitle = item.classList[1];
    let project = getProject(projectTitle);
    project.removeItem(getTask(todoTitle,project.getList()));
}

function deleteProject(item)
{
    let projectTitle = item.childNodes[0].textContent;
    let project = getProject(projectTitle);
    list_of_projects.delete(project);
    item.remove();
    document.getElementById(projectTitle+"-Button").remove();
    document.getElementsByClassName("add")[0].remove();
}
function deleteItem(item)
{
    if(item.classList.contains("projectItem"))  
        deleteFromProject(item);
    else
        deleteProject(item);
    
}
function deleteButton(item)
{
    let button = document.createElement("button");
    button.textContent = "⚰️";
    button.className = "delete";
    button.addEventListener("click",()=>
    {
        deleteItem(item);
    }
    );
    return button;
}

function addButton()
{
    let button = document.createElement("button");
    button.textContent = "Add";
    button.className = "add";

    button.addEventListener("click",()=>{
        button.replaceWith(addNewTask());
    });
    return button;
}

function addNewTask()
{
    let div = document.createElement("div");
    div.className = "inputDiv";

    let input = document.createElement("input");
    input.className = "inputTask";
    input.type = "text";
    input.placeholder = "Enter new task";

    let button = document.createElement("button");
    button.textContent = "Add";
    button.className = "inputButton";

    let projectList = projectListDropdown();
    
    let projectValue = projectList.value;
    projectList.addEventListener("change",()=>
    {
        projectValue = projectList.value;
        console.log(projectValue);
    });
    console.log("project List before adding ",list_of_projects);
    console.log(projectValue)
    button.addEventListener("click",()=>
    {
        let new_task = input.value;
        let new_task_obj = new todo(new_task,1,2,3);
        let new_todo = createItem(new_task_obj);
        
        if(projectValue == "--")
        {
            list_of_tasks.add(new_task_obj);
            updateView(new_todo);
        }
        else
        {
            console.log("in else ",list_of_projects);
            let project = getProject(projectValue);
            console.log("216",list_of_projects);
            project.addItem(new_task_obj);
            console.log("217",list_of_projects);    
            updateProjectTodo(new_todo,project.getTitle());
        }
        console.log("project List after adding ",list_of_projects);
    });
    div.appendChild(input);
    div.appendChild(projectList);
    div.appendChild(button);
    return div;
}
function projectListDropdown()
{
    let dropdown = document.createElement("select");
    dropdown.className = "projectDropdown";

    // add a blank option
    let blankOption = document.createElement("option");
    blankOption.textContent = "--";
    dropdown.appendChild(blankOption);
    list_of_projects.forEach((project)=>
    {
        let option = document.createElement("option");
        option.textContent = project.getTitle();
        dropdown.appendChild(option);
    });
    // select project by default
    dropdown.value = document.querySelector(".todo").childNodes[0].id;

    return dropdown;
}
function updateView(new_todo)
{
    document.querySelector(".inputDiv").remove();
    let div = document.querySelector(".todo");
    // div.appendChild(new_todo);
    div.appendChild(addButton());
}
function main(projectTitle)
{
    let div = document.getElementById("content");
    // console.log(document.getElementById("content"));
   div.appendChild(setup(projectTitle));
}

function updateProjectTodo(new_todo,projecTitle)
{
    document.querySelector(".inputDiv").remove();
    document.querySelector(".todo").appendChild(addButton());
    console.log("error is here",new_todo,projecTitle);
    document.getElementById(projecTitle).appendChild(new_todo);
}
function getProject(projectTitle)
{
    let projectToReturn;
    list_of_projects.forEach((project)=>{
        if(project.getTitle()==projectTitle)
        {
            // today i learned return does not stop the loop from iterating -_-
            projectToReturn=project;
        }
    });
    return projectToReturn;
}

function getTask(taskTitle,list_of_todo_of_projects)
{
    let taskToReturn;
    list_of_todo_of_projects.forEach((task)=>{
        if(task.getTitle()==taskTitle)
        {
            // today i learned return does not stop the loop from iterating -_-
            taskToReturn=task;
        }
    });
    return taskToReturn;
}
export default main;