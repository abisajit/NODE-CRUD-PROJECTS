import express from "express";

const route = express.Router();

route.get("/", (request, response) => {
  response.status(200).send("user route");
});
 // endpoint => /user
route.post("/", (request, response) => {
  response.status(200).send("Post user route");
});

 // endpoint => /user/Anystring => /user/1
route.get("/:id", (request, response) => {
    response.status(200).send("get individual");
  });
 // endpoint => /user/info/Anystring => /user/info/1
 route.get("/info/:id", (request, response) => {
    response.status(200).send("get individual");
});

export default route;
