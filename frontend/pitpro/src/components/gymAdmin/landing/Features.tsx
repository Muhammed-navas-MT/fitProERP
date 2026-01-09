import type React from "react";
import {
  Users,
  Clock,
  CreditCard,
  BarChart3,
  Shield,
  Lock,
} from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Users className="h-7 w-7 text-orange-500" />,
    title: "Member Management",
    description:
      "Centralize member profiles, automate check-ins, and streamline communication tasks.",
  },
  {
    icon: <Clock className="h-7 w-7 text-orange-500" />,
    title: "Class Scheduling",
    description:
      "Optimize class booking system with real-time availability and instant notifications.",
  },
  {
    icon: <CreditCard className="h-7 w-7 text-orange-500" />,
    title: "Payment Processing",
    description:
      "Automated billing, multiple payment methods, and detailed financial reporting.",
  },
  {
    icon: <BarChart3 className="h-7 w-7 text-orange-500" />,
    title: "Analytics Dashboard",
    description:
      "Real-time insights on membership trends, revenue, and operational metrics.",
  },
  {
    icon: <Shield className="h-7 w-7 text-orange-500" />,
    title: "Security & Compliance",
    description:
      "Enterprise-grade security with GDPR compliance and data encryption.",
  },
  {
    icon: <Lock className="h-7 w-7 text-orange-500" />,
    title: "Access Control",
    description:
      "Role-based access and permission management for multi-user environments.",
  },
];

export default function Features() {
  return (
    <section className="bg-gradient-to-b from-neutral-950 via-black to-black px-6 py-20 sm:px-12 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Everything Your Gym Needs
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">
            From member management to revenue tracking, FitPro ERP gives you all
            the tools needed to scale your gym efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex flex-col gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-7 transition-all duration-300 hover:border-orange-500/40 hover:shadow-[0_0_30px_-12px_rgba(249,115,22,0.5)]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-black/40 border border-neutral-800 group-hover:border-orange-500/40 transition-colors">
                {feature.icon}
              </div>

              <h3 className="text-lg font-bold text-white">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
