import { DietDay } from "@/types/dietType";

interface Props {
  day: DietDay;
}

export function DietDetail({ day }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        {day.day} Nutrition
      </h2>

      <div className="grid gap-4">
        {day.meals.map((meal) => (
          <div
            key={meal.mealType}
            className="border border-zinc-900 rounded-xl p-4"
          >
            <h3 className="text-orange-500 font-semibold capitalize">
              {meal.mealType.replace("_", " ")}
            </h3>

            <div className="mt-3 space-y-2">
              {meal.foods.map((food) => (
                <div
                  key={food.name}
                  className="flex justify-between text-sm text-zinc-300"
                >
                  <span>
                    {food.name}{" "}
                    {food.quantity && `(${food.quantity})`}
                  </span>

                  <span className="text-zinc-500">
                    {food.calories ?? 0} kcal
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}