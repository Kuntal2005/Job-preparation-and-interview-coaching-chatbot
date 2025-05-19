import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { industry, position, questionType, specificQuestion } = await req.json()

    let prompt = ""

    if (specificQuestion) {
      // Generate a detailed answer for a specific question
      prompt = `
        Provide a detailed answer framework for the following interview question:
        "${specificQuestion}"
        
        For a ${position} position in the ${industry} industry.
        
        Include:
        1. A structure for answering this question effectively
        2. Key points to include in the answer
        3. A sample answer using the STAR method (if applicable)
        4. Common mistakes to avoid
        5. Follow-up questions the interviewer might ask
      `
    } else {
      // Generate a set of questions based on type
      prompt = `
        Generate ${questionType} interview questions and detailed sample answers for a ${position} position in the ${industry} industry.
        
        Include:
        1. 5 common ${questionType} questions for this role
        2. For each question:
           - Why interviewers ask this question
           - Key points to include in your answer
           - A detailed sample answer using the STAR method (if applicable)
           - Common mistakes to avoid
        3. Tips for how to prepare for these types of questions
      `
    }

    // Generate response using AI SDK
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system:
        "You are an HR expert with extensive experience in interviewing candidates. Provide detailed, industry-specific interview questions and sample answers. Your answers should be structured, concise, and follow best practices for interview responses. Include the STAR method (Situation, Task, Action, Result) where appropriate.",
      prompt: prompt,
    })

    // Structure the response
    const response = {
      questions: text,
      relatedQuestions: [],
    }

    // Add related questions based on the question type
    if (questionType === "behavioral") {
      response.relatedQuestions = [
        "Tell me about a time you faced a challenge at work",
        "Describe a situation where you showed leadership",
        "Give an example of how you handled a conflict with a colleague",
      ]
    } else if (questionType === "technical") {
      response.relatedQuestions = [
        "Explain your approach to problem-solving",
        "How do you stay updated with industry trends?",
        "Describe a complex technical problem you solved",
      ]
    } else if (questionType === "situational") {
      response.relatedQuestions = [
        "How would you handle a disagreement with your manager?",
        "What would you do if you were assigned a task outside your expertise?",
        "How would you prioritize multiple urgent tasks?",
      ]
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error in questions API:", error)
    return NextResponse.json({ error: "Failed to generate interview questions" }, { status: 500 })
  }
}
