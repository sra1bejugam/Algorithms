// [12,34,24,565,36]
function solution(numbers) {
    let res=[];
    for(let i=0;i<numbers.length;i++){
        if(i%2===0){
            res.push(numbers[i])
        }
    }
    if(res.length){
        let incCount=0;
        let decCount=0;
        for(let j=0;j<res.length;j++){
            if(res[j]<res[j+1]){
                incCount++
            } else if(res[j]>res[j+1]){
                decCount++
            }
        }
        if(incCount===res.length-1){
            return "increasing"
        }else if(decCount=== res.length-1){
            return "decreasing"
        }else {
            return "none"
        }
    }
}