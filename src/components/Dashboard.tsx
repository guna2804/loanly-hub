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
  Sparkles,
} from "lucide-react";

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
  { name: "Closed", value: 15, color: "hsl(var(--muted-foreground))" },
];

// Mock relationship view
const topContacts = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/40?u=john",
    balance: 300,
    status: "On Time",
  },
  {
    id: 2,
    name: "Marie Curie",
    avatar: "https://i.pravatar.cc/40?u=marie",
    balance: -150,
    status: "Overdue",
  },
  {
    id: 3,
    name: "Carlos Santana",
    avatar: "https://i.pravatar.cc/40?u=carlos",
    balance: 450,
    status: "On Time",
  },
];

const formatCurrency = (amount: number, currency: string) => {
  const symbol = currency === "USD" ? "$" : "€";
  return `${symbol}${amount.toLocaleString()}`;
};

// Only use valid variant types
const getStatusColor = (status: string) => {
  switch (status) {
    case "overdue":
      return "destructive";
    case "due":
      return "default";
    case "upcoming":
      return "secondary";
    default:
      return "default";
  }
};

const calculateProgress = (dueDate: string) => {
  const now = new Date();
  const due = new Date(dueDate);
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  if (due < now) return 100;
  const totalDuration = due.getTime() - start.getTime();
  const elapsed = now.getTime() - start.getTime();
  if (totalDuration <= 0) return 0;
  return Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
};

