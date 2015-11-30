var SassParser = function (applicationInstance) {
    this.parentStack = [];
    this.parsingResults = applicationInstance.parsingResults;
    this.stringHelper = new StringHelper(applicationInstance);
    this.outputSass = '';
};

SassParser.prototype.firstLevel = function(iteration) {
    this.outputSass += '.' + this.parsingResults[iteration] + "\n";
    this.parentStack.push(this.parsingResults[iteration]);
};

SassParser.prototype.deeperLevels = function(iteration) {
    var founded = false;

    while (this.parentStack.length > 0) {
        var item = this.parentStack[this.parentStack.length - 1];

        if (this.isChild(iteration, item)) {
            this.parentStack.push(this.parsingResults[iteration]);
            this.outputSass += this.stringHelper.addIndent((this.parentStack.length - 1)) + this.parsingResults[iteration].replace(item, '&') + "\n";
            founded = true;
            break;
        } else {
            this.parentStack.pop();
        }
    }

    if (!founded) {
        this.outputSass += '.' + this.parsingResults[iteration] + "\n";
        this.parentStack.push(this.parsingResults[iteration]);
    }
};

SassParser.prototype.isChild = function(iteration, item) {
    var containsClassName = this.parsingResults[iteration].substring(0, item.length) === item;
    var hasElementSeparator = this.parsingResults[iteration].replace(item, '&')[1] === '_';
    var hasModifierSeparator = this.parsingResults[iteration].replace(item, '&')[1] === '-';
    var containsSeparators = hasElementSeparator || hasModifierSeparator;

    return containsClassName && containsSeparators;
};

SassParser.prototype.generateCode = function() {
    for (var i = 0; i < this.parsingResults.length; i++) {
        if (this.parentStack.length === 0) {
            this.firstLevel(i);
        } else {
            this.deeperLevels(i);
        }
    }

    return this.outputSass;
};
