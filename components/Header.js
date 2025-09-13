'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavDropdown from './NavDropdown';

export default function Header() {
  const pathname = usePathname();

  const isCycles = pathname.startsWith('/cycles');
  const isInvoices = pathname.startsWith('/invoices');
  const isPayments = pathname.startsWith('/payments');

  const tab = (active) =>
    `inline-flex items-center h-8 px-3 rounded transition
     ${
       active
         ? 'bg-[#88c4ef] text-[#1c375b]'
         : 'bg-[#2a4a70] text-[#f9fbfa] hover:bg-[#345780]'
     }
    `;

  return (
    <header className="bg-[#1d3965] text-[#f9fbfa] border-b border-[#88c4ef]/40">
      <div className="max-w-5xl mx-auto px-6 py-4">
        <h1 className="text-2xl font-bold">AEC Admin</h1>
      </div>

      <nav className="max-w-5xl mx-auto px-6 pb-3 flex items-center gap-2">
        {/* Learners dropdown (already working) */}
        <NavDropdown
          label="Learners"
          rootHref="/"
          items={[
            {
              label: 'Active Learners',
              href: '/',
              activeMatch: (p) => p === '/' || p === '/learners',
            },
            {
              label: 'Archived Learners',
              href: '/archived',
              activeMatch: (p) => p === '/archived',
            },
          ]}
        />

        {/* Guardians dropdown (NEW) */}
        <NavDropdown
          label="Guardians"
          rootHref="/guardians"
          items={[
            {
              label: 'Active Guardians',
              href: '/guardians',
              activeMatch: (p) => p === '/guardians',
            },
            {
              label: 'Archived Guardians',
              href: '/guardians/archived',
              activeMatch: (p) => p === '/guardians/archived',
            },
          ]}
        />

        {/* Simple tabs for now */}
        <Link href="/cycles" className={tab(isCycles)}>
          Cycles
        </Link>
        <Link href="/invoices" className={tab(isInvoices)}>
          Invoices
        </Link>
        <Link href="/payments" className={tab(isPayments)}>
          Payments
        </Link>
      </nav>
    </header>
  );
}
