import { Card, CardContent } from "@/components/ui/card";
import { User, Coffee, Lightbulb } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Meet Mo - Your Web{" "}
              <span className="text-primary">{"Developer"}</span>
            </h2>
            <p className="text-xl text-muted-foreground text-balance">
              {
                "Just like Saul Goodman fights for his clients, I fight for pixel-perfect, blazing-fast websites that convert."
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/images/mo-ibra.jpg"
                alt="Mo - Web Developer"
                className="rounded-lg shadow-2xl w-full max-w-md mx-auto"
                width={1024}
                height={1024}
              />
            </div>

            <div className="space-y-6">
              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <User className="w-32 h-32 text-primary mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        The Developer You Need
                      </h3>
                      <p className="text-muted-foreground">
                        {
                          "With years of experience in modern web development, I specialize in creating fast, responsive, and user-friendly websites that drive results."
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Coffee className="w-32 h-32 text-primary mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Always Available
                      </h3>
                      <p className="text-muted-foreground">
                        {
                          "Like Saul's 24/7 availability, I'm committed to being there when you need me. Your project deadlines are my priority."
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Lightbulb className="w-32 h-32 text-primary mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Creative Solutions
                      </h3>
                      <p className="text-muted-foreground">
                        {
                          "Every challenge has a solution. I bring creative problem-solving to every project, ensuring your vision becomes reality."
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold mb-6">Technologies I use</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-4xl mx-auto">
              {[
                {
                  name: "Next.js",
                  image: "/images/logos/nextjs.png",
                },
                {
                  name: "React.js",
                  image: "/images/logos/react.png",
                },
                {
                  name: "TypeScript",
                  image: "/images/logos/typescript.png",
                },
                {
                  name: "Tailwind CSS",
                  image: "/images/logos/tailwind.png",
                },
                {
                  name: "ShadCN/UI",
                  image: "/images/logos/shadcn-ui.png",
                },
                {
                  name: "Node.js",
                  image: "/images/logos/node.png",
                },
                {
                  name: "PostgreSQL",
                  image: "/images/logos/postgresql.png",
                },
                {
                  name: "Express",
                  image: "/images/logos/express.webp",
                },
                {
                  name: "Python",
                  image: "/images/logos/python.png",
                },
                {
                  name: "WordPress",
                  image: "/images/logos/wordpress.png",
                },
                {
                  name: "Shopify",
                  image: "/images/logos/shopify.png",
                },
                {
                  name: "Figma",
                  image: "/images/logos/figma.png",
                },
                {
                  name: "Notion",
                  image: "/images/logos/notion.png",
                },
                {
                  name: "Vercel",
                  image: "/images/logos/vercel.png",
                },
                {
                  name: "Git",
                  image: "/images/logos/git.png",
                },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="group flex flex-col items-center p-4 rounded-lg border border-primary/20 bg-card/50 hover:bg-card hover:border-primary/40 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-12 h-12 mb-3 rounded-lg overflow-hidden flex items-center justify-center transition-all duration-300">
                    <Image
                      src={tech.image || "/placeholder.svg"}
                      alt={`${tech.name} logo`}
                      width={220}
                      height={220}
                      className="w-10 h-10 object-contain"
                      quality={100}
                    />
                  </div>
                  <span className="text-sm font-medium text-center group-hover:text-primary transition-colors duration-300">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
