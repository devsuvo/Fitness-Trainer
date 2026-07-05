"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Dumbbell, Flame, Trophy, Award, Sparkles, CheckCircle2, ChevronRight, 
  ArrowRight, Phone, Mail, MapPin, Search, Calendar, Star, Send, Zap, 
  Menu, X, Sun, Moon, Info, Shield, HelpCircle, ArrowUpRight, 
  BookOpen, Calculator, Play, ChevronDown, Check, RefreshCw
} from "lucide-react";
import Image from "next/image";

// ----------------------------------------------------------------------
// DATA TYPES & SEED DATA
// ----------------------------------------------------------------------

interface Program {
  id: string;
  name: string;
  category: string;
  duration: string;
  pricing: string;
  description: string;
  benefits: string[];
  results: string;
}

interface CaseStudy {
  id: string;
  name: string;
  role: string;
  challenge: string;
  results: string;
  duration: string;
  weightLoss?: string;
  muscleGain?: string;
  strategy: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  tags: string[];
}

const PROGRAMS: Program[] = [
  {
    id: "weight-loss",
    name: "Elite Weight Loss Coaching",
    category: "Fat Loss",
    duration: "12 Weeks",
    pricing: "$299/mo",
    description: "Designed for busy professionals to shed body fat sustainably while building absolute physical vitality.",
    benefits: ["Custom daily macronutrient targets", "1-on-1 weekly metabolic reviews", "30-45 min time-efficient workouts", "Direct 24/7 accountability chat"],
    results: "8 - 14 kg fat loss with optimized muscle retention."
  },
  {
    id: "muscle-gain",
    name: "Hypertrophy & Strength Blueprint",
    category: "Muscle Building",
    duration: "16 Weeks",
    pricing: "$349/mo",
    description: "Build clean athletic mass, optimize raw strength lift coordinates, and break training plateaus.",
    benefits: ["Advanced progressive overload tracking", "Heavy compound lifting focus", "High-protein meal strategies", "Form correction video feedback"],
    results: "4 - 8 kg lean athletic mass gain."
  },
  {
    id: "body-recomp",
    name: "Metabolic Body Recomposition",
    category: "Body Recomp",
    duration: "24 Weeks",
    pricing: "$399/mo",
    description: "Lose visceral fat and pack on lean muscle simultaneously. The ultimate science-backed aesthetic transformation.",
    benefits: ["Caloric cycling nutrition schedules", "Hybrid strength and HIIT routines", "Biweekly composition tracking", "Sleep and recovery support"],
    results: "Complete body fat percentage drop of 5-8% while gaining muscle."
  }
];

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "rohan",
    name: "Rohan M.",
    role: "Senior Software Engineer (34)",
    challenge: "Sitting 12+ hours daily, severe lower back tension, insulin resistance warnings, constant caffeine crashes.",
    results: "Shed 16.5 kg of fat, eliminated lower back tightness, reversed blood glucose indicators to normal range.",
    duration: "16 Weeks",
    weightLoss: "16.5 kg",
    strategy: "Low-impact neat movement goals, structural back-chain strength building, customized desk-friendly hydration & carb timing."
  },
  {
    id: "priya",
    name: "Priya S.",
    role: "Marketing Director & Mom (38)",
    challenge: "Extreme schedule density, constant eating on-the-go, under 6 hours of broken sleep.",
    results: "Built 3 kg lean muscle, dropped 9 kg body fat, boosted baseline daily energy scores from 3/10 to 9/10.",
    duration: "12 Weeks",
    weightLoss: "9 kg",
    muscleGain: "3 kg",
    strategy: "30-min high-density hybrid dumbbell circuits, batch meal prepping systems, sleep hygiene protocol."
  }
];

const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "The Ultimate Guide to Progressive Overload: Build Muscle Permanently",
    excerpt: "Why lifting the same weights week after week is killing your gains, and how to program real weekly adaptations.",
    category: "Muscle Building",
    readTime: "5 min read",
    date: "July 2, 2026",
    tags: ["Hypertrophy", "Weightlifting", "Programming"]
  },
  {
    id: "2",
    title: "How to Calculate Your Real TDEE (And Why Calculators Can Lie)",
    excerpt: "Stop blindly trusting static calorie formulas. Learn how to track metabolic rates to discover your actual burn rate.",
    category: "Nutrition",
    readTime: "6 min read",
    date: "June 28, 2026",
    tags: ["Calorie Tracking", "Macros", "Fat Loss"]
  },
  {
    id: "3",
    title: "Top 5 High-Volume Foods to Kill Hunger on a Caloric Deficit",
    excerpt: "Struggling with fat loss cravings? Master volume eating with delicious, nutrient-dense foods that keep you full.",
    category: "Weight Loss",
    readTime: "4 min read",
    date: "June 20, 2026",
    tags: ["Diet Tips", "Satiety", "Fat Loss"]
  },
  {
    id: "4",
    title: "The Sleep-Performance Equation: Unlocking 20% More Lift Power",
    excerpt: "How hormonal optimization through deep sleep directly increases muscle protein synthesis and gym recovery speeds.",
    category: "Healthy Lifestyle",
    readTime: "5 min read",
    date: "June 14, 2026",
    tags: ["Sleep", "Recovery", "Performance"]
  }
];

