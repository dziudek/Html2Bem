describe("String Helper", function() {
    it("Empty parameter", function() {
        var parser = new Html2Bem();
        parser.indentLength = 1;
        parser.indentType = "spaces";
        var stringHelper = new StringHelper(parser);
        expect(stringHelper.addIndent()).toBe(" ");
    });

    it("Use 3 single spaces", function() {
        var parser = new Html2Bem();
        parser.indentLength = 1;
        parser.indentType = "spaces";
        var stringHelper = new StringHelper(parser);
        expect(stringHelper.addIndent(3)).toBe("   ");
    });

    it("Use 3 single tabs", function() {
        var parser = new Html2Bem();
        parser.indentLength = 1;
        parser.indentType = "tabs";
        var stringHelper = new StringHelper(parser);
        expect(stringHelper.addIndent(3)).toBe("\t\t\t");
    });

    it("Use 2 double spaces", function() {
        var parser = new Html2Bem();
        parser.indentLength = 2;
        parser.indentType = "spaces";
        var stringHelper = new StringHelper(parser);
        expect(stringHelper.addIndent(2)).toBe("    ");
    });

    it("Use 2 double tabs", function() {
        var parser = new Html2Bem();
        parser.indentLength = 2;
        parser.indentType = "tabs";
        var stringHelper = new StringHelper(parser);
        expect(stringHelper.addIndent(2)).toBe("\t\t\t\t");
    });
});
