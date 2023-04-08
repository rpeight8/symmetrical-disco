import Image from "next/image";
import { Inter } from "next/font/google";
import NavigationToolbar from "@/components/NavigationToolbar/NavigationToolbar";
import NavigationToolbarOpenCloseButton from "@/components/NavigationToolbar/NavigationToolbarOpenCloseButton";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <NavigationToolbar />;
}
