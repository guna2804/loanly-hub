import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Dashboard } from "@/components/Dashboard";
import { LoanManagement } from "@/components/LoanManagement";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, CreditCard, Settings, PieChart } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <Layout>
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <Card className="p-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="loans" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                <span className="hidden sm:inline">Loans</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <PieChart className="w-4 h-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </Card>

        {/* Tab Content */}
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "loans" && <LoanManagement />}
        {activeTab === "analytics" && (
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Analytics Coming Soon</h2>
            <p className="text-muted-foreground">Advanced analytics and reporting features will be available here.</p>
          </Card>
        )}
        {activeTab === "settings" && (
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Settings Coming Soon</h2>
            <p className="text-muted-foreground">Customize your MoneyBoard experience with currency, notifications, and more.</p>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Index;
