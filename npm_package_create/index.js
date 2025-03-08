const binarySearch = (arr, x) => {
    let low = 0, high = arr.length - 1, mid;

    while (low <= high) {
        mid = Math.floor((low + high) / 2);

        if (arr[mid] === x) return mid;
        else if (arr[mid] < x) low = mid + 1;
        else high = mid - 1;
    }

    return -1;
};

// Added new feature: Logging search result
module.exports = (arr, x) => {
    const result = binarySearch(arr, x);
    console.log(result !== -1 ? `Found at index ${result}` : "Not found");
    return result;
};
