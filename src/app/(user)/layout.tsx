import Navbar from "@/components/navbar"
import { GlobeLockIcon, ShoppingCartIcon, WalletIcon } from "lucide-react";

const links = [
  {
    href: "/marketplace",
    text: "Marketplace",
    image: <GlobeLockIcon className="h-6 w-6" />,

  },
  {
    href: "/purchases",
    text: "My Purchases",
    image: <ShoppingCartIcon className="h-6 w-6" />,

  },
  {
    href: "/wallet",
    text: "Wallet",
    image: <WalletIcon className="h-6 w-6" />,
  },
];

export default function User({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="grid grid-cols-12 w-full">
      <Navbar links={links} supText="" />
      <div className="col-start-3 col-end-13 pr-10 pl-24 z-40"> {children}</div>
    </section>
  )
}