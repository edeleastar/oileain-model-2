import fs from "fs";
import path from "path";
import sh from "shelljs";
sh.config.silent = true;
export function writeFile(folder, filename, contents) {
    if (!fs.existsSync(folder)) {
        sh.mkdir(folder);
    }
    return fs.writeFileSync(folder + "/" + filename, contents, "utf8");
}
export function readFile(path) {
    if (fs.existsSync(path)) {
        const array = fs.readFileSync(path).toString().split("\n");
        return array[0];
    }
    else {
        console.log("unable to locate " + path);
    }
    return "";
}
export function readFileFromTree(path) {
    for (let i = 0; i < 5; i++) {
        if (fs.existsSync(path)) {
            return readFile(path);
        }
        else {
            path = "../" + path;
        }
    }
    return "";
}
export function getImageFile(name) {
    const validImageTypes = ["png", "jpg", "jpeg", "gif"];
    for (let type of validImageTypes) {
        const image = name + "." + type;
        if (fs.existsSync(image)) {
            return image;
        }
    }
    return "";
}
export function getParentFolder() {
    return path.basename(path.dirname(process.cwd()));
}
export function getDirectories(srcpath) {
    return fs.readdirSync(srcpath).filter(function (file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
}
export function verifyFolder(folder) {
    if (!fs.existsSync(folder)) {
        sh.mkdir("-p", folder);
    }
}
export function copyFileToFolder(src, dest) {
    if (fs.existsSync(src)) {
        sh.mkdir("-p", dest);
        sh.cp("-rf", src, dest);
    }
}
export function getCurrentDirectory() {
    return sh.pwd();
}
export function initEmptyPath(path) {
    if (fs.existsSync(path)) {
        sh.rm("-rf", path);
    }
    sh.mkdir("-p", path);
}
export function copyFolder(src, dest) {
    sh.mkdir("-p", dest);
    sh.cp("-rf", src, dest);
}
export function getIgnoreList() {
    const ignoreList = [];
    if (fs.existsSync("mbignore")) {
        const array = fs.readFileSync("mbignore").toString().split("\n");
        for (let i = 0; i < array.length; i++) {
            ignoreList[i] = array[i].trim();
        }
    }
    return ignoreList;
}
//# sourceMappingURL=futils.js.map