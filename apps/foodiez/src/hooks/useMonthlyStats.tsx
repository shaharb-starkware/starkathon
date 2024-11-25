import { useMemo } from "react";
import { Meal } from "../types/meal";
import { mealCountByDay } from "../utils/date";

export const useMonthlyStats = ({ mealsGroupedByMonth }: { mealsGroupedByMonth: Record<string, Meal[]>}) => {
  return useMemo(() => Object.entries(mealsGroupedByMonth).map(([month, meals]) => ({
      month,
      tokensSpent: 74.95,
      mealsByDay: mealCountByDay(meals),
    })), [mealsGroupedByMonth])
}
