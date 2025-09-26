export const resumes: Resume[] = [
  {
    id: "1",
    companyName: "Google",
    jobTitle: "Frontend Developer",
    imagePath: "/images/resume_01.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "2",
    companyName: "Microsoft",
    jobTitle: "Cloud Engineer",
    imagePath: "/images/resume_02.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "3",
    companyName: "Apple",
    jobTitle: "iOS Developer",
    imagePath: "/images/resume_03.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
];

export const AIResponseFormat = `
interface Feedback {
  overallScore: number; //max 100
  ATS: {
    score: number; //rate based on ATS suitability
    tips: {
      type: "good" | "improve";
      tip: string; //give 3-4 tips
    }[];
  };
  toneAndStyle: {
    score: number; //max 100
    tips: {
      type: "good" | "improve";
      tip: string; //make it a short "title" for the actual explanation
      explanation: string; //explain in detail here
    }[]; //give 3-4 tips
  };
  content: {
    score: number; //max 100
    tips: {
      type: "good" | "improve";
      tip: string; //make it a short "title" for the actual explanation
      explanation: string; //explain in detail here
    }[]; //give 3-4 tips
  };
  structure: {
    score: number; //max 100
    tips: {
      type: "good" | "improve";
      tip: string; //make it a short "title" for the actual explanation
      explanation: string; //explain in detail here
    }[]; //give 3-4 tips
  };
  skills: {
    score: number; //max 100
    tips: {
      type: "good" | "improve";
      tip: string; //make it a short "title" for the actual explanation
      explanation: string; //explain in detail here
    }[]; //give 3-4 tips
  };
}`;

export const prepareInstructions = ({ jobTitle, jobDescription, AIResponseFormat }: { jobTitle: string; jobDescription: string; AIResponseFormat: string }) =>
  `You are an expert in ATS (Applicant Tracking System) and resume analysis.

**CRITICAL INSTRUCTION: You MUST respond ONLY with a valid JSON object that strictly follows the provided interface. Do not include any markdown formatting, backticks, or additional text.**

**Your Task:**
Analyze and rate this resume based on the job requirements and provide detailed improvement suggestions.

**Rating Guidelines:**
- Be thorough and critical in your analysis
- Don't hesitate to give low scores if the resume needs significant improvement
- Use the full scoring range (0-100) appropriately
- Each section should have 3-4 actionable tips
- Balance "good" and "improve" tips based on the resume quality

**Job Context:**
- Job Title: ${jobTitle}
- Job Description: ${jobDescription}

**Analysis Areas:**
1. **overallScore**: Overall resume effectiveness (0-100)
2. **ATS**: ATS compatibility and keyword optimization
3. **toneAndStyle**: Professional tone, language, and writing style
4. **content**: Relevance, achievements, and value proposition
5. **structure**: Layout, formatting, and organization
6. **skills**: Skills presentation and job relevance

**Response Requirements:**
- Return ONLY a valid JSON object matching this exact structure: ${AIResponseFormat}
- Each tip should have a clear, actionable "tip" (short title) and detailed "explanation"
- Use "good" type for strengths and "improve" type for areas needing work
- Provide specific, actionable feedback that helps improve the resume
- Consider the job description when evaluating relevance and fit

**IMPORTANT: Your response must be valid JSON only, without any formatting or additional text.**`;