export default function Home() {
  // ----------------------------------------------------------------------
  // COMPONENT STATE & INITIALIZATION
  // ----------------------------------------------------------------------
  const [activeTab, setActiveTab] = useState<string>("home");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Before & After Slider Drag State
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  // Dynamic Calculators State inputs
  const [bmiHeight, setBmiHeight] = useState<string>("175");
  const [bmiWeight, setBmiWeight] = useState<string>("80");

  const [tdeeWeight, setTdeeWeight] = useState<string>("80");
  const [tdeeHeight, setTdeeHeight] = useState<string>("175");
  const [tdeeAge, setTdeeAge] = useState<string>("28");
  const [tdeeGender, setTdeeGender] = useState<string>("male");
  const [tdeeActivity, setTdeeActivity] = useState<string>("1.375"); // Lightly active default

  const [macroGoal, setMacroGoal] = useState<string>("recomp");

  // Lead Generation Form State
  const [leadName, setLeadName] = useState<string>("");
  const [leadEmail, setLeadEmail] = useState<string>("");
  const [leadPhone, setLeadPhone] = useState<string>("");
  const [leadGoal, setLeadGoal] = useState<string>("loss");
  const [leadCurrentWeight, setLeadCurrentWeight] = useState<string>("");
  const [leadTargetWeight, setLeadTargetWeight] = useState<string>("");
  const [leadPreference, setLeadPreference] = useState<string>("gym");
  const [leadMessage, setLeadMessage] = useState<string>("");
  
  // Lead submission results from Gemini
  const [isSubmittingLead, setIsSubmittingLead] = useState<boolean>(false);
  const [aiBlueprint, setAiBlueprint] = useState<string | null>(null);

  // AI Assistant Consultation Bot State
  const [isAiBotOpen, setIsAiBotOpen] = useState<boolean>(false);
  const [botMessages, setBotMessages] = useState<Array<{ role: string; content: string }>>([
    { role: "model", content: "Hey! Coach Suvo's AI system here. Ask me anything about your workout program, fat loss mechanics, or nutrition planning!" }
  ]);
  const [chatInput, setChatInput] = useState<string>("");
  const [isSendingChat, setIsSendingChat] = useState<boolean>(false);

  // Blog Search State
  const [blogSearch, setBlogSearch] = useState<string>("");
  const [blogCategory, setBlogCategory] = useState<string>("All");

  // ----------------------------------------------------------------------
  // DYNAMIC CALCULATORS (DERIVED STATE)
  // ----------------------------------------------------------------------
  const hValue = parseFloat(bmiHeight) / 100;
  const wValue = parseFloat(bmiWeight);
  const bmiResult = (hValue > 0 && wValue > 0) ? parseFloat((wValue / (hValue * hValue)).toFixed(1)) : null;

  let bmiCategory = "";
  if (bmiResult !== null) {
    if (bmiResult < 18.5) bmiCategory = "Underweight 🍗 Boost calories!";
    else if (bmiResult < 25) bmiCategory = "Normal Weight 🌟 Maintenance master";
    else if (bmiResult < 30) bmiCategory = "Overweight 💪 Time to recomp";
    else bmiCategory = "Obese 🔥 Highly recommended fat loss strategy";
  }

  const tdeeW = parseFloat(tdeeWeight);
  const tdeeH = parseFloat(tdeeHeight);
  const tdeeA = parseFloat(tdeeAge);
  const tdeeAct = parseFloat(tdeeActivity);

  let tdeeResult: number | null = null;
  let macroProtein = 0;
  let macroCarbs = 0;
  let macroFats = 0;

  if (tdeeW > 0 && tdeeH > 0 && tdeeA > 0) {
    // Harris-Benedict formula
    let bmr = 0;
    if (tdeeGender === "male") {
      bmr = 88.362 + (13.397 * tdeeW) + (4.799 * tdeeH) - (5.677 * tdeeA);
    } else {
      bmr = 447.593 + (9.247 * tdeeW) + (3.098 * tdeeH) - (4.330 * tdeeA);
    }
    tdeeResult = Math.round(bmr * tdeeAct);

    // Distribute macros based on TDEE and goal
    let targetCalories = tdeeResult;
    let pRatio = 0.35; // default recomp
    let cRatio = 0.40;
    let fRatio = 0.25;

    if (macroGoal === "loss") {
      targetCalories = Math.round(tdeeResult * 0.8); // 20% deficit
      pRatio = 0.40; // High protein on deficit
      cRatio = 0.35;
      fRatio = 0.25;
    } else if (macroGoal === "gain") {
      targetCalories = Math.round(tdeeResult * 1.1); // 10% surplus
      pRatio = 0.30;
      cRatio = 0.50;
      fRatio = 0.20;
    }

    // Grams calculation
    // Protein: 4 kcal/g, Carbs: 4 kcal/g, Fat: 9 kcal/g
    macroProtein = Math.round((targetCalories * pRatio) / 4);
    macroCarbs = Math.round((targetCalories * cRatio) / 4);
    macroFats = Math.round((targetCalories * fRatio) / 9);
  }

  const tabs = [
    "home", "about", "programs", "transformations", "services", 
    "case-studies", "blog", "resources", "testimonials", "contact", "pricing"
  ];

  // ----------------------------------------------------------------------
  // EFFECTS
  // ----------------------------------------------------------------------
  // Synchronize router state with window URL hashes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && tabs.includes(hash)) {
        setActiveTab(hash);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Run on initial mount
    return () => window.removeEventListener("hashchange", handleHashChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync state-based navigation changes with URL Hash
  const navigateTo = (tabName: string) => {
    setActiveTab(tabName);
    setMobileMenuOpen(false);
    window.location.hash = tabName;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Dark/Light Theme Handler
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Back to top button visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // ----------------------------------------------------------------------
  // API INTEGRATIONS & FORM HANDLERS
  // ----------------------------------------------------------------------
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail) return;

    setIsSubmittingLead(true);
    setAiBlueprint(null);

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "blueprint",
          name: leadName,
          email: leadEmail,
          phone: leadPhone,
          currentWeight: leadCurrentWeight,
          targetWeight: leadTargetWeight,
          goal: leadGoal,
          preference: leadPreference,
          message: leadMessage,
        })
      });

      const data = await response.json();
      if (data.text) {
        setAiBlueprint(data.text);
      } else {
        setAiBlueprint("Successfully scheduled! Coach Suvo will be in touch with your blueprint within 24 hours.");
      }
    } catch (err) {
      console.error(err);
      setAiBlueprint("Connection timed out. However, your lead data is registered! Coach Suvo will reach out via WhatsApp/email shortly.");
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const handleSendChatMessage = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatInput("");
    setBotMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsSendingChat(true);

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "chat",
          chatHistory: botMessages.map(m => ({ role: m.role, content: m.content })),
          userMessage: userMsg
        })
      });

      const data = await response.json();
      if (data.text) {
        setBotMessages(prev => [...prev, { role: "model", content: data.text }]);
      } else {
        setBotMessages(prev => [...prev, { role: "model", content: "I am having trouble accessing the network. Train heavy and keep consistency!" }]);
      }
    } catch (err) {
      console.error(err);
      setBotMessages(prev => [...prev, { role: "model", content: "Coach Suvo Offline Response: Ensure your forms contain high protein, hydration (3L+), and compound lifts. Reach out on WhatsApp!" }]);
    } finally {
      setIsSendingChat(false);
    }
  };

  const triggerNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    alert("🚀 Boom! Welcome to the DevFit Inner Circle. Your daily high-energy fitness & macronutrient guides are on their way!");
  };

  // Before/After Slider Touch/Move Handler
  const handleSliderMove = (clientX: number, containerRect: DOMRect) => {
    const x = clientX - containerRect.left;
    const percentage = Math.max(0, Math.min(100, (x / containerRect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.touches[0].clientX, rect);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons === 1) { // Left-click dragged
      const rect = e.currentTarget.getBoundingClientRect();
      handleSliderMove(e.clientX, rect);
    }
  };

  // Filtered Blog Posts
  const filteredBlogs = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(blogSearch.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(blogSearch.toLowerCase()) ||
                          post.tags.some(t => t.toLowerCase().includes(blogSearch.toLowerCase()));
    const matchesCategory = blogCategory === "All" || post.category === blogCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      
      {/* ------------------------------------------------------------------
          GLOBAL COMPONENTS: STICKY NAVBAR
          ------------------------------------------------------------------ */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        isDarkMode ? "bg-slate-950/80 border-slate-800" : "bg-white/80 border-slate-200"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div onClick={() => navigateTo("home")} className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 rounded-lg bg-brand-primary flex items-center justify-center text-white shadow-lg shadow-red-500/30 group-hover:scale-105 transition-transform duration-200">
              <Dumbbell className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-tight text-brand-primary">SUVO DEV</span>
              <span className="block text-[9px] font-mono tracking-widest uppercase opacity-75 -mt-1">COACHING</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <button onClick={() => navigateTo("home")} className={`text-sm font-medium transition-colors ${activeTab === "home" ? "text-brand-primary" : "hover:text-brand-primary"}`}>Home</button>
            <button onClick={() => navigateTo("about")} className={`text-sm font-medium transition-colors ${activeTab === "about" ? "text-brand-primary" : "hover:text-brand-primary"}`}>About</button>
            <button onClick={() => navigateTo("programs")} className={`text-sm font-medium transition-colors ${activeTab === "programs" ? "text-brand-primary" : "hover:text-brand-primary"}`}>Programs</button>
            <button onClick={() => navigateTo("transformations")} className={`text-sm font-medium transition-colors ${activeTab === "transformations" ? "text-brand-primary" : "hover:text-brand-primary"}`}>Results</button>
            <button onClick={() => navigateTo("services")} className={`text-sm font-medium transition-colors ${activeTab === "services" ? "text-brand-primary" : "hover:text-brand-primary"}`}>Services</button>
            <button onClick={() => navigateTo("case-studies")} className={`text-sm font-medium transition-colors ${activeTab === "case-studies" ? "text-brand-primary" : "hover:text-brand-primary"}`}>Case Studies</button>
            <button onClick={() => navigateTo("blog")} className={`text-sm font-medium transition-colors ${activeTab === "blog" ? "text-brand-primary" : "hover:text-brand-primary"}`}>Blog</button>
            <button onClick={() => navigateTo("resources")} className={`text-sm font-medium transition-colors ${activeTab === "resources" ? "text-brand-primary" : "hover:text-brand-primary"}`}>Calculators</button>
            <button onClick={() => navigateTo("testimonials")} className={`text-sm font-medium transition-colors ${activeTab === "testimonials" ? "text-brand-primary" : "hover:text-brand-primary"}`}>Reviews</button>
            <button onClick={() => navigateTo("pricing")} className={`text-sm font-medium transition-colors ${activeTab === "pricing" ? "text-brand-primary" : "hover:text-brand-primary"}`}>Pricing</button>
          </nav>

          {/* Action Area */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-slate-800/10 dark:hover:bg-slate-800 transition-colors"
              title="Search programs & articles"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Dark Mode Toggle */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-slate-800/10 dark:hover:bg-slate-800 transition-colors"
              title={isDarkMode ? "Light mode" : "Dark mode"}
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-700" />}
            </button>

            {/* Premium Call to Action */}
            <button 
              onClick={() => setIsBookingOpen(true)} 
              className="hidden sm:flex items-center gap-2 bg-brand-primary hover:bg-red-600 text-white px-4 h-10 rounded-md font-medium text-sm transition-transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-red-500/20"
            >
              Consult Free
              <Zap className="w-4 h-4 fill-current text-white animate-bounce" />
            </button>

            {/* Mobile Hamburger Menu */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-slate-800/10 dark:hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden border-b transition-colors duration-300 ${
              isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
            }`}
          >
            <div className="px-4 py-4 space-y-2 flex flex-col">
              {tabs.map((tab) => (
                <button 
                  key={tab}
                  onClick={() => navigateTo(tab)} 
                  className={`text-left py-2 px-3 rounded-md text-sm font-medium capitalize transition-colors ${
                    activeTab === tab ? "bg-brand-primary text-white" : "hover:bg-slate-800/10 dark:hover:bg-slate-900"
                  }`}
                >
                  {tab === "transformations" ? "Results" : tab === "case-studies" ? "Case Studies" : tab === "resources" ? "Calculators" : tab}
                </button>
              ))}
              <button 
                onClick={() => { setMobileMenuOpen(false); setIsBookingOpen(true); }}
                className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white py-2.5 rounded-md font-medium text-sm"
              >
                Start Transformation
                <Zap className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------------
          PAGES CONTENT ROUTER
          ------------------------------------------------------------------ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative">
        <AnimatePresence mode="wait">
          
          {/* =========================================================
              1. HOME PAGE
              ========================================================= */}
          {activeTab === "home" && (
            <motion.div 
              key="home" 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              {/* Hero Banner Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-full text-brand-primary text-xs font-mono tracking-wider uppercase">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    Premium Elite Transformation
                  </div>
                  <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight">
                    {"Transform Your "} <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-amber-500">{"Body"}</span>,{"\n"}
                    {"Transform Your "} <span className="text-brand-primary">{"Life"}</span>.
                  </h1>
                  <p className="text-lg opacity-80 max-w-xl">
                    {"Helping busy professionals, executives, and fitness seekers achieve permanent, sustainable, elite physical transformations through customized training Splits and medical-grade nutritional metrics."}
                  </p>
                  
                  {/* Real Conversion CTA buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button 
                      onClick={() => navigateTo("contact")} 
                      className="bg-brand-primary hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-md shadow-lg shadow-red-500/20 flex items-center justify-center gap-2 group transition-all"
                    >
                      {"Start Your Journey"}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                      onClick={() => setIsBookingOpen(true)} 
                      className={`font-semibold py-3 px-6 rounded-md border flex items-center justify-center gap-2 transition-all ${
                        isDarkMode ? "border-slate-700 bg-slate-900/50 hover:bg-slate-800" : "border-slate-300 bg-white hover:bg-slate-100"
                      }`}
                    >
                      {"Book Free Consultation"}
                      <Phone className="w-4 h-4 text-brand-primary animate-bounce" />
                    </button>
                  </div>

                  {/* Highlights Bar */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t dark:border-slate-800 border-slate-200">
                    <div className="space-y-1">
                      <div className="font-display font-black text-2xl sm:text-3xl text-brand-primary">{"500+"}</div>
                      <div className="text-xs opacity-70">{"Clients Trained"}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="font-display font-black text-2xl sm:text-3xl text-brand-primary">{"4,500+ kg"}</div>
                      <div className="text-xs opacity-70">{"Total Weight Lost"}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="font-display font-black text-2xl sm:text-3xl text-brand-primary">{"8+ Years"}</div>
                      <div className="text-xs opacity-70">{"Experience"}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="font-display font-black text-2xl sm:text-3xl text-brand-primary">{"99.4%"}</div>
                      <div className="text-xs opacity-70">{"Success Rate"}</div>
                    </div>
                  </div>
                </div>

                {/* Interactive Trainer Profile Showcase */}
                <div className="lg:col-span-5 relative flex justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 via-orange-500/10 to-transparent blur-2xl rounded-full"></div>
                  
                  {/* Premium Visual Representation of Suvo Dev */}
                  <div className="relative w-full max-w-[360px] aspect-[4/5] rounded-2xl overflow-hidden border dark:border-slate-800 border-slate-200 shadow-2xl bg-gradient-to-b from-slate-900 to-slate-950">
                    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80" style={{ backgroundImage: "url('https://picsum.photos/seed/trainer_suvo/800/1000')" }}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                    
                    {/* Floating Certification Badge */}
                    <div className="absolute top-4 right-4 bg-slate-900/95 border border-amber-500/40 text-amber-500 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 fill-amber-500 text-slate-900" />
                      {"NASM Certified CPT"}
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                      <div className="text-xs font-mono text-brand-primary font-bold tracking-wider uppercase">{"Lead Transformation Coach"}</div>
                      <h3 className="font-display font-bold text-2xl">{"Coach Suvo Dev"}</h3>
                      <p className="text-xs text-slate-300">{"\"Your physical limits are nothing but psychological milestones. Let's adapt, evolve, and dominate.\""}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Before & After Interactive Slider */}
              <div className="space-y-6 pt-8">
                <div className="text-center space-y-2">
                  <h2 className="font-display font-black text-3xl tracking-tight">{"Interactive Transformation Showcase"}</h2>
                  <p className="text-sm opacity-70 max-w-lg mx-auto">{"Drag the slider horizontally to view the exact progression of a 12-week body recomposition blueprint."}</p>
                </div>

                <div className="flex justify-center">
                  <div 
                    className="relative w-full max-w-[550px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border dark:border-slate-800 border-slate-200 select-none cursor-ew-resize"
                    onTouchMove={handleTouchMove}
                    onMouseMove={handleMouseMove}
                  >
                    {/* Before Image (Left Side background) */}
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/before_suvo/1000/750')" }}>
                      <div className="absolute bottom-4 left-4 bg-red-600 text-white font-mono text-xs font-bold px-3 py-1 rounded-md uppercase">{"Before (Week 1)"}</div>
                    </div>

                    {/* After Image (Right Side - slides on top) */}
                    <div 
                      className="absolute inset-y-0 right-0 overflow-hidden bg-cover bg-center"
                      style={{ 
                        left: `${sliderPosition}%`, 
                        backgroundImage: "url('https://picsum.photos/seed/after_suvo/1000/750')" 
                      }}
                    >
                      <div 
                        className="absolute inset-y-0 left-0 bg-cover bg-center"
                        style={{ 
                          width: "550px", 
                          left: `-${(sliderPosition / 100) * 550}px`,
                          backgroundImage: "url('https://picsum.photos/seed/after_suvo/1000/750')" 
                        }}
                      >
                        <div className="absolute bottom-4 right-4 bg-emerald-600 text-white font-mono text-xs font-bold px-3 py-1 rounded-md uppercase">{"After (Week 12)"}</div>
                      </div>
                    </div>

                    {/* Drag Line / Divider */}
                    <div 
                      className="absolute inset-y-0 w-1 bg-brand-primary cursor-ew-resize flex items-center justify-center"
                      style={{ left: `${sliderPosition}%` }}
                    >
                      <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-lg border border-white">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <span className="inline-flex items-center gap-2 text-xs font-mono opacity-60">
                    <Info className="w-3.5 h-3.5" /> {"Client: Vikram S. • Lost 14kg of pure body fat • Built 4.5kg skeletal muscle mass."}
                  </span>
                </div>
              </div>

              {/* Workout process */}
              <div className="space-y-8 pt-8">
                <div className="text-center space-y-2">
                  <h2 className="font-display font-black text-3xl tracking-tight">{"The Transformation Process"}</h2>
                  <p className="text-sm opacity-70 max-w-lg mx-auto">{"Six steps from your initial digital assessment to permanent physical results."}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {[
                    { nr: "01", name: "Assessment", desc: "Detailed breakdown of habits, injuries, and metrics." },
                    { nr: "02", name: "Goal Setting", desc: "Setting timeline expectations based on targets." },
                    { nr: "03", name: "Personal Plan", desc: "A tailored macronutrient budget and lifting schedule." },
                    { nr: "04", name: "Coaching", desc: "Structured video feedback and direct weekly checks." },
                    { nr: "05", name: "Progress Track", desc: "Continuous scale, waist, and lift strength tracking." },
                    { nr: "06", name: "Results", desc: "Enjoy your highly energetic, permanent physique transformation." },
                  ].map((step, idx) => (
                    <div key={idx} className={`p-5 rounded-xl border relative transition-transform hover:-translate-y-1 ${
                      isDarkMode ? "border-slate-800 bg-slate-900/50" : "border-slate-200 bg-white"
                    }`}>
                      <div className="font-mono text-xs text-brand-primary font-bold mb-2">{step.nr}</div>
                      <h4 className="font-display font-bold text-base mb-1.5">{step.name}</h4>
                      <p className="text-xs opacity-75">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Services Overview */}
              <div className="space-y-8 pt-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <h2 className="font-display font-black text-3xl tracking-tight">{"Our Premium Programs"}</h2>
                    <p className="text-sm opacity-70">{"Scientifically programmed systems matching your specific biological goals."}</p>
                  </div>
                  <button onClick={() => navigateTo("programs")} className="inline-flex items-center gap-2 text-brand-primary hover:underline text-sm font-semibold">
                    {"View All Details"} <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {PROGRAMS.map(prog => (
                    <div key={prog.id} className={`p-6 rounded-2xl border flex flex-col justify-between hover:border-brand-primary transition-colors ${
                      isDarkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200 shadow-sm"
                    }`}>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono bg-brand-primary/10 text-brand-primary px-2.5 py-1 rounded-md font-bold uppercase">{prog.category}</span>
                          <span className="text-xs font-mono opacity-60">{prog.duration}</span>
                        </div>
                        <h3 className="font-display font-bold text-xl">{prog.name}</h3>
                        <p className="text-sm opacity-75 leading-relaxed">{prog.description}</p>
                        <div className="pt-2">
                          <div className="text-xs font-semibold uppercase tracking-wider mb-2 opacity-60">{"Expected Outcomes:"}</div>
                          <div className="text-sm font-semibold text-emerald-500 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-500/10" />
                            {prog.results}
                          </div>
                        </div>
                      </div>
                      <div className="pt-6 mt-6 border-t dark:border-slate-800 border-slate-200 flex justify-between items-center">
                        <span className="font-mono font-bold text-xl text-brand-primary">{prog.pricing}</span>
                        <button onClick={() => navigateTo("contact")} className="p-2 rounded-lg bg-brand-primary/10 hover:bg-brand-primary text-brand-primary hover:text-white transition-colors">
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call To Action */}
              <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-red-500/20">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="relative z-10 max-w-2xl space-y-6">
                  <h2 className="font-display font-black text-3xl md:text-4xl leading-tight">{"Ready to Stop Second-Guessing Your Training?"}</h2>
                  <p className="opacity-90">{"Let's craft your custom blueprint today. Start speaking with Coach Suvo's AI, or directly book your free metabolic review call."}</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button onClick={() => navigateTo("contact")} className="bg-slate-950 hover:bg-slate-900 text-white font-bold px-6 py-3.5 rounded-lg flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5">
                      {"Consult with Coach Suvo"}
                      <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
                    </button>
                    <button onClick={() => setIsBookingOpen(true)} className="bg-white hover:bg-slate-100 text-brand-primary font-bold px-6 py-3.5 rounded-lg flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5">
                      {"Book Free Video Call"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* =========================================================
              2. ABOUT PAGE
              ========================================================= */}
          {activeTab === "about" && (
            <motion.div 
              key="about" 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-full max-w-[320px] aspect-[4/5] rounded-2xl overflow-hidden border dark:border-slate-800 border-slate-200 shadow-xl bg-slate-900">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/suvo_about/800/1000')" }}></div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex bg-brand-primary/10 text-brand-primary text-xs font-mono px-3 py-1 rounded-md uppercase font-bold tracking-wider">{"My Journey & Mission"}</div>
                  <h1 className="font-display font-black text-3xl sm:text-4xl">{"Meet Coach Suvo Dev"}</h1>
                  <p className="opacity-80 leading-relaxed">
                    {"Over the past 8 years, I've dedicated myself to helping men and women overcome physical stagnation. My approach is entirely evidence-based: no crash starvation diets, no endless hours of useless cardio, and no unrealistic workout routines that lead directly to joint pain and fatigue."}
                  </p>
                  <p className="opacity-80 leading-relaxed">
                    {"My personal journey started with building my own physique out of high-school skeletal parameters. This taught me that consistent progressive tracking, sleep optimization, and caloric science always outmatch blind effort."}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-brand-primary shrink-0"><Award className="w-4 h-4" /></div>
                      <div>
                        <h4 className="font-bold text-sm">{"NASM Certified Trainer"}</h4>
                        <p className="text-xs opacity-70">{"National Academy of Sports Medicine (CPT)"}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-brand-accent shrink-0"><Flame className="w-4 h-4" /></div>
                      <div>
                        <h4 className="font-bold text-sm">{"Fitness Nutrition Specialist"}</h4>
                        <p className="text-xs opacity-70">{"Advanced metabolic macronutrient profiling"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Milestones timeline */}
              <div className="space-y-6 pt-6">
                <h3 className="font-display font-black text-2xl text-center">{"Milestones Timeline"}</h3>
                <div className="max-w-3xl mx-auto border-l-2 border-brand-primary/30 pl-6 space-y-8 py-4 relative">
                  {[
                    { year: "2018", title: "National CPT Certification", desc: "Licensed through NASM to establish formal weight loss and strength architectures." },
                    { year: "2020", title: "Virtual Transformation Studio Launch", desc: "Designed remote online coaching systems to help busy engineers and remote workers globally." },
                    { year: "2023", title: "Metabolic Caloric System Release", desc: "Integrated macro bio-trackers with automated weekly adjustment loops for permanent results." },
                    { year: "2026", title: "500+ Transformation Threshold", desc: "Surpassed half a thousand verified client transformations across 14 countries." },
                  ].map((milestone, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-brand-primary border-4 dark:border-slate-950 border-slate-50"></div>
                      <span className="font-mono text-sm text-brand-primary font-bold">{milestone.year}</span>
                      <h4 className="font-bold text-base mt-1">{milestone.title}</h4>
                      <p className="text-sm opacity-75 mt-1">{milestone.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* =========================================================
              3. PROGRAMS PAGE
              ========================================================= */}
          {activeTab === "programs" && (
            <motion.div 
              key="programs" 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12"
            >
              <div className="text-center space-y-3">
                <h1 className="font-display font-black text-4xl">{"Our Fitness Programs"}</h1>
                <p className="opacity-75 max-w-2xl mx-auto">{"Explore scientifically designed, high-converting premium programs complete with full nutritional coaching."}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {PROGRAMS.map(prog => (
                  <div key={prog.id} className={`p-8 rounded-2xl border flex flex-col justify-between hover:scale-[1.02] transition-transform ${
                    isDarkMode ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200 shadow-sm"
                  }`}>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center border-b dark:border-slate-800 border-slate-100 pb-4">
                        <span className="font-mono text-xs uppercase bg-red-500/10 text-brand-primary px-3 py-1 rounded-md font-bold">{prog.category}</span>
                        <span className="text-xs opacity-60 font-mono">{prog.duration}</span>
                      </div>
                      <h3 className="font-display font-bold text-2xl">{prog.name}</h3>
                      <p className="text-sm opacity-85 leading-relaxed">{prog.description}</p>
                      
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono uppercase tracking-wider opacity-60">{"Program Deliverables:"}</h4>
                        <ul className="space-y-2">
                          {prog.benefits.map((b, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                              <span className="opacity-80">{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-8 mt-8 border-t dark:border-slate-800 border-slate-100 space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-[10px] font-mono opacity-60 uppercase">{"Pricing Option"}</div>
                          <div className="font-display font-black text-2xl text-brand-primary">{prog.pricing}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] font-mono opacity-60 uppercase">{"Target Outcome"}</div>
                          <div className="text-xs font-bold text-emerald-500">{prog.results}</div>
                        </div>
                      </div>
                      <button onClick={() => navigateTo("contact")} className="w-full bg-brand-primary hover:bg-red-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                        {"Apply For Coaching"}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* =========================================================
              4. TRANSFORMATION RESULTS PAGE
              ========================================================= */}
          {activeTab === "transformations" && (
            <motion.div 
              key="transformations" 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12"
            >
              <div className="text-center space-y-2">
                <h1 className="font-display font-black text-4xl">{"Transformation Results"}</h1>
                <p className="opacity-75 max-w-xl mx-auto">{"Real people, real struggles, science-backed solutions, permanent results."}</p>
              </div>

              {/* Before/After Gallery */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
                {[
                  { name: "Rahul J.", lost: "18.5 kg lost", duration: "16 Weeks", desc: "Dramatically reduced systemic visceral fat and lowered rest heart-rate coordinates from 84 to 62 bpm.", before: "https://picsum.photos/seed/rahul_before/600/450", after: "https://picsum.photos/seed/rahul_after/600/450" },
                  { name: "Meera K.", lost: "11.2 kg lost", duration: "12 Weeks", desc: "Restructured posture muscles, resolved knee tension during stair climbs, and built lean athletic tone.", before: "https://picsum.photos/seed/meera_before/600/450", after: "https://picsum.photos/seed/meera_after/600/450" },
                  { name: "Alex T.", lost: "6.5 kg muscle gain", duration: "20 Weeks", desc: "Advanced metabolic calorie building block strategy. Drastically increased bench and squat performance metrics.", before: "https://picsum.photos/seed/alex_before/600/450", after: "https://picsum.photos/seed/alex_after/600/450" },
                ].map((item, idx) => (
                  <div key={idx} className={`rounded-xl overflow-hidden border ${isDarkMode ? "border-slate-800 bg-slate-900/30" : "border-slate-200 bg-white shadow-sm"}`}>
                    <div className="grid grid-cols-2 gap-1 border-b dark:border-slate-800 border-slate-200">
                      <div className="relative aspect-[4/3] bg-slate-800">
                        <Image src={item.before} alt="Before" fill className="object-cover" referrerPolicy="no-referrer" />
                        <div className="absolute top-2 left-2 bg-slate-900/85 text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded">{"Before"}</div>
                      </div>
                      <div className="relative aspect-[4/3] bg-slate-800">
                        <Image src={item.after} alt="After" fill className="object-cover" referrerPolicy="no-referrer" />
                        <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded">{"After"}</div>
                      </div>
                    </div>
                    <div className="p-5 space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-display font-bold text-base">{item.name}</h4>
                        <span className="text-[10px] font-mono font-bold text-brand-primary">{item.duration}</span>
                      </div>
                      <div className="text-emerald-500 text-sm font-bold">{item.lost}</div>
                      <p className="text-xs opacity-75 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* =========================================================
              5. SERVICES PAGE
              ========================================================= */}
          {activeTab === "services" && (
            <motion.div 
              key="services" 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12"
            >
              <div className="text-center space-y-3">
                <h1 className="font-display font-black text-4xl">{"Training Services"}</h1>
                <p className="opacity-75 max-w-2xl mx-auto">{"Flexible physical training options engineered to fit seamlessly into high-performance executive routines."}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { name: "One-on-One Personal Training", desc: "Private elite coaching slots. Direct form correction, custom physiological scaling, and live physical sessions.", benefits: ["Private, low-volume elite gym access", "Real-time performance biomechanic coaching", "Instant nutritional adjustments during workouts"], price: "From $120/session" },
                  { name: "Online Elite Fitness Coaching", desc: "Empower your workout habits remotely with our digital transformation blueprint. Access full training programs from anywhere.", benefits: ["Interactive mobile training split charts", "Weekly Loom video form analysis reviews", "WhatsApp coaching accountability loop"], price: "From $249/month" },
                  { name: "Executive Corporate Wellness", desc: "Improve employee health indices, posture issues, and corporate focus scores with high-impact corporate programs.", benefits: ["Deskside mobility and ergonomics training", "Workplace nutrition and hydration systems", "Interactive stress-management strategies"], price: "Custom Corporate Quote" },
                  { name: "Nutrition & Metabolic Planning", desc: "Detailed biological caloric profiling matching food selections with metabolic speeds to crush stagnation.", benefits: ["Caloric cycling and macro budgets", "Gut health and digestion optimization", "Satiety lists for easy lifestyle changes"], price: "From $199/month" },
                ].map((srv, idx) => (
                  <div key={idx} className={`p-6 rounded-2xl border flex flex-col justify-between ${
                    isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"
                  }`}>
                    <div className="space-y-4">
                      <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-brand-primary"><Flame className="w-5 h-5" /></div>
                      <h3 className="font-display font-bold text-xl">{srv.name}</h3>
                      <p className="text-sm opacity-80 leading-relaxed">{srv.desc}</p>
                      
                      <div className="space-y-2">
                        <div className="text-[10px] font-mono uppercase tracking-wider opacity-60">{"Service Deliverables:"}</div>
                        {srv.benefits.map((b, i) => (
                          <div key={i} className="text-xs flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                            <span className="opacity-80">{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t dark:border-slate-800 border-slate-200 flex justify-between items-center">
                      <span className="font-mono text-sm font-bold text-brand-primary">{srv.price}</span>
                      <button onClick={() => navigateTo("contact")} className="bg-brand-primary hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md text-xs transition-transform hover:-translate-y-0.5">
                        {"Inquire Now"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* =========================================================
              6. CASE STUDIES PAGE
              ========================================================= */}
          {activeTab === "case-studies" && (
            <motion.div 
              key="case-studies" 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12"
            >
              <div className="text-center space-y-3">
                <h1 className="font-display font-black text-4xl">{"Client Case Studies"}</h1>
                <p className="opacity-75 max-w-2xl mx-auto">{"Deep dive analyses showing the exact assessments, strategies, and physical breakthroughs of real clients."}</p>
              </div>

              <div className="space-y-8">
                {CASE_STUDIES.map(cs => (
                  <div key={cs.id} className={`p-8 rounded-2xl border ${
                    isDarkMode ? "bg-slate-900/30 border-slate-800" : "bg-white border-slate-200 shadow-sm"
                  }`}>
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b dark:border-slate-800 border-slate-100 pb-6 mb-6">
                      <div>
                        <span className="text-[10px] font-mono bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-md font-bold uppercase">{cs.duration} {"transformation"}</span>
                        <h3 className="font-display font-bold text-2xl mt-2">{cs.name}</h3>
                        <p className="text-xs font-mono opacity-60 mt-1">{cs.role}</p>
                      </div>
                      
                      {/* Metric highlights */}
                      <div className="flex gap-4">
                        {cs.weightLoss && (
                          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2.5 text-center shrink-0">
                            <div className="text-emerald-500 font-display font-black text-xl">{cs.weightLoss}</div>
                            <div className="text-[9px] font-mono uppercase opacity-75">{"Fat Dropped"}</div>
                          </div>
                        )}
                        {cs.muscleGain && (
                          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2.5 text-center shrink-0">
                            <div className="text-amber-500 font-display font-black text-xl">{cs.muscleGain}</div>
                            <div className="text-[9px] font-mono uppercase opacity-75">{"Muscle Gained"}</div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                      <div className="space-y-1.5">
                        <h4 className="font-bold text-brand-primary flex items-center gap-1.5 uppercase tracking-wider text-xs font-mono">
                          <Flame className="w-3.5 h-3.5" /> {"Background & Challenge"}
                        </h4>
                        <p className="opacity-80 leading-relaxed text-xs">{cs.challenge}</p>
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="font-bold text-brand-primary flex items-center gap-1.5 uppercase tracking-wider text-xs font-mono">
                          <Dumbbell className="w-3.5 h-3.5" /> {"Coaching Strategy"}
                        </h4>
                        <p className="opacity-80 leading-relaxed text-xs">{cs.strategy}</p>
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="font-bold text-brand-primary flex items-center gap-1.5 uppercase tracking-wider text-xs font-mono">
                          <Trophy className="w-3.5 h-3.5" /> {"Key Results"}
                        </h4>
                        <p className="opacity-80 leading-relaxed text-xs font-semibold text-emerald-500">{cs.results}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* =========================================================
              7. BLOG PAGE
              ========================================================= */}
          {activeTab === "blog" && (
            <motion.div 
              key="blog" 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12"
            >
              <div className="text-center space-y-3">
                <h1 className="font-display font-black text-4xl">{"Expert Articles & Guides"}</h1>
                <p className="opacity-75 max-w-xl mx-auto">{"Science-backed training routines, macronutrient recipes, and sustainable fitness advice."}</p>
              </div>

              {/* Search and Category Filters */}
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center pt-2">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-3 w-4.5 h-4.5 opacity-50" />
                  <input 
                    type="text" 
                    placeholder="Search articles by keywords..." 
                    value={blogSearch}
                    onChange={(e) => setBlogSearch(e.target.value)}
                    className={`w-full pl-9 pr-4 h-11 rounded-lg border text-sm outline-none focus:border-brand-primary transition-colors ${
                      isDarkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"
                    }`}
                  />
                </div>

                <div className="flex gap-2 overflow-x-auto w-full md:w-auto scrollbar-none pb-1">
                  {["All", "Nutrition", "Fat Loss", "Muscle Building", "Healthy Lifestyle"].map((cat) => (
                    <button 
                      key={cat}
                      onClick={() => setBlogCategory(cat)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${
                        blogCategory === cat ? "bg-brand-primary text-white" : "bg-slate-800/10 dark:bg-slate-900 hover:bg-brand-primary/15"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredBlogs.length > 0 ? (
                  filteredBlogs.map(post => (
                    <article key={post.id} className={`p-6 rounded-2xl border flex flex-col justify-between hover:border-brand-primary transition-colors ${
                      isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"
                    }`}>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-xs opacity-60 font-mono">
                          <span>{post.category}</span>
                          <span>{post.date}</span>
                        </div>
                        <h3 className="font-display font-bold text-xl hover:text-brand-primary cursor-pointer transition-colors leading-snug">{post.title}</h3>
                        <p className="text-sm opacity-80 leading-relaxed">{post.excerpt}</p>
                      </div>

                      <div className="pt-6 mt-6 border-t dark:border-slate-800 border-slate-100 flex justify-between items-center">
                        <div className="flex gap-1.5">
                          {post.tags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="text-[10px] font-mono font-bold bg-slate-800/20 dark:bg-slate-900 px-2 py-0.5 rounded text-brand-primary">#{tag}</span>
                          ))}
                        </div>
                        <span className="text-xs font-mono font-semibold opacity-60 flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {post.readTime}</span>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-12 opacity-60">
                    <Info className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p>{"No articles match your search parameters. Try typing \"macros\" or \"sleep\"."}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* =========================================================
              8. FITNESS RESOURCES PAGE (CALCULATORS)
              ========================================================= */}
          {activeTab === "resources" && (
            <motion.div 
              key="resources" 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12"
            >
              <div className="text-center space-y-3">
                <h1 className="font-display font-black text-4xl">{"Interactive Metabolic Calculators"}</h1>
                <p className="opacity-75 max-w-2xl mx-auto">{"Get instant bio-metric estimates to help map your exact calorie deficit and macronutrient distributions."}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* BMI & Gauge Widget */}
                <div className={`p-6 rounded-2xl border ${isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Calculator className="w-5 h-5 text-brand-primary" />
                    <h3 className="font-display font-bold text-xl">{"BMI Assessment Gauge"}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold opacity-75">{"Weight (kg)"}</label>
                        <input 
                          type="number" 
                          value={bmiWeight} 
                          onChange={(e) => setBmiWeight(e.target.value)}
                          className={`w-full px-3 h-10 rounded border text-sm outline-none focus:border-brand-primary ${
                            isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
                          }`}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold opacity-75">{"Height (cm)"}</label>
                        <input 
                          type="number" 
                          value={bmiHeight} 
                          onChange={(e) => setBmiHeight(e.target.value)}
                          className={`w-full px-3 h-10 rounded border text-sm outline-none focus:border-brand-primary ${
                            isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl dark:bg-slate-950 bg-slate-100 flex items-center justify-between border dark:border-slate-800 border-slate-200">
                      <div>
                        <div className="text-xs font-mono opacity-60">{"Resulting Body Mass Index"}</div>
                        <div className="font-display font-black text-3xl text-brand-primary">{bmiResult || "--"}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-mono opacity-60 uppercase">{"Category Status"}</div>
                        <div className="text-xs font-bold text-brand-accent mt-1.5">{bmiCategory || "Calculating..."}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Calorie & Macro Targeter */}
                <div className={`p-6 rounded-2xl border ${isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Flame className="w-5 h-5 text-brand-accent" />
                    <h3 className="font-display font-bold text-xl">{"Metabolic Calorie & Macro Budget"}</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase opacity-75">{"Age (yrs)"}</label>
                        <input 
                          type="number" 
                          value={tdeeAge} 
                          onChange={(e) => setTdeeAge(e.target.value)}
                          className={`w-full px-2.5 h-10 rounded border text-sm outline-none focus:border-brand-primary ${
                            isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
                          }`}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase opacity-75">{"Gender"}</label>
                        <select 
                          value={tdeeGender} 
                          onChange={(e) => setTdeeGender(e.target.value)}
                          className={`w-full px-2 h-10 rounded border text-sm outline-none focus:border-brand-primary ${
                            isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
                          }`}
                        >
                          <option value="male">{"Male"}</option>
                          <option value="female">{"Female"}</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase opacity-75">{"Target Goal"}</label>
                        <select 
                          value={macroGoal} 
                          onChange={(e) => setMacroGoal(e.target.value)}
                          className={`w-full px-2 h-10 rounded border text-sm outline-none focus:border-brand-primary ${
                            isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
                          }`}
                        >
                          <option value="loss">{"Fat Loss"}</option>
                          <option value="recomp">{"Body Recomp"}</option>
                          <option value="gain">{"Muscle Gain"}</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold opacity-75">{"Weekly Activity Coefficient"}</label>
                      <select 
                        value={tdeeActivity} 
                        onChange={(e) => setTdeeActivity(e.target.value)}
                        className={`w-full px-3 h-10 rounded border text-sm outline-none focus:border-brand-primary ${
                          isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
                        }`}
                      >
                        <option value="1.2">{"Sedentary (No gym, office job)"}</option>
                        <option value="1.375">{"Lightly Active (1-3 days light exercise)"}</option>
                        <option value="1.55">{"Moderately Active (3-5 days heavier compound lifts)"}</option>
                        <option value="1.725">{"Very Active (6-7 days of rigorous physical routines)"}</option>
                      </select>
                    </div>

                    <div className="p-4 rounded-xl dark:bg-slate-950 bg-slate-100 border dark:border-slate-800 border-slate-200">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-mono opacity-60">{"Estimated TDEE Daily Calories"}</span>
                        <span className="font-display font-black text-xl text-brand-accent">{tdeeResult ? `${tdeeResult} kcal` : "--"}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 rounded bg-red-500/10 border border-red-500/20">
                          <div className="text-sm font-black text-brand-primary">{macroProtein}g</div>
                          <div className="text-[9px] font-mono uppercase opacity-75">{"Protein"}</div>
                        </div>
                        <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20">
                          <div className="text-sm font-black text-brand-accent">{macroCarbs}g</div>
                          <div className="text-[9px] font-mono uppercase opacity-75">{"Carbs"}</div>
                        </div>
                        <div className="p-2 rounded bg-teal-500/10 border border-teal-500/20">
                          <div className="text-sm font-black text-teal-400">{macroFats}g</div>
                          <div className="text-[9px] font-mono uppercase opacity-75">{"Healthy Fats"}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Free PDF Guides Download Section */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border dark:border-slate-800 border-slate-200">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 max-w-xl">
                    <span className="text-[10px] font-mono bg-brand-primary/20 text-brand-primary px-3 py-1 rounded uppercase tracking-wider font-bold">{"Free Downloads"}</span>
                    <h3 className="font-display font-bold text-2xl">{"Download Coach Suvo's Core Training Manuals"}</h3>
                    <p className="text-sm opacity-85 leading-relaxed">{"Instantly obtain our custom PDFs: \"The high-volume fat-loss cookbook\" and \"The ultimate 3-day full-body compound progression chart\". No credit card required."}</p>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => alert("📖 Downloading PDF: 'Metabolic Fat-Loss Cookbook'! Check your device downloads.")}
                      className="bg-brand-primary hover:bg-red-600 text-white font-bold px-5 py-3 rounded-md text-sm transition-transform hover:-translate-y-0.5"
                    >
                      {"Get Recipes Guide"}
                    </button>
                    <button 
                      onClick={() => alert("🏋️‍♂️ Downloading PDF: 'Compound Progressions Manual'! Get ready to lift heavy.")}
                      className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold px-5 py-3 rounded-md text-sm transition-transform hover:-translate-y-0.5"
                    >
                      {"Get Lifting Split"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* =========================================================
              9. TESTIMONIALS PAGE
              ========================================================= */}
          {activeTab === "testimonials" && (
            <motion.div 
              key="testimonials" 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12"
            >
              <div className="text-center space-y-3">
                <h1 className="font-display font-black text-4xl">{"Client Reviews & Testimonials"}</h1>
                <p className="opacity-75 max-w-xl mx-auto">{"Verify what our clients have achieved inside the DevFit transformation ecosystem."}</p>
              </div>

              {/* Average Rating Block */}
              <div className="max-w-md mx-auto p-6 rounded-2xl border text-center space-y-3 bg-gradient-to-b from-slate-900 to-slate-950 text-white">
                <div className="flex justify-center text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
                </div>
                <div className="font-display font-black text-3xl text-brand-accent">{"4.95 / 5.00 Stars"}</div>
                <p className="text-xs opacity-75">{"Based on over 320 verified customer exit survey reports across 2018 - 2026."}</p>
              </div>

              {/* Testimonials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "Anish G.", star: 5, text: "Coach Suvo completely restructured my relationship with carbs. I dropped 14kg of visceral weight while eating rice daily! Unbelievably supportive coach.", metric: "Lost 14 kg" },
                  { name: "Shalini P.", star: 5, text: "The weekly video form feedback changed my posture. My squat went from a painful 30kg to an easy 75kg without any knee fatigue. 10/10 recommendation.", metric: "75kg squat master" },
                  { name: "Daniel K.", star: 5, text: "With my extreme work schedule, I couldn't cook. Suvo set up a food delivery macro selection guide that fit my lifestyle. Absolute game-changer.", metric: "Visceral fat drop 6%" },
                ].map((test, idx) => (
                  <div key={idx} className={`p-6 rounded-2xl border space-y-4 ${
                    isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex text-amber-400 gap-0.5">
                        {[...Array(test.star)].map((_, i) => <Star key={i} className="w-4.5 h-4.5 fill-current" />)}
                      </div>
                      <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded font-semibold">{test.metric}</span>
                    </div>
                    <p className="text-sm opacity-80 leading-relaxed italic">{"\""}{test.text}{"\""}</p>
                    <h5 className="font-display font-bold text-sm text-brand-primary">{"— "}{test.name}</h5>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* =========================================================
              10. CONTACT PAGE (LEAD GENERATION FORM)
              ========================================================= */}
          {activeTab === "contact" && (
            <motion.div 
              key="contact" 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12"
            >
              <div className="text-center space-y-3">
                <h1 className="font-display font-black text-4xl">{"Start Your Fitness Journey"}</h1>
                <p className="opacity-75 max-w-xl mx-auto">{"Fill out the transformation questionnaire below to instantly unlock a 100% custom Coach Suvo AI exercise blueprint preview!"}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Questionnaire Lead Capture Form */}
                <div className={`lg:col-span-7 p-6 md:p-8 rounded-2xl border space-y-6 ${
                  isDarkMode ? "bg-slate-900/30 border-slate-800" : "bg-white border-slate-200 shadow-sm"
                }`}>
                  <h3 className="font-display font-bold text-2xl border-b dark:border-slate-800 border-slate-100 pb-3">{"Transformation Questionnaire"}</h3>
                  
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold opacity-75">{"Your Full Name *"}</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="Vikram Singh" 
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          className={`w-full px-3 h-11 rounded border text-sm outline-none focus:border-brand-primary ${
                            isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
                          }`}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold opacity-75">{"Email Address *"}</label>
                        <input 
                          type="email" 
                          required 
                          placeholder="vikram@company.com" 
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          className={`w-full px-3 h-11 rounded border text-sm outline-none focus:border-brand-primary ${
                            isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold opacity-75">{"Phone / WhatsApp"}</label>
                        <input 
                          type="tel" 
                          placeholder="+91 98765 43210" 
                          value={leadPhone}
                          onChange={(e) => setLeadPhone(e.target.value)}
                          className={`w-full px-3 h-11 rounded border text-sm outline-none focus:border-brand-primary ${
                            isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
                          }`}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold opacity-75">{"Current Weight (kg)"}</label>
                        <input 
                          type="number" 
                          placeholder="85" 
                          value={leadCurrentWeight}
                          onChange={(e) => setLeadCurrentWeight(e.target.value)}
                          className={`w-full px-3 h-11 rounded border text-sm outline-none focus:border-brand-primary ${
                            isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
                          }`}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold opacity-75">{"Target Weight (kg)"}</label>
                        <input 
                          type="number" 
                          placeholder="75" 
                          value={leadTargetWeight}
                          onChange={(e) => setLeadTargetWeight(e.target.value)}
                          className={`w-full px-3 h-11 rounded border text-sm outline-none focus:border-brand-primary ${
                            isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold opacity-75">{"Core Fitness Goal"}</label>
                        <select 
                          value={leadGoal} 
                          onChange={(e) => setLeadGoal(e.target.value)}
                          className={`w-full px-3 h-11 rounded border text-sm outline-none focus:border-brand-primary ${
                            isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
                          }`}
                        >
                          <option value="loss">{"Sustainably Drop Body Fat"}</option>
                          <option value="gain">{"Build Heavy Muscle Mass"}</option>
                          <option value="recomp">{"Metabolic Body Recomposition"}</option>
                          <option value="strength">{"Break Power Lift Plateaus"}</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold opacity-75">{"Training Location Preference"}</label>
                        <select 
                          value={leadPreference} 
                          onChange={(e) => setLeadPreference(e.target.value)}
                          className={`w-full px-3 h-11 rounded border text-sm outline-none focus:border-brand-primary ${
                            isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
                          }`}
                        >
                          <option value="gym">{"Fully Equipped Gym"}</option>
                          <option value="home">{"Home Workouts (Dumbbells/Bands)"}</option>
                          <option value="hybrid">{"Hybrid Gym & Home Setup"}</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold opacity-75">{"Notes regarding injuries, metabolic speed, habits..."}</label>
                      <textarea 
                        rows={3}
                        placeholder="E.g., Minor lower-back stiffness under squat load, working 10 hours desk job daily..."
                        value={leadMessage}
                        onChange={(e) => setLeadMessage(e.target.value)}
                        className={`w-full p-3 rounded border text-sm outline-none focus:border-brand-primary resize-none ${
                          isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
                        }`}
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmittingLead}
                      className="w-full bg-brand-primary hover:bg-red-600 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-red-500/20"
                    >
                      {isSubmittingLead ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          {"Coach Suvo's AI is analyzing metrics..."}
                        </>
                      ) : (
                        <>
                          {"Get Instant Custom AI Blueprint"}
                          <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Trainer Contact info & WhatsApp block */}
                <div className="lg:col-span-5 space-y-6">
                  <div className={`p-6 rounded-2xl border space-y-4 ${
                    isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"
                  }`}>
                    <h4 className="font-display font-bold text-lg">{"Contact Information"}</h4>
                    
                    <div className="space-y-3.5 text-sm">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-brand-primary" />
                        <span className="opacity-80">{"suvodev.hz@gmail.com"}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-brand-primary" />
                        <span className="opacity-80">{"+91 90000 12345 (Consultations)"}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-brand-primary" />
                        <span className="opacity-80">{"Elite Conditioning Studio, Sector 5, Bangalore, India"}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t dark:border-slate-800 border-slate-100">
                      <a 
                        href="https://wa.me/919000012345?text=Hey%20Coach%20Suvo!%20I'm%20looking%20for%20a%20personal%20fitness%20transformation." 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5"
                      >
                        {"Message on WhatsApp"}
                        <Phone className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Frequently Asked Questions Mini-Accordion */}
                  <div className={`p-6 rounded-2xl border space-y-4 ${
                    isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"
                  }`}>
                    <h4 className="font-display font-bold text-lg">{"FAQ Accordion"}</h4>
                    
                    <div className="space-y-3">
                      {[
                        { q: "How fast will I see weight loss results?", a: "Safe body fat reduction is around 0.5kg - 1.2kg per week. Most clients see visible changes within 2-3 weeks." },
                        { q: "Do I need fully equipped gym access?", a: "No! We formulate dumbbell, resistance-band, and bodyweight hybrid Splits suited to living room limits." },
                        { q: "Will I receive macro adjustments?", a: "Yes. Every Sunday, we review macro balances and adapt caloric budgets relative to your progress metrics." }
                      ].map((item, i) => (
                        <details key={i} className="group border-b dark:border-slate-800 border-slate-100 pb-2.5 cursor-pointer">
                          <summary className="font-bold text-xs flex justify-between items-center outline-none select-none">
                            <span>{item.q}</span>
                            <ChevronDown className="w-4 h-4 text-brand-primary group-open:rotate-180 transition-transform" />
                          </summary>
                          <p className="text-xs opacity-75 mt-1.5 leading-relaxed">{item.a}</p>
                        </details>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* DYNAMIC BLUEPRINT RESPONSE CARDS (Rendered after Gemini submits successfully) */}
              <AnimatePresence>
                {aiBlueprint && (
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-6 md:p-8 rounded-3xl border-2 border-brand-primary bg-slate-900 text-slate-100 space-y-6 shadow-2xl relative"
                  >
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider animate-pulse flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> {"Live Coach Suvo AI Plan"}
                    </div>
                    <h3 className="font-display font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">{"Your Tailored Fitness Blueprint Preview"}</h3>
                    
                    {/* Render AI consultation Markdown content block */}
                    <div className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed space-y-4 font-sans border-t border-slate-800 pt-4">
                      {aiBlueprint.split("\n\n").map((para, pIdx) => {
                        if (para.startsWith("###")) {
                          return <h4 key={pIdx} className="font-display font-black text-xl text-brand-primary mt-6">{para.replace("###", "").trim()}</h4>;
                        }
                        if (para.startsWith("####")) {
                          return <h5 key={pIdx} className="font-display font-bold text-base text-brand-accent mt-4">{para.replace("####", "").trim()}</h5>;
                        }
                        if (para.startsWith("*") || para.startsWith("-")) {
                          return (
                            <ul key={pIdx} className="list-disc pl-5 space-y-1.5">
                              {para.split("\n").map((li, lIdx) => (
                                <li key={lIdx} className="opacity-90">{li.replace(/^[\s*-]+/, "")}</li>
                              ))}
                            </ul>
                          );
                        }
                        if (para.startsWith(">")) {
                          return <blockquote key={pIdx} className="border-l-4 border-brand-primary pl-4 py-2 italic bg-slate-950/40 rounded opacity-90 my-3">{para.replace(">", "").trim()}</blockquote>;
                        }
                        return <p key={pIdx} className="opacity-80">{para}</p>;
                      })}
                    </div>

                    <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-xs opacity-75">
                        {"📊 Ready to synchronize these parameters into your weekly metrics program?"}
                      </div>
                      <button 
                        onClick={() => { setIsBookingOpen(true); }}
                        className="bg-brand-primary hover:bg-red-600 text-white font-bold py-2.5 px-5 rounded-lg text-xs tracking-wide transition-all"
                      >
                        {"Book Video Consultation Call"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* =========================================================
              11. PRICING PAGE
              ========================================================= */}
          {activeTab === "pricing" && (
            <motion.div 
              key="pricing" 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12"
            >
              <div className="text-center space-y-3">
                <h1 className="font-display font-black text-4xl">{"Coaching Memberships"}</h1>
                <p className="opacity-75 max-w-xl mx-auto">{"Select a subscription block matching your exact level of physical training and accountability guidance."}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
                {[
                  { name: "Starter Tier", price: "$199", dur: "per month", desc: "For self-driven individuals needing a structured training blueprint.", features: ["Custom 3-day workout split", "Macronutrient targets checklist", "Access to DevFit client portal", "Email community support"], recommended: false },
                  { name: "Ultimate Coaching", price: "$299", dur: "per month", desc: "Our highest-converting, signature weekly transformation package.", features: ["Custom 4-day compound split", "Caloric metabolic calculation reviews", "Weekly video form correcting", "24/7 priority WhatsApp coaching chat"], recommended: true },
                  { name: "VIP Elite Coaching", price: "$499", dur: "per month", desc: "Complete lifestyle guidance including high-level hormonal wellness.", features: ["Unlimited custom workout splits", "Daily food log auditing", "Biweekly 1-on-1 performance video reviews", "Direct access to Coach Suvo's personal cell"], recommended: false }
                ].map((plan, i) => (
                  <div key={i} className={`p-6 rounded-2xl border flex flex-col justify-between relative ${
                    plan.recommended ? "border-brand-primary bg-slate-900 text-white shadow-xl lg:scale-105 z-10" : isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200"
                  }`}>
                    {plan.recommended && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-primary text-white font-mono text-[9px] font-bold uppercase py-1 px-3 rounded-full tracking-wider shadow">{"Most Popular"}</span>
                    )}
                    
                    <div className="space-y-5">
                      <div>
                        <h4 className="font-display font-bold text-lg">{plan.name}</h4>
                        <p className="text-xs opacity-70 mt-1">{plan.desc}</p>
                      </div>

                      <div className="flex items-baseline gap-1.5 border-b dark:border-slate-800 border-slate-100 pb-4">
                        <span className="font-display font-black text-4xl text-brand-primary">{plan.price}</span>
                        <span className="text-xs opacity-60 font-mono">{plan.dur}</span>
                      </div>

                      <ul className="space-y-2.5">
                        {plan.features.map((feat, idx) => (
                          <li key={idx} className="text-xs flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0" />
                            <span className="opacity-85">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button onClick={() => navigateTo("contact")} className={`w-full font-bold py-3.5 rounded-lg mt-8 text-sm tracking-wide ${
                      plan.recommended ? "bg-brand-primary hover:bg-red-600 text-white" : "bg-slate-800/10 dark:bg-slate-900 hover:bg-brand-primary hover:text-white"
                    } transition-colors`}>
                      {"Apply For "} {plan.name}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* =========================================================
              12. 404 PAGE (FITNESS THEMED)
              ========================================================= */}
          {activeTab === "not-found" && (
            <motion.div 
              key="404" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="py-16 text-center space-y-6 max-w-md mx-auto"
            >
              <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center text-brand-primary mx-auto">
                <Flame className="w-10 h-10 animate-bounce" />
              </div>
              <h1 className="font-display font-black text-6xl text-brand-primary">{"404"}</h1>
              <h3 className="font-display font-bold text-2xl">{"This Page is Out of Shape!"}</h3>
              <p className="text-sm opacity-75 leading-relaxed">
                {"\"Sticking to a workout plan requires discipline, but finding this page was just a complete structural lifting failure. Let's redirect back to safety.\""}
              </p>
              <div className="pt-2">
                <button onClick={() => navigateTo("home")} className="bg-brand-primary hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-md">
                  {"Back To Safety / Home"}
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ------------------------------------------------------------------
          GLOBAL COMPONENTS: BOOKING MODAL
          ------------------------------------------------------------------ */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`relative w-full max-w-lg rounded-2xl border p-6 space-y-6 shadow-2xl transition-colors duration-300 ${
                isDarkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"
              }`}
            >
              <button 
                onClick={() => setIsBookingOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-800/10 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-1.5">
                <h3 className="font-display font-bold text-2xl">{"Book Free Consultation Call"}</h3>
                <p className="text-xs opacity-75">{"Connect with Coach Suvo for a complimentary 1-on-1 metabolic assessment."}</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl dark:bg-slate-950 bg-slate-100 text-xs border dark:border-slate-800 border-slate-200">
                  {"⚡ **Consultation Slots Left This Week:** **3 / 10 available slots**. Secure your metabolic mapping appointment immediately."}
                </div>
                
                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Your Full Name" 
                    className={`w-full px-3 h-11 rounded border text-sm outline-none focus:border-brand-primary ${
                      isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
                    }`}
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className={`w-full px-3 h-11 rounded border text-sm outline-none focus:border-brand-primary ${
                      isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
                    }`}
                  />
                  <button 
                    onClick={() => {
                      setIsBookingOpen(false);
                      alert("📅 Booking success! A custom Zoom invitation has been dispatched to your mailbox.");
                    }}
                    className="w-full bg-brand-primary hover:bg-red-600 text-white font-bold h-11 rounded-lg text-sm transition-transform hover:-translate-y-0.5"
                  >
                    {"Confirm Zoom Slot Booking"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------------
          GLOBAL COMPONENTS: SEARCH MODAL
          ------------------------------------------------------------------ */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`relative w-full max-w-md rounded-2xl border p-6 space-y-4 shadow-2xl ${
                isDarkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"
              }`}
            >
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4.5 h-4.5 opacity-50" />
                <input 
                  type="text" 
                  placeholder="Type 'fat loss', 'protein', or 'chest'..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-9 pr-4 h-11 rounded-lg border text-sm outline-none focus:border-brand-primary ${
                    isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
                  }`}
                  autoFocus
                />
              </div>

              {searchQuery && (
                <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                  <div className="text-[10px] font-mono opacity-50 uppercase">{"Matching Programs & articles"}</div>
                  {[
                    { t: "Elite Weight Loss Coaching", tab: "programs" },
                    { t: "Hypertrophy & Strength Blueprint", tab: "programs" },
                    { t: "The Ultimate Guide to Progressive Overload", tab: "blog" },
                    { t: "How to Calculate Your Real TDEE", tab: "blog" },
                    { t: "Top 5 High-Volume Foods", tab: "blog" }
                  ].filter(i => i.t.toLowerCase().includes(searchQuery.toLowerCase())).map((item, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => { setIsSearchOpen(false); navigateTo(item.tab); setSearchQuery(""); }}
                      className="p-2.5 rounded-lg text-xs cursor-pointer hover:bg-slate-800/10 dark:hover:bg-slate-950 hover:text-brand-primary transition-colors flex items-center justify-between"
                    >
                      <span>{item.t}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------------
          GLOBAL COMPONENTS: AI COACH CHAT TRIGGER / WINDOW
          ------------------------------------------------------------------ */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <AnimatePresence>
          {isAiBotOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="w-[330px] sm:w-[360px] h-[450px] rounded-2xl border flex flex-col shadow-2xl overflow-hidden transition-colors duration-300 bg-slate-900 border-slate-800 text-slate-100"
            >
              {/* Bot Header */}
              <div className="bg-gradient-to-r from-red-600 to-red-500 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-950/20 flex items-center justify-center text-white"><Dumbbell className="w-4.5 h-4.5" /></div>
                  <div>
                    <h4 className="font-bold text-xs">{"Coach Suvo AI"}</h4>
                    <span className="text-[9px] text-white/80 font-mono flex items-center gap-1">{"● Online (3.5 Flash)"}</span>
                  </div>
                </div>
                <button onClick={() => setIsAiBotOpen(false)} className="text-white hover:opacity-75"><X className="w-4 h-4" /></button>
              </div>

              {/* Chat Message Scroll */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-none">
                {botMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`p-3 rounded-xl max-w-[85%] text-xs leading-relaxed ${
                      msg.role === "user" ? "bg-brand-primary text-white" : "bg-slate-950 text-slate-200 border border-slate-850"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isSendingChat && (
                  <div className="flex justify-start">
                    <div className="p-3 rounded-xl bg-slate-950 text-slate-400 text-xs flex items-center gap-1.5 border border-slate-850">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-brand-primary" />
                      {"Coach is typing..."}
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 border-t border-slate-800 bg-slate-950 flex gap-2">
                <input 
                  type="text" 
                  placeholder="Ask about protein intake, squat tips..." 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendChatMessage()}
                  className="flex-1 px-3 h-10 rounded-md bg-slate-900 border border-slate-800 text-xs outline-none focus:border-brand-primary"
                />
                <button onClick={handleSendChatMessage} className="w-10 h-10 rounded-md bg-brand-primary hover:bg-red-600 flex items-center justify-center text-white">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Bubble Icon */}
        <button 
          onClick={() => setIsAiBotOpen(!isAiBotOpen)}
          className="w-14 h-14 rounded-full bg-brand-primary hover:bg-red-600 text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all shadow-red-500/30"
          title="Speak with Coach Suvo's AI Assistant"
        >
          <Sparkles className="w-6 h-6 animate-pulse" />
        </button>
      </div>

      {/* ------------------------------------------------------------------
          GLOBAL COMPONENTS: FOOTER
          ------------------------------------------------------------------ */}
      <footer className={`border-t transition-colors duration-300 mt-20 ${
        isDarkMode ? "bg-slate-950 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-700"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Column 1: Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-brand-primary flex items-center justify-center text-white"><Dumbbell className="w-5 h-5" /></div>
                <span className="font-display font-bold text-lg text-brand-primary uppercase">{"Suvo Dev"}</span>
              </div>
              <p className="text-xs opacity-75 leading-relaxed">
                {"Premium, science-backed lifestyle training systems engineered to optimize fat loss, strength outputs, and metabolic speeds permanently."}
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-sm">{"Quick Links"}</h4>
              <div className="flex flex-col gap-2 text-xs">
                <button onClick={() => navigateTo("home")} className="hover:text-brand-primary text-left">{"Home"}</button>
                <button onClick={() => navigateTo("about")} className="hover:text-brand-primary text-left">{"About Coach"}</button>
                <button onClick={() => navigateTo("programs")} className="hover:text-brand-primary text-left">{"Fitness Programs"}</button>
                <button onClick={() => navigateTo("transformations")} className="hover:text-brand-primary text-left">{"Client Results"}</button>
              </div>
            </div>

            {/* Column 3: Resources */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-sm">{"Resources"}</h4>
              <div className="flex flex-col gap-2 text-xs">
                <button onClick={() => navigateTo("resources")} className="hover:text-brand-primary text-left">{"BMI & Macro Calculators"}</button>
                <button onClick={() => navigateTo("blog")} className="hover:text-brand-primary text-left">{"Fitness Tips Blog"}</button>
                <button onClick={() => navigateTo("case-studies")} className="hover:text-brand-primary text-left">{"Deep Case Studies"}</button>
                <button onClick={() => navigateTo("pricing")} className="hover:text-brand-primary text-left">{"Membership Rates"}</button>
              </div>
            </div>

            {/* Column 4: Newsletter */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-sm">{"Newsletter Signup"}</h4>
              <p className="text-[11px] opacity-75">{"Join over 1,500 subscribers receiving weekly nutritional guidelines."}</p>
              <form onSubmit={triggerNewsletter} className="flex gap-1.5">
                <input 
                  type="email" 
                  required
                  placeholder="name@email.com" 
                  className={`px-3 h-9 rounded text-xs outline-none flex-1 border focus:border-brand-primary ${
                    isDarkMode ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}
                />
                <button type="submit" className="bg-brand-primary hover:bg-red-600 text-white px-3 text-xs font-bold rounded">{"Join"}</button>
              </form>
            </div>

          </div>

          <div className="pt-8 mt-8 border-t dark:border-slate-800 border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs opacity-75">
            <div>{"© 2026 Suvo Dev Fitness Coaching. All Rights Reserved."}</div>
            <div className="flex gap-4">
              <span className="hover:underline cursor-pointer">{"Terms of Service"}</span>
              <span className="hover:underline cursor-pointer">{"Privacy Policy"}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-24 right-6 w-11 h-11 rounded-full bg-slate-900/90 border border-slate-800 backdrop-blur text-white flex items-center justify-center hover:bg-slate-800 transition-colors shadow-xl z-30"
            title="Scroll to Top"
          >
            <ArrowRight className="w-5 h-5 -rotate-90 text-brand-primary" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
