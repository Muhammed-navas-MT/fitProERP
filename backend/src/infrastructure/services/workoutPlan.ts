import Groq from "groq-sdk";
import { HealthDetails } from "../../application/dtos/memberDto/workoutPlandto";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateWorkout(healthDetails: HealthDetails) {
  const prompt = `
Create a 7 day gym workout plan.

Return ONLY valid JSON.
Follow strict JSON rules:

- All strings must use double quotes
- Arrays must have commas between elements
- reps must be a string like "8-12"
- Do not include comments
- Do not include markdown
- Each day must contain exactly 2 target muscles
- targetMuscles must be an array of strings (muscle names only)
- Do not return objects inside targetMuscles
- Example: "targetMuscles": ["Chest", "Triceps"]
- Each target muscle must have exactly 3 exercises
- Each workout day must contain exactly 6 exercises
- Use gym equipment for exercises
- Sunday must be a rest day
- Rest day must have "targetMuscles": []
- Rest day must have "exercises": []
- Ensure the output is valid JSON that can be parsed using JSON.parse()

User Health Data:
${JSON.stringify(healthDetails)}

Format:
{
 "name": "Workout Plan",
 "days":[
  {
   "dayOfWeek":"",
   "targetMuscles":[],
   "exercises":[
    {
     "name":"",
     "equipment":"",
     "sets":0,
     "reps":"",
     "rest":""
    }
   ]
  }
 ]
}
`;

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content || "";

    let cleaned = content.replace(/```json|```/g, "").trim();

    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("AI did not return JSON");
    }

    cleaned = cleaned.slice(start, end + 1);

    let workoutPlan;

    try {
      workoutPlan = JSON.parse(cleaned);
    } catch (error) {
      console.error("AI JSON ERROR:", cleaned);
      throw error;
    }

    return workoutPlan;
  } catch (error) {
    console.error("Workout AI Error:", error);
    throw new Error("Failed to generate workout plan");
  }
}
