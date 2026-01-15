import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Suspense } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { RiLoader5Fill } from "@remixicon/react";
import AppSidebar from "@/components/sidebar";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/auth/sign-in");
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <RiLoader5Fill className="w-16 h-16 animate-spin" />
        </div>
      }
    >
      <NuqsAdapter>
        <SidebarProvider>
          <AppSidebar />

          <SidebarInset className="relative overflow-x-hidden pt-0">
            {children}
          </SidebarInset>
        </SidebarProvider>
      </NuqsAdapter>
    </Suspense>
  );
}
