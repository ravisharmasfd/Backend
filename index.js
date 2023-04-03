let sum = (a,b)=>{return a+b};


console.log(sum(10,20));

const Student = {
    name : 'ravi sharma',
    age : 23,
    greet : ()=>{
        console.log('hello ' + this.name);
    }
}
Student.greet();