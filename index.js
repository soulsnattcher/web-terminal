const Server = require("socket.io");
const express = require("express");
const app = express();
const serv = require("http").createServer(app);
const io = Server(serv);

var RouterJSON = require("./router.json");

RouterJSON.router.forEach(({path, file}) => {
    if(path === "assets") return app.use('/', express.static(file));
    app.get(path, (req, res) => {
        res.render(file, {
            io
        });
    });
    console.log('%s yolu %s dosyasına yönlendirildi.', path, file);
});

setInterval(() => {
    RouterJSON = requireUncached('./router.json');
    RouterJSON.router.forEach(({path, file}) => {
        app.get(path, (req, res) => {
            res.render(file, {
                io
            });
        });
    });
}, 15000);

app.listen(9090, () => console.log("9090 portu dinleniyor."));


function requireUncached(module) {
    delete require.cache[require.resolve(module)];
    return require(module);
}