import Groq from "groq-sdk";
import { HealthDetails } from "../../application/dtos/memberDto/workoutPlandto";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateDietPlan(healthDetails: HealthDetails) {
  const prompt = `
Create a 7-day gym diet plan for the user.

Return ONLY valid JSON.

Strict rules:
1. All strings must use double quotes
2. quantity MUST be a string (e.g., "2 eggs", "1 cup", "100g")
3. Do NOT include units outside quotes
4. Each day must contain exactly 4 meals
5. mealType must be one of: "breakfast","lunch","snack","dinner"
6. foods must be an array of objects
7. calories, protein, carbs, fats are numbers
8. No comments, no markdown
9. JSON must be valid for JSON.parse()

Structure example:

{
 "planName": "7 Day Gym Diet Plan",
 "goalType": "muscle_gain",
 "days":[
   {
     "day":"Monday",
     "dailyCalories":2000,
     "dailyProtein":150,
     "dailyCarbs":200,
     "dailyFats":60,
     "meals":[
       {
         "mealType":"breakfast",
         "time":"08:00",
         "foods":[
           {
             "name":"Eggs",
             "quantity":"2 eggs",
             "calories":140,
             "protein":12,
             "carbs":0,
             "fats":10
           }
         ]
       }
     ]
   }
 ]
}

User Health Data:
${JSON.stringify(healthDetails)}
`;

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    let content = response.choices[0].message.content || "";

    // Remove markdown code blocks if any
    content = content.replace(/```json|```/g, "").trim();

    // Extract JSON safely
    const start = content.indexOf("{");
    const end = content.lastIndexOf("}");
    if (start === -1 || end === -1) {
      throw new Error("AI did not return JSON");
    }
    const jsonString = content.slice(start, end + 1);

    // Parse JSON
    const dietPlan = JSON.parse(jsonString);
    return dietPlan;
  } catch (error) {
    console.error("Diet AI Error:", error);
    throw new Error("Failed to generate diet plan");
  }
}
