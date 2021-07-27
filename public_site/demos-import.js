import fs from 'fs-extra';
import {
    readdir
} from 'fs/promises';
import trash from 'trash';
import listFolders from './listFolders.js'

listFolders.forEach(async (demo) => {
    console.log("trash old files");
    await trash(`./static/demos`);
    await cleanFolder(demo);
    console.log("copy to src/demos");
    await importFolderSRC(demo);
    console.log("copy to static/demos");
    await importFolderSTATIC(demo);
    console.log("OK - completed")
})

async function cleanFolder(name) {
    console.log(`trashing ${name}`);
    await trash(`./src/demos/${name}`);
    console.log(`clean ok: ${name}`);
};


async function importFolderSRC(name) {
    console.log(`copying ${name} to src/demos`);
    try {
        fs.copySync(`../${name}`, `./src/demos/${name}`, {
            filter: filterFuncSRC
        });
        console.log(`ok: ${name}`);
    } catch (err) {
        console.error(err)
    }
};

async function importFolderSTATIC(name) {
    console.log(`copying ${name} to static/demos`);
    const listDir = await readDir(`../${name}`);
    listDir.forEach(d => {
        try {
            fs.copySync(`../${name}/${d}/demo`, `./static/demo/${name}/${d}`, {
                filter: filterFuncSTATIC
            });
        } catch (err) {
            console.error(err);
        }
    })
};

function filterFuncSRC(src, dest) {
    // it will be copied if return true
    const isDemoFolder = isDemoPath(src, dest);
    const isSourcePathFolder = isSourcePathFiles(src, dest);
    return !isDemoFolder && !isSourcePathFolder;
}

function filterFuncSTATIC(src) {
    // it will be copied if return true
    const isDemoFolder = isDemoPath(src);
    return isDemoFolder
}

function isDemoPath(src) {
    const pSrc = src.replaceAll(`\\`, "/")
    const p = pSrc.split('/');
    return p.includes("demo");
}

function isSourcePathFiles(src) {
    const p = src.split('\\');
    return p.includes("source") && p.includes("files")
}

async function readDir(src) {
    let listDir = await readdir(src);
    return listDir;
}

// try {
//     const files = await readdir(path);
//     for (const file of files)
//         console.log(file);
// } catch (err) {
//     console.error(err);
// }