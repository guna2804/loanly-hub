import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, DollarSign, Plus } from "lucide-react";
import { Loan, LoanType, ScheduleType } from "./types";

interface LoanFormProps {
  type: LoanType;
  onSubmit: (loan: Omit<Loan, "id">) => void;
  onCancel: () => void;
  initialData?: Loan;
}

export const LoanForm = ({ type, onSubmit, onCancel, initialData }: LoanFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    principal: initialData?.principal || "",
    interestRate: initialData?.interestRate || "",
    startDate: initialData?.startDate ? new Date(initialData.startDate) : undefined,
    dueDate: initialData?.dueDate ? new Date(initialData.dueDate) : undefined,
    schedule: initialData?.schedule || "monthly",
    isCompoundInterest: initialData?.isCompoundInterest || false,
    status: initialData?.status || "active"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type,
      name: formData.name,
      principal: formData.principal ? Number(formData.principal) : 0,
      interestRate: formData.interestRate ? Number(formData.interestRate) : 0,
      startDate: formData.startDate ? format(formData.startDate, "yyyy-MM-dd") : "",
      dueDate: formData.dueDate ? format(formData.dueDate, "yyyy-MM-dd") : "",
      status: formData.status,
      remainingBalance: formData.principal ? Number(formData.principal) : 0,
      schedule: formData.schedule as ScheduleType,
      isCompoundInterest: formData.isCompoundInterest
    });
  };

  return (
    <Card className="p-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">
          {initialData ? "Edit" : "Add New"} {type === "lending" ? "Loan" : "Borrowing"}
        </h3>
        <Button variant="ghost" onClick={onCancel}>×</Button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">{type === "lending" ? "Borrower Name" : "Lender Name"}</Label>
          <Input 
            id="name" 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter name" 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Principal Amount</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              id="amount" 
              type="number" 
              value={formData.principal}
              onChange={(e) => setFormData({ ...formData, principal: e.target.value })}
              placeholder="0.00" 
              className="pl-9" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="interest">Interest Rate (%)</Label>
          <Input 
            id="interest" 
            type="number" 
            step="0.1" 
            value={formData.interestRate}
            onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
            placeholder="5.0" 
          />
        </div>

        <div className="space-y-2">
          <Label>Interest Type</Label>
          <div className="flex items-center space-x-2">
            <Switch
              id="compound"
              checked={formData.isCompoundInterest}
              onCheckedChange={(checked) => setFormData({ ...formData, isCompoundInterest: checked })}
            />
            <Label htmlFor="compound">
              {formData.isCompoundInterest ? "Compound" : "Flat"} Interest
            </Label>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.startDate ? format(formData.startDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.startDate}
                onSelect={(date) => setFormData({ ...formData, startDate: date })}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Due Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.dueDate ? format(formData.dueDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.dueDate}
                onSelect={(date) => setFormData({ ...formData, dueDate: date })}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Repayment Schedule</Label>
          <Select 
            value={formData.schedule}
            onValueChange={(value) => {
              if (["weekly", "bi-weekly", "monthly"].includes(value)) {
                setFormData({ ...formData, schedule: value as ScheduleType });
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select schedule" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button type="submit" variant="financial" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            {initialData ? "Update" : "Add"} {type === "lending" ? "Loan" : "Borrowing"}
          </Button>
        </div>
      </form>
    </Card>
  );
};