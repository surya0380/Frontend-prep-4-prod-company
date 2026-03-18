//Move all zeros to end
//trick:
// Array: [0, 1, 0, 3, 12]

// Step 1: Find first non-zero (1)
//         insertPos = 0 (position to fill)
//         Put 1 at position 0
//         [1, 1, 0, 3, 12]
//         insertPos = 1

// Step 2: Find next non-zero (3)
//         Put 3 at position 1
//         [1, 3, 0, 3, 12]
//         insertPos = 2

// Step 3: Find next non-zero (12)
//         Put 12 at position 2
//         [1, 3, 12, 3, 12]
//         insertPos = 3

// Step 4: Fill remaining with zeros
//         [1, 3, 12, 0, 0]

var moveZeroes = function(nums) {
    // insertPos tracks where to place next non-zero element
    let insertPos = 0;
    
    // First pass: move all non-zeros to the front
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[insertPos] = nums[i];
            insertPos++;
        }
    }
    
    // Second pass: fill remaining positions with zeros
    for (let i = insertPos; i < nums.length; i++) {
        nums[i] = 0;
    }
};