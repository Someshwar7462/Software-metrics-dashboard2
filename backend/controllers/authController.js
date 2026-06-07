const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const JWT_SECRET = process.env.JWT_SECRET || "metrics_dashboard_secret";

const generateToken = (id) =>
  jwt.sign({ id }, JWT_SECRET, { expiresIn: "30d" });

const formatUserResponse = (user) => {
  const avatar =
    user.avatar && !user.avatar.includes("pravatar.cc") ? user.avatar : "";

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    username: user.username,
    avatar,
  };
};

exports.signup = async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide name, email and password" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const username = normalizedEmail
      .split("@")[0]
      .replace(/[^a-z0-9_]/g, "");

    const user = await User.create({
      name: fullName.trim(),
      email: normalizedEmail,
      phone: phone?.trim() || "",
      password: hashedPassword,
      username,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: formatUserResponse(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Signup failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      token: generateToken(user._id),
      user: formatUserResponse(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Login failed" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(formatUserResponse(user));
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch profile" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, username, email, phone, avatar, currentPassword, newPassword } =
      req.body;

    if (name) user.name = name.trim();
    if (username !== undefined) user.username = username.trim();
    if (phone !== undefined) user.phone = phone.trim();

    if (avatar && avatar.startsWith("data:image/")) {
      user.avatar = avatar;
    }

    if (email && email.toLowerCase().trim() !== user.email) {
      const emailTaken = await User.findOne({
        email: email.toLowerCase().trim(),
        _id: { $ne: user._id },
      });

      if (emailTaken) {
        return res.status(400).json({ message: "Email is already in use" });
      }

      user.email = email.toLowerCase().trim();
    }

    if (newPassword) {
      if (!currentPassword) {
        return res
          .status(400)
          .json({ message: "Current password is required to set a new password" });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }

      if (newPassword.length < 6) {
        return res
          .status(400)
          .json({ message: "New password must be at least 6 characters" });
      }

      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: formatUserResponse(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to update profile" });
  }
};
