import { SidebarProvider } from "@/src/components/layout/sidebar/SidebarContext";
import QueryProvider from "./queryProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider >
      <SidebarProvider>{children}</SidebarProvider>
    </QueryProvider>
  );
}
