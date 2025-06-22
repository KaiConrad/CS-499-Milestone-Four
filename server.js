const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/cyclesGame", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB error:", err));

// Defines schema and model
const saveSchema = new mongoose.Schema({
    playerName: String,
    state: String,
    inventory: [String]
});

const Save = mongoose.model("Save", saveSchema);

// API route to save game
app.post("/save", async (req, res) => {
    const { playerName, state, inventory } = req.body;

    try {
        const existing = await Save.findOne({ playerName });
        if (existing) {
            existing.state = state;
            existing.inventory = inventory;
            await existing.save();
        } else {
            const newSave = new Save({ playerName, state, inventory });
            await newSave.save();
        }

        res.status(200).json({ message: "Game saved!" });
    } catch (err) {
        res.status(500).json({ message: "Error saving game", error: err });
    }
});

// API route to load game
app.get("/load/:playerName", async (req, res) => {
    try {
        const data = await Save.findOne({ playerName: req.params.playerName });

        if (!data) {
            return res.status(404).json({ message: "Save not found" });
        }

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Error loading game", error: err });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`The server isrunning on http://localhost:${PORT}`);
});