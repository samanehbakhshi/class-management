import { SidebarProvider } from "@/components/layout/sidebar/SidebarContext";
import QueryProvider from "./queryProvider";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <QueryProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
