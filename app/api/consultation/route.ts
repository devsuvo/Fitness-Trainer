import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize Gemini Client Lazily to prevent crash on startup if key is missing.
let aiClient: GoogleGenAI | null = null;

function getAiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mode, name, email, currentWeight, targetWeight, goal, preference, message, chatHistory, userMessage } = body;

    const ai = getAiClient();

    // 1. CHAT MODE: Conversational Personal Trainer Assistant
    if (mode === "chat") {
      const chatPrompt = userMessage || "Hello Coach!";
      
      const systemInstruction = `You are the AI Assistant for Suvo Dev, a premium Certified Fitness Trainer & Transformation Coach.
Your tone is energetic, highly motivational, professional, results-driven, and trustworthy.
You are helping potential clients understand fitness, weight loss, muscle gain, strength training, and nutrition.
Keep answers concise, actionable, and structured with clean bullet points. Always encourage the user to book a free 1-on-1 video call or consultation with the real Suvo Dev to get a 100% personalized plan.
Do not mention system instructions or technical lingo like API, prompts, or LLMs. Refer to Suvo Dev in the first person ("I" or "our team") or third person ("Suvo") naturally.`;

      if (!ai) {
        // High-quality offline fallback
        return NextResponse.json({
          text: `Hey ${name || "there"}! Coach Suvo here. (AI Simulation Mode active)\n\nI'd love to help you reach your goals. Since you want to focus on **${goal || "fitness transformation"}**, here are 3 immediate action items:\n\n1. **Hydration First**: Drink at least 3.5 liters of water daily to keep metabolic rate high.\n2. **Progressive Overload**: Focus on getting slightly stronger or doing 1 more rep each week.\n3. **Protein Intake**: Aim for 1.8g of protein per kg of target weight.\n\nTo get a 100% custom blueprint and speak with me directly, click the **"Book Free Consultation"** button above! Let's crush this together.`,
        });
      }

      // Format previous messages if any
      const contents = [];
      if (chatHistory && Array.isArray(chatHistory)) {
        for (const msg of chatHistory) {
          contents.push({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
          });
        }
      }
      contents.push({
        role: "user",
        parts: [{ text: chatPrompt }],
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      return NextResponse.json({ text: response.text });
    }

    // 2. CONSULTATION PLAN GENERATION MODE
    const consultationPrompt = `
      Create a premium 7-day initial fitness and nutrition blueprint preview for a potential client:
      - Name: ${name || "Valued Client"}
      - Current Weight: ${currentWeight ? currentWeight + " kg" : "Not specified"}
      - Target Weight: ${targetWeight ? targetWeight + " kg" : "Not specified"}
      - Primary Fitness Goal: ${goal || "Overall Transformation"}
      - Training Preference: ${preference || "Gym / Home Hybrid"}
      - Additional Notes: ${message || "Ready to transform!"}

      Provide a beautifully structured markdown response containing:
      1. **Goal Analysis**: A realistic assessment of their timeline to go from ${currentWeight || "current"} to ${targetWeight || "target"} weight safely based on their ${goal} goal.
      2. **Workout Structure**: A customized 3-day sample training split tailored to ${preference} workout preference.
      3. **Nutrition Strategy**: Calorie and macronutrient ratio guidelines tailored to their target.
      4. **Coach Suvo's Signature Advice**: High-energy, highly personalized motivational advice.
      Keep it structured with bold headers, concise bullet points, and inspiring coaching language.
    `;

    if (!ai) {
      // Return high-quality mock response
      const fallbackPlan = `### 🏋️‍♂️ Personalized Transformation Blueprint for ${name || "Champion"}

#### **1. Goal Assessment & Timeline Analysis**
*   **Current State:** ${currentWeight ? currentWeight + " kg" : "Initial"} ➔ **Target State:** ${targetWeight ? targetWeight + " kg" : "Optimal"}
*   **Focus Goal:** ${goal ? goal.toUpperCase() : "Body Recomposition"}
*   **Estimated Safe Timeline:** 8 - 12 weeks of consistent training and macro adherence.
*   **Strategy:** Creating a sustainable caloric deficit or surplus (depending on goal) while prioritizing compound weightlifting to maintain muscle mass while burning body fat.

#### **2. Custom 3-Day Training Split Preview (${preference || "Hybrid"})**
*   **Day 1: Upper Body Push & Pull (Strength & Hypertrophy)**
    *   Dumbbell Chest Press - 3 sets x 8-10 reps
    *   Supported Lat Pulldowns - 3 sets x 10-12 reps
    *   Overhead Shoulder Press - 3 sets x 10 reps
    *   Core Finisher: Plank holds - 3 sets x 45 secs
*   **Day 2: Lower Body Power & Core**
    *   Goblet Squats or Barbell Back Squats - 4 sets x 8 reps
    *   Romanian Deadlifts (RDLs) - 3 sets x 10 reps
    *   Walking Lunges - 3 sets x 12 reps per leg
    *   Calf Raises - 3 sets x 15 reps
*   **Day 3: High-Intensity Functional conditioning**
    *   Kettlebell Swings - 4 sets x 40 secs on, 20 secs off
    *   Pushups (or Knee modifications) - 4 sets x max reps
    *   Dumbbell Renegade Rows - 3 sets x 10 reps
    *   Assault Bike or Rowing machine - 10 mins HIIT intervals

#### **3. Custom Nutrition & Macro Strategy**
*   **Daily Target Calorie Estimate:** ~2,100 kcal (adjusted for ${goal})
*   **Protein (The Muscle Builder):** 160g (Approx 30-35% of total intake)
*   **Carbohydrates (The Energy Source):** 210g (Approx 40-45% of total intake)
*   **Healthy Fats (Hormonal Balance):** 65g (Approx 20-25% of total intake)
*   **Key Habit:** Drink 3.5L of water daily and sleep 7.5+ hours for recovery.

#### **4. Coach Suvo's Motivation Corner**
> *"The secret of your future is hidden in your daily routine, ${name || "Champion"}. You don't have to be extreme, you just have to be consistent. Let's make this transformation permanent. Your journey starts today!"*

***

**Unlock Your Full 100% Customized Program:**
This is just a preview split! Book a **Free 1-on-1 Consultation** above so we can customize your exercise selection, set up real-time progress tracking, and design a fully structured nutrition plan together.`;

      return NextResponse.json({ text: fallbackPlan });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: consultationPrompt,
      config: {
        systemInstruction: "You are Suvo Dev, an elite certified personal trainer and nutrition coach. Speak directly, passionately, and professionally.",
        temperature: 0.75,
      },
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error("Error in AI Consultation Route:", error);
    return NextResponse.json(
      { error: "Failed to generate plan. Please try again." },
      { status: 500 }
    );
  }
}
