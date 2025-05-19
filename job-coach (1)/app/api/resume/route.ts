import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { resumeData, section } = await req.json()

    // Create a prompt based on the resume data and requested section
    let prompt = ""

    if (section === "summary") {
      prompt = `
        Generate a professional summary for a resume based on the following information:
        
        Name: ${resumeData.name}
        Current Position: ${resumeData.currentPosition}
        Years of Experience: ${resumeData.yearsExperience}
        Industry: ${resumeData.industry}
        Key Skills: ${resumeData.skills.join(", ")}
        Career Achievements: ${resumeData.achievements}
        Target Position: ${resumeData.targetPosition}
        
        Create a compelling, concise professional summary (3-5 sentences) that highlights their experience, skills, and value proposition. Tailor it for the target position.
      `
    } else if (section === "experience") {
      prompt = `
        Generate professional work experience bullet points based on the following information:
        
        Position: ${resumeData.position}
        Company: ${resumeData.company}
        Duration: ${resumeData.duration}
        Responsibilities: ${resumeData.responsibilities}
        Achievements: ${resumeData.achievements}
        Target Position: ${resumeData.targetPosition}
        
        Create 4-5 achievement-focused bullet points that start with strong action verbs. Include metrics and quantifiable results where possible. Tailor the content to be relevant for the target position.
      `
    } else if (section === "skills") {
      prompt = `
        Generate a skills section for a resume based on the following information:
        
        Technical Skills: ${resumeData.technicalSkills.join(", ")}
        Soft Skills: ${resumeData.softSkills.join(", ")}
        Industry: ${resumeData.industry}
        Target Position: ${resumeData.targetPosition}
        Job Description Keywords: ${resumeData.keywords}
        
        Organize the skills by category and prioritize those most relevant to the target position. Include both technical and soft skills.
      `
    } else {
      prompt = `
        Generate professional resume content based on the following information:
        
        Name: ${resumeData.name}
        Current Position: ${resumeData.currentPosition}
        Years of Experience: ${resumeData.yearsExperience}
        Skills: ${resumeData.skills.join(", ")}
        Education: ${resumeData.education}
        Work History: ${resumeData.workHistory}
        
        Please provide a complete resume including professional summary, work experience with achievement-focused bullet points, skills section, and education. Format it professionally.
      `
    }

    // Generate response using AI SDK
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system:
        "You are a professional resume writer with expertise in creating compelling, ATS-friendly resumes that highlight candidates' strengths and achievements. You specialize in creating content that is concise, achievement-focused, and tailored to specific industries and positions.",
      prompt: prompt,
    })

    // Provide additional suggestions based on the section
    let suggestions = []
    if (section === "summary") {
      suggestions = ["Make it more achievement-focused", "Tailor it for a specific industry", "Make it more concise"]
    } else if (section === "experience") {
      suggestions = [
        "Add more metrics and results",
        "Use stronger action verbs",
        "Focus more on achievements than responsibilities",
      ]
    } else if (section === "skills") {
      suggestions = ["Add more technical skills", "Organize by proficiency level", "Add industry-specific keywords"]
    }

    return NextResponse.json({
      resumeContent: text,
      suggestions,
      section,
    })
  } catch (error) {
    console.error("Error in resume API:", error)
    return NextResponse.json({ error: "Failed to generate resume content" }, { status: 500 })
  }
}
