const express = require("express");
const bodyParse = require("body-parser");
const app = express();
const port = 3000;

// https://stackoverflow.com/questions/9177049/express-js-req-body-undefined
// https://stackoverflow.com/questions/42128238/how-can-i-read-the-data-received-in-application-x-www-form-urlencoded-format-on

// parse application/x-www-form-urlencoded
app.use(
  bodyParse.urlencoded({
    extended: false,
  })
);

// parse application/json
app.use(bodyParse.json());

let user = {
  firtsName: "",
  lastName: "",
};

let response = {
  error: false,
  code: 200,
  menssage: "",
};

app.get("/", (req, res) => {
  response = {
    error: true,
    code: 200,
    menssage: "starting point",
  };
  res.send(response);
});

// Route handler.
app
  .route("/user")
  .get(function (req, res) {
    response = {
      error: false,
      code: 200,
      menssage: "",
    };

    if (user.firtsName === "" || user.lastName === "") {
      response = {
        error: true,
        code: 501,
        menssage: "The user has not been created",
      };
    } else {
      response = {
        error: false,
        code: 200,
        menssage: "user response",
        response: "user",
      };
    }
    res.send(response);
  })
  .post(function (req, res) {
    console.log(req.body);
    if (!req.body.firtsName || !req.body.lastName) {
      response = {
        error: true,
        code: 502,
        menssage: "The firtsName and lastName field are required",
      };
    } else {
      if (user.firtsName !== "" || user.lastName !== "") {
        response = {
          errro: true,
          code: 503,
          menssage: "The user was previously created",
        };
      } else {
        user = {
          firtsName: req.body.firtsName,
          lastName: req.body.lastName,
        };
        response = {
          error: false,
          code: 200,
          menssage: "User created",
          response: user,
        };
      }
    }
    res.send(response);
  })
  .put(function (req, res) {
    if (!req.body.lastName || !req.body.lastName) {
      response = {
        error: true,
        code: 502,
        menssage: "The firtsName and lastName field are required",
      };
    } else {
      if (user.firtsName === "" || user.lastName === "") {
        response = {
          error: true,
          code: 501,
          menssage: "The user has not been created",
        };
      } else {
        user = {
          firtsName: req.body.firtsName,
          lastName: req.body.lastName,
        };
        response = {
          error: false,
          code: 200,
          menssage: "Updated user",
          response: user,
        };
      }
    }
    res.send(response);
  })
  .delete(function (req, res) {
    if (user.firtsName === "" || user.lastName === "") {
      response = {
        error: true,
        code: 501,
        menssage: "The user has not been created",
      };
    } else {
      response = {
        error: false,
        code: 200,
        menssage: "User removed",
      };
      user = {
        firtsName: "",
        lastName: "",
      };
    }
    res.send(response);
  });

app.use((req, res, next) => {
  response = {
    error: true,
    code: 404,
    menssage: "URL not found",
  };
  res.status(404).send(response);
});

app.listen(port, () => {
  console.log("The server is initialized on port {port}.");
});
