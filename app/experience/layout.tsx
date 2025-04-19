import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work Experience | Autumn Farris",
  description: "Professional experience and work history of Autumn Farris",
};

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="leaves-disabled">
      {children}
    </div>
  );
}