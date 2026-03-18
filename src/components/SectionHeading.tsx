import { motion } from "framer-motion";

interface Props {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({ label, title, subtitle, align = "center" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : ""}`}
    >
      {label && <p className="label-caps mb-4 text-primary">{label}</p>}
      <h2 className="heading-section">{title}</h2>
      {subtitle && (
        <p className="body-text mt-4 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  );
}
