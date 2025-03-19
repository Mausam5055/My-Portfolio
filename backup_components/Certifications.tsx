import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award, CheckCircle, Sparkle, CalendarDays } from 'lucide-react';
import { cn } from '../lib/utils';
import type { Certification } from '../types';

const certifications: Certification[] = [
  {
    id: 'aws-sa',
    title: "AWS Solutions Architect",
    organization: "Amazon Web Services",
    date: "2024",
    logo: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    link: "https://aws.amazon.com/certification/",
    description: "Professional certification for designing distributed systems on AWS. Demonstrated ability to design secure, robust systems using AWS services. Validated expertise in cloud best practices and architectural principles.",
    skills: ["AWS", "Cloud Architecture", "Serverless", "DevOps"],
    credentialId: "AWS-SA-12345"
  },
  {
    id: 'gcp-pro',
    title: "Google Cloud Professional",
    organization: "Google Cloud",
    date: "2025",
    logo: "https://images.unsplash.com/photo-1573164713988-8665fc963095",
    link: "https://cloud.google.com/certification",
    description: "Advanced certification for Google Cloud Platform services. Proven skills in implementing and managing cloud infrastructure. Expertise in GCP services including Compute Engine, Kubernetes, and BigQuery.",
    skills: ["GCP", "Cloud Computing", "Data Analytics", "Kubernetes"],
    credentialId: "GCP-PRO-67890"
  },
  {
    id: 'azure-dev',
    title: "Azure Developer Associate",
    organization: "Microsoft",
    date: "2024",
    logo: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec",
    link: "https://learn.microsoft.com/certifications/",
    description: "Certification for developing solutions on Microsoft Azure. Validated skills in Azure services implementation, storage solutions, and security management. Expertise in .NET ecosystem integration.",
    skills: ["Azure", ".NET", "Cloud Security", "CI/CD"],
    credentialId: "AZ-204-11111"
  }
];

export const Certifications: React.FC = () => {
  return (
    <section
    id="Journey"
    className="py-20 bg-white dark:bg-[radial-gradient(circle_at_center,_#000000_0%,_#111827_100%)] relative overflow-hidden transition-colors duration-300"
    style={{
      backgroundColor: "rgba(255, 255, 204, 0.05)" // Light yellow accent in light theme
    }}
  >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center space-y-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
              <span className="inline-block mr-2"></span>
              Certifications
              <span className="inline-block ml-2"></span>
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 dark:text-gray-400 font-medium"
            >
              Validated Expertise in Cloud Technologies
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "200px" }}
            transition={{ duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mx-auto rounded-full"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              className={cn(
                "relative group bg-purple-50 dark:bg-gray-900",
                "rounded-xl overflow-hidden",
                "shadow-2xl hover:shadow-3xl dark:hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)]",
                "transform transition-all duration-300",
                "border-2 border-transparent hover:border-blue-500/20 dark:border-gray-800 dark:hover:border-indigo-500/30",
                "before:absolute before:inset-0 before:bg-gradient-to-br before:from-indigo-900/30 before:to-purple-900/30 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
              )}
            >
              <div className="p-6 relative z-10">
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-lg border-2 border-white/10 dark:border-gray-800"
                  >
                    <img
                      src={cert.logo}
                      alt={cert.organization}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div>
                    <motion.h3
                      whileHover={{ x: 5 }}
                      className="text-xl font-bold text-black dark:text-gray-100 mb-1"
                    >
                      {cert.title}
                    </motion.h3>
                    <motion.div 
                      className="flex items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                    >
                      <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <p className="text-gray-600 dark:text-gray-300 text-sm font-semibold bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                        {cert.organization}
                      </p>
                    </motion.div>
                    <motion.p 
                      className="text-purple-600 dark:text-purple-300 text-sm font-medium mt-1 flex items-center gap-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      <CalendarDays className="w-4 h-4" />
                      <span>Issued: {cert.date}</span>
                    </motion.p>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ delay: 0.3 }}
                  className="mt-4"
                >
                  <motion.div
                    className="space-y-2 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {cert.description.split('. ').map((line, i) => (
                      line && (
                        <div key={i} className="flex items-start gap-2">
                          <Sparkle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
                          <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
                            {line.trim()}.
                          </p>
                        </div>
                      )
                    ))}
                  </motion.div>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                      Technical Skills Validated:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, i) => (
                        <motion.span
                          key={skill}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-xs font-semibold",
                            "bg-blue-100 dark:bg-blue-900/50",
                            "text-blue-700 dark:text-blue-300",
                            "hover:bg-blue-200 dark:hover:bg-blue-900",
                            "border border-blue-200 dark:border-blue-800",
                            "transition-colors duration-200"
                          )}
                        >
                          # {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {cert.credentialId && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-200 mb-4 p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-blue-800"
                    >
                      <Award className="w-5 h-5 text-purple-600 dark:text-purple-300" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Credential ID</p>
                        <p className="font-mono text-xs text-gray-800 dark:text-blue-300">
                          {cert.credentialId}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  <motion.a
                    whileHover={{ x: 5 }}
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-2 px-4 py-2",
                      "bg-blue-100 dark:bg-blue-900/50",
                      "text-blue-700 dark:text-blue-300",
                      "rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900",
                      "border border-blue-200 dark:border-blue-800",
                      "transition-all duration-300",
                      "group/link relative overflow-hidden"
                    )}
                  >
                    <span className="relative z-10">Verify Credential</span>
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-purple-200/30 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                  </motion.a>
                </motion.div>
              </div>

              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -inset-24 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                  <div className="animate-shine w-full h-full bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes shine {
          0% { transform: translateX(-100%) rotate(15deg); }
          100% { transform: translateX(100%) rotate(15deg); }
        }
        .animate-shine {
          animation: shine 1.5s infinite;
        }
      `}</style>
    </section>
  );
};