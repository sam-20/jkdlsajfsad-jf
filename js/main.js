// console.log("helloooo .....")
// Variables
let myname = "Eben Allen"
// console.log(myname);

let a = 5
b = 9
// console.log(a+b);
// console.log(a*b);

let surname = "Mensah "
let firstname = " Joseph"
// console.log(surname+firstname);





// Arrays and Objects
let myarray = [8,4,10,13,34,54,90] 
let names = ["kofi", "kwasi","amma"]
let mymixed = [0,4,6,"yaw","yam","banana"]

// console.log(myarray[2]);
// console.log(myarray[3]);
// console.log(myarray[6]);

// myarray.push(50)
// myarray.pop()
myarray.splice(2,1)
// let namee = names.map((r,k) => console.log(k))
delete myarray[2]


// Object
let myobject = {
    name:"Kofi", 
    class:3, 
    classname:"Mary Gold", 
    results:[
        {subject:"English", mark:40, position:1},
        {subject:"Maths", mark: 80, position: 4},
        {subject: "Social", mark: 50, position: 3}
    ]
}





// Functions
function add(num1,num2){
    console.log(num1+num2);
}

add(3,6)
add(8,9)
add(89,40)

function subtract(num1,num2,){
    console.log(num1-num2);
}
subtract(3,6)
subtract(8,9)
subtract(89,40)    


function login(username,password){
    console.log(username+" :: "+password)
}
login('kanimwah','*****')
login("allen","[[[[[[")


function multiply(num1,num2){

    return num1 * num2
}
console.log(multiply(5,6));

let ans = multiply(7,10)
console.log(ans);




// DOM Manipulation

let button  = document.getElementById("button")


button.addEventListener('click',function(){

    let username = document.getElementById("username")
    // let username = document.querySelector('#username')

    let password = document.getElementById("password")
    // let password = document.querySelector('#password')

    console.log(username.value, password.value);
    alert(username.value + " " + password.value)
})

// button.addEventListener('click',() => {
    
//     let username = document.getElementById("username")
//     let password = document.getElementById("password")

//     console.log(username.value, password.value);
// })



// Display Username dynamically

let displaybutton = document.getElementById("displaybutton")


displaybutton.addEventListener('click',function(){
    let username = document.getElementById('username')
    let h1 = document.getElementById('h1')

    h1.innerHTML = username.value
})