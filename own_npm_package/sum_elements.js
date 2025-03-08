const sumValue = (arr) =>{
    const newArr = new Set(arr);
    
    let sum = 0;
    for(let i of newArr){
        sum += i;
        i++;
    }
    return sum;
}

// console.log(sumValue([2,3,4,5,6]));

module.exports = sumValue;