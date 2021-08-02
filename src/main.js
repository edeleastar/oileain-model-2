import * as fs from "fs";
import { generateAllIslands, generateAllSlim, } from "./controllers/generator.js";
let islandMap = new Map();
let coasts;
coasts = JSON.parse(fs.readFileSync("./src/api/all.json", "utf-8"));
let duplicates = 0;
coasts.forEach((coast) => {
    coast.pois.forEach((poi) => {
        if (islandMap.get(poi.safeName)) {
            console.log(poi.name);
            duplicates++;
            poi.safeName = poi.safeName + "-" + duplicates;
        }
        islandMap.set(poi.safeName, poi);
    });
});
console.log(duplicates);
generateAllSlim(coasts, "./api/oileain-all-slim.json");
generateAllIslands(coasts, "./api");
//# sourceMappingURL=main.js.map