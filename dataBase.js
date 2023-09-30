
module.exports = {
    dataBase: function (app, dir) {
        const monk = require("monk");
        var url = "mongodb://0.0.0.0:27017/React";
        const db = monk(url);
        const collection = db.get("SignUP");
        let obj
        app.post("/delete", (req, res) => {
            obj = req.body;
            collection.remove({ Email: obj.email }, () => {
                console.log("Delete one")
            })
            res.send()
        })
        app.post("/update", (req, res) => {
            obj = req.body;
            res.send()
        })

        app.get("/DataOne", async (req, res) => {
            async function TEmail() {
                return new Promise((resolve, reject) => {
                    collection.find({ Email: obj.email }, function (err, docs) {
                        if (err) {
                            console.log(err);
                            reject(err);
                        }
                        Info = docs;
                        resolve({ Info });
                    });
                });
            }

            const result = await TEmail();
            var data = result.Info;
            res.json(data)

        })

        app.post("/UpdateOne", (req, res) => {
            const { name, email, password } = req.body;
            collection.update({ Email: obj.email }, { $set: { Name: name, Email: email, Password: password } }, () => {
                console.log("Update one")
            })
            res.send()

        })
        app.get("/data", async (req, res) => {
            async function TEmail() {
                return new Promise((resolve, reject) => {
                    collection.find({}, function (err, docs) {
                        if (err) {
                            console.log(err);
                            reject(err);
                        }
                        Info = docs;
                        resolve({ Info });
                    });
                });
            }

            const result = await TEmail();
            var data = result.Info;
            res.json(data)

        })

    }
}