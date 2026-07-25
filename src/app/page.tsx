import { CalendarPlus, Trash2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ThemeToggle } from "@/components/shared/theme-toggle";

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

export default async function HomePage() {
  const t = await getTranslations("home");

  return (
    <main className="min-h-screen bg-background p-6 md:p-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <span className="text-sm font-semibold text-primary">Turnix</span>

            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
              {t("title")}
            </h1>

            <p className="mt-2 text-foreground-muted">
              Prueba inicial del Design System y los componentes UI.
            </p>
          </div>

          <ThemeToggle />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle>Citas de hoy</CardTitle>

                  <CardDescription>
                    Servicios programados para hoy.
                  </CardDescription>
                </div>

                <Badge variant="success">Activo</Badge>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-4xl font-semibold tracking-tight text-foreground">
                24
              </p>

              <p className="mt-1 text-sm text-foreground-muted">
                6 citas aún están pendientes
              </p>
            </CardContent>

            <CardFooter>
              <Button>
                <CalendarPlus className="size-4" />
                Nueva cita
              </Button>

              <Button variant="outline">Ver agenda</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estados de los turnos</CardTitle>

              <CardDescription>
                Variantes disponibles del componente Badge.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-wrap gap-2">
              <Badge>Sin asignar</Badge>
              <Badge variant="primary">Programada</Badge>
              <Badge variant="success">Confirmada</Badge>
              <Badge variant="warning">En espera</Badge>
              <Badge variant="info">En atención</Badge>
              <Badge variant="danger">Cancelada</Badge>
            </CardContent>

            <CardFooter>
              <Button variant="danger">
                <Trash2 className="size-4" />
                Eliminar
              </Button>

              <Button variant="ghost">Cancelar</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
