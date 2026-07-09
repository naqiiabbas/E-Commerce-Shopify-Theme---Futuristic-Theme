import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { SearchDrawer } from "@/components/layout/search-drawer";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <CartDrawer />
      <SearchDrawer />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
