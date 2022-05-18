const obj = {
    a: [{
        g: 1,
        p: 2,
        h: [{
            y: 3
        }]
    }],
    b: 4,
    c: {
        d: 5,
        e: 6
    }
};
const expected = {
    a_0_g: 1,
    a_0_p: 2,
    a_0_h_0_y: 3,
    b: 4,
    c_d: 5,
    c_e: 6
}

function flatternobj(data, keyPair = '', ) {
    let finalObj = {}
    for (const [key, values] of Object.entries(data)) {
        if (typeof values === "object") {
            let r = ''
            keyPair = key
            if (Array.isArray(values)) {
                values.forEach((dataKey, i) => {
                    let modiKey = keyPair + '_' + i
                    r = flatternobj(dataKey, modiKey)
                })
            } else {
                r = flatternobj(values, key)
            }
            finalObj = {
                ...finalObj,
                ...r
            }
        } else {
            str = keyPair ? keyPair + '_' + key : key
            finalObj[str] = values
        }
    }
    return finalObj
}
let res = flatternobj(obj);
res