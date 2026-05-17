import https from "node:https";
import fs from "node:fs";

https.get("https://kiryo-shogi1.vercel.app/assets/index-BK2lE1C_.js", (res) => {
  let data = "";
  res.on("data", (chunk) => { data += chunk; });
  res.on("end", () => {
    let arrayStart = data.indexOf("[{id:1,title:");
    if (arrayStart !== -1) {
      let depth = 0;
      let inString = false;
      let escape = false;
      let endIdx = -1;
      for (let i = arrayStart; i < data.length; i++) {
        let c = data[i];
        if (escape) { escape = false; continue; }
        if (c === '\\') { escape = true; continue; }
        if (c === '"') { inString = !inString; continue; }
        if (!inString) {
          if (c === '[') depth++;
          else if (c === ']') {
            depth--;
            if (depth === 0) {
              endIdx = i;
              break;
            }
          }
        }
      }
      if (endIdx !== -1) {
        let arrStr = data.substring(arrayStart, endIdx + 1);
        try {
          let parsed = (new Function('return ' + arrStr))();
          fs.writeFileSync("./src/data/problems.json", JSON.stringify(parsed, null, 2));
          console.log("Extracted items:", parsed.length);
        } catch (err) {
          console.error("Eval error", err);
        }
      }
    }
  });
}).on("error", (err) => console.error(err.message));
