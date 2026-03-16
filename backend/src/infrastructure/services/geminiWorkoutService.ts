import { GoogleGenerativeAI } from "@google/generative-ai";
import { HealthDetails } from "../../application/dtos/memberDto/workoutPlandto";
import { IGeminiWorkoutService } from "../../application/interfaces/service/geminiWorkoutServiceInterface";
import { WorkoutPlanEntity } from "../../domain/entities/member/workoutPlanEntity";
import { configEnv } from "../../config/envConfig";

export class GeminiWorkoutService implements IGeminiWorkoutService {
  async generateWorkoutPlan(
    healthDetails: HealthDetails,
  ): Promise<WorkoutPlanEntity> {
    const genAI = new GoogleGenerativeAI(configEnv.GEMINI_API_KEY!);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
    console.log(configEnv.GEMINI_API_KEY!);

    const prompt = `
Create a 7 day gym workout plan.

Rules:
- Each muscle group must have 3 exercises
- Use gym equipment
- Return JSON only

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
     "reps":0,
     "rest":""
    }
   ]
  }
 ]
}
`;
    console.log("navas1");
    const result = await model.generateContent(prompt);
    console.log("navas2");
    const text = await result.response.text();
    console.log("navas3");

    const cleaned = text.replace(/```json|```/g, "").trim();

    return JSON.parse(cleaned);
  }
}
