import Navbar from "@/components/navbar"
import { CircleDollarSignIcon, LayoutDashboardIcon, WalletIcon } from "lucide-react";

const links = [
  {
    href: "/creator/dashboard",
    text: "Dashboard",
    image: <LayoutDashboardIcon className="h-6 w-6" />,

  },
  {
    href: "/creator/earnings",
    text: "My Earnings",
    image: <CircleDollarSignIcon className="h-6 w-6" />,

  },
  {
    href: "/creator/wallet",
    text: "Wallet",
    image: <WalletIcon className="h-6 w-6" />,
  },
];

export default function Creator({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="grid grid-cols-12 w-full">
      <Navbar links={links} supText="creator" />
      <div className="col-start-3 col-end-13 pr-10 pl-24 z-40"> {children}</div>
    </section>
  )
}