//Missing things return

function makeArrayConsecutive2(statues) {
    let statuesNeeded = 0;
    statues.sort((a, b) => {
        return a - b;
    })
    for (let i = 0; i < statues.length; i++) {
        if (statues[i + 1] - statues[i] > 1) {
            statuesNeeded += statues[i + 1] - statues[i] - 1;
        }
    }
    return statuesNeeded;
}

let res = makeArrayConsecutive2([6, 2, 3, 8])
res