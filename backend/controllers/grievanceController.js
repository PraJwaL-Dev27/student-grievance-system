const Grievance = require("../models/Grievance");

// Create
exports.create = async (req, res) => {
  const grievance = new Grievance({
    ...req.body,
    userId: req.user.id
  });

  await grievance.save();
  res.json(grievance);
};

// Get all
exports.getAll = async (req, res) => {
  const data = await Grievance.find({ userId: req.user.id });
  res.json(data);
};

// Get by ID
exports.getById = async (req, res) => {
  const data = await Grievance.findById(req.params.id);
  res.json(data);
};

// Update
exports.update = async (req, res) => {
  const updated = await Grievance.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

// Delete
exports.delete = async (req, res) => {
  await Grievance.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};

// Search
exports.search = async (req, res) => {
  try {
    const title = req.query.title;

    const data = await Grievance.find({
      userId: req.user.id, // 🔥 only current user data
      title: { $regex: title, $options: "i" }
    });

    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
};