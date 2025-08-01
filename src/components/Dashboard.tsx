import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SimpleBarChart, SimplePieChart } from "@/components/SimpleChart";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Clock,
  AlertTriangle,
  Plus,
  Eye,
} from "lucide-react";

// Sample data
const summaryData = {
  totalLent: 15750,
  totalBorrowed: 8500,
  interestEarned: 1250,
  currency: "USD",
};

const upcomingPayments = [
  {
    id: 1,
    name: "Alex Johnson",
    amount: 500,
    dueDate: "2024-02-15",
    type: "lending",
    status: "due",
  },
  {
    id: 2,
    name: "Sarah Mills",
    amount: 1200,
    dueDate: "2024-02-18",
    type: "borrowing",
    status: "upcoming",
  },
  {
    id: 3,
    name: "Mike Chen",
    amount: 750,
    dueDate: "2024-02-20",
    type: "lending",
    status: "overdue",
  },
  {
    id: 4,
    name: "Emma Davis",
    amount: 300,
    dueDate: "2024-02-22",
    type: "lending",
    status: "upcoming",
  },
];

const monthlyData = [
  { month: "Sep", amount: 2400 },
  { month: "Oct", amount: 1800 },
  { month: "Nov", amount: 3200 },
  { month: "Dec", amount: 2800 },
  { month: "Jan", amount: 4100 },
  { month: "Feb", amount: 1950 },
];

const statusData = [
  { name: "On Time", value: 65, color: "hsl(var(--secondary))" },
  { name: "Overdue", value: 20, color: "hsl(var(--destructive))" },
  { name: "Closed", value: 15, color: "hsl(var(--muted))" },
];

const formatCurrency = (amount: number, currency: string) => {
  const symbol = currency === "USD" ? "$" : "€";
  return `${symbol}${amount.toLocaleString()}`;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "overdue":
      return "destructive";
    case "due":
      return "default";
    default:
      return "secondary";
  }
};

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-financial bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track your lending and borrowing activities
          </p>
        </div>
        {/* <Button variant="financial" className="w-fit">
          <Plus className="w-4 h-4 mr-2" />
          Add New Loan
        </Button> */}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-primary border-0 text-primary-foreground shadow-financial">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-foreground/80 text-sm font-medium">
                Total Lent
              </p>
              <p className="text-2xl font-bold">
                {formatCurrency(summaryData.totalLent, summaryData.currency)}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-secondary border-0 text-secondary-foreground shadow-success">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary-foreground/80 text-sm font-medium">
                Total Borrowed
              </p>
              <p className="text-2xl font-bold">
                {formatCurrency(
                  summaryData.totalBorrowed,
                  summaryData.currency
                )}
              </p>
            </div>
            <div className="w-12 h-12 bg-secondary-foreground/20 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-accent border-0 text-accent-foreground shadow-glow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-accent-foreground/80 text-sm font-medium">
                Interest Earned
              </p>
              <p className="text-2xl font-bold">
                {formatCurrency(
                  summaryData.interestEarned,
                  summaryData.currency
                )}
              </p>
            </div>
            <div className="w-12 h-12 bg-accent-foreground/20 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Payments */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Upcoming Payments</h2>
            <Badge className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200">
              {upcomingPayments.length} payments
            </Badge>
          </div>
          <div className="space-y-3">
            {upcomingPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      payment.status === "overdue"
                        ? "bg-destructive"
                        : payment.status === "due"
                        ? "bg-warning"
                        : "bg-secondary"
                    }`}
                  ></div>
                  <div>
                    <p className="font-medium">{payment.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {payment.dueDate}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {formatCurrency(payment.amount, summaryData.currency)}
                  </p>
                  <Badge
                    variant={getStatusColor(payment.status)}
                    className="text-xs"
                  >
                    {payment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Monthly Repayments Chart */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Repayments</h2>
          <SimpleBarChart data={monthlyData} height={280} />
        </Card>

        {/* Status Distribution */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Loan Status Distribution
          </h2>
          <SimplePieChart data={statusData} height={280} />
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-3">
            <Button variant="outline" className="justify-start h-12">
              <Plus className="w-4 h-4 mr-3" />
              Record New Loan
            </Button>
            <Button variant="outline" className="justify-start h-12">
              <Clock className="w-4 h-4 mr-3" />
              Log Repayment
            </Button>
            <Button variant="outline" className="justify-start h-12">
              <Eye className="w-4 h-4 mr-3" />
              View All Loans
            </Button>
            <Button variant="outline" className="justify-start h-12">
              <AlertTriangle className="w-4 h-4 mr-3" />
              Send Reminders
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
