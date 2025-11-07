"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink, Github, Calendar, Users, TrendingUp, CheckCircle } from "lucide-react";
import { useState } from "react";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  fullDescription: string;
  challenge: string;
  solution: string;
  impact: string[];
  timeline: string;
  role: string;
  gallery: string[];
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
    image: "/images/modern-ecommerce-dark.png",
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
    liveUrl: "#",
    githubUrl: "#",
    fullDescription: "Built a complete e-commerce platform from scratch that handles thousands of transactions daily. The platform features a modern, responsive design with seamless payment processing and real-time inventory updates.",
    challenge: "Creating a scalable solution that could handle high traffic during sales events while maintaining data integrity across multiple services.",
    solution: "Implemented a microservices architecture with Redis caching and optimized database queries, resulting in 300% faster load times.",
    impact: [
      "40% increase in conversion rate",
      "200K+ monthly active users",
      "99.9% uptime achieved"
    ],
    timeline: "3 months",
    role: "Full Stack Developer",
    gallery: [
      "/images/modern-ecommerce-dark.png",
      "/images/analytics-dashboard-dark-theme-green-accents.jpg",
      "/images/modern-ecommerce-dark.png"
    ]
  },
  {
    title: "SaaS Dashboard",
    description:
      "A comprehensive analytics dashboard with real-time data visualization and user management.",
    image: "/images/analytics-dashboard-dark-theme-green-accents.jpg",
    technologies: ["React", "D3.js", "Node.js", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
    fullDescription: "Developed an enterprise-grade analytics platform that processes millions of data points in real-time. Features include customizable dashboards, advanced filtering, and automated reporting.",
    challenge: "Visualizing complex data sets in an intuitive way while maintaining high performance with real-time updates.",
    solution: "Leveraged D3.js for custom visualizations and WebSocket connections for live data streaming, with intelligent data aggregation on the backend.",
    impact: [
      "60% reduction in reporting time",
      "500+ enterprise clients",
      "4.8/5 user satisfaction rating"
    ],
    timeline: "4 months",
    role: "Lead Developer",
    gallery: [
      "/images/analytics-dashboard-dark-theme-green-accents.jpg",
      "/images/analytics-dashboard-dark-theme-green-accents.jpg",
      "/images/analytics-dashboard-dark-theme-green-accents.jpg"
    ]
  },
  {
    title: "Portfolio Website",
    description:
      "A stunning portfolio website for a creative agency with smooth animations and CMS integration.",
    image: "/images/creative-portfolio-website-dark-modern-design.jpg",
    technologies: ["Next.js", "Framer Motion", "Sanity", "Vercel"],
    liveUrl: "#",
    githubUrl: "#",
    fullDescription: "Created an award-winning portfolio website that showcases the agency's work with stunning animations and smooth transitions. The site features a headless CMS for easy content management.",
    challenge: "Balancing visual richness with performance while ensuring the site loads quickly on all devices.",
    solution: "Implemented lazy loading, optimized animations with Framer Motion, and used Next.js image optimization for lightning-fast performance.",
    impact: [
      "85% increase in client inquiries",
      "Featured on Awwwards",
      "3x longer average session duration"
    ],
    timeline: "2 months",
    role: "Frontend Developer & Designer",
    gallery: [
      "/images/creative-portfolio-website-dark-modern-design.jpg",
      "/images/creative-portfolio-website-dark-modern-design.jpg",
      "/images/creative-portfolio-website-dark-modern-design.jpg"
    ]
  },
  {
    title: "Restaurant App",
    description:
      "A mobile-first restaurant ordering app with real-time order tracking and payment processing.",
    image: "/images/restaurant-ordering-app-mobile-interface.jpg",
    technologies: ["React Native", "Firebase", "Stripe", "Redux"],
    liveUrl: "#",
    githubUrl: "#",
    fullDescription: "Designed and developed a mobile application that revolutionized the ordering experience for a restaurant chain. Features include real-time order tracking, table reservations, and loyalty rewards.",
    challenge: "Creating a seamless offline experience while ensuring orders sync correctly when connection is restored.",
    solution: "Implemented offline-first architecture with Firebase sync and optimistic UI updates for instant feedback.",
    impact: [
      "50K+ downloads in first month",
      "45% increase in online orders",
      "4.7 star rating on app stores"
    ],
    timeline: "3 months",
    role: "Mobile Developer",
    gallery: [
      "/images/restaurant-ordering-app-mobile-interface.jpg",
      "/images/restaurant-ordering-app-mobile-interface.jpg",
      "/images/restaurant-ordering-app-mobile-interface.jpg"
    ]
  },
  {
    title: "Learning Platform",
    description:
      "An interactive learning platform with video streaming, progress tracking, and certification system.",
    image: "/images/online-learning-platform-interface-dark-theme.jpg",
    technologies: ["Next.js", "Prisma", "AWS", "TypeScript"],
    liveUrl: "#",
    githubUrl: "#",
    fullDescription: "Built a comprehensive e-learning platform that hosts interactive courses with video content, quizzes, and certification programs. The platform supports multiple instructors and thousands of students.",
    challenge: "Delivering high-quality video content globally while managing user progress across multiple devices.",
    solution: "Utilized AWS CloudFront for video delivery and implemented a robust progress tracking system with PostgreSQL for data consistency.",
    impact: [
      "10K+ active learners",
      "95% course completion rate",
      "Expanded to 15 countries"
    ],
    timeline: "5 months",
    role: "Full Stack Developer",
    gallery: [
      "/images/online-learning-platform-interface-dark-theme.jpg",
      "/images/online-learning-platform-interface-dark-theme.jpg",
      "/images/online-learning-platform-interface-dark-theme.jpg"
    ]
  },
  {
    title: "Crypto Tracker",
    description:
      "A real-time cryptocurrency tracking application with portfolio management and price alerts.",
    image: "/images/cryptocurrency-tracker-app-dark-theme-charts.jpg",
    technologies: ["React", "Chart.js", "CoinGecko API", "Redux"],
    liveUrl: "#",
    githubUrl: "#",
    fullDescription: "Developed a real-time cryptocurrency tracking app that helps users monitor their investments and set custom price alerts. Features advanced charting, portfolio analytics, and market news integration.",
    challenge: "Handling real-time price updates for hundreds of cryptocurrencies while maintaining smooth UI performance.",
    solution: "Implemented WebSocket connections with intelligent throttling and memoization techniques to optimize rendering performance.",
    impact: [
      "100K+ registered users",
      "1M+ daily price checks",
      "Featured in TechCrunch"
    ],
    timeline: "2.5 months",
    role: "Frontend Developer",
    gallery: [
      "/images/cryptocurrency-tracker-app-dark-theme-charts.jpg",
      "/images/cryptocurrency-tracker-app-dark-theme-charts.jpg",
      "/images/cryptocurrency-tracker-app-dark-theme-charts.jpg"
    ]
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(0);

  return (
    <section id="projects" className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Case Studies That <span className="text-primary">Win</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Every project tells a story of success. Here are some of my recent victories in the courtroom of code.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="border-border hover:border-primary/50 transition-all duration-300 group overflow-hidden cursor-pointer"
              onClick={() => {
                setSelectedProject(project);
                setSelectedGalleryImage(0);
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/20 backdrop-blur-sm"
                  >
                    View Details
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
            Want to see more? Check out my GitHub for additional projects and contributions.
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

      {/* Project Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto p-0 custom-scrollbar">
          {selectedProject && (
            <div className="p-6 md:p-8 space-y-6">
              <DialogHeader>
                <DialogTitle className="text-3xl md:text-4xl font-bold">
                  {selectedProject.title}
                </DialogTitle>
              </DialogHeader>

              {/* Gallery */}
              <div className="space-y-4">
                <div className="relative w-full h-96 rounded-lg overflow-hidden">
                  <img
                    src={selectedProject.gallery[selectedGalleryImage] || "/placeholder.svg"}
                    alt={`${selectedProject.title} screenshot ${selectedGalleryImage + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {selectedProject.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedGalleryImage(idx)}
                      className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedGalleryImage === idx
                          ? "border-primary"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Info */}
              <div className="grid md:grid-cols-3 gap-6 p-4 bg-card/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Timeline</p>
                    <p className="font-semibold">{selectedProject.timeline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Role</p>
                    <p className="font-semibold">{selectedProject.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <p className="font-semibold">Completed</p>
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, idx) => (
                    <Badge key={idx} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Project Overview</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedProject.fullDescription}
                </p>
              </div>

              {/* Challenge */}
              <div>
                <h3 className="text-lg font-semibold mb-3">The Challenge</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedProject.challenge}
                </p>
              </div>

              {/* Solution */}
              <div>
                <h3 className="text-lg font-semibold mb-3">The Solution</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedProject.solution}
                </p>
              </div>

              {/* Impact */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Impact & Results
                </h3>
                <ul className="space-y-2">
                  {selectedProject.impact.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t">
                <Button
                  className="flex-1"
                  onClick={() => window.open(selectedProject.liveUrl, "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Live Project
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => window.open(selectedProject.githubUrl, "_blank")}
                >
                  <Github className="w-4 h-4 mr-2" />
                  View Source Code
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}