import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import authRoutes from './modules/auth/auth.route.js';
import connectDB from './config/db.js';
import createAdmin from './utils/admin.seed.js';
import instituteRoutes from './modules/institutes/institute.route.js';
import departmentRoutes from './modules/department/department.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ===================== //
// Middlewares           //
// ===================== //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CLIENT_URL,//fronted port number
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  // credentials: true,
}));// allows frontend to communicate with backend

// ===================== //
// Routes                //
// ===================== //
app.use('/auth', authRoutes);
app.use("/institute", instituteRoutes);
app.use("/department", departmentRoutes);

// app.use('/event',eventRouter);

// =============================== //
// Error Handler (Route Not Found) //
// =============================== //
app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// ===================== //
// Global Error Handler  //
// ===================== //
app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ===================== //
// Start Server          //
// ===================== //
connectDB()
  .then(async () => {
    // create admin
    await createAdmin();

    app.listen(PORT, () => {
      console.log(`server is running on http://localhost:${PORT}`);
    });
  })
  .catch(
    (err) => {
      console.log('db connection error: ', err);
    })