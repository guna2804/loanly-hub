import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { 
  Plus, 
  Search, 
  Filter, 
  CalendarIcon, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  MoreHorizontal
} from "lucide-react";

// Sample loans data
const sampleLoans = [
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
];

const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;

const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "secondary";
    case "overdue": return "destructive";
    case "closed": return "outline";
    default: return "secondary";
  }
};

export const LoanManagement = () => {
  const [activeTab, setActiveTab] = useState("lending");
  const [showAddForm, setShowAddForm] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [dueDate, setDueDate] = useState<Date>();
  const [isCompoundInterest, setIsCompoundInterest] = useState(false);

  const filteredLoans = sampleLoans.filter(loan => loan.type === activeTab);

  const AddLoanForm = () => (
    <Card className="p-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">
          Add New {activeTab === "lending" ? "Loan" : "Borrowing"}
        </h3>
        <Button variant="ghost" onClick={() => setShowAddForm(false)}>×</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">
            {activeTab === "lending" ? "Borrower Name" : "Lender Name"}
          </Label>
          <Input id="name" placeholder="Enter name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Principal Amount</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input id="amount" type="number" placeholder="0.00" className="pl-9" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="interest">Interest Rate (%)</Label>
          <Input id="interest" type="number" step="0.1" placeholder="5.0" />
        </div>

        <div className="space-y-2">
          <Label>Interest Type</Label>
          <div className="flex items-center space-x-2">
            <Switch
              id="compound"
              checked={isCompoundInterest}
              onCheckedChange={setIsCompoundInterest}
            />
            <Label htmlFor="compound">
              {isCompoundInterest ? "Compound" : "Flat"} Interest
            </Label>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
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
                {dueDate ? format(dueDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dueDate}
                onSelect={setDueDate}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Repayment Schedule</Label>
          <Select>
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
          <Button variant="financial" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add {activeTab === "lending" ? "Loan" : "Borrowing"}
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Toggle Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
          {/* Add Form */}
          {showAddForm && <AddLoanForm />}

          {/* Search and Filter */}
          <Card className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by name..." className="pl-9" />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </Card>

          {/* Loans List */}
          <Card className="p-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">
                {activeTab === "lending" ? "Money Lent" : "Money Borrowed"}
              </h2>
              
              <div className="space-y-3">
                {filteredLoans.map((loan) => (
                  <div key={loan.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${
                          loan.status === "active" ? "bg-secondary" :
                          loan.status === "overdue" ? "bg-destructive" : "bg-muted"
                        }`}></div>
                        <div>
                          <h3 className="font-semibold">{loan.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Principal: {formatCurrency(loan.principal)}</span>
                            <span>Rate: {loan.interestRate}%</span>
                            <span>Due: {loan.dueDate}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(loan.remainingBalance)}</p>
                          <Badge variant={getStatusColor(loan.status)} className="text-xs">
                            {loan.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};