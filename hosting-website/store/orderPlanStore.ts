"use client";

import { create } from "zustand";

type OrderPlan = "hosting-9-99" | "full-stack-19-99" | "";

type OrderPlanState = {
  selectedPlan: OrderPlan;
  setSelectedPlan: (plan: OrderPlan) => void;
};

export const useOrderPlanStore = create<OrderPlanState>((set) => ({
  selectedPlan: "",
  setSelectedPlan: (plan) => set({ selectedPlan: plan }),
}));
