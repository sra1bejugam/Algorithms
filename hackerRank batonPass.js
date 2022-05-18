function batonPass(friends, time) {
    let pointer = 0;
    let isDec = false
    for (let i = time; i >= 0; i--) {
        i
        pointer
        if(!isDec) {
            ++pointer
        }else{
            --pointer;
        }
        if (pointer === friends && i !=0) {
            isDec = true
        }
        if(pointer===1){
            isDec = false;
        }
    }
    pointer
    if(isDec) {
        return [pointer+1,pointer]
    }
    return [pointer-1,pointer]
}
let res = batonPass(3,6)
res//2,3