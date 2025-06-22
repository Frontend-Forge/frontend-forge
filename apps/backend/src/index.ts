import express from "express";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running..., Hii");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
