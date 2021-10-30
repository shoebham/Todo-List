import project from "./project";
import todo from "./todo";
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
    let list = Project.getList();
    list.forEach((item)=>
    {
        ul.appendChild(createItem(item));
    });
    return ul;
}
function createItem(item)
{
    let li = document.createElement("li");
    li.textContent = item.getTitle();
    return li;
}

function setup()
{
    console.log("in setup");
    let div = createTododiv();
    let p = new project("Project");
    let t = new todo("Todo",1,2,3);
    p.addItem(t);
    // console.log(p.getList()[0].getTitle());
    let ul = createProject(p);
    div.appendChild(ul);
    return div;
}
function main()
{
    let div = document.getElementById("content");
    console.log(document.getElementById("content"));
    div.appendChild(setup());
}
export default main;