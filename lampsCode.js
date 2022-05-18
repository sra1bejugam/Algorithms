function solution(lamps) {
    let res=[];
for(let i=0;i<lamps.length;i++){
    const arr=lamps[i]
     const diff =arr[0] - arr[1]
     const sum=arr[0] + arr[1]
     res.push(diff)
     res.push(sum)
}
const duplicateElementa = res.filter((item, index) => res.indexOf(item) !== index)

if(duplicateElementa.length) {
    return duplicateElementa[0] 
} else {
    return res.sort((a,b)=>a-b)[0]
}
}