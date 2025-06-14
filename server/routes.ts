import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { processQuestion } from "./services/virtualTA";
import { questionRequestSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // CORS middleware
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
      return;
    }
    
    next();
  });

  // Main Virtual TA API endpoint
  app.post("/api", async (req, res) => {
    try {
      // Validate request body
      const validatedData = questionRequestSchema.parse(req.body);
      
      // Process the question
      const response = await processQuestion(validatedData);
      
      // Log the question and response
      await storage.logQuestion(
        validatedData.question,
        response.answer,
        response.links
      );
      
      res.json(response);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          error: "Invalid request format", 
          details: error.errors.map(e => e.message).join(", ")
        });
      } else {
        console.error("Error processing question:", error);
        res.status(500).json({ 
          error: "Internal server error. Please try again later." 
        });
      }
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Get recent questions (for debugging/monitoring)
  app.get("/api/recent", async (req, res) => {
    try {
      const questions = await storage.getRecentQuestions(10);
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recent questions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
