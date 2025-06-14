import express from "express";
import cors from "cors";
import { processQuestion } from "../server/services/virtualTA";
import { questionRequestSchema } from "../shared/schema";
import { ZodError } from "zod";

const app = express();

// Enable CORS for all origins
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    message: "TDS Virtual TA API is running"
  });
});

// Main Virtual TA endpoint
app.post("/api", async (req, res) => {
  try {
    // Validate request body
    const validatedData = questionRequestSchema.parse(req.body);
    
    // Process the question
    const response = await processQuestion(validatedData);
    
    res.json(response);
  } catch (error) {
    console.error("Error processing question:", error);
    
    if (error instanceof ZodError) {
      res.status(400).json({ 
        error: "Invalid request format", 
        details: error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(", ")
      });
    } else {
      res.status(500).json({ 
        error: "Internal server error. Please try again later." 
      });
    }
  }
});

// Fallback for other API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

// Export for Vercel
export default app;
