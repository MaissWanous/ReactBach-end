//import { isEmpty } from "lodash";

const { isEmpty } = require("lodash");

module.exports = {
    Login: function (app, dir) {
        let obj;
        const monk = require("monk");
        var url = "mongodb://0.0.0.0:27017/React";
        const db = monk(url);
        const collection = db.get("SignUP");
        app.post("/login", async (req, res) => {
            const { email, password } = req.body;
            console.log(email + " " + password);
            obj = {
                Email: email,
            }
            async function pass() {
                return new Promise((resolve, reject) => {
                    collection.find(obj, function (err, docs) {
                        if (err) {
                            console.log(err);
                            reject(err);
                        }
                        Info = docs;
                        resolve({ Info });
                    });
                });
            }

            const result = await pass();
            var check = result.Info[0]?.Password;
            if (check != password || isEmpty(check))
                res.status(422).json({ error: "Uncorrect password or the Email you entered not exist" })
            else
                res.send("The data was successfully received");
        })
    }
}