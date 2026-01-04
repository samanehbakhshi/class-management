import { SidebarProvider } from "@/components/layout/sidebar/SidebarContext";
import QueryProvider from "./queryProvider";
import { AuthProvider } from "./AuthProvider";
import { getCurrentUser } from "../../../app/lib/auth/getCurrentUser";
import ThemeProvider from "./NextThemeProvider";

export async function Providers({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  return (
    <ThemeProvider
      defaultTheme="light"
      attribute="class"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider user={user}>
        <QueryProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </QueryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
