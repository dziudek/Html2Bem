describe("LESS Parser - 1 space indent", function() {
    var parser = new Html2Bem();
    parser.indentLength = 1;
    parser.outputLanguage = 'less';
    parser.indentType = "spaces";

    it("Single CSS class", function () {
        parser.inputCodeToParse = '<div class="lorem"></div>';
        var output = parser.findCssClasses();
        expect(output).toBe(".lorem {}\n");
    });

    it("Multiple CSS classes", function () {
        parser.inputCodeToParse = '<div class="lorem ipsum dolor"></div>';
        var output = parser.findCssClasses();
        expect(output).toBe(".dolor {}\n\n.ipsum {}\n\n.lorem {}\n");
    });

    it("BEM elements in blocks", function () {
        parser.inputCodeToParse = '<div class="header"><div class="header__logo"></div></div>';
        var output = parser.findCssClasses();
        expect(output).toBe(".header {\n &__logo {}\n}\n");
    });

    it("BEM modifiers in blocks and elements", function () {
        parser.inputCodeToParse = '<div class="header header--beta"><div class="header__logo header__logo--beta"></div></div>';
        var output = parser.findCssClasses();
        expect(output).toBe(".header {\n &--beta {}\n\n &__logo {\n  &--beta {}\n }\n}\n");
    });

    it("Multiple elements", function () {
        parser.inputCodeToParse = '<div class="header"><div class="header__logo"></div></div><div class="content"><div class="content__section"></div></div>';
        var output = parser.findCssClasses();
        expect(output).toBe(".content {\n &__section {}\n}\n\n.header {\n &__logo {}\n}\n");
    });
});

describe("LESS Parser - 1 tab indent", function() {
    var parser = new Html2Bem();
    parser.indentLength = 1;
    parser.outputLanguage = 'less';
    parser.indentType = "tabs";

    it("Single CSS class", function () {
        parser.inputCodeToParse = '<div class="lorem"></div>';
        var output = parser.findCssClasses();
        expect(output).toBe(".lorem {}\n");
    });

    it("Multiple CSS classes", function () {
        parser.inputCodeToParse = '<div class="lorem ipsum dolor"></div>';
        var output = parser.findCssClasses();
        expect(output).toBe(".dolor {}\n\n.ipsum {}\n\n.lorem {}\n");
    });

    it("BEM elements in blocks", function () {
        parser.inputCodeToParse = '<div class="header"><div class="header__logo"></div></div>';
        var output = parser.findCssClasses();
        expect(output).toBe(".header {\n\t&__logo {}\n}\n");
    });

    it("BEM modifiers in blocks and elements", function () {
        parser.inputCodeToParse = '<div class="header header--beta"><div class="header__logo header__logo--beta"></div></div>';
        var output = parser.findCssClasses();
        expect(output).toBe(".header {\n\t&--beta {}\n\n\t&__logo {\n\t\t&--beta {}\n\t}\n}\n");
    });

    it("Multiple elements", function () {
        parser.inputCodeToParse = '<div class="header"><div class="header__logo"></div></div><div class="content"><div class="content__section"></div></div>';
        var output = parser.findCssClasses();
        expect(output).toBe(".content {\n\t&__section {}\n}\n\n.header {\n\t&__logo {}\n}\n");
    });
});
