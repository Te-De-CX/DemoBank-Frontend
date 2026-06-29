"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { SavingsGoal } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { FundAccountModal } from "@/components/modals/FundAccountModal";
import { motion } from "framer-motion";
import { Target } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export default function SavingsPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  const { data: goals, isLoading } = useQuery<SavingsGoal[]>({
    queryKey: ["savings"],
    queryFn: () => api.get("/savings/goals/").then(r => r.data),
  });

  const addGoal = useMutation({
    mutationFn: () => api.post("/savings/goals/", { name: goalName, target_amount: parseFloat(targetAmount) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savings"] });
      toast({ title: "Goal created", variant: "success" });
      setGoalName("");
      setTargetAmount("");
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Savings Goals</h1>
          <p className="text-white/50">Set and track your savings goals</p>
        </div>
        <FundAccountModal />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals?.map((goal) => (
          <motion.div key={goal.id} whileHover={{ scale: 1.02 }}>
            <div className="glass-card p-6">
              <div className="flex items-center gap-4">
                <Target className="w-10 h-10 text-[#7C5CFC]" />
                <div className="flex-1">
                  <p className="font-semibold text-white">{goal.name}</p>
                  <Progress value={goal.progress} className="h-2 mt-2" />
                  <p className="text-sm text-white/50 mt-1">
                    {formatCurrency(goal.current_amount)} of {formatCurrency(goal.target_amount)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="glass-card p-6 max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-white">Create New Goal</h2>
        <div className="space-y-4">
          <div>
            <Label className="text-white/50">Goal Name</Label>
            <Input value={goalName} onChange={e => setGoalName(e.target.value)} className="bg-white/5 border-white/10 text-white" />
          </div>
          <div>
            <Label className="text-white/50">Target Amount</Label>
            <Input type="number" value={targetAmount} onChange={e => setTargetAmount(e.target.value)} className="bg-white/5 border-white/10 text-white" />
          </div>
          <Button onClick={() => addGoal.mutate()} disabled={!goalName || !targetAmount} className="bg-[#7C5CFC] hover:bg-[#6B4EE6]">
            Add Goal
          </Button>
        </div>
      </div>
    </div>
  );
}