import express from "express";
import cors from "cors";
import performanceRoutes from "./routes/performanceRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is working");
});
app.use("/api/performance", performanceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
