// reverse string
function reverseString(s) {
    let result = [];

    for (let i = s.length - 1; i >= 0; i--) {
        result.push(s[i]);
    }

    return result.join("");
}

// hre do not use result+= because string are immutable in js and a new string is created every iteration, old + new char repeated process
// worst case ti becomes O(n2) n-square
// so using push and join method will decrease complexity to O(n)

// miscellanous: recurrsion approach
function reverse(str) {
    if (str.length <= 1) return str

    return reverse(str.slice(1)) + str[0]
}

console.log(reverse("hello")) // "olleh"