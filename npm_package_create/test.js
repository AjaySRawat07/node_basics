// a function to find a number in a shorted array

const readline = require("node:readline");
const binarySearch = require("./index");

const rl =  readline.createInterface({
    input : process.stdin,
    output : process.stdout,
});

rl.question("Enter a shorted array ",(newArray)=> {
        rl.question("Enter number to search ",(xNum)=>{
           const arr = newArray.split(",").map(Number);
           const x = Number(xNum);


           const result = binarySearch(arr,x);

           if(result === -1){
               console.log("Element not present in Array");
           }else{
               console.log("Element is present at index "+ result);
           }
           rl.close();
    })
})