export const Dashboard = () => {
  const onTimePercent =
    statusData.find((d) => d.name === "On Time")?.value ?? 65;

  return (
    <div className="space-y-8 font-inter px-4 md:px-10 py-8 bg-gray-50 min-h-screen">
      {/* Header + Tagline */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-financial">
            Track. Trust. Thrive.
          </h1>
          <p className="text-gray-600 mt-1 max-w-lg">
            See your money relationships at a glance — effortless, clear, and
            secure.
          </p>
        </div>
        <Button
          variant="financial"
          className="w-fit shadow-md flex items-center gap-2"
          aria-label="Add a new lending or borrowing record"
          title="Quickly record what you lent or borrowed. All details safely stored."
        >
          <Plus className="w-5 h-5" />
          Add a new money moment
        </Button>
      </header>

      {/* Summary + Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-r from-teal-100 to-blue-50 border-0 shadow-md rounded-xl text-teal-800 flex items-center gap-4">
          <Sparkles className="w-8 h-8 text-teal-600" />
          <p className="font-semibold text-lg">
            Great job! You’ve kept <b>{onTimePercent}%</b> of your payments on
            time! 🚀
          </p>
        </Card>

        {/* Total Lent */}
        <Card className="p-6 bg-gradient-primary border-0 shadow-lg rounded-xl text-primary-foreground flex items-center justify-between">
          <div>
            <p className="text-primary-foreground/80 font-semibold text-sm">
              Total Lent
            </p>
            <p className="text-3xl font-extrabold">
              {formatCurrency(summaryData.totalLent, summaryData.currency)}
            </p>
          </div>
          <div className="w-14 h-14 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-7 h-7 text-primary-foreground" />
          </div>
        </Card>

        {/* Total Borrowed */}
        <Card className="p-6 bg-gradient-secondary border-0 shadow-lg rounded-xl text-secondary-foreground flex items-center justify-between">
          <div>
            <p className="text-secondary-foreground/80 font-semibold text-sm">
              Total Borrowed
            </p>
            <p className="text-3xl font-extrabold">
              {formatCurrency(summaryData.totalBorrowed, summaryData.currency)}
            </p>
          </div>
          <div className="w-14 h-14 bg-secondary-foreground/20 rounded-xl flex items-center justify-center">
            <TrendingDown className="w-7 h-7 text-secondary-foreground" />
          </div>
        </Card>

        {/* Interest Earned */}
        <Card className="p-6 bg-gradient-accent border-0 shadow-lg rounded-xl text-accent-foreground flex items-center justify-between">
          <div>
            <p className="text-accent-foreground/80 font-semibold text-sm">
              Interest Earned
            </p>
            <p className="text-3xl font-extrabold">
              {formatCurrency(summaryData.interestEarned, summaryData.currency)}
            </p>
          </div>
          <div className="w-14 h-14 bg-accent-foreground/20 rounded-xl flex items-center justify-center">
            <DollarSign className="w-7 h-7 text-accent-foreground" />
          </div>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Payments */}
        <Card className="p-6 rounded-xl border border-gray-200 shadow-sm">
          <header className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-gray-900">
              Upcoming Payments
            </h2>
            <Badge
              className="bg-indigo-100 text-indigo-800 border border-indigo-200"
              aria-label={`You have ${upcomingPayments.length} upcoming payments`}
            >
              {upcomingPayments.length} payments
            </Badge>
          </header>
          <div className="space-y-4">
            {upcomingPayments.map((payment) => {
              const progress = calculateProgress(payment.dueDate);
              return (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-300 hover:bg-indigo-50 transition"
                  aria-label={`${payment.name} payment of ${formatCurrency(
                    payment.amount,
                    summaryData.currency
                  )}, due on ${payment.dueDate}. Status: ${payment.status}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        payment.status === "overdue"
                          ? "bg-destructive"
                          : payment.status === "due"
                          ? "bg-warning"
                          : "bg-secondary"
                      }`}
                      aria-hidden="true"
                    ></span>
                    <div>
                      <p className="font-medium text-gray-800">
                        {payment.name}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {payment.dueDate}
                      </div>
                    </div>
                  </div>
                  <div className="text-right min-w-[100px]">
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(payment.amount, summaryData.currency)}
                    </p>
                    <Badge
                      variant={getStatusColor(payment.status)}
                      className="text-xs uppercase tracking-wide"
                    >
                      {payment.status}
                    </Badge>
                    {/* Progress Bar */}
                    <div
                      className="h-2 rounded-full mt-1 bg-gray-200 overflow-hidden"
                      aria-label={`Payment progress: ${Math.round(progress)}%`}
                    >
                      <div
                        className={`h-full ${
                          payment.status === "overdue"
                            ? "bg-destructive"
                            : "bg-indigo-600"
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Top Contacts / Relationship View */}
        <Card className="p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Top Money Relationships
          </h2>
          <ul className="space-y-4">
            {topContacts.map((contact) => {
              const isPositive = contact.balance >= 0;
              return (
                <li
                  key={contact.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
                  aria-label={`${contact.name}, balance: ${formatCurrency(
                    contact.balance,
                    summaryData.currency
                  )}. Status: ${contact.status}`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={contact.avatar}
                      alt={`${contact.name} avatar`}
                      className="w-10 h-10 rounded-full ring-2 ring-indigo-400"
                      loading="lazy"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {contact.name}
                      </p>
                      <p
                        className={`text-sm ${
                          isPositive ? "text-green-600" : "text-destructive"
                        }`}
                      >
                        {isPositive ? "You are owed" : "You owe"}{" "}
                        {formatCurrency(
                          Math.abs(contact.balance),
                          summaryData.currency
                        )}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    aria-label={`Send reminder to ${contact.name}`}
                  >
                    Remind
                  </Button>
                </li>
              );
            })}
          </ul>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-5 text-gray-900">
            Quick Actions
          </h2>
          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              className="justify-start h-12"
              aria-label="Record a new loan or borrowing"
            >
              <Plus className="w-5 h-5 mr-3" />
              Record New Loan
            </Button>
            <Button
              variant="outline"
              className="justify-start h-12"
              aria-label="Log a repayment"
            >
              <Clock className="w-5 h-5 mr-3" />
              Log Repayment
            </Button>
            <Button
              variant="outline"
              className="justify-start h-12"
              aria-label="View all loans and borrowing records"
            >
              <Eye className="w-5 h-5 mr-3" />
              View All Loans
            </Button>
            <Button
              variant="outline"
              className="justify-start h-12"
              aria-label="Send payment reminders to contacts"
            >
              <AlertTriangle className="w-5 h-5 mr-3" />
              Send Reminders
            </Button>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-5 text-gray-900">
            Monthly Repayments
          </h2>
          <SimpleBarChart data={monthlyData} height={280} />
        </Card>
        <Card className="p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-5 text-gray-900">
            Loan Status Distribution
          </h2>
          <SimplePieChart data={statusData} height={280} />
        </Card>
      </div>
    </div>
  );
};
