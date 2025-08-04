import { useState } from "react";
import { LoanList } from "@/components/LoanList";
import { LoanForm } from "@/components/LoanForm";
import { LoanFilter } from "@/components/LoanFilter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, TrendingDown } from "lucide-react";
import { Loan } from "@/components/types";

export const LoanManagement = () => {
  const [activeTab, setActiveTab] = useState<"lending" | "borrowing">("lending");
  const [showAddForm, setShowAddForm] = useState(false);
  const [loans, setLoans] = useState<Loan[]>([
    {
      id: 1,
      type: "lending",
      name: "Alex Johnson",
      principal: 5000,
      interestRate: 5.5,
      startDate: "2024-01-15",
      dueDate: "2024-06-15",
      status: "active",
      remainingBalance: 3200,
      schedule: "monthly"
    },
    {
      id: 2,
      type: "borrowing",
      name: "Sarah Mills",
      principal: 8000,
      interestRate: 4.2,
      startDate: "2024-02-01",
      dueDate: "2024-08-01",
      status: "active",
      remainingBalance: 6500,
      schedule: "bi-weekly"
    },
    {
      id: 3,
      type: "lending",
      name: "Mike Chen",
      principal: 2500,
      interestRate: 6.0,
      startDate: "2023-11-10",
      dueDate: "2024-02-10",
      status: "overdue",
      remainingBalance: 800,
      schedule: "weekly"
    }
  ]);

  const handleAddLoan = (newLoan: Omit<Loan, "id">) => {
    setLoans([...loans, { ...newLoan, id: loans.length + 1 }]);
    setShowAddForm(false);
  };

  const handleUpdateLoan = (updatedLoan: Loan) => {
    setLoans(loans.map(loan => loan.id === updatedLoan.id ? updatedLoan : loan));
  };

  const handleDeleteLoan = (id: number) => {
    setLoans(loans.filter(loan => loan.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-financial bg-clip-text text-transparent">
            Loan Management
          </h1>
          <p className="text-muted-foreground">Manage your lending and borrowing activities</p>
        </div>
        <Button 
          variant="financial" 
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-fit"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New {activeTab === "lending" ? "Loan" : "Borrowing"}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "lending" | "borrowing")} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="lending" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Lending
          </TabsTrigger>
          <TabsTrigger value="borrowing" className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4" />
            Borrowing
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          {showAddForm && (
            <LoanForm 
              type={activeTab}
              onSubmit={handleAddLoan}
              onCancel={() => setShowAddForm(false)}
            />
          )}
          <LoanFilter />
          <LoanList 
            loans={loans.filter(loan => loan.type === activeTab)}
            onUpdate={handleUpdateLoan}
            onDelete={handleDeleteLoan}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};