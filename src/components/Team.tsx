import { Linkedin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

import member1 from "@/assets/team/member1.jpg";
import member2 from "@/assets/team/member2.jpg";
import member3 from "@/assets/team/member3.jpg";
import member4 from "@/assets/team/member4.jpg";
import member5 from "@/assets/team/member5.jpg";
import laibaAsset from "@/assets/team/laiba-zahid.jpg.asset.json";

const teamMembers = [
  { name: "Ahmed Khan", role: "CEO & Founder", image: member1, linkedin: "#" },
  { name: "Sarah Lin", role: "CTO", image: member2, linkedin: "#" },
  { name: "Michael Torres", role: "VP of Engineering", image: member3, linkedin: "#" },
  { name: "Anshrah Naveed", role: "Lead Designer", image: member4, linkedin: "https://www.linkedin.com/in/anshrah-naveed/" },
  { name: "Faiq Rizwan", role: "Digital Content Writer", image: member5, linkedin: "https://www.linkedin.com/in/chaudhry-faiq-rizwan-084634191/" },
  { name: "Laiba Zahid", role: "Software Engineer | .NET", image: laibaAsset.url, linkedin: "https://www.linkedin.com/in/laiba-zahid-85aa841b8/" },
];

const Team = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute bottom-0 right-0 w-1/2 h-96 bg-accent/5 rounded-full blur-[128px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Large Bold Heading — Humaan style */}
        <ScrollReveal>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] mb-8">
            The <span className="text-gradient-animated">People</span>
            <br />
            Behind the Code.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-16 leading-relaxed">
            We're a team of engineers, designers, and strategists who love turning complex challenges into elegant solutions.
          </p>
        </ScrollReveal>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <ScrollReveal key={member.name} delay={index * 80} direction="up">
              <div className="group relative">
                {/* Photo */}
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/5]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* LinkedIn overlay on hover */}
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-end justify-end p-4"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <span className="w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <Linkedin className="w-5 h-5 text-primary" />
                    </span>
                  </a>
                </div>

                {/* Name & Role */}
                <h3 className="text-lg md:text-xl font-bold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
