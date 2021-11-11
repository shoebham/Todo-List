export default class todo
{
    
    constructor(title,desc,due,prior)
    {
        this.title=title;
        this.desc=desc;
        this.due=due;
        this.prior=prior;
    }   
    setPriority(priority)
    {
        this.prior=priority;
    }

    getPriority(){
        return this.prior;
    }

    setTitle(title)
    {
        this.title=title;
    }
    getTitle()
    {
        return this.title;
    }
    setDesc(desc)
    {
        this.desc=desc;
    }
    getDesc()
    {
        return this.desc;
    }
    setDue(due)
    {
        this.due=due;
    }
    getDue()
    {
        return this.due;
    }
 
}