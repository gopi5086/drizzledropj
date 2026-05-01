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
    address: "A4, 4/476/77, Chandrasekaran Avenue, 1st Main Road, Thoraipakkam, Chennai - 600097",
    phones: ["+91 97911 78349", "+91 99628 23455", "+91 84388 61737", "+91 44 24580009"],
    emails: ["stay@drizzledropinn.com", "drizzledropinnchennai@gmail.com"],
  },
};

function getLocationFromPath(pathname: string) {
  if (/chennai/i.test(pathname)) return "chennai";
  if (/ooty/i.test(pathname)) return "ooty";
  return null;
}

export default function TopContactBar() {
  const routerLocation = useLocation();
  const locKey = getLocationFromPath(routerLocation.pathname);

  if (!locKey) return null;

  const contact = CONTACTS[locKey as keyof typeof CONTACTS];

  return (
    <div className="flex w-full bg-[#0a0f18] text-gray-300 border-b border-white/5 py-2 md:py-1.5 px-4 z-[30] transition-all duration-300">
      <div className="container-luxury max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1.5 md:gap-0 text-[10px] md:text-[11px] lg:text-xs">

        {/* Full Address Wrapper */}
        <div className="flex items-start md:items-center justify-center md:justify-start gap-2 group cursor-default text-center md:text-left max-w-sm md:max-w-none">
          <MapPin className="w-3.5 h-3.5 md:w-3 md:h-3 text-[#C19E5F] shrink-0 mt-0.5 md:mt-0" />
          <span className="font-semibold md:font-medium tracking-tight text-white md:text-gray-200 group-hover:text-white transition-colors leading-tight">
            {contact.address}
          </span>
        </div>

        {/* Contact info row - More compact on mobile */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-3 gap-y-1.5 w-full md:w-auto mt-1 md:mt-0 pt-1.5 md:pt-0 border-t border-white/5 md:border-0">
          {/* Phones */}
          <div className="flex items-center gap-1.5">
            <Phone className="w-2.5 h-2.5 text-[#C19E5F] shrink-0" />
            <div className="flex items-center gap-2">
              {contact.phones.slice(0, 3).map((p, i) => (
                <React.Fragment key={p}>
                  <a
                    href={`tel:${p.replace(/\s+/g, "")}`}
                    className="hover:text-white transition-colors duration-200 font-bold md:font-semibold whitespace-nowrap text-[10px] md:text-[11px]"
                  >
                    {p}
                  </a>
                  {i < Math.min(contact.phones.length, 3) - 1 && <span className="text-white/10">|</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Mail */}
          <div className="flex items-center gap-1.5">
            <Mail className="w-2.5 h-2.5 text-[#C19E5F] shrink-0" />
            <div className="flex items-center gap-2">
              {contact.emails.slice(0, 2).map((e, i) => (
                <React.Fragment key={e}>
                  <a
                    href={`mailto:${e}`}
                    className="hover:text-white transition-colors duration-200 font-medium whitespace-nowrap text-[10px] md:text-[11px]"
                  >
                    {e}
                  </a>
                  {i < Math.min(contact.emails.length, 2) - 1 && <span className="text-white/10">|</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
