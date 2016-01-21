var LessParser = function (applicationInstance) {
    this.parentStack = [];
    this.parsingResults = applicationInstance.parsingResults;
    this.stringHelper = new StringHelper(applicationInstance);
    this.outputLESS = '';
};

LessParser.prototype.cleanUpTheCode = function() {
    this.outputLESS = this.outputLESS.replace(/\{\n/g, '{');
    this.outputLESS = this.outputLESS.replace(/\{\s*?\}/g, '{}');
};

LessParser.prototype.addClosingBrackets = function() {
    while (this.parentStack.length > 0) {
        this.parentStack.pop();
        this.outputLESS += this.stringHelper.addIndent(this.parentStack.length - 1) + '}' + "\n";
    }
};

LessParser.prototype.firstLevel = function(iteration) {
    this.outputLESS += '.' + this.parsingResults[iteration] + ' {' + "\n";
    this.parentStack.push(this.parsingResults[iteration]);
};

LessParser.prototype.deeperLevels = function(iteration) {
    var founded = false;

    while (this.parentStack.length > 0) {
        var item = this.parentStack[this.parentStack.length - 1];

        if (this.isChild(iteration, item)) {
            this.parentStack.push(this.parsingResults[iteration]);
            this.outputLESS += "\n" + this.stringHelper.addIndent((this.parentStack.length - 1)) + this.parsingResults[iteration].replace(item, '&') + ' {' + "\n";
            founded = true;
            break;
        } else {
            this.parentStack.pop();
            this.outputLESS += this.stringHelper.addIndent(this.parentStack.length) + '}' + "\n";
        }
    }

    if (!founded) {
        this.outputLESS += "\n" + '.' + this.parsingResults[iteration] + ' {' + "\n";
        this.parentStack.push(this.parsingResults[iteration]);
    }
};

LessParser.prototype.isChild = function(iteration, item) {
    var containsClassName = this.parsingResults[iteration].substring(0, item.length) === item;
    var hasElementSeparator = this.parsingResults[iteration].replace(item, '&')[1] === '_';
    var hasModifierSeparator = this.parsingResults[iteration].replace(item, '&')[1] === '-';
    var containsSeparators = hasElementSeparator || hasModifierSeparator;

    return containsClassName && containsSeparators;
};

LessParser.prototype.generateCode = function() {
    for (var i = 0; i < this.parsingResults.length; i++) {
        if (this.parentStack.length === 0) {
            this.firstLevel(i);
        } else {
            this.deeperLevels(i);
        }
    }

    this.addClosingBrackets();
    this.cleanUpTheCode();

    return this.outputLESS;
};
