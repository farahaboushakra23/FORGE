import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { WebSocketServer, WebSocket } from "ws";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Document content templates incorporating PDF content & custom enhancements
const DEFAULT_DOCUMENTS: Record<string, { title: string; content: string; category: string }> = {
  "lead-generation-plan": {
    title: "Forge Outsourcing Solutions - Strategic Lead Generation & Tele-Sales Brief",
    category: "Lead Generation",
    content: `# FORGE OUTSOURCING SOLUTIONS
## Strategic Lead Generation & Tele-Sales Brief
**Tagline:** Your Vision, Our Expertise; Together we Forge
**Motto:** Forge is a System Builder, A People Manager & A Problem Solver.

### 1. Executive Summary & Core Promises
At Forge Outsourcing Solutions, we deliver transformative services designed to help your business grow and thrive. We are dedicated to empowering businesses across the globe through our specialized Business Process Outsourcing (BPO) services. Our expertise assists partners in scaling their operations, expanding their teams, and enhancing their sales funnels by providing highly skilled professionals with industry-specific backgrounds.

**Our Unwavering Promises:**
*   To redefine success.
*   To drive outcomes that shape the future.
*   To craft innovative solutions that exceed expectations.

---

### 2. Lead Generation & Sales Team Structure
Our sales acceleration unit deploys dedicated, highly trained professionals.
*   **Tele-sales & Outbound Campaign Specialists:** Armed with deep psychological training to convert cold opportunities into hot customers.
*   **Appointment Setting Team:** Responsible for filling your high-value sales calendars with pre-qualified decision-makers.
*   **Business Development Representatives (BDRs):** Top-tier strategic pros specializing in enterprise sales and account mapping.
*   **Sales Support Assistants:** Managing your back-office documentation, CRM cleansing, and collateral distribution so your closers can focus purely on closing.

---

### 3. Industry Specific Strategies (Enhancements)
We provide custom outreach models tailored to the unique regulatory and operational needs of the sectors we serve:
1.  **Real Estate:** High-velocity cold calling for listing acquisition, database farming, and inbound lead qualification.
2.  **Insurance:** Multi-line outreach and schedule-building for commercial and personal policy agents.
3.  **Finance:** Compliance-centric lead qualification targeting high-net-worth individuals and corporate financial directors.
4.  **Technology:** Technical BDRs handling SaaS demo scheduling, corporate gatekeeper navigation, and product value articulation.
5.  **Healthcare:** Patient intake scheduling, credential verification support, and HIPAA-compliant outreach.
6.  **Education & Retail/E-Commerce:** Admissions outbound pipelines and transactional customer assistance.

---

### 4. Advanced Technology & Dialer Configuration
We empower our agents using a world-class technology stack:
*   **High-Volume Dialer Systems:** Multi-line predictive and progressive dialing systems designed to maximize agent talk-time and eliminate silence intervals.
*   **CRM Integration:** Real-time seamless synchronization with Salesforce, Hubspot, Zoho, and custom proprietary platforms.
*   **Advanced Noise Cancellation:** Crystal-clear acoustic quality systems ensuring distraction-free environments for both prospects and agents.
*   **Monitoring & Live Dashboarding:** Multi-tiered reporting tools giving managers and clients 100% transparency into daily KPIs, contact rates, and conversion metrics.`
  },
  "customer-service-sla": {
    title: "Forge Outsourcing - Inbound & Outbound Customer Service SLA Agreement",
    category: "Customer Service",
    content: `# FORGE OUTSOURCING SOLUTIONS
## Inbound & Outbound Customer Service SLA Agreement
**Tagline:** Your Vision, Our Expertise; Together we Forge

### 1. Our Mission for Customer Support
At Forge, we believe that exceptional customer service is a primary driver of retention and lifetime value. We are dedicated to empowering businesses across the globe through our specialized Business Process Outsourcing (BPO) services. By offering a talented, empathetic workforce, we enable seamless integration with businesses in any sector, ensuring tailored solutions that drive success.

---

### 2. Core Operational Scope
Our Customer Care teams are structured to support both proactive outbound outreach and rapid inbound response:
*   **Inbound Support:** 24/7 technical helpdesk, customer billing assistance, and general inquiry handling.
*   **Outbound Support:** Proactive check-ins, customer onboarding sequences, contract renewals, and feedback loops.
*   **Multichannel Coverage:** Seamless routing of communications across Voice, Live Chat, Email, SMS, and Social Media channels.

---

### 3. Performance Level Targets (Enhancements)
To ensure we exceed expectations, our teams commit to the following performance benchmarks:
1.  **First Response Time (FRT):** Live Chat inquiries answered within 45 seconds; emails responded to within 2 hours.
2.  **Average Handle Time (AHT):** Maintained under 4 minutes, ensuring thorough problem resolution without sacrificing conversational quality.
3.  **First Contact Resolution (FCR):** Target of 82% or higher for tier-1 support scenarios.
4.  **Customer Satisfaction (CSAT):** Striving for an average score of 95% or greater on post-call surveys.

---

### 4. Talent Selection, Training & Quality Systems
Our approach guarantees your brand is represented by the absolute best:
*   **Talent Selection & Training:** Industry-specific hiring criteria followed by rigorous communication coaching and mock simulation reviews.
*   **Noise Cancellation & Quality Systems:** Real-time AI noise cancellation tools applied directly to headsets, paired with randomized call audits by our Quality Assurance Supervisors.
*   **Compliance & Security:** Solid end-to-end encryption protocols, secure VPN terminals, and PCI-DSS compliance for payment handling.`
  },
  "bdr-team-playbook": {
    title: "Forge Outsourcing - Enterprise BDR Team Deployment Playbook",
    category: "BDR & Strategy",
    content: `# FORGE OUTSOURCING SOLUTIONS
## Enterprise BDR Team Deployment Playbook
**Tagline:** Your Vision, Our Expertise; Together we Forge

### 1. The Forge Advantage
Why choose Forge for your high-value Enterprise BDR campaigns?
*   **Proven Track Record:** Years of validated performance driving high-ticket outbound pipeline growth.
*   **Experienced Professionals:** Recruited from mature sales ecosystems with strong communication competence.
*   **Advanced Technology:** Incorporating high-volume dialers, advanced CRM tools, and real-time conversation intelligences.
*   **Client-Centric Approach:** Adaptive feedback loops designed around your specific pipeline milestones.
*   **Competitive Pricing:** Scaling options that optimize your acquisition cost (CAC) and deliver superior return on investment.

---

### 2. BDR Outbound Outreach Cadence (Enhancements)
Our Enterprise Business Development Representatives (BDRs) execute a disciplined multi-channel touch sequence over 18 days:
*   **Day 1:** Highly targeted LinkedIn connection request with custom-tailored intro note.
*   **Day 2:** High-value personalized email demonstrating an understanding of the prospect's pain point.
*   **Day 4:** First strategic cold call with customized talk tracks focused on setting a brief 15-minute alignment chat.
*   **Day 7:** Secondary email sharing an industry-specific case study highlighting quantitative ROI.
*   **Day 10:** Multi-channel touch: brief LinkedIn message following up on the email + afternoon phone call.
*   **Day 15:** Direct video message (Loom/Vimeo) walking through a specific, visual workflow improvement.
*   **Day 18:** Friendly "break-up" email, leaving the door open for future collaboration.

---

### 3. Escalation, Scalability & Reporting Systems
*   **Scalability:** Instantly scale from a pilot of 2 BDRs to a comprehensive division of 25+ representatives within 14 business days.
*   **CRM Integration & Hygiene:** Automated call logging, transcription analysis, and pipeline stage mapping.
*   **Daily Syncs & Monitoring:** Client portals provide daily recordings of booked demos, call success ratios, and outbound volume trends.`
  }
};

