const fs = require("fs");

const [, , fileName, name, age, ...langs] = process.argv;

console.log(langs);

return;

try {
  users = require(`./${fileName}`);
} catch {
  console.log("Error while requiring file");
}

// Defining new user
let user = {
  id: users.length + 1,
  name,
  age: +age,
  language: langs,
};

// STEP 2: Adding new data to users object
if (!users) {
  users = [];
}
users.push(user);

try {
  fs.writeFile(`${fileName}.json`, JSON.stringify(users), (err) => {
    // Checking for errors
    if (err) throw err;

    // Success
    console.log("Done writing"); 
  });
} catch (e) {
  console.log("here");
}
