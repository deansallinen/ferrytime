const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const { scrape } = require("./getSailingsArray.js");

const main = async () => {
try {
  // `who-to-greet` input defined in action metadata file
  // const nameToGreet = core.getInput('who-to-greet');
  // core.setOutput("time", time);
  console.log('Starting scrape');
  const sailings = scrape();
  const jsonObj = JSON.stringify(await sailings);
  console.log(jsonObj);
  core.setOutput("sailings", jsonObj);
  fs.writeFile("sailings.json", jsonObj, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
});
} catch (error) {
  core.setFailed(error.message);
}
}

main();
