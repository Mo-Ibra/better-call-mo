"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Smartphone, Zap, Shield, Search, Palette } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Custom Web Development",
    description:
      "Bespoke websites built with modern technologies that perform flawlessly across all devices.",
    features: [
      "Next.js Applications",
      "E-commerce Solutions",
      "API Integration",
      "Database Design",
    ],
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description:
      "Mobile-first designs that look stunning and function perfectly on every screen size.",
    features: [
      "Mobile Optimization",
      "Cross-browser Testing",
      "Touch-friendly UI",
      "Progressive Web Apps",
    ],
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description:
      "Lightning-fast websites that keep your users engaged and search engines happy.",
    features: [
      "Core Web Vitals",
      "Image Optimization",
      "Code Splitting",
      "CDN Integration",
    ],
  },
  {
    icon: Shield,
    title: "Security & Maintenance",
    description:
      "Robust security measures and ongoing maintenance to keep your site running smoothly.",
    features: [
      "SSL Certificates",
      "Regular Updates",
      "Backup Solutions",
      "Security Monitoring",
    ],
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description:
      "Built-in SEO best practices to help your website rank higher in search results.",
    features: [
      "Meta Optimization",
      "Schema Markup",
      "Site Speed",
      "Content Strategy",
    ],
  },
  {
    icon: Palette,
    title: "WordPress Development",
    description:
      "Custom WordPress themes and plugins to meet your specific needs and requirements.",
    features: [
      "Theme Customization",
      "Plugin Integration",
      "Custom Post Types",
      "Custom Taxonomies",
    ],
  },
];

export default function Services() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView();
  };

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Services That <span className="text-primary">Deliver</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            {
              "From concept to launch, I provide comprehensive web development services that help your business thrive online."
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border-border hover:border-primary/50 transition-colors group"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="text-sm text-muted-foreground flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
            onClick={scrollToContact}
          >
            {"Let's Discuss Your Project"}
          </Button>
        </div>
      </div>
    </section>
  );
}
