import * as fs from "fs";
import { verifyFolder } from "../utils/futils.js";
function generateJson(obj, path) {
    const s = JSON.stringify(obj);
    fs.writeFileSync(path, s, "utf8");
}
export function generateCoasts(coasts, path) {
    let coastsObj = [];
    coasts.forEach((coast) => {
        let coastObj = {};
        coastObj.title = coast.title;
        coastObj.geo = coast.geo;
        coastObj.variable = coast.variable;
        coastsObj.push(coastObj);
    });
    generateJson(coastsObj, path);
}
export function generateEachCoast(coasts, path) {
    coasts.forEach((coast) => {
        let coastObj = [];
        coast.pois.forEach((poi) => {
            let poiObj = {};
            poiObj.safeName = poi.safeName;
            poiObj.nameHtml = poi.nameHtml;
            poiObj.geo = poi.coordinates.geo;
            coastObj.push(poiObj);
        });
        generateJson(coastObj, path + "/" + coast.variable + ".json");
    });
}
export function generateAllSlim(coasts, path) {
    let coastsObj = [];
    coasts.forEach((coast) => {
        let coastObj = {};
        coastObj.title = coast.title;
        coastObj.geo = coast.geo;
        coastObj.variable = coast.variable;
        coastObj.pois = [];
        coast.pois.forEach((poi) => {
            let poiObj = {};
            poiObj.name = poi.nameHtml;
            poiObj.safeName = poi.safeName;
            poiObj.coordinates = { geo: poi.coordinates.geo };
            coastObj.pois.push(poiObj);
        });
        coastsObj.push(coastObj);
    });
    generateJson(coastsObj, path);
}
export function generateAllIslands(coasts, path) {
    coasts.forEach((coast) => {
        verifyFolder(path + "/" + coast.variable);
        coast.pois.forEach((poi) => {
            generateJson(poi, path + "/" + coast.variable + "/" + poi.safeName + ".json");
        });
    });
}
//# sourceMappingURL=generator.js.map