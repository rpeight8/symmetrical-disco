import "./globals.css";
import NavigationSidebar from "@/components/NavigationSidebar/NavigationSidebar";
import { getServerSession } from "next-auth";
import { options } from "@/lib/auth";
import Header from "@/components/Header";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  return (
    <html lang="en">
      <body className="h-screen bg-primary-500">
        <NavigationSidebar />
        <div className="p-2">
          {/* @ts-expect-error Server Component */}
          <Header className="mt-3.5" />
          <main className="py-10 px-5">{children}</main>
        </div>
      </body>
    </html>
  );
}
