const Form = require("../models/Form");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// CREATE
router.post("/", async (req, res) => {
    const { name, email, category, phone_number, description } = req.body;
    try {
        const newForm = new Form({ name, email, phone_number, category, description });
        const savedForm = await newForm.save();
        res.status(200).json(savedForm);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedForm = await Form.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedForm);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Form.findByIdAndDelete(req.params.id);
        res.status(200).json("Form has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET FORM
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        res.status(200).json(form);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const forms = await Form.find();
        res.status(200).json(forms);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
