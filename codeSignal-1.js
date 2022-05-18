
//You are given an array of integers numbers and two integers left and right. 
//You task is to calculate a boolean array result, where result[i] = true if there exists an integer x,
// such that numbers[i] = (i + 1) * x and left ≤ x ≤ right. Otherwise, result[i] should be set to false.

function solution(numbers, left, right) {
    let res=[];
for(let i=0;i<numbers.length;i++){
    let val=numbers[i];
    let cal=(i+1)
    let yes=false
    for(let j=left;j<=right;j++){
        if(val===cal*j){
            res.push(true)
            yes=true
        } 
    }
    if(!yes) res.push(false)
}
return res
}
