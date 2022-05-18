var person1 = {
    firstName: 'Jon',
    lastName: 'Kuperman'
};
var person2 = {
    firstName: 'Kelly',
    lastName: 'King'
};

function say(greeting) {
    console.log(greeting + ' ' + this.firstName + ' ' + this.lastName);
}

//call
say.call(person1, 'Hello'); // Hello Jon Kuperman
say.call(person2, 'Hello'); // Hello Kelly King

//Apply
say.apply(person1, ['Hello']); // Hello Jon Kuperman
say.apply(person2, ['Hello']); // Hello Kelly King

//Bind
var sayHelloJon = say.bind(person1);
var sayHelloKelly = say.bind(person2);
sayHelloJon('Bye'); // Bye Jon Kuperman
sayHelloKelly(); // undefined Kelly King