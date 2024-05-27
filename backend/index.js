const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 4000;

// Enable CORS
app.use(cors());

// Body parser middleware to handle JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Dummy data
let buyers = [
  { id: 1, name: "Buyer One" },
  { id: 2, name: "Buyer Two" },
  { id: 3, name: "Buyer Three" },
];

// Get all buyers
app.get("/buyers", (req, res) => {
  res.json(buyers);
});

// Get a buyer by ID
app.get("/buyers/:id", (req, res) => {
  const buyer = buyers.find((b) => b.id === parseInt(req.params.id));
  if (!buyer) return res.status(404).send("Buyer not found");
  res.json(buyer);
});

// Create a new buyer
app.post("/buyers", (req, res) => {
  const newBuyer = {
    id: buyers.length + 1,
    name: req.body.name,
  };
  buyers.push(newBuyer);
  res.status(201).json(newBuyer);
});

// Update a buyer
app.put("/buyers/:id", (req, res) => {
  const buyer = buyers.find((b) => b.id === parseInt(req.params.id));
  if (!buyer) return res.status(404).send("Buyer not found");

  buyer.name = req.body.name;
  res.json(buyer);
});

// Delete a buyer
app.delete("/buyers/:id", (req, res) => {
  const buyerIndex = buyers.findIndex((b) => b.id === parseInt(req.params.id));
  if (buyerIndex === -1) return res.status(404).send("Buyer not found");

  buyers.splice(buyerIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
