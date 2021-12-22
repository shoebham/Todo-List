import main from "./content";
import project from "./project";
import todo from "./todo";
import styleIt from "./style"
function init()
{
    console.log("here");
    let p = new project("test");
    let t = new todo("Todo-List");
    p.add_item(t);
    p.add_item(new todo("Todo-List2"));
    console.log(p);
}
styleIt();
// main();
