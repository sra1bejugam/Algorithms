// You are given an array of integers arr. Your task is to count the number of contiguous subarrays, such that each element of the subarray appears at least twice.

// Example

// For arr = [0, 0, 0], the output should be solution(arr) = 3.

// There are 3 subarrays that satisfy the criteria of containing only duplicate elements:

// arr[0..1] = [0, 0]
// arr[1..2] = [0, 0]
// arr[0..2] = [0, 0, 0]
// For arr = [1, 2, 1, 2, 3], the output should be solution(arr) = 1.

// There is only 1 applicable subarray: arr[0..3] = [1, 2, 1, 2].

// Input/Output

// [execution time limit] 4 seconds (js)

// [input] array.integer arr

// An array of integers.

// Guaranteed constraints:
// 3 ≤ arr.length ≤ 1800,
// 0 ≤ arr[i] ≤ 104.

// [output] integer

// Return the number of contiguous subarrays in which each element occurs at least twice.

function solution(arr) {
    var cntSub = 0;
  let N = arr.length
    var cntUnique = 0;
    var cntFreq = new Map();
  
    for (var i = 0; i < N;
         i++) {
        for (var j = i; j < N;
             j++) {
  
            if(cntFreq.has(arr[j]))
                cntFreq.set(arr[j], cntFreq.get(arr[j])+1)
            else
                cntFreq.set(arr[j], 1);

            if (cntFreq.get(arr[j])
                == 1) {
                cntUnique++;
            }
            else if (cntFreq.get(arr[j])
                     == 2) {
                cntUnique--;
            }
  
            if (cntUnique == 0) {
                cntSub++;
            }
        }

        cntFreq = new Map();
        cntUnique = 0;
    }
    return cntSub;
}
