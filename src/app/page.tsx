"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  Camera,
  Users,
  TrendingUp,
  Trophy,
  ArrowRight,
  Activity,
  Target,
  Star,
} from "lucide-react";
import { Navbar } from "@/components/landing/navbar";
import Dashboard from "../../public/images/dashboard.png";
import FoodLog from "../../public/images/foodlogging.png";
import Social from "../../public/images/social.png";
import Leaderboard from "../../public/images/leaderboard.png";
import Logo from "../../public/images/logo.png";
import { ScrollToTop } from "@/components/scrollToTop";


// Testimonial Component
interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-8 rounded-2xl shadow-lg"
    >
      <div className="flex flex-col space-y-4">
        <div className="text-primary/20 text-6xl font-serif">&quot;</div>
        <p className="text-lg text-gray-700 italic">{testimonial.quote}</p>
        <div className="flex items-center space-x-4 mt-6">
          <div>
            <h4 className="font-semibold">{testimonial.author}</h4>
            <p className="text-sm text-gray-500">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Screenshot Gallery Component
function ScreenshotGallery() {
  const screenshots = [
    { url: Dashboard, title: "Dashboard View" },
    { url: FoodLog, title: "Food Logging" },
    { url: Social, title: "Social Feed" },
    { url: Leaderboard, title: "Leaderboard" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {screenshots.map((screenshot, index) => (
        <motion.div
          key={screenshot.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group relative overflow-hidden rounded-xl"
        >
          <Image
            src={screenshot.url}
            alt={screenshot.title}
            width={400}
            height={300}
            className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <p className="text-white font-medium">{screenshot.title}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Add testimonials data
const testimonials = [
  {
    quote:
      "CalMate has completely transformed how I track my nutrition. The social features keep me motivated and accountable!",
    author: "Sarah Johnson",
    role: "Fitness Enthusiast",
  },
  {
    quote:
      "The AI food recognition is incredibly accurate, and the interface is so intuitive. Best nutrition app I've ever used!",
    author: "Michael Chen",
    role: "Tech Professional",
  },
  {
    quote:
      "I love how I can connect with friends and share our health journey together. It makes healthy eating more fun!",
    author: "Emma Wilson",
    role: "Yoga Instructor",
  },
];

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-transparent pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-6">
                  Track Calories, Connect with Friends
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  CalMate makes nutrition tracking social and fun. Share your
                  journey, motivate friends, and achieve your goals together.
                </p>
                <div className="flex gap-4 justify-center">
                  <Link 
                    href="/login"
                    className="inline-flex items-center"
                  >
                    <Button size="lg" className="text-lg">
                      Get Started
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link 
                    href="#features"
                    className="inline-flex items-center"
                  >
                    <Button size="lg" className="text-lg">
                      Features
                      <Star className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16 relative"
            >
              <div className="bg-gradient-to-b from-primary/10 to-white p-4 rounded-2xl shadow-xl">
                <Image
                  src={Dashboard}
                  alt="CalMate Dashboard"
                  width={1200}
                  height={600}
                  className="rounded-xl shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Powerful features to help you track nutrition, connect with
                friends, and stay motivated.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <FeatureCard {...feature} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-gray-600">
                Join thousands of satisfied users who transformed their health
                journey with CalMate.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* App Screenshots Section */}
        <section id="screenshots" className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">Experience CalMate</h2>
              <p className="text-gray-600">
                Take a look at our beautiful, intuitive interface designed for
                your success.
              </p>
            </motion.div>

            <div className="relative">
              {/* Gradient overlays for scroll indication */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="overflow-x-auto overflow-y-hidden"
              >
                <ScreenshotGallery />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">
                Join Thousands of Happy Users
              </h2>
              <div className="flex justify-center gap-8 mt-8">
                <Stat number="10K+" label="Active Users" />
                <Stat number="500K+" label="Meals Tracked" />
                <Stat number="50K+" label="Social Connections" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-12 text-center text-white"
            >
              <h2 className="text-4xl font-bold mb-4">
                Start Your Journey Today
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Join CalMate and become part of a community dedicated to healthy
                living and mutual support.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/signup">
                  Get Started for Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Image
                  src={Logo}
                  alt="CalMate Logo"
                  width={32}
                  height={32}
                  className="w-14 h-14"
                />
                <span className="text-xl font-bold">CalMate</span>
              </div>
              <p className="text-gray-500">
                © 2024 CalMate. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
      <ScrollToTop />
    </>
  );
}

// Feature Card Component
function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

// Stat Component
function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-primary mb-1">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}

// Features Data
const features = [
  {
    icon: Camera,
    title: "Smart Food Recognition",
    description:
      "Upload photo of your meal and our AI will identify the food and calculate nutrition info.",
  },
  {
    icon: Users,
    title: "Social Support",
    description:
      "Connect with friends, share progress, and motivate each other on your health journey.",
  },
  {
    icon: Activity,
    title: "Detailed Analytics",
    description:
      "Track your nutrition trends with beautiful charts and actionable insights.",
  },
  {
    icon: Target,
    title: "Personalized Goals",
    description:
      "Set and track your personal nutrition goals with smart recommendations.",
  },
  {
    icon: Trophy,
    title: "Achievements",
    description:
      "Earn badges and climb the leaderboard as you maintain your streaks.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Visualize your journey with comprehensive progress tracking and reports.",
  },
];
