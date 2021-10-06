const http = require("http");
const express = require("express");
const es6Renderer = require("express-es6-template-engine");
const data = require("./data");

const hostname = "127.0.0.1";
const port = 3001;

const app = express();

const server = http.createServer(app);

//configure the template engine
app.engine("html", es6Renderer);
app.set("views", "views"); //where to look for the templates (AKA views)
app.set("view engine", "html"); //which template enginer should express use

app.get("/", (req, res) => {
  res.render("home", {
    locals: {
      foods: data,
      title: "Breakfast Foods",
    },
    partials: {
      head: "partials/head",
    },
  }); //views/home.html
});

app.get("/:handle", (req, res) => {
  const { handle } = req.params;
  const food = data.find((profile) => profile.handle === handle);
  if (!food) {
    res.status(404).send("Could not find that food");
  } else {
    res.render("food-profile", {
      locals: {
        food: food,
        title: `Breakfast Food: ${food.name}`,
      },
      partials: {
        head: "partials/head",
      },
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
