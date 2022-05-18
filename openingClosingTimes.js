let data = {
    "mondayOpen": "9:00",
    "mondayClose": "5:00",
    "tuesdayOpen": "9:00",
    "tuesdayClose": "5:00",
    "wednesdayOpen": "9:00",
    "wednesdayClose": "5:00",
    "thursdayOpen": "9:00",
    "thursdayClose": "5:00",
    "fridayOpen": "9:00",
    "fridayClose": "5:00",
    "saturdayOpen": "closed",
    "saturdayClose": "closed",
}
let structure = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'staurday', 'sunday']

let output = "Mon - Fri : 9:00 to 5:00"

function isConsequtive(data) {
    let res=[]
   data.every((x,i)=>x===data[i])
}

function getRes(data) {
    let open = [];
    let close = []
    let weekIndex = [];
    Object.keys(data).forEach((val, i) => {
        if (/monday/i.test(val)) {
            weekIndex.push(structure.indexOf(val.replace(/open|close/i, '')))
        } else if (/tuesday/i.test(val)) {
            weekIndex.push(structure.indexOf(val.replace(/open|close/i, '')))
        } else if (/wednesday/i.test(val)) {
            weekIndex.push(structure.indexOf(val.replace(/open|close/i, '')))
        } else if (/thursday/i.test(val)) {
            weekIndex.push(structure.indexOf(val.replace(/open|close/i, '')))
        } else if (/friday/i.test(val)) {
            weekIndex.push(structure.indexOf(val.replace(/open|close/i, '')))

        } else {
            return '';
        }
        if (/open/i.test(val)) {
            open.push(data[val]);
        } else {
            close.push(data[val]);
        }
    })
    let weekData = [...new Set(weekIndex)]
    weekData;

    let isConsi = weekData.every((x,i)=>x===weekData[i]);
    if(isConsi){
        
    }
    let OpenTiming = open.every(x => open[0] === x) ? open[0] : []
    let CloseTiming = close.every(x => x === close[0]) ? close[0] : []
    OpenTiming
    CloseTiming
    return `Mon - Fri :${OpenTiming} to ${CloseTiming}`
}
let res = getRes(data);
res