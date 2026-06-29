"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectNative } from "@/components/ui/select";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, Check, ArrowLeft } from "lucide-react";
import { Account } from "@/types";
import { formatCurrency } from "@/lib/utils";

export function TransferModal({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [sourceAccount, setSourceAccount] = useState("");
  const [recipientAccount, setRecipientAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: accounts } = useQuery<Account[]>({
    queryKey: ["accounts"],
    queryFn: () => api.get("/accounts/accounts/").then((r) => (Array.isArray(r.data) ? r.data : r.data.results || [])),
  });

  const transferMutation = useMutation({
    mutationFn: () =>
      api.post("/transactions/transfer/", {
        source_account_id: parseInt(sourceAccount),
        recipient_account: recipientAccount,
        amount: parseFloat(amount),
        description,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast({ title: "Transfer successful!", variant: "success" });
      setStep(1);
      setOpen(false);
    },
    onError: (err: any) => {
      toast({ title: "Transfer failed", description: err.response?.data?.error, variant: "destructive" });
    },
  });

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const accountOptions = accounts?.map((a) => ({
    value: a.id.toString(),
    label: `${a.account_type} (****${a.account_number.slice(-4)}) - ${formatCurrency(a.balance)}`,
  })) || [];

  const selectedSource = accounts?.find((a) => a.id.toString() === sourceAccount);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="gap-2 bg-[#7C5CFC] hover:bg-[#6B4EE6] text-white">
            <ArrowRight className="w-4 h-4" /> New Transfer
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#141420] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {step === 1 ? "Transfer Money" : step === 2 ? "Review Transfer" : "Success"}
          </DialogTitle>
          <DialogDescription className="text-white/50">
            {step === 1
              ? "Select the source account and enter details."
              : step === 2
              ? "Please confirm the transfer."
              : "Your transfer has been initiated."}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-white/50">From Account</Label>
              <SelectNative
                options={accountOptions}
                value={sourceAccount}
                onChange={(v) => setSourceAccount(v)}
                placeholder="Select account"
              />
            </div>
            <div>
              <Label className="text-white/50">Recipient Account Number</Label>
              <Input
                value={recipientAccount}
                onChange={(e) => setRecipientAccount(e.target.value)}
                placeholder="Enter account number"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div>
              <Label className="text-white/50">Amount</Label>
              <Input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div>
              <Label className="text-white/50">Description (optional)</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setOpen(false)} className="border-white/10 text-white hover:bg-white/10">
                Cancel
              </Button>
              <Button onClick={handleNext} disabled={!sourceAccount || !recipientAccount || !amount} className="bg-[#7C5CFC] hover:bg-[#6B4EE6]">
                Next
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 py-4">
            <div className="bg-white/5 rounded-xl p-4 space-y-2">
              <p className="text-sm text-white/50">From</p>
              <p className="font-medium text-white">{selectedSource?.account_type} - ****{selectedSource?.account_number.slice(-4)}</p>
              <p className="text-sm text-white/50">To</p>
              <p className="font-medium text-white">{recipientAccount}</p>
              <p className="text-sm text-white/50">Amount</p>
              <p className="text-lg font-bold text-white">{formatCurrency(parseFloat(amount))}</p>
            </div>
            <div className="flex justify-between gap-3">
              <Button variant="outline" onClick={handleBack} className="border-white/10 text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              <Button onClick={() => transferMutation.mutate()} disabled={transferMutation.isPending} className="bg-[#7C5CFC] hover:bg-[#6B4EE6]">
                {transferMutation.isPending ? "Processing..." : "Confirm Transfer"}
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center py-8">
            <div className="w-12 h-12 rounded-full bg-[#5CF0B0]/20 flex items-center justify-center">
              <Check className="w-6 h-6 text-[#5CF0B0]" />
            </div>
            <p className="mt-4 font-medium text-white">Transfer successful!</p>
            <Button onClick={() => { setOpen(false); setStep(1); }} className="mt-6 bg-[#7C5CFC] hover:bg-[#6B4EE6]">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}