"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, X, MessageSquare, Bot, Minimize2, FileText, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  suggestions?: string[]
}

type ChatMode = "interview" | "resume" | "questions"

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI career coach. How can I help you today? I can assist with interview preparation, resume building, or answer HR questions.",
      sender: "bot",
      timestamp: new Date(),
      suggestions: ["Help me prepare for an interview", "I need help with my resume", "What are common HR questions?"],
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [chatMode, setChatMode] = useState<ChatMode>("interview")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isOpen, isMinimized])

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const minimizeChat = () => {
    setIsMinimized(!isMinimized)
  }

  const handleSendMessage = async (text = input) => {
    if (!text.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Simulate API response
      setTimeout(() => {
        let botResponse: Message = {
          id: Date.now().toString(),
          content: "",
          sender: "bot",
          timestamp: new Date(),
        }

        if (chatMode === "interview") {
          botResponse = generateInterviewResponse(text)
        } else if (chatMode === "resume") {
          botResponse = generateResumeResponse(text)
        } else if (chatMode === "questions") {
          botResponse = generateQuestionsResponse(text)
        }

        setMessages((prev) => [...prev, botResponse])
        setIsLoading(false)
      }, 1500)
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: "Sorry, I encountered an error. Please try again.",
          sender: "bot",
          timestamp: new Date(),
        },
      ])
      setIsLoading(false)
    }
  }

  const generateInterviewResponse = (userInput: string): Message => {
    const userInputLower = userInput.toLowerCase()
    let content = ""
    let suggestions: string[] = []

    if (userInputLower.includes("tell me about yourself") || userInputLower.includes("introduce yourself")) {
      content =
        "When answering 'Tell me about yourself,' follow this structure:\n\n1. Present: Start with your current role and a key achievement\n2. Past: Briefly mention relevant past experience\n3. Future: Express why you're interested in this position\n\nKeep it under 2 minutes and practice until it sounds natural."
      suggestions = ["How to end my self-introduction?", "Should I mention personal interests?"]
    } else if (userInputLower.includes("weakness") || userInputLower.includes("weaknesses")) {
      content =
        "When discussing weaknesses, choose something genuine but not critical to the job. Explain how you're actively working to improve it. For example: 'I've sometimes struggled with public speaking, so I joined Toastmasters last year and have been volunteering to lead team presentations to build my confidence.'"
      suggestions = ["Weaknesses to avoid mentioning", "How many weaknesses should I share?"]
    } else if (userInputLower.includes("strength") || userInputLower.includes("strengths")) {
      content =
        "When highlighting strengths, focus on qualities relevant to the position. Use the STAR method (Situation, Task, Action, Result) to provide specific examples. For instance: 'My greatest strength is problem-solving. When our team faced [specific situation], I developed [specific solution] which resulted in [measurable outcome].'"
      suggestions = ["How to quantify my strengths", "Top strengths employers look for"]
    } else if (userInputLower.includes("practice") || userInputLower.includes("mock interview")) {
      content =
        "I'd be happy to conduct a mock interview with you. Let's start with a common question: Can you walk me through your professional background and explain why you're interested in this position?"
      suggestions = ["Ask me another interview question", "Give me feedback on my answer"]
    } else {
      content =
        "That's a great question about interview preparation. Would you like specific advice on how to answer this in an interview setting? I can provide example responses, key points to include, or we can practice with a mock interview."
      suggestions = ["Help with behavioral questions", "Technical interview tips", "Salary negotiation advice"]
    }

    return {
      id: Date.now().toString(),
      content,
      sender: "bot",
      timestamp: new Date(),
      suggestions,
    }
  }

  const generateResumeResponse = (userInput: string): Message => {
    const userInputLower = userInput.toLowerCase()
    let content = ""
    let suggestions: string[] = []

    if (userInputLower.includes("summary") || userInputLower.includes("profile")) {
      content =
        "For your professional summary, aim for 3-5 impactful sentences that highlight your years of experience, relevant skills, notable achievements, and career goals. Tailor it to each job application."
      suggestions = ["Help me write my summary", "Should I include career objectives?"]
    } else if (userInputLower.includes("experience") || userInputLower.includes("work history")) {
      content =
        "When listing work experience, use bullet points starting with strong action verbs. Focus on achievements and results, not just responsibilities. Include metrics and numbers when possible."
      suggestions = ["Action verbs for my resume", "How to explain employment gaps"]
    } else if (userInputLower.includes("skills") || userInputLower.includes("technical skills")) {
      content =
        "For your skills section, organize them by category (e.g., Programming Languages, Tools, Soft Skills). List the most relevant skills first, matching keywords from the job description."
      suggestions = ["Most in-demand skills for my industry", "How many skills should I list?"]
    } else if (userInputLower.includes("format") || userInputLower.includes("template")) {
      content =
        "For most industries, a reverse-chronological resume format works best. Keep your resume to 1-2 pages with clean, consistent formatting. Use a professional font (Arial, Calibri, or Georgia) at 10-12pt size."
      suggestions = ["Best format for career changers", "ATS-friendly resume templates"]
    } else {
      content =
        "I'd be happy to help with your resume. I can provide guidance on formatting, content, or help you optimize specific sections like your professional summary, work experience, or skills."
      suggestions = ["Help me write my professional summary", "How to highlight achievements"]
    }

    return {
      id: Date.now().toString(),
      content,
      sender: "bot",
      timestamp: new Date(),
      suggestions,
    }
  }

  const generateQuestionsResponse = (userInput: string): Message => {
    const userInputLower = userInput.toLowerCase()
    let content = ""
    let suggestions: string[] = []

    if (userInputLower.includes("behavioral")) {
      content =
        "Here are some common behavioral interview questions:\n\n1. Tell me about a time when you faced a difficult challenge at work.\n2. Describe a situation where you had to work with a difficult colleague.\n3. Give an example of a time you showed leadership.\n\nWhen answering, use the STAR method: Situation, Task, Action, Result."
      suggestions = ["STAR method examples", "Common behavioral questions"]
    } else if (userInputLower.includes("technical")) {
      content =
        "Technical questions vary by field, but here are some general ones:\n\n1. How would you explain [complex concept] to someone without technical background?\n2. Describe a technical problem you solved recently.\n3. How do you stay updated with industry trends and new technologies?"
      suggestions = ["Technical questions for software engineers", "How to prepare for technical interviews"]
    } else if (userInputLower.includes("salary")) {
      content =
        "When asked about salary expectations:\n\n1. Research the market rate for the position in your location before the interview.\n2. Give a range rather than a specific number.\n3. Emphasize that you're flexible and more interested in the right opportunity."
      suggestions = ["Negotiating a higher salary", "When to discuss compensation"]
    } else {
      content =
        "I can provide sample questions and answers for various interview scenarios including behavioral questions, technical questions, situational questions, and questions about your background and experience."
      suggestions = [
        "Common questions for entry-level positions",
        "Questions for experienced professionals",
        "How to answer 'What is your greatest weakness?'",
      ]
    }

    return {
      id: Date.now().toString(),
      content,
      sender: "bot",
      timestamp: new Date(),
      suggestions,
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const handleModeChange = (value: string) => {
    setChatMode(value as ChatMode)

    let welcomeMessage = ""
    let suggestions: string[] = []

    if (value === "interview") {
      welcomeMessage = "I'm now in interview preparation mode. How can I help you prepare for your interview?"
      suggestions = [
        "Common interview questions",
        "How to answer 'Tell me about yourself'",
        "Behavioral interview tips",
      ]
    } else if (value === "resume") {
      welcomeMessage = "I'm now in resume building mode. How can I help you improve your resume?"
      suggestions = ["Help with my professional summary", "How to list work experience", "Resume formatting tips"]
    } else if (value === "questions") {
      welcomeMessage = "I'm now in HR questions mode. What type of questions would you like help with?"
      suggestions = ["Behavioral questions", "Technical questions", "Salary negotiation questions"]
    }

    const modeChangeMessage: Message = {
      id: Date.now().toString(),
      content: welcomeMessage,
      sender: "bot",
      timestamp: new Date(),
      suggestions,
    }

    setMessages((prev) => [...prev, modeChangeMessage])
  }

  return (
    <>
      {/* Chat button */}
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg flex items-center justify-center p-0 z-50"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      {/* Chat window */}
      {isOpen && (
        <Card
          className={`fixed bottom-6 right-6 w-80 md:w-96 shadow-xl z-50 transition-all duration-300 ease-in-out ${
            isMinimized ? "h-16" : "h-[500px] max-h-[80vh]"
          }`}
        >
          <CardHeader className="p-3 flex flex-row items-center justify-between space-y-0 border-b">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-sm">Career Coach</h3>
                <p className="text-xs text-muted-foreground">AI Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={minimizeChat}>
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleChat}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              <div className="px-3 py-2 border-b">
                <Tabs value={chatMode} onValueChange={handleModeChange} className="w-full">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="interview" className="text-xs py-1">
                      <FileText className="h-3 w-3 mr-1" /> Interview
                    </TabsTrigger>
                    <TabsTrigger value="resume" className="text-xs py-1">
                      <FileText className="h-3 w-3 mr-1" /> Resume
                    </TabsTrigger>
                    <TabsTrigger value="questions" className="text-xs py-1">
                      <Users className="h-3 w-3 mr-1" /> HR Q&A
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <CardContent className="p-3 overflow-y-auto h-[calc(100%-8rem)]">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex gap-2 max-w-[85%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                        {message.sender === "bot" && (
                          <Avatar className="h-6 w-6 mt-1">
                            <AvatarFallback>
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex flex-col gap-2">
                          <div
                            className={`rounded-lg p-2 text-sm ${
                              message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            <p className="whitespace-pre-line">{message.content}</p>
                          </div>

                          {/* Quick Suggestions */}
                          {message.sender === "bot" && message.suggestions && message.suggestions.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {message.suggestions.map((suggestion, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="cursor-pointer hover:bg-gray-100 transition-colors py-0.5 px-2 text-xs"
                                  onClick={() => handleSuggestionClick(suggestion)}
                                >
                                  {suggestion}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-2 max-w-[85%]">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg p-2 bg-gray-100 text-gray-800">
                          <div className="flex space-x-1">
                            <div className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                            <div className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              <CardFooter className="p-3 border-t">
                <div className="flex items-center w-full gap-2">
                  <Input
                    placeholder={`Ask about ${
                      chatMode === "interview"
                        ? "interview tips..."
                        : chatMode === "resume"
                          ? "resume help..."
                          : "HR questions..."
                    }`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 text-sm h-8"
                  />
                  <Button
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => handleSendMessage()}
                    disabled={!input.trim() || isLoading}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </>
  )
}
