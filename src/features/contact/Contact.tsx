import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Send,
  Mail,
  Phone,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { cn } from '../../shared/utils';
import type { ContactInfo, FAQ } from '../../shared/types';

const contactInfo: ContactInfo = {
  title: "Let's Connect",
  description:
    "I'm always excited to collaborate on new projects and explore creative opportunities. Whether you have a question, want to discuss a project, or just want to say hello, feel free to reach out!",
  location: {
    address: "Kalain, Cachar, Assam, Pin-788815",
    coordinates: {
      lat: 40.7128,
      lng: -74.006,
    },
  },
  email: "rikikumkar@gmail.com",
  phone: "+91 86385 45574",
  socials: [
    {
      platform: "GitHub",
      url: "https://github.com/Mausam5055",
      icon: "Github",
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/mausam-kar-6388861a7/",
      icon: "Linkedin",
    },
    { platform: "Twitter", url: "https://x.com/kar_mausam", icon: "Twitter" },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/_mausam__kar___/",
      icon: "Instagram",
    },
  ],
  faqs: [
    {
      question: "What is your typical response time?",
      answer: "I usually respond within 24 hours during business days.",
    },
    {
      question: "Do you take on remote projects?",
      answer:
        "Yes, I work with clients globally and am comfortable with remote collaboration.",
    },
    {
      question: "What is your preferred method of communication?",
      answer:
        "Email is best for initial contact, then we can schedule video calls as needed.",
    },
  ],
};

