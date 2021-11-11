import project from "./project";
import todo from "./todo";

let list_of_projects = [];
let list_of_tasks = [];
function createTododiv()
{
    let todo_div = document.createElement("div");
    todo_div.className = "todo";
    return todo_div;
}
function createProject(Project)
{
    let ul = document.createElement("ul");
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
    label.appendChild(input);
    label.appendChild(span);
    li.appendChild(label);
    li.appendChild(deleteButton(li));
    return li;
}

function setup()
{
    console.log("in setup");
    let div = createTododiv();
    let p = new project("Project");
    list_of_projects.push(p);
    let t = new todo("Todo",1,2,3);
    let t2 = new todo("Todo3",1,2,3);
    let test = createItem(new todo("Todo2",1,2,3));
    p.addItem(t);
    p.addItem(t2);
    let ul = createProject(p);
    div.appendChild(ul);
    div.appendChild(test);
    console.log(list_of_projects);
    // let add_button = addButton();
    div.appendChild(addButton());
    return div;
}

function del(item)
{
    item.remove();
}
function deleteFromProject(item)
{
    
    let todoTitle = item.childNodes[0].textContent;
    let projectTitle = item.classList[1];
    // console.log(item.childNodes[0]);
    // document.getElementsByClassName("projectItem")[0].childNodes[0].textContent
    list_of_projects.forEach((project)=>
    {
        console.log("project title",project.getTitle(),todoTitle,projectTitle);
        if(project.getTitle() == projectTitle)
        {
            project.removeItem(todoTitle);
            console.log(project);
        }
    });
}
function deleteItem(item)
{
    if(item.classList.contains("projectItem"))  
        deleteFromProject(item);
    del(item);
    console.log(list_of_projects);
    
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
    button.addEventListener("click",()=>
    {
        let new_task = input.value;
        let new_todo = createItem(new todo(new_task));
        list_of_tasks.push(new_todo);
        updateView(new_todo);
    });
    div.appendChild(input);
    div.appendChild(button);
    return div;
}

function updateView(new_todo)
{
    document.querySelector(".inputDiv").remove();
    let div = document.querySelector(".todo");
    div.appendChild(new_todo);
    div.appendChild(addButton());
}
function main()
{
    let div = document.getElementById("content");
    console.log(document.getElementById("content"));
    div.appendChild(setup());
}
export default main;