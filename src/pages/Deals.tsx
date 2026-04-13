import { useParams } from "react-router-dom";
import DealsSection from "@/components/DealsSection";

export default function Deals() {
  const { locationId } = useParams<{ locationId?: string }>();
  
  // Determine if we are on a specific location's deals page or the general one
  const loc = locationId?.toLowerCase() === "ooty" ? "Ooty" : "Chennai";

  return (
    <div className="pt-24 min-h-screen bg-secondary/5">
      <DealsSection location={loc as "Chennai" | "Ooty"} />
      
      {/* If this is a general page, we could also show the OTHER location's deals below */}
      {!locationId && (
        <DealsSection location={loc === "Chennai" ? "Ooty" : "Chennai"} />
      )}
    </div>
  );
}
