var $content = '<main class="app"> <div class="app__wrapper"> <h1 class="app__header"> HTML 2 BEM <small class="app__version">v.0.4.1</small> </h1> <label class="app__option filter"> Filter: <input class="filter__input" value="" placeholder="Put filter for CSS classes" /> </label> <div class="app__option mode"> <strong class="mode__name">Select mode:</strong> <label class="mode__label"> <input type="radio" class="mode__input" name="outputLanguage" value="less" checked />LESS </label> <label class="mode__label"> <input type="radio" class="mode__input" name="outputLanguage" value="sass" />Sass </label> <label class="mode__label"> <input type="radio" class="mode__input" name="outputLanguage" value="css" />CSS </label> </div><!-- .app__option.outputLanguage --> <div class="app__option indent"> <strong class="indent__name">Select indent:</strong> <select name="character" class="indent__input indent__input--type"> <option value="tabs" selected>Tabs</option> <option value="spaces">Spaces</option> </select><!-- .indent__input --> <select name="length" class="indent__input indent__input--length"> <option value="1" selected>1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> </select><!-- .indent__input --> </div><!-- .app__option.indent --> <div class="app__textareas"> <textarea class="app__input" placeholder="Paste your HTML code here..."></textarea> <textarea class="app__output" readonly placeholder="Your BEM classes will appear here..."></textarea> </div></div><!-- .app__wrapper --></main><!-- .app -->';

describe("Main app file", function() {
    var $container = jQuery('');

    beforeEach(function(){
        $container = jQuery($content).appendTo('body');
    });

    afterEach(function(){
        $container.remove();
        localStorage.clear();
    });

    it("Default settings", function () {
        var app = new Html2Bem();
        expect(app.outputLanguage).toBe("less");
        expect(app.indentType).toBe("tabs");
        expect(app.indentLength).toBe(1);
    });

    it("Emulate custom settings from localStorage", function () {
        localStorage.setItem('bem-outputLanguage', 'css');
        localStorage.setItem('bem-indentType', 'spaces');
        localStorage.setItem('bem-indentLength', '2');

        var app = new Html2Bem();
        expect(app.outputLanguage).toBe("css");
        expect(app.indentType).toBe("spaces");
        expect(app.indentLength).toBe('2');
    });

    it("Getting parser class name - default settings", function () {
        var app = new Html2Bem();
        expect(app.getParserClassName()).toBe("LessParser");
    });

    it("Getting parser class name - custom settings", function () {
        localStorage.setItem('bem-outputLanguage', 'css');
        var app = new Html2Bem();
        expect(app.getParserClassName()).toBe("CssParser");
    });

    it("Finding CSS classes in the input - empty input", function() {
        var app = new Html2Bem();
        expect(app.findCssClasses()).toBe('');
    });

    it("Finding CSS classes in the input - input without CSS classes", function() {
        var app = new Html2Bem();
        var input = jQuery('.app__input');
        input.val('Lorem ipsum dolor sit amet');
        app.initializeUI();
        app.inputCodeToParse = input.val();
        expect(app.findCssClasses()).toBe('There is no class attributes in the text input');
    });

    it("Filtering CSS classes in the input - proper match - the same strings", function() {
        var app = new Html2Bem();
        app.selectorFilterValue = '.lorem';
        expect(app.filterCssClasses('.lorem')).toBe(true);
    });

    it("Filtering CSS classes in the input - proper match - different strings", function() {
        var app = new Html2Bem();
        app.selectorFilterValue = '.lorem';
        expect(app.filterCssClasses('.lorem__ipsum')).toBe(true);
    });

    it("Filtering CSS classes in the input - wrong match - different strings", function() {
        var app = new Html2Bem();
        app.selectorFilterValue = '.dolor';
        expect(app.filterCssClasses('.lorem__ipsum')).toBe(false);
    });

    it("Running CSS filters - empty filter", function() {
        var app = new Html2Bem();
        app.parsingResults = ['.lorem','.ipsum','.dolor'];
        app.selectorFilterValue = '';
        expect(app.runCssClassesFilter()).toEqual(['.lorem','.ipsum','.dolor']);
    });
});