// Keep current document states in server memory (Last-Write-Wins source of truth)
const documents = new Map<string, string>();
Object.entries(DEFAULT_DOCUMENTS).forEach(([id, doc]) => {
  documents.set(id, doc.content);
});

// Manage active live collaborative edit rooms
interface ActiveUser {
  socketId: string;
  username: string;
  color: string;
  cursorIndex?: number;
}
const documentRooms = new Map<string, Map<string, ActiveUser>>();

// Chat log store for rooms
const chatLogs = new Map<string, Array<{ id: string; sender: string; message: string; timestamp: string; system?: boolean }>>();

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const PORT = 3000;

  app.use(express.json());

  // Setup Gemini SDK if API Key is present
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  // --- API Routes ---

  // Get list of collaborative documents
  app.get("/api/documents", (req, res) => {
    const list = Object.entries(DEFAULT_DOCUMENTS).map(([id, doc]) => ({
      id,
      title: doc.title,
      category: doc.category,
      snippet: (documents.get(id) || "").slice(0, 150) + "..."
    }));
    res.json(list);
  });

  // Get current document content
  app.get("/api/documents/:id", (req, res) => {
    const id = req.params.id;
    if (documents.has(id)) {
      res.json({
        id,
        title: DEFAULT_DOCUMENTS[id]?.title || "Untitled Document",
        content: documents.get(id)
      });
    } else {
      res.status(404).json({ error: "Document not found" });
    }
  });

  // Reset all documents to default states
  app.post("/api/documents/reset", (req, res) => {
    Object.entries(DEFAULT_DOCUMENTS).forEach(([id, doc]) => {
      documents.set(id, doc.content);
    });
    // Broadcast reset to all rooms
    documentRooms.forEach((usersMap, roomId) => {
      const content = documents.get(roomId) || "";
      usersMap.forEach((user) => {
        // Find corresponding client and send
      });
    });
    res.json({ success: true, message: "Documents restored to default templates." });
  });

  // AI Co-writer / Suggestion generator using Gemini
  app.post("/api/gemini/co-write", async (req, res) => {
    const { documentId, currentText, prompt, cursorIndex } = req.body;
    
    if (!ai) {
      return res.status(503).json({ 
        error: "Gemini API is currently not configured. Please add a GEMINI_API_KEY under Secrets." 
      });
    }

    try {
      const systemPrompt = `You are "Forge AI Partner", a brilliant BPO consultant, sales strategist, and expert technical writer at Forge Outsourcing Solutions.
The user wants you to collaboratively edit, improve, or add text to their proposal document.
Current Document Text:
"""
${currentText}
"""

The user's specific instruction/prompt is: "${prompt}"

Return ONLY the proposed addition, edit, or next paragraph to insert at the cursor. Do NOT write conversational intros like "Sure, here is what you requested:" or out-of-character chat. Act as if you are a live human collaborator typing the text block directly into the document editor. Focus heavily on professional, bright, clear language sticking to the PDF services (Tele-sales, Appointment Setting, Inbound/Outbound Customer Service, Lead Generation, Sales Support, BDRs) and adding highly professional enhancements from your head. Include crisp bullet points or sub-sections where appropriate. Keep it to a concise 1-3 highly descriptive paragraphs.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: systemPrompt,
      });

      const text = response.text || "";
      res.json({ text });
    } catch (err: any) {
      console.error("Gemini Co-write error:", err);
      res.status(500).json({ error: err.message || "Failed to generate suggestions" });
    }
  });

  // --- WebSocket Server for Real-Time Sync ---
  const wss = new WebSocketServer({ noServer: true });

  server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  });

  let socketIdCounter = 0;

  wss.on("connection", (ws: WebSocket) => {
    const socketId = `user_${++socketIdCounter}`;
    let currentRoomId = "";

    // Broadcast update helper
    const broadcastToRoom = (roomId: string, message: any, excludeSocketId?: string) => {
      const roomUsers = documentRooms.get(roomId);
      if (!roomUsers) return;

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          // Find matching user session
          roomUsers.forEach((user, sId) => {
            if (excludeSocketId && sId === excludeSocketId) return;
            // Check if client is this user
            // In a simple server, we can broadcast to anyone connected who joined this room
          });
        }
      });

      // Simple implementation: send to everyone in the room
      roomUsers.forEach((user, sId) => {
        if (excludeSocketId && sId === excludeSocketId) return;
        // Search in active ws clients
      });
    };

    // Keep map of socket to user details
    let userDetails: ActiveUser | null = null;

    ws.on("message", (messageStr: string) => {
      try {
        const data = JSON.parse(messageStr);
        const { type, roomId, payload } = data;

        if (type === "join") {
          currentRoomId = roomId;
          
          if (!documentRooms.has(roomId)) {
            documentRooms.set(roomId, new Map());
          }
          if (!chatLogs.has(roomId)) {
            chatLogs.set(roomId, []);
          }

          const roomUsers = documentRooms.get(roomId)!;
          
          userDetails = {
            socketId,
            username: payload.username || `Partner #${socketIdCounter}`,
            color: payload.color || "#4CAF50",
            cursorIndex: payload.cursorIndex || 0
          };

          roomUsers.set(socketId, userDetails);

          // Store custom ws metadata on the object to simplify targeted broadcasts
          (ws as any).roomId = roomId;
          (ws as any).socketId = socketId;

          // Send current document content to the newly joined client
          const currentContent = documents.get(roomId) || "";
          const history = chatLogs.get(roomId) || [];

          ws.send(JSON.stringify({
            type: "init",
            payload: {
              content: currentContent,
              users: Array.from(roomUsers.values()),
              chatHistory: history,
              socketId
            }
          }));

          // Notify others in room
          const joinAlert = {
            id: `sys_${Date.now()}`,
            sender: "System",
            message: `${userDetails.username} joined the workspace.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            system: true
          };
          chatLogs.get(roomId)?.push(joinAlert);

          // Broadcast user joined & system chat message to all other room members
          wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN && (client as any).roomId === roomId) {
              client.send(JSON.stringify({
                type: "user-joined",
                payload: {
                  user: userDetails,
                  users: Array.from(roomUsers.values()),
                  chatMessage: joinAlert
                }
              }));
            }
          });
        }

        else if (type === "edit") {
          if (!currentRoomId) return;
          const { content, cursorIndex } = payload;
          
          // Last-Write-Wins: update server cache
          documents.set(currentRoomId, content);

          // Update editor cursor location
          if (userDetails) {
            userDetails.cursorIndex = cursorIndex;
            const roomUsers = documentRooms.get(currentRoomId);
            if (roomUsers) {
              roomUsers.set(socketId, userDetails);
            }
          }

          // Broadcast edit delta to others in the room
          wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN && (client as any).roomId === currentRoomId) {
              client.send(JSON.stringify({
                type: "document-updated",
                payload: {
                  content,
                  senderSocketId: socketId,
                  senderUsername: userDetails?.username || "Collaborator",
                  senderColor: userDetails?.color || "#9c27b0",
                  cursorIndex
                }
              }));
            }
          });
        }

        else if (type === "cursor") {
          if (!currentRoomId || !userDetails) return;
          const { cursorIndex } = payload;
          userDetails.cursorIndex = cursorIndex;

          const roomUsers = documentRooms.get(currentRoomId);
          if (roomUsers) {
            roomUsers.set(socketId, userDetails);
          }

          // Broadcast cursor position update to others
          wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN && (client as any).roomId === currentRoomId) {
              client.send(JSON.stringify({
                type: "cursor-updated",
                payload: {
                  socketId,
                  cursorIndex,
                  username: userDetails?.username,
                  color: userDetails?.color
                }
              }));
            }
          });
        }

        else if (type === "chat") {
          if (!currentRoomId || !userDetails) return;
          const { message } = payload;
          
          const chatMsg = {
            id: `chat_${Date.now()}`,
            sender: userDetails.username,
            message,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            system: false
          };

          chatLogs.get(currentRoomId)?.push(chatMsg);

          // Broadcast chat to everyone in the room
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN && (client as any).roomId === currentRoomId) {
              client.send(JSON.stringify({
                type: "chat-message",
                payload: chatMsg
              }));
            }
          });
        }

        else if (type === "ai-write-stream") {
          if (!currentRoomId || !userDetails) return;
          const { aiText, targetIndex } = payload;

          // Let's insert the AI text into the server's cache
          const original = documents.get(currentRoomId) || "";
          const idx = typeof targetIndex === "number" ? targetIndex : original.length;
          const updatedContent = original.slice(0, idx) + aiText + original.slice(idx);
          documents.set(currentRoomId, updatedContent);

          const aiLog = {
            id: `ai_${Date.now()}`,
            sender: "Forge AI Partner",
            message: `Collaborative AI generated a section: "${aiText.slice(0, 40)}..."`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            system: true
          };
          chatLogs.get(currentRoomId)?.push(aiLog);

          // Broadcast to everyone in the room so all clients sync the new text
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN && (client as any).roomId === currentRoomId) {
              client.send(JSON.stringify({
                type: "ai-text-inserted",
                payload: {
                  content: updatedContent,
                  aiText,
                  targetIndex: idx,
                  chatMessage: aiLog
                }
              }));
            }
          });
        }

      } catch (err) {
        console.error("WebSocket message parsing error:", err);
      }
    });

    ws.on("close", () => {
      if (currentRoomId && documentRooms.has(currentRoomId)) {
        const roomUsers = documentRooms.get(currentRoomId)!;
        roomUsers.delete(socketId);

        if (userDetails) {
          const leaveAlert = {
            id: `sys_${Date.now()}`,
            sender: "System",
            message: `${userDetails.username} left the workspace.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            system: true
          };
          chatLogs.get(currentRoomId)?.push(leaveAlert);

          // Broadcast user left to others
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN && (client as any).roomId === currentRoomId) {
              client.send(JSON.stringify({
                type: "user-left",
                payload: {
                  socketId,
                  users: Array.from(roomUsers.values()),
                  chatMessage: leaveAlert
                }
              }));
            }
          });
        }

        if (roomUsers.size === 0) {
          documentRooms.delete(currentRoomId);
        }
      }
    });
  });

  // Serve Vite in development mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`[Forge Server] Running on http://localhost:${PORT}`);
    console.log(`[Forge Server] WebSockets attached dynamically to HTTP.`);
  });
}

startServer();
