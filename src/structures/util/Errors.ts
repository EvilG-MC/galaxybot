
export class InvalidVariable extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Galaxy [InvalidVariable]";
    };
};

export class InvalidHexColor extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Galaxy [InvalidHexColor]";
    };
};

export class InvalidImport extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Galaxy [InvalidImport]";
    };
};