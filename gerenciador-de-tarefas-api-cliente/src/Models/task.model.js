 function Task(id, name, done) {
     this.id = id;
     this.name = name;
     this.done = done;

     return {
         id,
         name,
         done
     };
 }

 export default Task;