import { CalendarPlus, Trash2 } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Topbar } from "@/components/layout/topbar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function DashboardPage() {
  const home = await getTranslations("home");
  const common = await getTranslations("common");

  return (
    <>
      <Topbar
        title={home("title")}
        subtitle={home("subtitle")}
      />

      <main className="flex-1 p-6 md:p-10">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-5 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle>
                      {home("todayAppointments.title")}
                    </CardTitle>

                    <CardDescription>
                      {home("todayAppointments.description")}
                    </CardDescription>
                  </div>

                  <Badge variant="success">
                    {common("active")}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-4xl font-semibold tracking-tight text-foreground">
                  24
                </p>

                <p className="mt-1 text-sm text-foreground-muted">
                  {home("todayAppointments.pending", {
                    count: 6,
                  })}
                </p>
              </CardContent>

              <CardFooter>
                <Button>
                  <CalendarPlus className="size-4" />
                  {home("todayAppointments.newAppointment")}
                </Button>

                <Button variant="outline">
                  {home("todayAppointments.viewSchedule")}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {home("shiftStatus.title")}
                </CardTitle>

                <CardDescription>
                  {home("shiftStatus.description")}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-wrap gap-2">
                <Badge>
                  {home("shiftStatus.unassigned")}
                </Badge>

                <Badge variant="primary">
                  {home("shiftStatus.scheduled")}
                </Badge>

                <Badge variant="success">
                  {home("shiftStatus.confirmed")}
                </Badge>

                <Badge variant="warning">
                  {home("shiftStatus.waiting")}
                </Badge>

                <Badge variant="info">
                  {home("shiftStatus.serving")}
                </Badge>

                <Badge variant="danger">
                  {home("shiftStatus.cancelled")}
                </Badge>
              </CardContent>

              <CardFooter>
                <Button variant="danger">
                  <Trash2 className="size-4" />
                  {common("delete")}
                </Button>

                <Button variant="ghost">
                  {common("cancel")}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}