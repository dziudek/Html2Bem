var Html2Bem = function () {
    this.loadApplicationSettings();
};

Html2Bem.prototype.loadApplicationSettings = function () {
    this.selectorFilterValue = '';
    this.outputLanguage = localStorage.getItem('bem-outputLanguage') || "less";
    this.inputCodeToParse = '';
    this.indentType = localStorage.getItem('bem-indentType') || "tabs";
    this.indentLength = localStorage.getItem('bem-indentLength') || 1;
    this.parsingResults = '';
};

Html2Bem.prototype.initializeUI = function () {
    var self = this;
    var filterField = document.querySelector('.filter__input');
    var inputField = document.querySelector('.app__input');
    var outputField = document.querySelector('.app__output');
    var indentCharacterSelect = document.querySelector('.indent__input--type');
    var indentLengthSelect = document.querySelector('.indent__input--length');
    var modeSelection = document.getElementsByName('outputLanguage');
    var indentOptions = document.querySelector('.indent');

    if (this.outputLanguage === 'css') {
        modeSelection[2].checked = true;
        indentOptions.classList.add('indent--hidden');
    }

    if (this.outputLanguage === 'sass') {
        modeSelection[1].checked = true;
    }

    if (this.indentLength > 1) {
        indentLengthSelect.querySelector('option[value="' + this.indentLength + '"]').selected = true;
    }

    if (this.indentType !== 'tabs') {
        indentCharacterSelect.querySelector('option[value="' + this.indentType + '"]').selected = true;
    }

    filterField.addEventListener('keyup', function () {
        self.selectorFilterValue = filterField.value;
        outputField.value = self.findCssClasses();
    }, false);

    inputField.addEventListener('keyup', function () {
        self.inputCodeToParse = inputField.value;
        outputField.value = self.findCssClasses();
    }, false);

    indentCharacterSelect.addEventListener('change', function () {
        self.indentType = indentCharacterSelect.value;
        outputField.value = self.findCssClasses();
        localStorage.setItem('bem-indentType', self.indentType);
    }, false);

    indentLengthSelect.addEventListener('change', function () {
        self.indentLength = indentLengthSelect.value;
        outputField.value = self.findCssClasses();
        localStorage.setItem('bem-indentLength', self.indentLength);
    }, false);

    modeSelection[0].addEventListener('click', function () {
        self.outputLanguage = modeSelection[0].value;
        outputField.value = self.findCssClasses();
        localStorage.setItem('bem-outputLanguage', self.outputLanguage);
        indentOptions.classList.remove('indent--hidden');
    }, false);

    modeSelection[1].addEventListener('click', function () {
        self.outputLanguage = modeSelection[1].value;
        outputField.value = self.findCssClasses();
        localStorage.setItem('bem-outputLanguage', self.outputLanguage);
        indentOptions.classList.remove('indent--hidden');
    }, false);

    modeSelection[2].addEventListener('click', function () {
        self.outputLanguage = modeSelection[2].value;
        outputField.value = self.findCssClasses();
        localStorage.setItem('bem-outputLanguage', self.outputLanguage);
        indentOptions.classList.add('indent--hidden');
    }, false);
};

Html2Bem.prototype.findCssClasses = function () {
    if (!this.inputCodeToParse) {
        return this.inputCodeToParse;
    }

    this.parsingResults = this.inputCodeToParse.match(/class="(.*?)"/g);

    if (!this.parsingResults) {
        return 'There is no class attributes in the text input';
    }

    return this.analyzeCssClasses();
};

Html2Bem.prototype.analyzeCssClasses = function() {
    // clean up and order the parsingResults
    this.parsingResults = this.parsingResults.map(ArrayHelper.cleanUpArray);
    this.parsingResults = this.parsingResults.reduce(ArrayHelper.flatArray);
    this.parsingResults = this.parsingResults.filter(ArrayHelper.removeDuplicates);
    this.parsingResults = this.parsingResults.filter(ArrayHelper.removeEmptyElements);
    this.parsingResults = this.parsingResults.sort();
    this.parsingResults = this.runCssClassesFilter();

    if (this.selectorFilterValue !== '' && !this.parsingResults.length) {
        return 'There is no classes matching your filter string value';
    }

    var parserClassName = this.getParserClassName();
    var parser = new window[parserClassName](this);

    return parser.generateCode();
};

Html2Bem.prototype.getParserClassName = function() {
    var className = this.outputLanguage.charAt(0).toUpperCase();
    className += this.outputLanguage.slice(1);
    className += 'Parser';

    return className;
};

Html2Bem.prototype.runCssClassesFilter = function() {
    if (this.selectorFilterValue !== '') {
        return this.parsingResults.filter(this.filterCssClasses.bind(this));
    }

    return this.parsingResults;
};

Html2Bem.prototype.filterCssClasses = function(parsingItem) {
    var filterStringLen = this.selectorFilterValue.length;
    var stringToComparision = parsingItem.substring(0, filterStringLen);

    return stringToComparision === this.selectorFilterValue;
};

var app = new Html2Bem();

if(!window.__karma__) {
    app.initializeUI();
}
