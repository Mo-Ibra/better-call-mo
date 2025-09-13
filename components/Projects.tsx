import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
    image: "/images/modern-ecommerce-dark.png",
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "SaaS Dashboard",
    description:
      "A comprehensive analytics dashboard with real-time data visualization and user management.",
    image: "/images/analytics-dashboard-dark-theme-green-accents.jpg",
    technologies: ["React", "D3.js", "Node.js", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Portfolio Website",
    description:
      "A stunning portfolio website for a creative agency with smooth animations and CMS integration.",
    image: "/images/creative-portfolio-website-dark-modern-design.jpg",
    technologies: ["Next.js", "Framer Motion", "Sanity", "Vercel"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Restaurant App",
    description:
      "A mobile-first restaurant ordering app with real-time order tracking and payment processing.",
    image: "/images/restaurant-ordering-app-mobile-interface.jpg",
    technologies: ["React Native", "Firebase", "Stripe", "Redux"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Learning Platform",
    description:
      "An interactive learning platform with video streaming, progress tracking, and certification system.",
    image: "/images/online-learning-platform-interface-dark-theme.jpg",
    technologies: ["Next.js", "Prisma", "AWS", "TypeScript"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Crypto Tracker",
    description:
      "A real-time cryptocurrency tracking application with portfolio management and price alerts.",
    image: "/images/cryptocurrency-tracker-app-dark-theme-charts.jpg",
    technologies: ["React", "Chart.js", "CoinGecko API", "Redux"],
    liveUrl: "#",
    githubUrl: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Case Studies That <span className="text-primary">Win</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            {
              "Every project tells a story of success. Here are some of my recent victories in the courtroom of code."
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="border-border hover:border-primary/50 transition-all duration-300 group overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/20 backdrop-blur-sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/20 backdrop-blur-sm"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      className="text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            {
              "Want to see more? Check out my GitHub for additional projects and contributions."
            }
          </p>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            <Github className="w-4 h-4 mr-2" />
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
