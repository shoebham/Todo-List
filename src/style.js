
import main, { getProject, list_of_projects } from "./content";
import project from "./project";
import createProject from "./content";
import { setup } from "./content";
function header()
{
    let div = document.createElement("div");
    div.className = "header";
    div.innerHTML = "<h1>To-Do List</h1>";
    return div;
}

function sideBar()
{
    let div = document.createElement("div");
    div.id="side-bar";
    div.innerHTML = "<center><h2>Projects</h2></center>";
    // div.appendChild(fillSideNav());
    div.appendChild(addProject());
    return div;
}
function fillSideNav()
{
    let button = document.createElement("button");
    button.textContent= "All tasks";
    button.addEventListener("click",()=>
    {
        showAllTasks();
    });
    return button;
}
function addProject()
{
    let addNewProject = document.createElement("button");
    addNewProject.textContent="Add Project";
    addNewProject.classList.add("add");
    addNewProject.id="addProject";
    addNewProject.addEventListener("click",()=>
    {
       addNewProject.replaceWith(addNewProjectInput());
    });
    return addNewProject;
}
function addNewProjectInput()
{
    let div = document.createElement("div");
    div.id = "inputProjectDiv";

    let input = document.createElement("input");
    input.className = "inputProject";
    input.type = "text";
    input.placeholder = "Enter new Project Name";

    let button = document.createElement("button");
    button.textContent = "Add";
    button.className = "add";

    button.addEventListener("click",()=>
    {
        let newProject = input.value;
        if(newProject=="")
        {
            alert("Please enter a project name");
        }
        else if(list_of_projects.has(getProject(newProject)))
        {
            alert("Project already exists");
        } 
        else
        {
            
            newProject = new project(input.value);
            console.log(newProject);
            list_of_projects.add(newProject);
            projectDisplay(newProject.getTitle());
        }
        // div.replaceWith(addProject());
    });
    div.appendChild(input);
    div.appendChild(button);
    return div;
}

function projectDisplay(projectName)
{
    let button = document.createElement("button");
    button.textContent=projectName;
    button.id=projectName+"-Button";
    button.className="project-button"
    button.addEventListener("click",()=>
    {
        changeView(projectName);
    });
    document.getElementById("inputProjectDiv").remove();
    document.getElementById("side-bar").appendChild(button);
    document.getElementById("side-bar").appendChild(addProject());

}
function showAllTasks()
{
    let content= document.getElementById("content");
    content.appendChild(document.getElementById("todo"));
}

function changeView(projectName)
{
    let todoDiv=document.querySelector(".todo");
    console.log(todoDiv);
    if(todoDiv)
        document.getElementById("content").replaceChild(setup(projectName), document.querySelector(".todo"));
    else
        document.getElementById("content").appendChild(setup(projectName));
}
function styleIt()
{
    let content = document.getElementById("content");
    // document.querySelector("body").appendChild(header());
    content.appendChild(sideBar());
}
export default styleIt;