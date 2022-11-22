import { CodeParser } from "../CodeParser";

const emptyProgram = ``;
const invalidStart = `module main {}`;
const noAlphabet = `alphabet = {}`;
const invalidLetterInAlphabet = `alphabet = {.}`;
const invalidAlphabetLen2 = `alphabet = {ab}`;
const alphabetNoCommas = `alphabet = {a b c}`;
const incompleteBracket = `alphabet = {a, b}
module main {`;
const noModules = `alphabet = {a, b}`;
const emptyModule = `alphabet = {a, b}
module main {}`;
const invalidDirection = `alphabet = {a, b}
module main {
    move up
}`;
const invalidCommand = `alphabet = {a, b}
module main {
    stop
}`;
const invalidCoreCommand = `alphabet = {a, b}
module main {
    switch tapehead {
        while a, b {
            accept
        }
    }
}`;
const whileNoLetter = `alphabet = {a, b}
module main {
    switch tapehead {
        while {}
    }
}`;
const whileNoCommand = `alphabet = {a, b}
module main {
    switch tapehead {
        while a {}
    }
}`;
const whileMultipleBlocks = `alphabet = {a, b}
module main {
    switch tapehead {
        while blank {
            move left
            move right
        }
    }
}`;
const emptySwitch = `alphabet = {a, b}
module main {
    switch tapehead {}
}`;
const ifNoLetter = `alphabet = {a, b}
module main {
    switch tapehead {
        if {}
    }
}`;
const ifNoBody = `alphabet = {a, b}
module main {
    switch tapehead {
        if a {

        }
    }
}`;
const invalidCase = `alphabet = {a, b}
module main {
    switch tapehead {
        when x {
            move right
        }
    }
}`;

test("CodeParser throws an error when the program is empty", () => {
    const parser = new CodeParser(emptyProgram);

    expect(() => {
        parser.parse();
    }).toThrow(new SyntaxError("Ln 1:2, Col 1:1- Empty file."));
});

test("CodeParser throws an error when the alphabet is not given", () => {
    const parser = new CodeParser(invalidStart);

    expect(() => {
        parser.parse();
    }).toThrow(new SyntaxError(`Ln 1:2, Col 1:7- Expected value "module" to be "alphabet".`));
});

test("CodeParser throws an error when the alphabet is empty", () => {
    const parser = new CodeParser(noAlphabet);

    expect(() => {
        parser.parse();
    }).toThrow(new SyntaxError(`Ln 1:2, Col 1:14- The alphabet must have at least one letter.`));
});

test("CodeParser throws an error when the alphabet contains an invalid letter", () => {
    const parser = new CodeParser(invalidLetterInAlphabet);
    
    expect(() => {
        parser.parse();
    }).toThrow(new SyntaxError(`Ln 1:2, Col 13:14- The value "." must be a lowercase character or a number.`));
});

test("CodeParser throws an error when a letter in the alphabet doesn't have length 1", () => {
    const parser = new CodeParser(invalidAlphabetLen2);
    
    expect(() => {
        parser.parse();
    }).toThrow(new SyntaxError(`Ln 1:2, Col 13:15- The value "ab" must have length 1.`));
});

test("CodeParser throws an error when a letter in the alphabet has no commas", () => {
    const parser = new CodeParser(alphabetNoCommas);
    
    expect(() => {
        parser.parse();
    }).toThrow(new SyntaxError(`Ln 1:2, Col 15:16- Expected value "b" to be "}".`));
});

test("CodeParser throws an error when a bracket isn't finished", () => {
    const parser = new CodeParser(incompleteBracket);

    expect(() => {
        parser.parse();
    }).toThrow(new SyntaxError(`Ln 2:3, Col 13:14- Unexpected end of file.`));
});

test("CodeParser throws an error when a program has no modules", () => {
    const parser = new CodeParser(noModules);

    expect(() => {
        parser.parse();
    }).toThrow(new SyntaxError(`Ln 1:2, Col 1:18- A program should have at least one module.`));
});

test("CodeParser throws an error when a module has no commands", () => {
    const parser = new CodeParser(emptyModule);

    expect(() => {
        parser.parse();
    }).toThrow(new SyntaxError(`Ln 2:3, Col 1:15- A module must have at least one block/command.`));
});

test("CodeParser throws an error when the move direction isn't valid", () => {
    const parser = new CodeParser(invalidDirection);

    expect(() => {
        parser.parse();
    }).toThrow(new SyntaxError(`Ln 3:4, Col 10:12- Invalid direction "up".`));
});

test("CodeParser throws an error when a command isn't valid", () => {
    const parser = new CodeParser(invalidCommand);
    
    expect(() => {
        parser.parse();
    }).toThrow(new SyntaxError(`Ln 3:4, Col 5:9- Invalid basic command "stop".`));
});

test("CodeParser throws an error when a non-core command is given as a core command", () => {
    const parser = new CodeParser(invalidCoreCommand);
        
    expect(() => {
        parser.parse();
    }).toThrow(new SyntaxError(`Ln 5:6, Col 13:19- Invalid core command "accept".`));
});

test("CodeParser throws an error when a while block has multiple basic blocks", () => {
    const parser = new CodeParser(whileMultipleBlocks);

    expect(() => {
        parser.parse();
    }).toThrow(new SyntaxError(`Ln 6:7, Col 13:17- A while case cannot have more than one core block.`));    
});

test("CodeParser throws an error when a switch command doesn't apply to any value", () => {
    const parser = new CodeParser(emptySwitch);

    expect(() => {
        parser.parse();
    }).toThrow(new SyntaxError(`Ln 3:4, Col 5:23- A switch block must have at least one case.`));    
});

test("CodeParser throws an error when an if case doesn't apply to any value", () => {
    const parser = new CodeParser(ifNoLetter);

    expect(() => {
        parser.parse();
    }).toThrow(new SyntaxError(`Ln 4:5, Col 9:11- An if case must apply to at least one letter.`));
});

test("CodeParser throws an error when an if case doesn't have any commands", () => {
    const parser = new CodeParser(ifNoBody);

    expect(() => {
        parser.parse();
    }).toThrow(new SyntaxError(`Ln 4:7, Col 9:10- An if case must have at least one command.`));
});

test("CodeParser throws an error when a while case doesn't apply to any value", () => {
    const parser = new CodeParser(whileNoLetter);

    expect(() => {
        parser.parse();
    }).toThrow(new SyntaxError(`Ln 4:5, Col 9:14- A while case must apply to at least one letter.`));
});

test("CodeParser throws an error when a while case doesn't have any commands", () => {
    const parser = new CodeParser(whileNoCommand);

    expect(() => {
        parser.parse();
    }).toThrow(new SyntaxError(`Ln 4:5, Col 9:14- A while case must have at least one command.`));
});

test("CodeParser throws an error when a case isn't an if or a while case", () => {
    const parser = new CodeParser(invalidCase);

    expect(() => {
        parser.parse();
    }).toThrow(new SyntaxError(`Ln 4:5, Col 9:13- Unexpected start of case: "when".`));
});