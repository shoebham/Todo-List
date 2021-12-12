import todo from "./todo";
export default class project
{
    list_of_todo = new Set();
    constructor(project_name)
    {
        this.project_name = project_name;
    }
    addItem(todolist)
    {
        this.list_of_todo.add(todolist);
    }
    removeItem(todolist)
    {
        console.log("Before removing",this.list_of_todo);
        // this.list_of_todo.splice(this.list_of_todo.indexOf(todolist),1);
        this.list_of_todo.delete(todolist);
        console.log("After removing",this.list_of_todo);
    }
    getItem(todolist)
    {
        return this.list_of_todo[this.list_of_todo.indexOf(todolist)];
    }
    deleteProject()
    {
        this.list_of_todo = [];
        console.log(this.project_name + " deleted");
    }
    getTitle()
    {
        return this.project_name;
    }
    getList()
    {
        return this.list_of_todo;
    }
}

