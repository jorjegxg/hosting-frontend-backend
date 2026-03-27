"use client";

import { ReactNode } from "react";
import { useOrderPlanStore } from "../store/orderPlanStore";

type PlanSelectLinkProps = {
  plan: "hosting-9-99" | "full-stack-19-99";
  className: string;
  children: ReactNode;
};

export default function PlanSelectLink({
  plan,
  className,
  children,
}: PlanSelectLinkProps) {
  const setSelectedPlan = useOrderPlanStore((state) => state.setSelectedPlan);

  return (
    <a
      href="#start-your-order"
      className={className}
      onClick={() => setSelectedPlan(plan)}
    >
      {children}
    </a>
  );
}
