import project from "./project";
import todo from "./todo";

function init()
{
    console.log("here");
    let p = new project("test");
    let t = new todo("Todo-List");
    p.add_todo(t);
    p.add_todo(new todo("Todo-List2"));
    console.log(p);
}
init()
