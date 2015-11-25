describe("Array Helper - clean up array", function() {
    it("Remove PHP tags", function () {
        var arrayToTest = ['class="lorem<?php echo "ipsum"; ?>"'];
        arrayToTest = arrayToTest.map(ArrayHelper.cleanUpArray);
        expect(arrayToTest).toEqual([['lorem']]);
    });

    it("Remove class attributes", function () {
        var arrayToTest = ['class="lorem"'];
        arrayToTest = arrayToTest.map(ArrayHelper.cleanUpArray);
        expect(arrayToTest).toEqual([['lorem']]);
    });

    it("Split multiple CSS classes into an array", function () {
        var arrayToTest = ['class="lorem ipsum"'];
        arrayToTest = arrayToTest.map(ArrayHelper.cleanUpArray);
        expect(arrayToTest).toEqual([['lorem', 'ipsum']]);
    });
});

describe("Array Helper - flat array", function() {
    it("Change multidimensional array into flat array", function () {
        var arrayToTest = [[1, 2], [1, 1], [1, 2]];
        arrayToTest = arrayToTest.reduce(ArrayHelper.flatArray);
        expect(arrayToTest).toEqual([1, 2, 1, 1, 1, 2]);
    });
});

describe("Array Helper - remove duplicates", function() {
    it("Remove duplicated integers", function () {
        var arrayToTest = [1,2,1,1,1,2];
        arrayToTest = arrayToTest.filter(ArrayHelper.removeDuplicates);
        expect(arrayToTest).toEqual([1,2]);
    });

    it("Remove duplicated strings", function () {
        var arrayToTest = ["1","2","1","1","1","2"];
        arrayToTest = arrayToTest.filter(ArrayHelper.removeDuplicates);
        expect(arrayToTest).toEqual(["1","2"]);
    });

    it("Empty array", function () {
        var arrayToTest = [];
        arrayToTest = arrayToTest.filter(ArrayHelper.removeDuplicates);
        expect(arrayToTest).toEqual([]);
    });
});

describe("Array Helper - remove empty elements", function() {
    it("Clean up empty strings", function () {
        var arrayToTest = [1, 2, '', 3, "", 4, 5];
        arrayToTest = arrayToTest.filter(ArrayHelper.removeEmptyElements);
        expect(arrayToTest).toEqual([1,2,3,4,5]);
    });
});
