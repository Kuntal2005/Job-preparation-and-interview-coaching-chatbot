import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { messages, mode } = await req.json()

    // Get the last user message
    const lastMessage = messages[messages.length - 1].content

    // Create a system prompt based on the mode
    let systemPrompt = ""
    if (mode === "interview") {
      systemPrompt =
        "You are an expert interview coach specializing in job interview preparation. Provide detailed, actionable advice for job interviews, including sample answers, preparation tips, and feedback on user responses. Include specific examples and frameworks for answering common interview questions. When appropriate, suggest follow-up questions or topics the user might want to explore."
    } else if (mode === "resume") {
      systemPrompt =
        "You are a professional resume writer with 15+ years of experience. Help users create and improve their resumes with specific, actionable advice tailored to their industry and experience level. Provide templates, examples, and formatting guidance. Suggest specific wording for resume sections and help users highlight their achievements effectively. When possible, include metrics and quantifiable results in your suggestions."
    } else if (mode === "questions") {
      systemPrompt =
        "You are an HR expert with extensive experience in interviewing candidates across various industries. Provide common interview questions and detailed sample answers that will help the user prepare for job interviews. Include behavioral, technical, and situational questions relevant to the user's field. For each question, provide a framework for structuring an effective answer and include specific examples."
    }

    // Generate response using AI SDK
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: lastMessage,
    })

    // Process the response to extract suggestions and other structured data
    // In a real implementation, you might want to use a more sophisticated approach
    let suggestions = []
    if (mode === "interview") {
      suggestions = [
        "How to answer 'Tell me about yourself'",
        "Common behavioral questions",
        "How to discuss salary expectations",
      ]
    } else if (mode === "resume") {
      suggestions = ["Help with my professional summary", "How to highlight achievements", "Best format for my resume"]
    } else if (mode === "questions") {
      suggestions = [
        "Questions for software engineers",
        "Behavioral interview questions",
        "Questions about leadership experience",
      ]
    }

    return NextResponse.json({
      response: text,
      suggestions,
      type: "text",
    })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
