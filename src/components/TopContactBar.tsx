import React from "react";
import { useLocation } from "react-router-dom";

const CONTACTS = {
  ooty: {
    address: "215 H, DISPENSARY ROAD, FERN HILL, OOTY 643004",
    phones: ["+91 9962822355", "+91 9150486153"],
    emails: ["stay@drizzledropinn.com"],
  },
  chennai: {
    address: "A4, Chandsekaran Avenue, 1st Main Road, Thoraipakkam, Chennai - 600097",
    phones: ["+91 9791178349", "+91 9962822355"],
    emails: ["stay@drizzledropinn.com", "drizzledropinnchennai@gmail.com"],
  },
};

function getLocationFromPath(pathname: string) {
  if (/chennai/i.test(pathname)) return "chennai";
  return "ooty";
}

export default function TopContactBar() {
  const location = useLocation();
  const locKey = getLocationFromPath(location.pathname);
  const contact = CONTACTS[locKey];
  const isChennai = locKey === "chennai";

  return (
    <div
      className="w-full sticky top-0 z-50 bg-gradient-to-r from-black via-gray-900 to-black text-gray-100 text-xs md:text-sm font-sans flex items-center justify-between px-2 md:px-8 h-8 md:h-10 shadow-sm"
      style={{ fontFamily: 'Inter, Arial, sans-serif', letterSpacing: 0.1 }}
    >
      {/* Left: Address */}
      <div
        className={`flex items-center gap-1 md:gap-2 ${
          isChennai ? "whitespace-normal overflow-hidden" : "whitespace-nowrap overflow-x-auto"
        }`}
      >
        <span className="text-lg md:text-base align-middle">📍</span>
        <span className={isChennai ? "truncate max-w-xs md:max-w-md" : undefined}>
          {contact.address}
        </span>
      </div>
      {/* Right: Phones & Email */}
      <div
        className={`flex items-center gap-4 md:gap-6 ${
          isChennai ? "whitespace-nowrap overflow-hidden" : "whitespace-nowrap overflow-x-auto"
        }`}
      >
        <span className="flex items-center gap-1">
          <span className="text-lg md:text-base align-middle">📞</span>
          {contact.phones.map((p, i) => (
            <a
              key={p}
              href={`tel:${p.replace(/\s+/g, "")}`}
              className={`hover:underline hover:text-primary transition-colors duration-150 ml-1 first:ml-0 ${
                isChennai ? "truncate max-w-[6rem] md:max-w-[8rem] block" : ""
              }`}
            >
              {p}
              {i !== contact.phones.length - 1 && <span className="mx-1">,</span>}
            </a>
          ))}
        </span>
        <span className="flex items-center gap-1">
          <span className="text-lg md:text-base align-middle">✉</span>
          {contact.emails.map((e, i) => (
            <a
              key={e}
              href={`mailto:${e}`}
              className={`hover:underline hover:text-primary transition-colors duration-150 ml-1 first:ml-0 ${
                isChennai ? "truncate max-w-[8rem] md:max-w-[12rem] block" : ""
              }`}
            >
              {e}
              {i !== contact.emails.length - 1 && <span className="mx-1">,</span>}
            </a>
          ))}
        </span>
      </div>
    </div>
  );
}