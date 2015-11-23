var CssParser = function (applicationInstance) {
    this.cssOutput = '';
    this.parsingResults = applicationInstance.parsingResults;
};

CssParser.prototype.generateCode = function() {
    for (var i = 0; i < this.parsingResults.length; i++) {
        this.cssOutput += '.' + this.parsingResults[i] + ' {}' + "\n";
    }

    return this.cssOutput;
}
