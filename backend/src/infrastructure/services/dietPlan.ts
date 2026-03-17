import Groq from "groq-sdk";
import { HealthDetails } from "../../application/dtos/memberDto/workoutPlandto";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

async function generateDay(healthDetails: HealthDetails, day: string) {
  const prompt = `
Generate a gym diet plan for ${day} based on this user health data:
${JSON.stringify(healthDetails)}

Requirements:
1. Only include one day: ${day}.
2. Include exactly 4 meals: breakfast, lunch, snack, dinner.
3. All strings must use double quotes.
4. quantity must be a string (e.g., "2 eggs", "1 cup", "100g").
5. mealType must be one of: "breakfast", "lunch", "snack", "dinner".
6. foods must be an array of objects with keys: name, quantity, calories, protein.
7. calories and protein must be numbers.
8. JSON must be valid.
9. Return ONLY valid JSON.

Example structure:

{
 "day": "${day}",
 "dailyCalories": 2000,
 "dailyProtein": 150,
 "meals":[
   {
     "mealType":"breakfast",
     "time":"08:00",
     "foods":[
       { "name":"Eggs", "quantity":"2 eggs", "calories":140, "protein":12 }
     ]
   }
 ]
}
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  let content = response.choices[0].message.content || "";
  content = content.replace(/```json|```/g, "").trim();

  try {
    const dayPlan = JSON.parse(content);
    if (!dayPlan.meals || dayPlan.meals.length !== 4) {
      throw new Error(`Day ${day} does not have 4 meals`);
    }
    return dayPlan;
  } catch (err) {
    throw new Error(`Failed to parse JSON for ${day}: ${err}`);
  }
}

export async function generateDietPlan(healthDetails: HealthDetails) {
  const plan: any = {
    planName: "7 Day Gym Diet Plan",
    goalType: healthDetails.fitnessGoal || "muscle_gain",
    days: [],
  };

  for (const day of daysOfWeek) {
    const dayPlan = await generateDay(healthDetails, day);
    plan.days.push(dayPlan);
  }

  return plan;
}
