const Liberian = require("../models/libarian");

// Create a new liberian
exports.createLiberian = async (req, res) => {
  try {
    const { name } = req.body;
    const liberian = await Liberian.create({ name });
    res
      .status(201)
      .json({ message: "Liberian created successfully", liberian });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all Liberians
exports.getLiberians = async (req, res) => {
  try {
    const liberians = await Liberian.find();
    res.status(200).json({
      message: "All the Liberians in the Database listed successfully",
      liberians,
    });
  } catch (err) {
    res.status(500).json({ error: err.messge });
  }
};

// Get Liberians by id
exports.getLiberianById = async (req, res) => {
  try {
    const liberian = await Liberian.findById(req.params.id);
    if (!liberian) return res.status(404).json({ error: "Liberian not found" });
    res
      .status(200)
      .json({ message: "Successfully called a liberian", liberian });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a liberian
exports.updateLiberian = async (req, res) => {
  try {
    const updatedLiberian = await Liberian.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!updatedLiberian)
      return res.status(404).json({ error: "Liberian not found" });
    res
      .status(200)
      .json({ message: "Liberian updated successfully", updatedLiberian });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an Liberian
exports.deleteLiberian = async (req, res) => {
  try {
    const deletedLiberian = await Liberian.findByIdAndDelete(req.params.id);
    if (!deletedLiberian)
      return res.status(404).json({ error: "Liberian not found" });
    res
      .status(200)
      .json({ message: "Liberian deleted successfully", deletedLiberian });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
