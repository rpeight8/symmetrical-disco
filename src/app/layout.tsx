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
      <body className="h-screen bg-primary-500 scrollbar-thin scrollbar-track-secondary-200 scrollbar-thumb-secondary-700 overflow-y-scroll">
        <NavigationSidebar />
        {/* @ts-expect-error Server Component */}
        <Header className="h-16 fixed w-full pr-3 mt-3" />
        <div className="p-2">
          <main className="mt-24">{children}</main>
        </div>
      </body>
    </html>
  );
}
