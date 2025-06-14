import { users, questions, type User, type InsertUser, type Question } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  logQuestion(question: string, answer: string, links: any[]): Promise<Question>;
  getRecentQuestions(limit?: number): Promise<Question[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private questions: Map<number, Question>;
  private currentUserId: number;
  private currentQuestionId: number;

  constructor() {
    this.users = new Map();
    this.questions = new Map();
    this.currentUserId = 1;
    this.currentQuestionId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async logQuestion(question: string, answer: string, links: any[]): Promise<Question> {
    const id = this.currentQuestionId++;
    const questionRecord: Question = {
      id,
      question,
      answer,
      links: JSON.stringify(links),
      createdAt: new Date(),
    };
    this.questions.set(id, questionRecord);
    return questionRecord;
  }

  async getRecentQuestions(limit: number = 10): Promise<Question[]> {
    const questions = Array.from(this.questions.values())
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0))
      .slice(0, limit);
    return questions;
  }
}

export const storage = new MemStorage();
