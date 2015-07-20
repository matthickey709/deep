////////////********////////////
//////////Solution 4 ///////////
////////////********////////////

//Write a function called 'square' that takes 
//an argument x and returns its squared value

function square(x){
    return x*x;    
}

//Get argument
arg = process.argv[2]

console.log(square(arg));
