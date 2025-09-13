'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function NavDropdown({
  label,
  rootHref = '/',
  items = [], // [{ label, href, activeMatch?: (path)=>boolean }]
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const enterTimer = useRef(null);
  const leaveTimer = useRef(null);

  // Helpers to delay open/close ~150ms
  const onEnter = () => {
    clearTimeout(leaveTimer.current);
    enterTimer.current = setTimeout(() => setOpen(true), 150);
  };
  const onLeave = () => {
    clearTimeout(enterTimer.current);
    leaveTimer.current = setTimeout(() => setOpen(false), 150);
  };
  useEffect(
    () => () => {
      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);
    },
    []
  );

  const isActive = items.some
    ? items.some((it) =>
        it.activeMatch ? it.activeMatch(pathname) : pathname === it.href
      )
    : pathname === rootHref;

  const tab = (active) =>
    `inline-flex items-center h-8 px-3 rounded transition
     ${
       active
         ? 'bg-[#88c4ef] text-[#1c375b]'
         : 'bg-[#2a4a70] text-[#f9fbfa] hover:bg-[#345780]'
     }
    `;

  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <Link href={rootHref} className={tab(isActive)}>
        {label}
        {items.length > 0 && <span className="ml-1 text-xs opacity-90">▼</span>}
      </Link>

      {items.length > 0 && open && (
        <div className="absolute left-0 mt-1 z-50">
          <div className="bg-[#1d3965] border border-[#88c4ef]/40 rounded shadow w-44">
            {items.map((it) => {
              const active = it.activeMatch
                ? it.activeMatch(pathname)
                : pathname === it.href;
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  className={`block px-3 py-2 hover:bg-[#2a4a70] ${
                    active ? 'text-[#88c4ef]' : 'text-[#f9fbfa]'
                  }`}
                >
                  {it.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
