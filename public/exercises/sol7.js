////////////********////////////
//////////Solution 7 ///////////
////////////********////////////

//Write a function that takes an array and 
//returns the index of the first element of 
//first sequence of matching subsequence 
//return -1 if no match is found
//you can assume the subsequence is of length = 3
//you can write addition functions if needed


function find_subseq(arr, sub){
    for(var i=0; i<arr.length; i++){
        if(arr.length - i >= sub.length && 
            arr[i] == sub[0] &&
            arr[i+1] == sub[1] &&
            arr[i+2] == sub[2]
            )
            return i;
     }  
     return -1;
}

arr = ['a','b','c','a','d','a'];
sub = ['a','d','a'];

var answer = find_subseq(arr, sub);

console.log(answer);
