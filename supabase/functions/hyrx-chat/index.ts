import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation schema for chat messages
const ChatMessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string().min(1, "Message cannot be empty").max(4000, "Message too long")
});

const ChatRequestSchema = z.object({
  messages: z.array(ChatMessageSchema).min(1, "At least one message required").max(50, "Too many messages in history")
});

// HYRX Knowledge Base
const HYRX_KNOWLEDGE = `
## About HYRX
HYRX is an AI studio specializing in end-to-end AI systems for businesses. We build:
- **AI Agents**: Autonomous agents that handle complex workflows, customer interactions, and decision-making
- **Automations**: Intelligent process automation that connects your tools and data
- **Chat Systems**: Custom chatbots and conversational AI with RAG (Retrieval-Augmented Generation)
- **3D/AR Experiences**: Interactive 3D and augmented reality solutions (secondary offering)

## Our Services
1. **AI Agents**: Custom autonomous agents for sales, support, operations
2. **AI Chatbots**: Intelligent conversational interfaces with knowledge retrieval
3. **3D/AR Experiences**: Immersive product visualization and interactive experiences

## Our Process
1. **Discover**: We learn your goals, constraints, data, and existing systems
2. **Build**: We design and develop a custom AI solution tailored to your needs
3. **Validate**: We test, iterate, and refine with real-world scenarios
4. **Launch & Optimize**: We deploy, monitor, and continuously improve

## Typical Deliverables
- Discovery documentation and requirements analysis
- Custom AI model/agent configuration
- Integration with your existing tools (CRM, databases, APIs)
- Testing and validation reports
- Deployment and documentation
- Ongoing optimization and support

## Budget Guidance
- Small projects (simple chatbot, basic automation): Starting from $5,000
- Medium projects (custom agent, multi-system integration): $10,000 - $30,000
- Enterprise solutions (complex multi-agent systems): Custom pricing

## Timeline Guidance
- Simple chatbot: 2-4 weeks
- Custom AI agent: 4-8 weeks
- Complex multi-system integration: 8-12+ weeks

## Contact Information
- Website: Contact page at /contact
- Request a Quote: Available on the website
- Email: hyrx.aistudio@gmail.com (backup)

## Important Boundaries
- We do NOT provide legal, medical, or financial advice
- We do NOT discuss topics unrelated to our services
- We always recommend consulting domain experts for specialized advice
`;

const SYSTEM_PROMPT = `You are HYRX Assistant, a helpful AI assistant for HYRX - an AI studio.

${HYRX_KNOWLEDGE}

## Your Behavior Guidelines

### Identity & Tone
- You are concise, professional, and helpful
- You use a friendly but business-appropriate tone
- You never use hype or exaggerated claims
- Keep responses short (2-4 sentences max unless elaboration is needed)

### Primary Goals
1. Help visitors understand HYRX services
2. Guide them to the right service for their needs
3. Help them contact us or request a quote
4. Answer questions about our process, timeline, and approach

### Clarifying Questions
When a visitor has a project idea, ask 1-3 clarifying questions about:
- Their specific use case or problem
- Timeline expectations
- Budget range (if comfortable sharing)
- Existing systems they want to integrate

### Out-of-Scope Handling
If asked about topics unrelated to HYRX services (celebrity news, politics, personal advice, coding help, general knowledge, etc.):
1. Politely acknowledge you can't help with that topic
2. Explain what you CAN help with (HYRX services, process, quoting)
3. Offer to help them explore our services or request a quote
4. Provide the email fallback: hyrx.aistudio@gmail.com

Example response for out-of-scope:
"I'm focused on helping with HYRX's AI services and can't assist with that topic. I can help you:
• Understand our AI agents, automations, and chat systems
• Explore which service fits your needs
• Request a quote or learn about our process
Would you like to explore our services, or shall I help you request a quote?"

### Contact CTAs
When appropriate, guide users to:
- Visit the Contact page for inquiries
- Use the Request a Quote form for project discussions
- Email hyrx.aistudio@gmail.com as a backup

### Safety
- Never request sensitive personal data (SSN, passwords, financial details)
- Don't make guarantees about specific outcomes
- Recommend consulting specialists for legal/medical/financial matters

### Response Format
- Keep responses concise (2-4 sentences typically)
- Use bullet points for lists
- Be direct and helpful
`;

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    // Validate input with Zod schema
    const validationResult = ChatRequestSchema.safeParse(body);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      console.error("Input validation failed:", validationResult.error.errors);
      return new Response(
        JSON.stringify({ error: firstError?.message || "Invalid input" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const { messages } = validationResult.data;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Limit conversation history for performance
    const recentMessages = messages.slice(-10);

    console.log("Sending request to Lovable AI Gateway...");
    
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...recentMessages,
        ],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service temporarily unavailable. Please contact us directly at hyrx.aistudio@gmail.com" }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "AI service error. Please try again or contact us directly." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      console.error("No response content from AI");
      return new Response(
        JSON.stringify({ error: "No response from AI" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("AI response received successfully");

    return new Response(
      JSON.stringify({ message: assistantMessage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Something went wrong. Please try again or contact us at hyrx.aistudio@gmail.com" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
