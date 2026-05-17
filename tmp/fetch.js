const https = require("https");
const fs = require("fs");

https.get("https://kiryo-shogi1.vercel.app/assets/index-BK2lE1C_.js", (res) => {
  let data = "";
  res.on("data", (chunk) => { data += chunk; });
  res.on("end", () => {
    fs.writeFileSync("/tmp/index.js", data);
    console.log("Downloaded successfully.");
  });
}).on("error", (err) => console.error(err.message));