const getSocialIcon = (iconName: string) => {
  const icons: { [key: string]: React.ComponentType } = {
    Github,
    Linkedin,
    Twitter,
    Instagram,
  };
  return icons[iconName] || Mail;
};

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formState, setFormState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [captchaValue, setCaptchaValue] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaValue) {
      setFormState("error");
      return;
    }

    setFormState("loading");

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setFormState("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setCaptchaValue("");

    // Reset form state after showing success message
    setTimeout(() => setFormState("idle"), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    return {
      question: `${num1} + ${num2} = ?`,
      answer: (num1 + num2).toString(),
    };
  };

  const [captcha] = useState(generateCaptcha());

  const mapUrl = `assets/location.png`;

  const googleMapsUrl = `https://www.google.com/maps/place/Kalain,+Assam+788815/@24.970105,92.5576313,15.25z/data=!4m6!3m5!1s0x374fd3c8c0cfe905:0x3ea3a2b3a7d61847!8m2!3d24.9681463!4d92.5718122!16s%2Fg%2F11cjjznjsj?entry=ttu&g_ep=EgoyMDI1MDEyOS4xIKXMDSoJLDEwMjExMjM0SAFQAw%3D%3D`;

  return (
    <section
      id=""
      className="py-20 bg-white dark:bg-[radial-gradient(circle_at_center,_#000000_0%,_#111827_100%)] relative overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: "rgba(255, 255, 204, 0.2)", // Slightly more visible light yellow accent
      }}
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center space-y-6"
        >
          <div className="max-w-3xl mx-auto space-y-4">
            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-black dark:text-white"
            >
              {contactInfo.title}
            </motion.h2>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "120px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mx-auto rounded-full"
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden md:block text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              {contactInfo.description}
            </motion.p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side: Info and Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Contact Details */}
            <div className="space-y-4">
              {/* Email */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 dark:hover:bg-gray-800/30 transition-all duration-300"
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Email
                  </span>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-sm text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-label={`Email me at ${contactInfo.email}`}
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 dark:hover:bg-gray-800/30 transition-all duration-300"
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Phone
                  </span>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-sm text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    aria-label={`Call me at ${contactInfo.phone}`}
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </motion.div>

              {/* Address */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 dark:hover:bg-gray-800/30 transition-all duration-300"
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500/10 to-red-500/10 dark:from-pink-500/20 dark:to-red-500/20 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Address
                  </span>
                  <span className="text-sm text-gray-800 dark:text-gray-200">
                    {contactInfo.location.address}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="flex justify-start space-x-3 pt-2">
              {contactInfo.socials.map((social) => {
                const Icon = getSocialIcon(social.icon);
                return (
                  <motion.a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "p-2 rounded-lg",
                      "bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-800/80 dark:to-gray-700/80",
                      "hover:from-blue-500/10 hover:to-purple-500/10 dark:hover:from-blue-500/20 dark:hover:to-purple-500/20",
                      "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400",
                      "transition-all duration-300",
                    )}
                    aria-label={`Visit ${social.platform}`}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>

            {/* Map */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm mt-8"
            >
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group"
              >
                <div className="relative">
                  <img
                    src={mapUrl}
                    alt="Location Map"
                    className="w-full h-[300px] object-cover filter hover:brightness-105 transition-all duration-300"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 group-hover:to-black/40 transition-all duration-300" />

                  {/* Interactive Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <motion.div
                      initial={false}
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      className="bg-white/90 dark:bg-gray-800/90 p-4 rounded-full shadow-lg backdrop-blur-sm"
                    >
                      <MapPin className="w-8 h-8 text-purple-500 dark:text-purple-400" />
                    </motion.div>
                  </div>

                  {/* Location Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white text-sm font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {contactInfo.location.address}
                    </p>
                  </div>
                </div>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-full flex items-start"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 dark:from-purple-500/10 dark:to-blue-500/10 rounded-2xl transform -rotate-1"></div>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative w-full p-6 md:p-8 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 space-y-4"
            >
              {/* Form Header */}
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Send a Message
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Fill out the form below and I'll get back to you as soon as
                  possible.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Name
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={cn(
                      "w-full px-4 py-3 rounded-lg text-sm",
                      "bg-white dark:bg-gray-800",
                      "border border-gray-200 dark:border-gray-700",
                      "focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20",
                      "focus:border-purple-500 dark:focus:border-purple-400",
                      "placeholder-gray-400 dark:placeholder-gray-500",
                      "transition-all duration-200",
                    )}
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={cn(
                      "w-full px-4 py-3 rounded-lg text-sm",
                      "bg-white dark:bg-gray-800",
                      "border border-gray-200 dark:border-gray-700",
                      "focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20",
                      "focus:border-purple-500 dark:focus:border-purple-400",
                      "placeholder-gray-400 dark:placeholder-gray-500",
                      "transition-all duration-200",
                    )}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Subject
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-lg text-sm",
                    "bg-white dark:bg-gray-800",
                    "border border-gray-200 dark:border-gray-700",
                    "focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20",
                    "focus:border-purple-500 dark:focus:border-purple-400",
                    "placeholder-gray-400 dark:placeholder-gray-500",
                    "transition-all duration-200",
                  )}
                  placeholder="What would you like to discuss?"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Message
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={3}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg text-sm",
                    "bg-white dark:bg-gray-800",
                    "border border-gray-200 dark:border-gray-700",
                    "focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20",
                    "focus:border-purple-500 dark:focus:border-purple-400",
                    "placeholder-gray-400 dark:placeholder-gray-500",
                    "transition-all duration-200",
                    "resize-none",
                  )}
                  placeholder="Your message here..."
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="captcha"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Verify you're human
                </label>
                <div className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {captcha.question}
                  </span>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    id="captcha"
                    value={captchaValue}
                    onChange={(e) => setCaptchaValue(e.target.value)}
                    required
                    className={cn(
                      "w-20 px-3 py-2 rounded-lg text-sm text-center",
                      "bg-white dark:bg-gray-800",
                      "border border-gray-200 dark:border-gray-700",
                      "focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20",
                      "focus:border-purple-500 dark:focus:border-purple-400",
                      "placeholder-gray-400 dark:placeholder-gray-500",
                      "transition-all duration-200",
                    )}
                    placeholder="?"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={formState === "loading"}
                className={cn(
                  "w-full px-6 py-3 rounded-lg",
                  "bg-gradient-to-r from-purple-500 to-blue-500",
                  "hover:from-purple-600 hover:to-blue-600",
                  "text-white text-sm font-medium",
                  "flex items-center justify-center gap-2",
                  "shadow-lg shadow-purple-500/10",
                  "transition-all duration-200",
                  "mt-4",
                  formState === "loading" && "cursor-not-allowed opacity-70",
                )}
              >
                {formState === "loading" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>

              {/* Form Status Messages */}
              <AnimatePresence mode="wait">
                {formState === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 p-4 mt-4 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Message sent successfully!</span>
                  </motion.div>
                )}

                {formState === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 p-4 mt-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>Please complete the verification.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 text-center space-y-4"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-black dark:text-white"
            >
              Frequently Asked Questions
            </motion.h2>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-4">
            {contactInfo.faqs.map((faq) => (
              <motion.div
                key={faq.question}
                initial={false}
                animate={{
                  backgroundColor:
                    expandedFAQ === faq.question
                      ? "rgba(147, 197, 253, 0.1)"
                      : "transparent",
                }}
                className="rounded-lg overflow-hidden shadow-md transition-shadow duration-200"
              >
                <button
                  onClick={() =>
                    setExpandedFAQ(
                      expandedFAQ === faq.question ? null : faq.question,
                    )
                  }
                  className={cn(
                    "w-full px-6 py-4 text-left",
                    "flex items-center justify-between",
                    "hover:bg-blue-50 dark:hover:bg-gray-800",
                    "transition-colors duration-200 focus:outline-none",
                  )}
                  aria-expanded={expandedFAQ === faq.question}
                  aria-controls={`faq-answer-${faq.question.replace(/\s+/g, "-").toLowerCase()}`}
                >
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-gray-500 transition-transform duration-200",
                      expandedFAQ === faq.question && "transform rotate-180",
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {expandedFAQ === faq.question && (
                    <motion.div
                      id={`faq-answer-${faq.question.replace(/\s+/g, "-").toLowerCase()}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 py-4 text-gray-600 dark:text-gray-400">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
