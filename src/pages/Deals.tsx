import { useParams } from "react-router-dom";
import DealsSection from "@/components/DealsSection";
import SEO from "@/components/SEO";

export default function Deals() {
  const { locationId } = useParams<{ locationId?: string }>();
  
  // Determine if we are on a specific location's deals page or the general one
  const loc = locationId?.toLowerCase() === "ooty" ? "Ooty" : "Chennai";

  return (
    <div className="pt-24 min-h-screen bg-secondary/5">
      <SEO 
        title={locationId ? `Best Hotel Deals in ${loc} | DrizzleDrop Inn` : "Exclusive Hotel Offers & Deals | DrizzleDrop Inn"}
        description={`Save on your next stay at DrizzleDrop Inn ${loc ? loc : 'Ooty or Chennai'}. Explore our seasonal packages and direct booking discounts.`}
        url={`https://drizzledropinn.com/${locationId ? locationId + '/deals' : 'deals'}`}
      />
      <h1 className="sr-only">{locationId ? `${loc} Hotel Deals` : "DrizzleDrop Inn Exclusive Offers"}</h1>
      <DealsSection location={loc as "Chennai" | "Ooty"} />
      
      {/* If this is a general page, we could also show the OTHER location's deals below */}
      {!locationId && (
        <DealsSection location={loc === "Chennai" ? "Ooty" : "Chennai"} />
      )}
    </div>
  );
}
