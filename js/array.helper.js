var ArrayHelper = {
    cleanUpArray: function(arrayItem) {
        // remove PHP tags
        arrayItem = arrayItem.replace(/<\?php[\s\S]*(.*?)[\s\S]*\?>/gim, '');
        // remove unnecessary text class="..."
        arrayItem = arrayItem.replace('class="', '');
        arrayItem = arrayItem.replace('"', '');
        // change items with more than 1 CSS class into array
        arrayItem = arrayItem.split(" ");

        return arrayItem;
    },

    flatArray: function(finalArray, nextArrayItem) {
        return finalArray.concat(nextArrayItem);
    },

    removeDuplicates: function(arrayItem, itemPosition, parsingResults) {
        return parsingResults.indexOf(arrayItem) == itemPosition;
    },

    removeEmptyElements: function(arrayItem) {
        return arrayItem !== '';
    }
};
