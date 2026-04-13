import React from "react";
import { useLocation } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

/**
 * Premium TopContactBar
 * Synchronized with Navbar sticky behavior.
 * Displays physical addresses professionally for each property.
 */

const CONTACTS = {
  ooty: {
    address: "215 H, Dispensary Road, Fern Hill, Ooty, Tamil Nadu - 643004",
    phones: ["+91 91504 86153", "+91 99628 22355", "+91 98849 12880"],
    emails: ["stay@drizzledropinn.com"],
  },
  chennai: {
    address: "A4, Chandsekaran Avenue, 1st Main Road, Thoraipakkam, Chennai - 600097",
    phones: ["+91 97911 78349", "+91 99628 22355"],
    emails: ["stay@drizzledropinn.com", "drizzledropinnchennai@gmail.com"],
  },
};

function getLocationFromPath(pathname: string) {
  if (/chennai/i.test(pathname)) return "chennai";
  if (/ooty/i.test(pathname)) return "ooty";
  return "chennai"; // Default to Chennai for home/overview (arbitrary, can be changed)
}

export default function TopContactBar() {
  const routerLocation = useLocation();
  const locKey = getLocationFromPath(routerLocation.pathname);
  const contact = CONTACTS[locKey];

  return (
    <div className="w-full bg-[#0a0f18] text-gray-300 border-b border-white/5 py-1 md:py-1.5 px-4 sticky top-0 z-[60] h-auto min-h-[32px] md:h-9 flex items-center transition-all duration-300">
      <div className="container-luxury max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1.5 md:gap-6 text-[9.5px] md:text-[11px] lg:text-xs">

        {/* Address - Prioritized for both locations */}
        <div className="flex items-center gap-2 group cursor-default text-center md:text-left">
          <MapPin className="w-3 h-3 text-[#C19E5F] shrink-0" />
          <span className="font-medium tracking-tight text-gray-200 group-hover:text-white transition-colors">
            {contact.address}
          </span>
        </div>

        {/* Global Contact Info */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 md:gap-5">
          {/* Phones */}
          <div className="flex items-center gap-2">
            <Phone className="w-3 h-3 text-[#C19E5F] shrink-0" />
            <div className="flex items-center gap-2.5">
              {contact.phones.map((p, i) => (
                <React.Fragment key={p}>
                  <a
                    href={`tel:${p.replace(/\s+/g, "")}`}
                    className="hover:text-white transition-colors duration-200 font-semibold"
                  >
                    {p}
                  </a>
                  {i < contact.phones.length - 1 && <span className="text-white/10 hidden sm:inline">|</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Mail */}
          <div className="flex items-center gap-2">
            <Mail className="w-3 h-3 text-[#C19E5F] shrink-0" />
            <div className="flex items-center gap-2.5">
              {contact.emails.map((e, i) => (
                <React.Fragment key={e}>
                  <a
                    href={`mailto:${e}`}
                    className="hover:text-white transition-colors duration-200 font-medium hidden sm:inline"
                  >
                    {e}
                  </a>
                  {/* On mobile, only show primary email text if it fits, else icon only handled by flex-wrap */}
                  <a
                    href={`mailto:${e}`}
                    className="sm:hidden hover:text-white transition-colors duration-200 text-[10px]"
                  >
                    {i === 0 ? e : null}
                  </a>
                  {i < contact.emails.length - 1 && <span className="text-white/10 hidden sm:inline">|</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
