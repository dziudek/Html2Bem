var StringHelper = function(applicationInstance) {
    this.indentLength = applicationInstance.indentLength;
    this.indentType = applicationInstance.indentType;
};

StringHelper.prototype.addIndent = function (indentLenght) {
    var outputIndent = '';
    var indentCharacter = '';
    indentLenght = indentLenght || 1;
    indentLenght = indentLenght * parseInt(this.indentLength, 10);

    if (this.indentType === "spaces") {
        indentCharacter = " ";
    }

    if (this.indentType === "tabs") {
        indentCharacter = "\t";
    }

    for (var i = 0; i < indentLenght; i++) {
        outputIndent += indentCharacter;
    }

    return outputIndent;
};
