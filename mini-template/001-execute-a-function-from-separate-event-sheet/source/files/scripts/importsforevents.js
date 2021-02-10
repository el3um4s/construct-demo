import * as Printer from "./printer.js";

function choose(...args) {
    const index = Math.floor(Math.random() * args.length);
    return args[index]
}