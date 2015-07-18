////////////********////////////
//////////Solution 6 ///////////
////////////********////////////

//A palindromic number reads the same both ways. 
//The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
//Find the largest palindrome made from the product of two 3-digit numbers.
//Source: Project Euler (Problem 4)

function isPalindrome(num){
    //Make it a string
    num = '' + num;
    if(num.length <= 1 ){
        return true;
    }
    else if(num[0] == num[num.length-1]){
        return isPalindrome(num.slice(1,num.length-1))  
    }
    else{
        return false;    
    }
}


var number = 0;
var temp = 0;
for(var i=999; i>99; i--){
    for(var j=999; j>99; j--){
        if(isPalindrome(i*j)){
            temp = i*j;
            if(temp > number){
                number = temp;
                console.log(i,j);
            }
        }
    }
}

console.log(number)
