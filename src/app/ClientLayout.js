"use client"; // Mark this as a client component

import { usePathname } from "next/navigation";
import Footer from "./components/Footer/footer"; // Import Footer component

export default function ClientLayout({ children }) {
  const pathname = usePathname();  // Get the current route

  // Add multiple conditions to exclude footer for specific pages
  const noFooterPages = ['/signin', '/chatbox','/signup']; // List the paths where footer should be excluded

  return (
    <>
      {children}
      {!noFooterPages.includes(pathname) && <Footer />} {/* Footer will be shown on pages not listed */}
    </>
  );
}

