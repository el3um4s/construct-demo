import {
    existsSync,
    readdirSync,
    copyFileSync
} from "fs";
import path from "path";

function renameDist(arg) {
    const {
        dir,
        match,
        replace,
        destination,
    } = arg;
    console.log(`Rename js and css in "${dir}"...`);
    if (existsSync(dir)) {
        const files = readdirSync(dir);
        console.log(files);
        files.filter(file => file.match(match)).forEach(file => {
            const filePath = path.join(dir, file);
            const newFilePath = path.join(destination, file.replace(match, replace));
            copyFileSync(filePath, newFilePath);
        })
    }
}

const dir = "./dist/assets";

renameDist({
    dir,
    match: RegExp(/\-(.*?)\.js/, "gi"),
    replace: ".js",
    destination: "../../scripts/svelte"
});

renameDist({
    dir,
    match: RegExp(/\-(.*?)\.css/, "gi"),
    replace: ".css",
    destination: "../../files"
})