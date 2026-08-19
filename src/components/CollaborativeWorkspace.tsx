import React, { useState, useEffect, useRef } from "react";
import { 
  Users, 
  MessageSquare, 
  Sparkles, 
  RefreshCw, 
  Download, 
  SplitSquareVertical, 
  Columns,
  Play, 
  Pause, 
  Check, 
  AlertCircle,
  Clock,
  Send,
  Plus,
  FileText,
  Trash2,
  ChevronRight,
  HelpCircle
} from "lucide-react";
import { ActiveUser, ChatMessage, DocumentMeta } from "../types";

// Nice pastel colors for collaborators
const COLLABORATOR_COLORS = [
  "#2E7D32", // Mint Green
  "#E65100", // Peach
  "#6A1B9A", // Lavender
  "#1565C0", // Sky Blue
  "#C2185B", // Rose
  "#00838F"  // Teal
];

const COLLABORATOR_NAMES = [
  "Sarah Miller (Forge QA Lead)",
  "Marcus Chen (BPO Specialist)",
  "Emma Thompson (Client Success)",
  "David Park (Sales Director)",
  "Lucas Brown (Outbound Lead)"
];

export default function CollaborativeWorkspace() {
  // Join Form State
  const [hasJoined, setHasJoined] = useState(false);
  const [username, setUsername] = useState("Client Partner");
  const [userColor, setUserColor] = useState(COLLABORATOR_COLORS[0]);

  // Split-Screen Simulator Mode
  const [isSplitMode, setIsSplitMode] = useState(false);
  const [secondaryUsername, setSecondaryUsername] = useState("Marcus Chen (BPO Specialist)");
  const [secondaryColor, setSecondaryColor] = useState(COLLABORATOR_COLORS[1]);

  // Documents List State
  const [documents, setDocuments] = useState<DocumentMeta[]>([]);
  const [selectedDocId, setSelectedDocId] = useState("lead-generation-plan");
  const [isLoadingDocs, setIsLoadingDocs] = useState(true);

  // --- Connection 1 (Primary Client) State ---
  const [primaryContent, setPrimaryContent] = useState("");
  const [primaryTitle, setPrimaryTitle] = useState("");
  const [primaryUsers, setPrimaryUsers] = useState<ActiveUser[]>([]);
  const [primaryChat, setPrimaryChat] = useState<ChatMessage[]>([]);
  const [primarySocketId, setPrimarySocketId] = useState("");
  const [primaryConnected, setPrimaryConnected] = useState(false);
  const [primaryChatInput, setPrimaryChatInput] = useState("");

  // --- Connection 2 (Secondary Client) State ---
  const [secondaryContent, setSecondaryContent] = useState("");
  const [secondaryUsers, setSecondaryUsers] = useState<ActiveUser[]>([]);
  const [secondaryConnected, setSecondaryConnected] = useState(false);
  const [secondarySocketId, setSecondarySocketId] = useState("");
  const [secondaryChatInput, setSecondaryChatInput] = useState("");

  // --- AI Co-Pilot State ---
  const [aiPrompt, setAiPrompt] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // References for WebSockets
  const primaryWsRef = useRef<WebSocket | null>(null);
  const secondaryWsRef = useRef<WebSocket | null>(null);

  // Editor selection trackers (for multiplayer cursors)
  const primaryTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const secondaryTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto scroll chat refs
  const primaryChatEndRef = useRef<HTMLDivElement | null>(null);
  const secondaryChatEndRef = useRef<HTMLDivElement | null>(null);

  // Fetch available BPO SLA documents on mount
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setIsLoadingDocs(true);
      const res = await fetch("/api/documents");
      if (res.ok) {
        const data = await res.json();
        setDocuments(data);
      }
    } catch (err) {
      console.error("Error fetching SLA documents:", err);
    } finally {
      setIsLoadingDocs(false);
    }
  };

  // --- Primary WebSocket Management ---
  useEffect(() => {
    if (!hasJoined) return;

    const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${wsProtocol}//${window.location.host}`;
    
    // Connect primary client
    const pSocket = new WebSocket(wsUrl);
    primaryWsRef.current = pSocket;

    pSocket.onopen = () => {
      setPrimaryConnected(true);
      // Join the selected document room
      pSocket.send(JSON.stringify({
        type: "join",
        roomId: selectedDocId,
        payload: { username, color: userColor }
      }));
    };

    pSocket.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        const { type, payload } = msg;

        if (type === "init") {
          setPrimaryContent(payload.content);
          setPrimaryUsers(payload.users);
          setPrimaryChat(payload.chatHistory);
          setPrimarySocketId(payload.socketId);
        } 
        else if (type === "document-updated") {
          setPrimaryContent(payload.content);
          // Highlight other user active cursor location on change if needed
        } 
        else if (type === "user-joined") {
          setPrimaryUsers(payload.users);
          if (payload.chatMessage) {
            setPrimaryChat((prev) => [...prev, payload.chatMessage]);
          }
        } 
        else if (type === "user-left") {
          setPrimaryUsers(payload.users);
          if (payload.chatMessage) {
            setPrimaryChat((prev) => [...prev, payload.chatMessage]);
          }
        } 
        else if (type === "cursor-updated") {
          setPrimaryUsers((prev) => 
            prev.map((u) => u.socketId === payload.socketId ? { ...u, cursorIndex: payload.cursorIndex } : u)
          );
        } 
        else if (type === "chat-message") {
          setPrimaryChat((prev) => [...prev, payload]);
        }
        else if (type === "ai-text-inserted") {
          setPrimaryContent(payload.content);
          if (payload.chatMessage) {
            setPrimaryChat((prev) => [...prev, payload.chatMessage]);
          }
        }
      } catch (err) {
        console.error("Error parsing primary WS message:", err);
      }
    };

    pSocket.onclose = () => {
      setPrimaryConnected(false);
    };

    return () => {
      if (pSocket.readyState === WebSocket.OPEN || pSocket.readyState === WebSocket.CONNECTING) {
        pSocket.close();
      }
    };
  }, [hasJoined, selectedDocId, username, userColor]);


  // --- Secondary WebSocket Management (Split-Screen Simulation) ---
  useEffect(() => {
    if (!hasJoined || !isSplitMode) {
      if (secondaryWsRef.current) {
        secondaryWsRef.current.close();
        secondaryWsRef.current = null;
      }
      setSecondaryConnected(false);
      return;
    }

    const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${wsProtocol}//${window.location.host}`;
    
    // Connect secondary client
    const sSocket = new WebSocket(wsUrl);
    secondaryWsRef.current = sSocket;

    sSocket.onopen = () => {
      setSecondaryConnected(true);
      // Join the SAME selected document room as another user
      sSocket.send(JSON.stringify({
        type: "join",
        roomId: selectedDocId,
        payload: { username: secondaryUsername, color: secondaryColor }
      }));
    };

    sSocket.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        const { type, payload } = msg;

        if (type === "init") {
          setSecondaryContent(payload.content);
          setSecondaryUsers(payload.users);
          setSecondarySocketId(payload.socketId);
        } 
        else if (type === "document-updated") {
          setSecondaryContent(payload.content);
        } 
        else if (type === "user-joined") {
          setSecondaryUsers(payload.users);
        } 
        else if (type === "user-left") {
          setSecondaryUsers(payload.users);
        } 
        else if (type === "ai-text-inserted") {
          setSecondaryContent(payload.content);
        }
      } catch (err) {
        console.error("Error parsing secondary WS message:", err);
      }
    };

    sSocket.onclose = () => {
      setSecondaryConnected(false);
    };

    return () => {
      if (sSocket.readyState === WebSocket.OPEN || sSocket.readyState === WebSocket.CONNECTING) {
        sSocket.close();
      }
    };
  }, [hasJoined, isSplitMode, selectedDocId, secondaryUsername, secondaryColor]);


  // --- Auto scroll chat logs ---
  useEffect(() => {
    primaryChatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [primaryChat]);


  // --- Primary Edit Handler ---
  const handlePrimaryEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const cursor = e.target.selectionStart;
    setPrimaryContent(text);

    if (primaryWsRef.current && primaryWsRef.current.readyState === WebSocket.OPEN) {
      primaryWsRef.current.send(JSON.stringify({
        type: "edit",
        roomId: selectedDocId,
        payload: { content: text, cursorIndex: cursor }
      }));
    }
  };

  // --- Primary Cursor Movement Handler ---
  const handlePrimaryCursor = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const cursor = (e.target as HTMLTextAreaElement).selectionStart;
    if (primaryWsRef.current && primaryWsRef.current.readyState === WebSocket.OPEN) {
      primaryWsRef.current.send(JSON.stringify({
        type: "cursor",
        roomId: selectedDocId,
        payload: { cursorIndex: cursor }
      }));
    }
  };

  // --- Secondary Edit Handler (Split Mode) ---
  const handleSecondaryEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const cursor = e.target.selectionStart;
    setSecondaryContent(text);

    if (secondaryWsRef.current && secondaryWsRef.current.readyState === WebSocket.OPEN) {
      secondaryWsRef.current.send(JSON.stringify({
        type: "edit",
        roomId: selectedDocId,
        payload: { content: text, cursorIndex: cursor }
      }));
    }
  };

  // --- Chat Message Sending (Primary) ---
  const sendPrimaryChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!primaryChatInput.trim()) return;

    if (primaryWsRef.current && primaryWsRef.current.readyState === WebSocket.OPEN) {
      primaryWsRef.current.send(JSON.stringify({
        type: "chat",
        roomId: selectedDocId,
        payload: { message: primaryChatInput }
      }));
      setPrimaryChatInput("");
    }
  };

  // --- Restores Default PDF Templates on Server ---
  const handleResetDocument = async () => {
    if (!confirm("Are you sure you want to restore the default PDF templates? This will overwrite active live edits.")) return;
    try {
      const res = await fetch("/api/documents/reset", { method: "POST" });
      if (res.ok) {
        // Trigger reload on current document by sending empty edit or forcing state update
        alert("SLA templates successfully restored on server. Live rooms updated.");
        // Simply re-join document room
        if (primaryWsRef.current && primaryWsRef.current.readyState === WebSocket.OPEN) {
          primaryWsRef.current.send(JSON.stringify({
            type: "join",
            roomId: selectedDocId,
            payload: { username, color: userColor }
          }));
        }
      }
    } catch (err) {
      console.error("Failed to reset:", err);
    }
  };

  // --- Gemini AI Co-Writer Copilot trigger ---
  const triggerAiCoWriter = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsAiGenerating(true);
    setAiError(null);

    try {
      // Find where current selection cursor is located
      const cursorIdx = primaryTextareaRef.current?.selectionStart || primaryContent.length;

      const response = await fetch("/api/gemini/co-write", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId: selectedDocId,
          currentText: primaryContent,
          prompt: aiPrompt,
          cursorIndex: cursorIdx
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Generation error");
      }

      const data = await response.json();
      const generatedText = "\n\n" + data.text + "\n";

      // Insert AI suggestion over WebSockets
      if (primaryWsRef.current && primaryWsRef.current.readyState === WebSocket.OPEN) {
        primaryWsRef.current.send(JSON.stringify({
          type: "ai-write-stream",
          roomId: selectedDocId,
          payload: {
            aiText: generatedText,
            targetIndex: cursorIdx
          }
        }));
      }

      setAiPrompt("");
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || "Failed to trigger AI Co-Writer. Please confirm your API Key is stored in Secrets.");
    } finally {
      setIsAiGenerating(false);
    }
  };

  // --- Export Document ---
  const handleExportMarkdown = () => {
    const activeDoc = documents.find(d => d.id === selectedDocId);
    const title = activeDoc ? activeDoc.title : "Forge-Outsourcing-Proposal";
    const blob = new Blob([primaryContent], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- Helper to render cursors visually ---
  const getCollaboratorCursorPercentage = (cursorIdx?: number) => {
    if (typeof cursorIdx !== "number" || !primaryContent) return 0;
    return Math.min(100, Math.floor((cursorIdx / primaryContent.length) * 100));
  };


  // --- 1. Join Screen (Pastel Aesthetics) ---
  if (!hasJoined) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12">
        <div className="rounded-3xl border border-purple-100 bg-white/70 backdrop-blur-md p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-emerald-200 via-purple-200 to-purple-200" />
          
          <div className="text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-800 border border-purple-100">
              <Users className="h-6 w-6 stroke-[2]" />
            </div>
            <h2 className="font-display text-2xl font-black text-slate-900">
              Outsourcing Workspace Studio
            </h2>
            <p className="text-xs text-slate-500 font-semibold max-w-sm mx-auto leading-relaxed">
              Enter the live document hub to collaboratively refine, draft, and finalize service contracts for Forge Outsourcing Solutions.
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setHasJoined(true); }} className="mt-8 space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Your Full Name / Client ID
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:border-purple-300 focus:bg-white focus:outline-hidden transition-all shadow-2xs"
                placeholder="Your Name / Client ID"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Pick Collaborative ID Color (Pastel Theme)
              </label>
              <div className="flex flex-wrap gap-3 justify-center">
                {COLLABORATOR_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setUserColor(color)}
                    style={{ backgroundColor: color }}
                    className={`h-8 w-8 rounded-full border-4 transition-all hover:scale-110 ${
                      userColor === color ? "border-slate-800 scale-105" : "border-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>



            <button
              type="submit"
              className="w-full rounded-2xl bg-slate-950 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-slate-800 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
            >
              Enter Collaborative Hub
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- 2. Live Workspace Studio Layout ---
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 px-4 pb-12 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* LEFT COLUMN: Strategic Documents Select */}
      <div className="space-y-6 lg:col-span-1">
        
        {/* Document Selection List */}
        <div className="rounded-3xl border border-purple-100 bg-white/70 backdrop-blur-md p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-purple-800" />
              <h3 className="font-display text-sm font-black text-black">
                SLA Contracts
              </h3>
            </div>
            <button
              onClick={fetchDocuments}
              className="text-black hover:text-purple-950 transition-colors"
              title="Refresh templates"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>

          {isLoadingDocs ? (
            <div className="py-8 text-center text-xs text-black font-black animate-pulse">
              Loading BPO templates...
            </div>
          ) : (
            <div className="space-y-2">
              {documents.map((doc) => {
                const isSelected = selectedDocId === doc.id;
                return (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDocId(doc.id)}
                    className={`w-full text-left rounded-xl p-3 border transition-all flex items-start gap-2.5 cursor-pointer ${
                      isSelected
                        ? "bg-purple-50/70 border-purple-200/80 text-purple-900"
                        : "border-slate-100 bg-slate-50/30 text-black hover:bg-slate-50"
                    }`}
                  >
                    <div className={`mt-1 flex h-2 w-2 rounded-full ${isSelected ? "bg-purple-600" : "bg-slate-350"}`} />
                    <div className="space-y-1">
                      <p className="text-xs font-black leading-tight text-black">
                        {doc.title.replace("Forge Outsourcing Solutions - ", "").replace("Forge Outsourcing - ", "")}
                      </p>
                      <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-purple-900/60">
                        {doc.category}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between">
            <button
              onClick={handleResetDocument}
              className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-rose-700 hover:text-rose-900 transition-colors"
            >
              <Trash2 className="h-3 w-3" />
              Reset Templates
            </button>
          </div>
        </div>

        {/* Presence Hub / Online Users in Document */}
        <div className="rounded-3xl border border-purple-100 bg-white/70 backdrop-blur-md p-5 shadow-xs">
          <div className="flex items-center gap-1.5 mb-4 border-b border-slate-100 pb-3">
            <Users className="h-4 w-4 text-purple-800" />
            <h3 className="font-display text-sm font-black text-black">
              Active Collaborators
            </h3>
          </div>

          <div className="space-y-3">
            {primaryUsers.map((user) => (
              <div key={user.socketId} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: user.color }}
                  />
                  <span className="text-xs font-bold text-black">
                    {user.username} {user.socketId === primarySocketId ? "(You)" : ""}
                  </span>
                </div>
                {user.cursorIndex && user.cursorIndex > 0 ? (
                  <span className="font-mono text-[9px] text-purple-900/60 font-bold">
                    Cursor: {getCollaboratorCursorPercentage(user.cursorIndex)}%
                  </span>
                ) : null}
              </div>
            ))}
            
            {primaryUsers.length <= 1 && !isSplitMode && (
              <p className="text-[11px] text-purple-900/60 font-bold leading-relaxed">
                No active external readers. Copy this browser link into a separate tab to watch real-time syncing!
              </p>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
            {/* Split Screen Simulated Dual Connection switch */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black text-black block">
                  Simulate Dual Connection
                </span>
                <span className="text-[9px] text-purple-900/60 block font-bold">
                  Connect 2 sockets side-by-side
                </span>
              </div>
              <button
                onClick={() => setIsSplitMode(!isSplitMode)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-hidden ${
                  isSplitMode ? "bg-purple-600" : "bg-slate-200"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ${
                    isSplitMode ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {isSplitMode && (
              <div className="space-y-3 p-3 rounded-xl bg-purple-50/20 border border-purple-100/50 animate-scale-up">
                <div>
                  <label className="block text-[10px] font-bold text-black uppercase mb-1">
                    Collaborator B Name
                  </label>
                  <input
                    type="text"
                    value={secondaryUsername}
                    onChange={(e) => setSecondaryUsername(e.target.value)}
                    className="w-full rounded-lg border border-purple-200 bg-white px-2 py-1 text-xs font-semibold text-black"
                  />
                </div>
                <div className="flex items-center gap-2 text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-1 rounded-md">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  Socket #2 Active & Listening
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* MIDDLE COLUMN: Text Editor(s) */}
      <div className={`space-y-6 ${isSplitMode ? "lg:col-span-2" : "lg:col-span-2"}`}>
        
        {/* Document Editor Layout */}
        <div className="rounded-3xl border border-purple-100 bg-white/70 backdrop-blur-md p-5 shadow-xs space-y-4">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-purple-800 border border-purple-100">
                Live Collaborative Editor (Workspace #1)
              </span>
              <h2 className="font-display text-md font-black text-black mt-1">
                {primaryTitle || "Loading strategy blueprint..."}
              </h2>
            </div>
            <button
              onClick={handleExportMarkdown}
              className="flex items-center gap-1 rounded-xl bg-white border border-purple-200 px-3 py-1.5 text-xs font-bold text-black hover:bg-purple-50 transition-all cursor-pointer shadow-2xs"
            >
              <Download className="h-3.5 w-3.5 text-purple-700" />
              Export .MD
            </button>
          </div>

          {/* Primary Collaborative Text Area */}
          <div className="relative">
            <textarea
              ref={primaryTextareaRef}
              value={primaryContent}
              onChange={handlePrimaryEdit}
              onSelect={handlePrimaryCursor}
              onKeyUp={handlePrimaryCursor}
              className="w-full min-h-[400px] rounded-2xl border border-purple-200/50 bg-white p-4 font-mono text-xs text-black leading-relaxed focus:border-purple-300 focus:outline-hidden transition-all shadow-inner focus:ring-3 focus:ring-purple-50"
              placeholder="Start collaborating..."
            />

            {/* Simulated Live Cursor Overlays for secondary connections */}
            {primaryUsers.map((user) => {
              if (user.socketId === primarySocketId || !user.cursorIndex) return null;
              const percent = getCollaboratorCursorPercentage(user.cursorIndex);
              return (
                <div
                  key={user.socketId}
                  className="absolute bottom-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full border animate-pulse pointer-events-none"
                  style={{ backgroundColor: `${user.color}15`, borderColor: user.color, color: user.color }}
                >
                  ✎ {user.username} (Editing)
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-[11px] text-purple-900/60 font-bold font-mono border-t border-slate-50 pt-3">
            <span>Length: {primaryContent.length} chars</span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Autosaved Live to Workspace
            </span>
          </div>
        </div>

        {/* Dynamic Secondary Editor in Split Screen Simulator Mode */}
        {isSplitMode && (
          <div className="rounded-3xl border border-purple-100 bg-white/70 backdrop-blur-md p-5 shadow-xs space-y-4 animate-scale-up">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-purple-800 border border-purple-100">
                  Dual Connect Client (Workspace #2)
                </span>
                <h2 className="font-display text-sm font-black text-black mt-1">
                  Viewing: {secondaryUsername}
                </h2>
              </div>
              <span className="text-[10px] font-mono text-purple-900/60 font-bold">
                Socket: {secondarySocketId}
              </span>
            </div>

            <textarea
              ref={secondaryTextareaRef}
              value={secondaryContent}
              onChange={handleSecondaryEdit}
              className="w-full min-h-[300px] rounded-2xl border border-purple-200 bg-purple-50/10 p-4 font-mono text-xs text-black leading-relaxed focus:border-purple-300 focus:outline-hidden transition-all shadow-inner focus:ring-3 focus:ring-purple-50"
              placeholder="Type here to watch client B update client A in real-time..."
            />

            <div className="flex justify-between items-center text-[10px] text-purple-900/60 font-mono font-bold">
              <span>Length: {secondaryContent.length} chars</span>
              <span className="text-purple-700 font-bold uppercase tracking-wider">
                ● Real Sync Active
              </span>
            </div>
          </div>
        )}

        {/* Collaborative AI Co-Pilot Block (Gemini 3.5-flash) */}
        <div className="rounded-3xl border border-indigo-100 bg-linear-to-br from-indigo-50/30 via-sky-50/10 to-transparent p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-indigo-100/50 pb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-100">
              <Sparkles className="h-4 w-4 stroke-[1.8] animate-pulse" />
            </div>
            <div>
              <h3 className="font-display text-sm font-black text-black">
                Forge AI Partner & Proposal Co-writer
              </h3>
              <p className="text-[10px] text-purple-900/60 font-bold">
                Powered by Gemini 3.5-flash • Smart strategy formulation
              </p>
            </div>
          </div>

          <p className="text-[11px] text-black leading-relaxed font-bold">
            Highlight text or write a content directive. Clicking "Collaborate with AI" triggers a background AI strategist that reviews the current SLA and inserts structured sections.
          </p>

          <div className="space-y-2">
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              className="w-full rounded-xl border border-indigo-100 bg-white p-3 text-xs font-semibold text-black placeholder-slate-400 focus:outline-hidden focus:border-indigo-300 shadow-2xs"
              placeholder="e.g. 'Add a customized, professional sales cold script for Technology BDR campaigns targeting healthcare prospects...'"
              rows={2}
            />

            {aiError && (
              <div className="flex items-start gap-2 rounded-xl bg-rose-50 border border-rose-100 p-3 text-xs text-rose-800 font-medium">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-700 mt-0.5" />
                <p>{aiError}</p>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                disabled={isAiGenerating || !aiPrompt.trim()}
                onClick={triggerAiCoWriter}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white transition-all shadow-md cursor-pointer ${
                  isAiGenerating || !aiPrompt.trim()
                    ? "bg-indigo-300 cursor-not-allowed"
                    : "bg-indigo-950 hover:bg-indigo-800 hover:scale-[1.01]"
                }`}
              >
                {isAiGenerating ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    AI is writing SLA...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5 text-purple-200" />
                    Collaborate with AI
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Chat & SLA Action Logs */}
      <div className="space-y-6 lg:col-span-1">
        
        {/* Workspace Chat Panel */}
        <div className="rounded-3xl border border-purple-100 bg-white/70 backdrop-blur-md p-5 shadow-xs flex flex-col h-[520px] justify-between">
          
          <div>
            <div className="flex items-center gap-1.5 border-b border-slate-100 pb-3 mb-3">
              <MessageSquare className="h-4 w-4 text-purple-800" />
              <h3 className="font-display text-sm font-black text-black">
                Workspace Chat & Logs
              </h3>
            </div>

            {/* Chat List Box */}
            <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1">
              {primaryChat.map((msg) => {
                if (msg.system) {
                  return (
                    <div key={msg.id} className="text-center py-1">
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-950 rounded-lg px-2 py-0.5">
                        {msg.message}
                      </span>
                    </div>
                  );
                }

                const isMe = msg.sender === username;
                return (
                  <div key={msg.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                    <span className="text-[10px] text-purple-900/60 font-bold mb-0.5">
                      {msg.sender} • {msg.timestamp}
                    </span>
                    <div className={`rounded-2xl px-3.5 py-2 text-xs font-semibold max-w-[90%] leading-relaxed ${
                      isMe 
                        ? "bg-purple-100 text-purple-950 rounded-tr-xs" 
                        : "bg-slate-100 text-black rounded-tl-xs"
                    }`}>
                      {msg.message}
                    </div>
                  </div>
                );
              })}
              <div ref={primaryChatEndRef} />
            </div>
          </div>

          {/* Chat Form */}
          <form onSubmit={sendPrimaryChat} className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={primaryChatInput}
              onChange={(e) => setPrimaryChatInput(e.target.value)}
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-black placeholder-slate-400 focus:outline-hidden focus:bg-white focus:border-purple-300 shadow-2xs"
              placeholder="Discuss document edits..."
            />
            <button
              type="submit"
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-950 text-white hover:bg-slate-850 cursor-pointer shadow-sm shrink-0"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
