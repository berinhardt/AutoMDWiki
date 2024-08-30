const FS = require("fs");
const TARGET = process.argv[2];
const properCase = (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();

let NAVIGATION = "";
let CONFIG = {
    "useSideMenu": true,
    "lineBreaks": "gfm",
    "anchorCharacter": "&#x2693;",
    "title": TARGET
};
FS.writeFileSync("config.json", JSON.stringify(CONFIG));
parseDirectory(TARGET, "");
NAVIGATION += "[MD](markdown.md)\n\n";
NAVIGATION += "[gimmick:theme (inverse: false)](cyborg)\n\n";
FS.writeFileSync("navigation.md", NAVIGATION);

function parseDirectory(dir, name, prefix = null) {
    if (prefix === null) {
        let n = dir.replace(/\w\S*/g, properCase);
        NAVIGATION += "# "+n+"\n\n";
        prefix = "";
    } else {
        NAVIGATION += prefix+"["+name+"]()\n\n";
        if (prefix == "") prefix = "- ";
        prefix = " "+prefix;
    }

    let files = FS.readdirSync(dir);
    
    for (let f in files) {
        let file = files[f];

        if (file == "index.md") {
            if (!prefix) FS.copyFileSync(dir+"/"+file, file);
        } else {
            let stats = FS.statSync(dir+"/"+file);
            if (stats.isDirectory()) {
                let name = file.replace(/^\d+_/, "");
                name = name.replace(/\w\S*/g, properCase);
                parseDirectory(dir+"/"+file, name, prefix);
            } else {
                let n = file.split(/\./)[0];
                n = n.replace(/^\d+_/, "");
                n = n.replace(/\-/, " ");
                n = n.replace(/\w\S*/g, properCase);
                NAVIGATION += prefix+"["+n+"]("+dir+"/"+file+")\n";
            }
        }
    }
    NAVIGATION += "\n";
}