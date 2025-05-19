"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, FileText, Paperclip, Mic, Bot, Download, Copy } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "resume" | "questions" | "suggestions"
  suggestions?: string[]
  resumeData?: any
}

type ChatMode = "interview" | "resume" | "questions"

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI career coach. How can I help you today? I can assist with interview preparation, resume building, or answer HR questions.",
      sender: "bot",
      timestamp: new Date(),
      type: "text",
      suggestions: ["Help me prepare for an interview", "I need help with my resume", "What are common HR questions?"],
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [chatMode, setChatMode] = useState<ChatMode>("interview")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Update welcome message when chat mode changes
  useEffect(() => {
    let welcomeMessage = ""
    let suggestions: string[] = []

    if (chatMode === "interview") {
      welcomeMessage =
        "I'm now in interview preparation mode. What type of interview are you preparing for? I can help with behavioral, technical, or general interview questions."
      suggestions = [
        "Prepare for a behavioral interview",
        "Help with technical interview questions",
        "How to answer 'Tell me about yourself'",
      ]
    } else if (chatMode === "resume") {
      welcomeMessage =
        "I'm now in resume building mode. I can help you craft a professional resume. Would you like help with your summary, work experience, skills section, or formatting?"
      suggestions = [
        "Help me write a professional summary",
        "How to list my work experience",
        "Tips for formatting my resume",
      ]
    } else if (chatMode === "questions") {
      welcomeMessage =
        "I'm now in HR questions mode. I can provide common HR questions and sample answers. What type of position are you applying for?"
      suggestions = [
        "Common HR questions for software engineers",
        "How to answer salary expectations",
        "Questions about work-life balance",
      ]
    }

    const modeChangeMessage: Message = {
      id: Date.now().toString(),
      content: welcomeMessage,
      sender: "bot",
      timestamp: new Date(),
      type: "text",
      suggestions,
    }

    setMessages((prev) => [...prev, modeChangeMessage])
  }, [chatMode])

  const handleSendMessage = async (text = input) => {
    if (!text.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // In a real implementation, this would call the API
      // const response = await fetch('/api/chat', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ messages: [...messages, userMessage], mode: chatMode }),
      // });
      // const data = await response.json();

      // Simulate API response
      setTimeout(() => {
        let botResponse: Message = {
          id: Date.now().toString(),
          content: "",
          sender: "bot",
          timestamp: new Date(),
          type: "text",
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
          type: "text",
        },
      ])
      setIsLoading(false)
    }
  }

  const generateInterviewResponse = (userInput: string): Message => {
    const userInputLower = userInput.toLowerCase()
    let content = ""
    let type: "text" | "questions" = "text"
    let suggestions: string[] = []

    if (userInputLower.includes("behavioral") || userInputLower.includes("behavior")) {
      content = "Here are some common behavioral interview questions and tips for answering them effectively:"
      type = "questions"
      suggestions = [
        "Tell me about a time when you faced a difficult challenge at work.",
        "Describe a situation where you had to work with a difficult colleague.",
        "Give an example of a time you showed leadership.",
        "Tell me about a time you failed and what you learned.",
        "Describe a situation where you had to meet a tight deadline.",
      ]
    } else if (userInputLower.includes("technical")) {
      content = "Technical interviews vary by field, but here are some common questions and approaches:"
      type = "questions"
      suggestions = [
        "How would you explain [complex concept] to someone without technical background?",
        "Describe a technical problem you solved recently.",
        "How do you stay updated with industry trends and new technologies?",
        "What's your approach to troubleshooting technical issues?",
        "Describe your experience with [specific technology].",
      ]
    } else if (userInputLower.includes("tell me about yourself") || userInputLower.includes("introduce yourself")) {
      content =
        "When answering 'Tell me about yourself,' follow this structure for a compelling response:\n\n1. Present: Start with your current role and a key achievement\n2. Past: Briefly mention relevant past experience\n3. Future: Express why you're interested in this position\n4. Strengths: Highlight 2-3 key strengths relevant to the role\n\nKeep it under 2 minutes and practice until it sounds natural, not rehearsed. Here's a sample answer:\n\n'I'm currently a Senior Developer at TechCorp, where I lead a team of five engineers building cloud-based solutions. Our recent project reduced infrastructure costs by 30%. Before that, I worked at StartupX developing their core payment processing system. I'm passionate about creating efficient, scalable solutions, which is why I'm excited about this opportunity to lead architecture decisions for your new platform. My strengths include system design, mentoring junior developers, and translating business requirements into technical specifications.'"
      suggestions = [
        "How to end my self-introduction?",
        "Should I mention personal interests?",
        "How to tailor this for different roles?",
      ]
    } else if (userInputLower.includes("weakness") || userInputLower.includes("weaknesses")) {
      content =
        "When discussing weaknesses in an interview, follow these guidelines:\n\n1. Be genuine but strategic - choose a real weakness that isn't critical to the job\n2. Show self-awareness and a growth mindset\n3. Explain specific steps you're taking to improve\n4. Mention progress you've already made\n\nExample answer:\n'One area I've been working to improve is public speaking. While I'm confident in one-on-one conversations and small groups, I used to get nervous presenting to larger audiences. To address this, I joined Toastmasters last year and have been volunteering to lead team presentations. I've already noticed significant improvement, and my manager recently complimented me on my presentation to the executive team.'"
      suggestions = [
        "Weaknesses to avoid mentioning",
        "How many weaknesses should I share?",
        "Follow-up questions about weaknesses",
      ]
    } else if (userInputLower.includes("strength") || userInputLower.includes("strengths")) {
      content =
        "When highlighting strengths in an interview:\n\n1. Focus on qualities relevant to the position\n2. Use the STAR method (Situation, Task, Action, Result) to provide specific examples\n3. Align your strengths with the job requirements\n4. Be confident but not arrogant\n\nExample answer:\n'My greatest strength is problem-solving. For example, at my previous company, we were experiencing significant customer churn (Situation). I was tasked with identifying the root causes (Task). I analyzed customer feedback data and identified that our onboarding process was too complicated (Action). By redesigning the process and creating better documentation, we reduced churn by 25% in three months (Result).'"
      suggestions = [
        "How to quantify my strengths",
        "Top strengths employers look for",
        "Balancing confidence and humility",
      ]
    } else if (userInputLower.includes("practice") || userInputLower.includes("mock interview")) {
      content =
        "I'd be happy to conduct a mock interview with you. Let's start with a common question:\n\n**Can you walk me through your professional background and explain why you're interested in this position?**\n\nAfter you respond, I'll provide feedback on your answer and suggest improvements."
      suggestions = [
        "Ask me another interview question",
        "Give me feedback on my answer",
        "What are common interview mistakes?",
      ]
    } else {
      content =
        "That's a great question about interview preparation. Here are some general tips for successful interviews:\n\n1. Research the company thoroughly before the interview\n2. Practice common questions but avoid sounding rehearsed\n3. Prepare specific examples using the STAR method\n4. Have thoughtful questions ready for the interviewer\n5. Follow up with a thank-you note within 24 hours\n\nWould you like specific advice on a particular aspect of interview preparation?"
      suggestions = [
        "How to research a company",
        "What questions should I ask the interviewer?",
        "How to handle salary negotiations",
      ]
    }

    return {
      id: Date.now().toString(),
      content,
      sender: "bot",
      timestamp: new Date(),
      type,
      suggestions,
    }
  }

  const generateResumeResponse = (userInput: string): Message => {
    const userInputLower = userInput.toLowerCase()
    let content = ""
    let type: "text" | "resume" = "text"
    let suggestions: string[] = []
    let resumeData = null

    if (userInputLower.includes("summary") || userInputLower.includes("profile")) {
      content =
        "For your professional summary, follow these guidelines:\n\n1. Keep it concise (3-5 impactful sentences)\n2. Highlight years of experience, relevant skills, and notable achievements\n3. Tailor it to each job application\n4. Use strong action verbs and industry keywords\n5. Avoid first-person pronouns\n\nExample for a software developer:\n\n'Results-driven software developer with 5+ years of experience building scalable web applications. Proficient in React, Node.js, and AWS cloud infrastructure. Reduced application load time by 40% and implemented CI/CD pipelines that cut deployment time by 60%. Seeking to leverage technical expertise and leadership skills as a Senior Developer at [Company Name].'"
      suggestions = [
        "Help me write my summary",
        "Should I include career objectives?",
        "Summary vs. objective statement",
      ]
    } else if (userInputLower.includes("experience") || userInputLower.includes("work history")) {
      content =
        "When listing work experience on your resume:\n\n1. Use reverse chronological order (most recent first)\n2. Format each entry consistently:\n   • Company Name, Location — Job Title (Month Year - Month Year)\n   • 3-5 bullet points per position\n   • Start each bullet with a strong action verb\n   • Focus on achievements and results, not just responsibilities\n   • Include metrics and numbers when possible (e.g., 'increased,' 'reduced,' 'generated')\n3. Tailor accomplishments to match the job description\n4. For older or less relevant positions, include fewer details\n\nExample bullet point:\n'Increased customer retention by 25% through implementation of automated email marketing campaigns that re-engaged 500+ inactive users.'"
      suggestions = [
        "Action verbs for my resume",
        "How to explain employment gaps",
        "How far back should my work history go?",
      ]
    } else if (userInputLower.includes("skills") || userInputLower.includes("technical skills")) {
      content =
        "For your skills section:\n\n1. Organize skills by category (e.g., Programming Languages, Tools, Soft Skills)\n2. List the most relevant skills first, matching keywords from the job description\n3. Be honest about your proficiency level\n4. For technical roles, consider using a simple rating system or grouping by proficiency level\n5. Include both hard skills (technical abilities) and soft skills (communication, leadership)\n\nExample format:\n\n**Technical Skills:**\n• Programming: JavaScript (React, Node.js), Python, SQL\n• Tools: Git, Docker, AWS, Jira\n• Methodologies: Agile, Scrum, TDD\n\n**Soft Skills:**\n• Communication, Team Leadership, Problem-solving, Time Management"
      suggestions = [
        "Most in-demand skills for my industry",
        "How many skills should I list?",
        "Should I rate my skill proficiency?",
      ]
    } else if (
      userInputLower.includes("format") ||
      userInputLower.includes("template") ||
      userInputLower.includes("layout")
    ) {
      content =
        "For an effective resume format:\n\n1. Choose the right format:\n   • Chronological: Best for consistent work history\n   • Functional: Highlights skills over experience (good for career changers)\n   • Combination: Balances skills and experience (most versatile)\n\n2. Keep it concise (1-2 pages maximum)\n\n3. Use a clean, professional design:\n   • Consistent fonts (Arial, Calibri, or Georgia at 10-12pt)\n   • Clear section headings\n   • Ample white space\n   • Margins of 0.5-1 inch\n\n4. Essential sections in order:\n   • Contact information\n   • Professional summary\n   • Skills\n   • Work experience\n   • Education\n   • Optional: Certifications, Projects, Volunteer work\n\n5. Save as PDF to preserve formatting\n\nWould you like me to suggest a specific template based on your industry?"
      suggestions = [
        "Best format for career changers",
        "ATS-friendly resume templates",
        "Should I include a photo on my resume?",
      ]
    } else if (userInputLower.includes("help me write") || userInputLower.includes("create my resume")) {
      type = "resume"
      content = "I'd be happy to help you create your resume. Let's start by gathering some key information:"
      resumeData = {
        sections: [
          {
            title: "Personal Information",
            fields: ["Full Name", "Email", "Phone", "Location", "LinkedIn (optional)"],
          },
          {
            title: "Professional Summary",
            description: "A brief 3-4 sentence overview of your experience, skills, and career goals.",
          },
          {
            title: "Work Experience",
            description:
              "For each position, include: Company, Title, Dates, and 3-5 bullet points highlighting achievements.",
          },
          {
            title: "Education",
            fields: ["Degree", "Institution", "Graduation Year", "Relevant Coursework (optional)"],
          },
          {
            title: "Skills",
            description: "List relevant technical and soft skills for the position you're targeting.",
          },
        ],
      }
      suggestions = [
        "Start with my professional summary",
        "Help with my work experience section",
        "What skills should I include?",
      ]
    } else {
      content =
        "I'd be happy to help with your resume. Here are some key areas we can focus on:\n\n1. **Professional Summary** - Create a compelling introduction\n2. **Work Experience** - Highlight achievements with metrics\n3. **Skills Section** - Showcase relevant abilities\n4. **Education** - Format academic credentials\n5. **Formatting** - Ensure a clean, professional layout\n6. **ATS Optimization** - Make your resume keyword-rich\n\nWhat specific aspect of your resume would you like to improve first?"
      suggestions = [
        "Help me write my professional summary",
        "How to highlight achievements",
        "Make my resume ATS-friendly",
      ]
    }

    return {
      id: Date.now().toString(),
      content,
      sender: "bot",
      timestamp: new Date(),
      type,
      suggestions,
      resumeData,
    }
  }

  const generateQuestionsResponse = (userInput: string): Message => {
    const userInputLower = userInput.toLowerCase()
    let content = ""
    let type: "text" | "questions" = "text"
    let suggestions: string[] = []

    if (
      userInputLower.includes("software") ||
      userInputLower.includes("developer") ||
      userInputLower.includes("engineer")
    ) {
      content =
        "Here are common interview questions for software engineering positions:\n\n1. **Technical Questions:**\n   • Explain the difference between REST and GraphQL\n   • How do you handle error cases in your code?\n   • Describe your experience with CI/CD pipelines\n   • How do you approach testing your code?\n   • Explain a complex technical concept in simple terms\n\n2. **Behavioral Questions:**\n   • Tell me about a challenging project you worked on\n   • How do you handle disagreements with team members?\n   • Describe how you stay updated with new technologies\n   • Tell me about a time you had to meet a tight deadline\n   • How do you prioritize tasks when working on multiple projects?\n\n3. **Problem-Solving Questions:**\n   • You might be asked to solve coding problems or system design questions\n   • Be prepared to explain your thought process\n   • Practice common algorithms and data structures\n\nWould you like sample answers for any of these questions?"
      type = "questions"
      suggestions = [
        "System design interview tips",
        "How to answer coding questions",
        "Behavioral questions for developers",
      ]
    } else if (
      userInputLower.includes("manager") ||
      userInputLower.includes("management") ||
      userInputLower.includes("leadership")
    ) {
      content =
        "Here are common interview questions for management positions:\n\n1. **Leadership Style:**\n   • How would you describe your leadership style?\n   • Tell me about a time you had to lead a team through a difficult situation\n   • How do you motivate team members?\n\n2. **Decision Making:**\n   • Describe a difficult decision you had to make as a manager\n   • How do you make decisions when you don't have all the information?\n   • Tell me about a time you had to make an unpopular decision\n\n3. **Team Management:**\n   • How do you handle underperforming team members?\n   • Describe how you've built successful teams in the past\n   • How do you handle conflicts within your team?\n\n4. **Strategic Thinking:**\n   • How do you set goals for your team?\n   • Describe a successful strategic initiative you implemented\n   • How do you balance short-term needs with long-term goals?\n\nWould you like sample answers for any of these questions?"
      type = "questions"
      suggestions = ["Leadership style examples", "Handling difficult employees", "Strategic thinking questions"]
    } else if (userInputLower.includes("behavioral")) {
      content =
        "Here are common behavioral interview questions and how to answer them effectively:\n\n1. **Tell me about a time when you faced a difficult challenge at work.**\n   • Use the STAR method: Situation, Task, Action, Result\n   • Focus on your specific actions and decisions\n   • Highlight positive outcomes and lessons learned\n\n2. **Describe a situation where you had to work with a difficult colleague.**\n   • Emphasize communication and conflict resolution skills\n   • Avoid speaking negatively about others\n   • Focus on the positive resolution\n\n3. **Give an example of a time you showed leadership.**\n   • Choose an example that demonstrates initiative\n   • Highlight how you motivated others\n   • Quantify results if possible\n\n4. **Tell me about a time you failed and what you learned.**\n   • Be honest about a real failure\n   • Focus more on what you learned and how you improved\n   • Show how you applied those lessons successfully\n\n5. **Describe a situation where you had to meet a tight deadline.**\n   • Highlight planning and prioritization skills\n   • Demonstrate how you handle pressure\n   • Emphasize successful outcomes\n\nRemember, the STAR method helps you tell a complete story that showcases your skills and experience."
      type = "questions"
      suggestions = ["STAR method examples", "Common behavioral questions", "How to prepare for behavioral interviews"]
    } else if (userInputLower.includes("salary") || userInputLower.includes("compensation")) {
      content =
        "When asked about salary expectations, follow these guidelines:\n\n1. **Do your research first:**\n   • Research salary ranges for similar positions in your location\n   • Consider your experience level and unique skills\n   • Factor in the company size and industry\n\n2. **During the interview:**\n   • Give a range rather than a specific number\n   • Example: 'Based on my research, similar roles in this area typically pay between $X and $Y'\n   • Emphasize that you're flexible and more interested in the right opportunity\n\n3. **If pressed for a specific number:**\n   • You can turn the question back: 'What is the typical range for this position at your company?'\n   • Or provide a well-researched range with your ideal salary in the middle\n\n4. **Consider the total package:**\n   • Mention that you're considering the entire compensation package, not just salary\n   • This includes benefits, work-life balance, growth opportunities, etc.\n\n5. **Timing is important:**\n   • Avoid discussing salary too early in the interview process\n   • Ideally, let the employer bring it up first\n\nSample response:\n'Based on my research and experience, I'm looking for a position in the range of $85,000 to $95,000. However, I'm open to discussing the compensation package as a whole, as I'm also interested in the growth opportunities and company culture.'"
      suggestions = ["Negotiating a higher salary", "When to discuss compensation", "Benefits beyond salary"]
    } else if (
      userInputLower.includes("why should we hire you") ||
      userInputLower.includes("why are you the best candidate")
    ) {
      content =
        "When answering 'Why should we hire you?' follow this framework:\n\n1. **Connect your skills to their needs:**\n   • Reference specific job requirements\n   • Explain how your experience directly addresses those needs\n\n2. **Highlight your unique value:**\n   • Emphasize what sets you apart from other candidates\n   • Focus on your unique combination of skills and experiences\n\n3. **Provide specific achievements:**\n   • Use numbers and metrics when possible\n   • Share relevant success stories\n\n4. **Show cultural fit:**\n   • Demonstrate knowledge of company values and culture\n   • Explain why you're excited about their mission\n\n5. **Be confident but not arrogant:**\n   • Use a confident tone\n   • Focus on facts rather than opinions about yourself\n\nExample answer:\n'Based on the job description, you need someone with strong project management skills and experience with agile methodologies. In my current role, I've successfully led 5 major projects using agile, all delivered on time and under budget. My communication skills and technical background allow me to bridge the gap between technical and non-technical stakeholders, which I understand is important for this position. Additionally, I've researched your company's commitment to innovation and collaboration, which aligns perfectly with my work style and values. I'm excited about your company's mission and believe my experience makes me uniquely qualified to contribute to your team.'"
      suggestions = [
        "How to stand out from other candidates",
        "Addressing potential weaknesses",
        "Following up after answering this question",
      ]
    } else {
      content =
        "I can provide sample questions and answers for various interview scenarios. Here are some categories to explore:\n\n1. **General HR Questions:**\n   • Tell me about yourself\n   • Why do you want to work for this company?\n   • Where do you see yourself in 5 years?\n   • What are your salary expectations?\n\n2. **Behavioral Questions:**\n   • Tell me about a time you faced a challenge\n   • Describe a situation where you showed leadership\n   • Give an example of how you handled conflict\n\n3. **Job-Specific Questions:**\n   • Technical questions for your field\n   • Industry knowledge questions\n   • Scenario-based questions\n\n4. **Character Assessment:**\n   • What are your strengths and weaknesses?\n   • How do you handle stress?\n   • Describe your work style\n\nWhat specific type of questions would you like to explore?"
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
      type,
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

  const handleCopyText = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Copied to clipboard!")
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err)
      })
  }

  return (
    <Card className="h-[calc(100vh-12rem)]">
      <CardHeader className="px-4 py-3 border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">AI Career Coach</CardTitle>
          <Tabs value={chatMode} onValueChange={(value) => setChatMode(value as ChatMode)}>
            <TabsList>
              <TabsTrigger value="interview">Interview Prep</TabsTrigger>
              <TabsTrigger value="resume">Resume Help</TabsTrigger>
              <TabsTrigger value="questions">HR Questions</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="p-4 overflow-y-auto h-[calc(100%-8rem)]">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-3 max-w-[85%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                {message.sender === "bot" ? (
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback>
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                )}
                <div className="flex flex-col gap-2">
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.sender === "bot" && (
                      <div className="flex justify-end mb-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 text-gray-400 hover:text-gray-600"
                                onClick={() => handleCopyText(message.content)}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Copy to clipboard</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )}
                    <p className="whitespace-pre-line">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {/* Resume Builder UI */}
                  {message.sender === "bot" && message.type === "resume" && message.resumeData && (
                    <div className="bg-white border rounded-lg p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-lg">Resume Builder</h3>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-4 w-4" /> Template
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {message.resumeData.sections.map((section: any, index: number) => (
                          <div key={index} className="border-t pt-3">
                            <h4 className="font-medium text-sm text-gray-700 mb-2">{section.title}</h4>
                            {section.description && <p className="text-sm text-gray-600 mb-2">{section.description}</p>}
                            {section.fields && (
                              <div className="space-y-2">
                                {section.fields.map((field: string, fieldIndex: number) => (
                                  <div key={fieldIndex} className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
                                    <span className="text-sm">{field}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button size="sm">Start Building</Button>
                      </div>
                    </div>
                  )}

                  {/* Questions List UI */}
                  {message.sender === "bot" && message.type === "questions" && message.suggestions && (
                    <div className="bg-white border rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold mb-3">Practice Questions</h3>
                      <div className="space-y-2">
                        {message.suggestions.map((question, index) => (
                          <div key={index} className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded-md">
                            <div className="min-w-5 mt-1">
                              <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium">
                                {index + 1}
                              </div>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{question}</p>
                              <div className="flex gap-2 mt-1">
                                <Button variant="outline" size="sm" className="h-7 text-xs">
                                  Practice Answer
                                </Button>
                                <Button variant="ghost" size="sm" className="h-7 text-xs">
                                  See Sample
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Suggestions */}
                  {message.sender === "bot" && message.suggestions && message.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {message.suggestions.map((suggestion, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="cursor-pointer hover:bg-gray-100 transition-colors py-1 px-3"
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
              <div className="flex gap-3 max-w-[80%]">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-lg p-3 bg-gray-100 text-gray-800">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <div className="flex items-center w-full gap-2">
          <Button variant="outline" size="icon">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <FileText className="h-4 w-4" />
          </Button>
          <Input
            placeholder={`Ask about ${
              chatMode === "interview"
                ? "interview preparation..."
                : chatMode === "resume"
                  ? "resume building..."
                  : "HR questions..."
            }`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button variant="outline" size="icon">
            <Mic className="h-4 w-4" />
          </Button>
          <Button onClick={() => handleSendMessage()} disabled={!input.trim() || isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
