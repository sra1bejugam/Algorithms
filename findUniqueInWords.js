// find unique words in sentence
function solution(words, sentence) {
    let res=[]
    let modifiedSentence =sentence.replace(/[^a-z]+/ig,' ').replace(/\s+/,' ').split(' ');
    modifiedSentence=[...new Set(modifiedSentence)].filter(x=>x)
let count1=0;
let count2=0;
for(let i=0;i<modifiedSentence.length;i++){
    
if(words.includes(modifiedSentence[i])){
    count2++
}else{
    count1++
}
}
res.push(count1);
res.push(count2);
return res;
}