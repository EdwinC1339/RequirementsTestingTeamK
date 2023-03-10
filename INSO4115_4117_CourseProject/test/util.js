function arr_equal_no_order(arr1, arr2) {
    return arr_equal(arr1.sort(), arr2.sort());
}
function arr_equal(arr1, arr2) {
    if (arr1.length === arr2.length) {
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
    } else {
        return false;
    }
    return true;
}

export default {
    arr_equal,
    arr_equal_no_order
}