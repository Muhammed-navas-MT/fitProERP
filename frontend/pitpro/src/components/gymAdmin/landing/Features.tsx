import type React from "react"
import { Users, Clock, CreditCard, BarChart3, Shield, Lock } from "lucide-react"

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: <Users className="h-8 w-8 text-white" />,
    title: "Member Management",
    description: "Centralize member profiles, automate check-ins, and streamline communication tasks.",
  },
  {
    icon: <Clock className="h-8 w-8 text-white" />,
    title: "Class Scheduling",
    description: "Optimize class booking system with real-time availability and instant notifications.",
  },
  {
    icon: <CreditCard className="h-8 w-8 text-white" />,
    title: "Payment Processing",
    description: "Automated billing, multiple payment methods, and detailed financial reporting.",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-white" />,
    title: "Analytics Dashboard",
    description: "Real-time insights on membership trends, revenue, and operational metrics.",
  },
  {
    icon: <Shield className="h-8 w-8 text-white" />,
    title: "Security & Compliance",
    description: "Enterprise-grade security with GDPR compliance and data encryption.",
  },
  {
    icon: <Lock className="h-8 w-8 text-white" />,
    title: "Access Control",
    description: "Role-based access and permission management for multi-user environments.",
  },
]

export default function Features() {
  return (
    <section className="bg-black px-6 py-20 sm:px-12 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">Everything Your Gym Needs</h2>
          <p className="text-base text-gray-400 sm:text-lg">
            From member management to revenue tracking, we've got you covered with cutting-edge features.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 rounded-lg bg-gray-900 p-6 transition-transform hover:scale-105"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-orange-600">{feature.icon}</div>
              <h3 className="text-lg font-bold text-white">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
