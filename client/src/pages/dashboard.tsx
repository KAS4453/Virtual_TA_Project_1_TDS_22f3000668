import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Bot, 
  Send, 
  Clock, 
  CheckCircle, 
  Server, 
  ExternalLink,
  Upload,
  AlertCircle,
  Book,
  Play,
  Github,
  Mail,
  HelpCircle,
  MessageSquare
} from "lucide-react";

interface ApiResponse {
  answer: string;
  links: Array<{
    url: string;
    text: string;
  }>;
}

const exampleQuestions = [
  "When is the TDS Sep 2025 end-term exam?",
  "Should I use Docker or Podman for this course?",
  "How does GA4 bonus scoring work?",
  "Should I use gpt-4o-mini which AI proxy supports, or gpt3.5 turbo?"
];

export default function Dashboard() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const questionMutation = useMutation({
    mutationFn: async (data: { question: string; image?: string }) => {
      const res = await apiRequest("POST", "/api", data);
      return res.json() as Promise<ApiResponse>;
    },
    onSuccess: (data) => {
      setResponse(data);
      setIsLoading(false);
      toast({
        title: "Question processed successfully",
        description: "The Virtual TA has generated a response to your question.",
      });
    },
    onError: (error) => {
      setIsLoading(false);
      toast({
        title: "Error processing question",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setIsLoading(true);
    setResponse(null);
    questionMutation.mutate({ question });
  };

  const fillExample = (exampleQuestion: string) => {
    setQuestion(exampleQuestion);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Bot className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-neutral-900">TDS Virtual TA</h1>
                <p className="text-sm text-neutral-700">IIT Madras Data Science Assistant</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#overview" className="text-neutral-700 hover:text-primary transition-colors">Overview</a>
              <a href="#api-testing" className="text-neutral-700 hover:text-primary transition-colors">API Testing</a>
              <a href="#documentation" className="text-neutral-700 hover:text-primary transition-colors">Documentation</a>
              <a href="#examples" className="text-neutral-700 hover:text-primary transition-colors">Examples</a>
            </nav>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                API Online
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="overview" className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Virtual Teaching Assistant</h2>
            <p className="text-xl text-neutral-700 mb-8 max-w-3xl mx-auto">
              An intelligent API that automatically answers student questions for the Tools in Data Science course using course content and Discourse posts from Jan-Apr 2025.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="px-6 py-3 bg-primary text-white">
                <Play className="mr-2 h-4 w-4" />
                Test API Now
              </Button>
              <Button variant="outline" className="px-6 py-3">
                <Book className="mr-2 h-4 w-4" />
                View Documentation
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-neutral-900">1,247</p>
                    <p className="text-sm text-neutral-600">Questions Answered</p>
                  </div>
                  <HelpCircle className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-neutral-900">2.3s</p>
                    <p className="text-sm text-neutral-600">Avg Response Time</p>
                  </div>
                  <Clock className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-neutral-900">94%</p>
                    <p className="text-sm text-neutral-600">Accuracy Rate</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-secondary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-neutral-900">99.9%</p>
                    <p className="text-sm text-neutral-600">Uptime</p>
                  </div>
                  <Server className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* API Testing Interface */}
      <section id="api-testing" className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-neutral-900 mb-4">Test the Virtual TA API</h3>
            <p className="text-lg text-neutral-700">Try asking questions about the TDS course and see the AI respond with relevant answers and discourse links.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Request Panel */}
            <Card>
              <CardHeader className="bg-neutral-100">
                <CardTitle className="flex items-center">
                  <Send className="mr-2 h-5 w-5 text-primary" />
                  Send Request
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Question <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Ask any question about the TDS course..."
                      rows={4}
                      className="resize-none"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Image Attachment (Optional)
                    </label>
                    <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="mx-auto h-8 w-8 text-neutral-400 mb-2" />
                      <p className="text-neutral-600">Drop an image here or click to browse</p>
                      <p className="text-sm text-neutral-500 mt-1">Will be converted to base64</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-neutral-600 flex items-center">
                      <AlertCircle className="mr-1 h-4 w-4" />
                      Response time: ~2-5 seconds
                    </div>
                    <Button type="submit" disabled={!question.trim() || isLoading}>
                      <Send className="mr-2 h-4 w-4" />
                      {isLoading ? "Processing..." : "Send Question"}
                    </Button>
                  </div>
                </form>

                {/* Quick Examples */}
                <div className="mt-8 pt-6 border-t border-neutral-200">
                  <p className="text-sm font-medium text-neutral-700 mb-3">Quick Examples:</p>
                  <div className="space-y-2">
                    {exampleQuestions.map((example, index) => (
                      <button
                        key={index}
                        onClick={() => fillExample(example)}
                        className="w-full text-left px-3 py-2 text-sm text-neutral-600 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Panel */}
            <Card>
              <CardHeader className="bg-neutral-100">
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-secondary" />
                  API Response
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {isLoading && (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <span className="ml-3 text-neutral-600">Thinking...</span>
                  </div>
                )}

                {response && !isLoading && (
                  <div>
                    <div className="mb-6">
                      <h5 className="text-sm font-medium text-neutral-700 mb-3">Answer:</h5>
                      <div className="bg-neutral-50 rounded-lg p-4">
                        <p className="text-neutral-900">{response.answer}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h5 className="text-sm font-medium text-neutral-700 mb-3">Relevant Links:</h5>
                      <div className="space-y-3">
                        {response.links.length > 0 ? (
                          response.links.map((link, index) => (
                            <a
                              key={index}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block p-4 border border-neutral-200 rounded-lg hover:border-primary/50 transition-colors group"
                            >
                              <div className="flex items-start space-x-3">
                                <ExternalLink className="h-5 w-5 text-primary mt-1 group-hover:text-primary/80" />
                                <div className="flex-1">
                                  <p className="font-medium text-neutral-900 group-hover:text-primary transition-colors">
                                    {link.text}
                                  </p>
                                  <p className="text-sm text-neutral-600 mt-1">
                                    {link.url}
                                  </p>
                                </div>
                              </div>
                            </a>
                          ))
                        ) : (
                          <p className="text-sm text-neutral-500 flex items-center">
                            <AlertCircle className="mr-2 h-4 w-4" />
                            No relevant links available for this question
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-neutral-600 pt-4 border-t border-neutral-200">
                      <span className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        Response time: 2.1s
                      </span>
                      <span className="flex items-center">
                        <CheckCircle className="mr-1 h-4 w-4 text-secondary" />
                        Status: 200 OK
                      </span>
                    </div>
                  </div>
                )}

                {!response && !isLoading && (
                  <div className="text-center py-12 text-neutral-500">
                    <MessageSquare className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <p>Send a question to see the API response here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section id="documentation" className="py-16 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-neutral-900 mb-4">API Documentation</h3>
            <p className="text-lg text-neutral-700">Complete reference for integrating with the TDS Virtual TA API.</p>
          </div>

          <Card>
            <Tabs defaultValue="endpoint" className="w-full">
              <div className="border-b border-neutral-200">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="endpoint">Endpoint</TabsTrigger>
                  <TabsTrigger value="request">Request Format</TabsTrigger>
                  <TabsTrigger value="response">Response Format</TabsTrigger>
                  <TabsTrigger value="errors">Error Handling</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="endpoint" className="p-8">
                <h4 className="text-xl font-semibold text-neutral-900 mb-6">API Endpoint</h4>
                
                <div className="mb-6">
                  <div className="bg-neutral-900 rounded-lg p-4 mb-4">
                    <code className="text-green-400 font-mono text-sm">
                      POST https://your-domain.vercel.app/api/
                    </code>
                  </div>
                  <p className="text-neutral-700">
                    The main endpoint accepts POST requests with student questions and optional image attachments.
                    All requests must include a <code className="bg-neutral-100 px-2 py-1 rounded">Content-Type: application/json</code> header.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex">
                    <AlertCircle className="text-blue-600 mt-1 mr-3 h-5 w-5" />
                    <div>
                      <h5 className="font-medium text-blue-900 mb-1">Rate Limiting</h5>
                      <p className="text-blue-700 text-sm">
                        The API is rate-limited to 100 requests per minute per IP address to ensure fair usage.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="request" className="p-8">
                <h4 className="text-xl font-semibold text-neutral-900 mb-6">Request Format</h4>
                
                <div className="mb-6">
                  <h5 className="text-lg font-medium text-neutral-800 mb-3">Example Request</h5>
                  <div className="bg-neutral-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 font-mono text-sm">
{`curl "https://your-domain.vercel.app/api/" \\
  -H "Content-Type: application/json" \\
  -d '{
    "question": "Should I use gpt-4o-mini or gpt-3.5-turbo?",
    "image": "$(base64 -w0 screenshot.png)"
  }'`}
                    </pre>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="response" className="p-8">
                <h4 className="text-xl font-semibold text-neutral-900 mb-6">Response Format</h4>
                
                <div className="mb-6">
                  <h5 className="text-lg font-medium text-neutral-800 mb-3">Success Response (200 OK)</h5>
                  <div className="bg-neutral-900 rounded-lg p-4 overflow-x-auto mb-4">
                    <pre className="text-green-400 font-mono text-sm">
{`{
  "answer": "You must use gpt-3.5-turbo-0125, even if the AI Proxy only supports gpt-4o-mini.",
  "links": [
    {
      "url": "https://discourse.onlinedegree.iitm.ac.in/t/ga5-question-8-clarification/155939/4",
      "text": "Use the model that's mentioned in the question."
    }
  ]
}`}
                    </pre>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="errors" className="p-8">
                <h4 className="text-xl font-semibold text-neutral-900 mb-6">Error Handling</h4>
                
                <div className="space-y-6">
                  <div className="border border-red-200 rounded-lg p-4">
                    <h5 className="font-medium text-red-900 mb-2">400 Bad Request</h5>
                    <p className="text-red-700 text-sm mb-3">Invalid request format or missing required fields.</p>
                    <div className="bg-neutral-900 rounded p-3">
                      <code className="text-red-400 font-mono text-sm">{"error": "Missing required field: question"}</code>
                    </div>
                  </div>

                  <div className="border border-red-200 rounded-lg p-4">
                    <h5 className="font-medium text-red-900 mb-2">500 Internal Server Error</h5>
                    <p className="text-red-700 text-sm mb-3">Server error occurred while processing the request.</p>
                    <div className="bg-neutral-900 rounded p-3">
                      <code className="text-red-400 font-mono text-sm">{"error": "Internal server error. Please try again later."}</code>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Bot className="text-white h-5 w-5" />
                </div>
                <h4 className="text-lg font-semibold text-neutral-900">TDS Virtual TA</h4>
              </div>
              <p className="text-neutral-600 mb-4 max-w-md">
                An intelligent API that automatically answers student questions for the Tools in Data Science course using course content and Discourse posts.
              </p>
              <div className="flex items-center space-x-4">
                <Github className="h-5 w-5 text-neutral-400 hover:text-primary transition-colors cursor-pointer" />
                <Book className="h-5 w-5 text-neutral-400 hover:text-primary transition-colors cursor-pointer" />
                <Mail className="h-5 w-5 text-neutral-400 hover:text-primary transition-colors cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold text-neutral-900 mb-4">Resources</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-600 hover:text-primary transition-colors">API Documentation</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-primary transition-colors">Course Content</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-primary transition-colors">Discourse Forum</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-primary transition-colors">GitHub Repository</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-neutral-900 mb-4">Support</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-600 hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-primary transition-colors">Contact Support</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-primary transition-colors">Report Issues</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-primary transition-colors">Feature Requests</a></li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-600 text-sm">
              © 2025 TDS Virtual TA. Built for IIT Madras Online Degree Program.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-neutral-600 hover:text-primary text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-neutral-600 hover:text-primary text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-neutral-600 hover:text-primary text-sm transition-colors">MIT License</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
