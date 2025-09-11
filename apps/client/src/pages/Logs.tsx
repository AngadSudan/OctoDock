import { useEffect, useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Clock,
  AlertCircle,
  Info,
  AlertTriangle,
  XCircle,
  X,
  Copy,
} from "lucide-react";

const API_ENDPOINT = import.meta.env.VITE_BACKEND_URL + "/error/logs";

function Logs() {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedLog, setSelectedLog] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [sortBy, setSortBy] = useState("timestamp");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showFilters, setShowFilters] = useState(false);
  const [maximumPageNumer, setMaxPageNumer] = useState(0);
  const [itemsPerPage] = useState(20);

  useEffect(() => {
    const eventSource = new EventSource(
      API_ENDPOINT + "?page=" + encodeURIComponent(currentPage)
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.next) {
        setMaxPageNumer(Number.parseInt(data.next) || 0);
      }
      const logFiles = data.logs;
      setLogs([...logFiles]);
    };

    eventSource.onerror = (error) => {
      console.log("AN SSE ERROR OCCURED");
      console.dir(error);
    };

    return () => eventSource.close();
  }, []);

  // Filter and sort logs
  useEffect(() => {
    let filtered = [...logs];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (log) =>
          JSON.stringify(log.message)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          log.level.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply level filter
    if (selectedLevel !== "all") {
      filtered = filtered.filter((log) => log.level === selectedLevel);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;

      if (sortBy === "level") {
        aValue = a.level;
        bValue = b.level;
      } else if (sortBy === "timestamp") {
        aValue = a.timestamp || new Date().getTime();
        bValue = b.timestamp || new Date().getTime();
      } else {
        aValue = JSON.stringify(a.message);
        bValue = JSON.stringify(b.message);
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredLogs(filtered);
    setCurrentPage(0); // Reset to first page when filters change
  }, [logs, searchTerm, selectedLevel, sortBy, sortOrder]);

  // Get unique log levels for filter dropdown
  const logLevels = [...new Set(logs.map((log) => log.level))];

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLogs = filteredLogs.slice(startIndex, endIndex);

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const getLevelIcon = (level) => {
    switch (level.toLowerCase()) {
      case "error":
        return <XCircle className="w-4 h-4" />;
      case "warn":
      case "warning":
        return <AlertTriangle className="w-4 h-4" />;
      case "info":
        return <Info className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "error":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      case "warn":
      case "warning":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "info":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  const handleLogSelect = (log, index) => {
    setSelectedLog({ ...log, index });
  };

  const closeSidebar = () => {
    setSelectedLog(null);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 relative">
      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${selectedLog ? "mr-96" : ""} p-6`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse"></div>
              <h1 className="text-4xl font-mono font-bold text-white tracking-wider">
                <span className="text-red-400">[SYSTEM.LOGS]</span>
              </h1>
            </div>
            <div className="h-[2px] w-32 bg-gradient-to-r from-red-400 via-red-400/60 to-transparent"></div>
          </div>

          {/* Controls Panel */}
          <div
            className="mb-6 p-6 rounded-2xl backdrop-blur-xl border border-red-400/20"
            style={{
              background:
                "linear-gradient(145deg, rgba(0,0,0,0.8), rgba(15,23,42,0.6))",
              boxShadow:
                "0 16px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-end">
              {/* Search */}
              <div className="lg:col-span-2">
                <label className="block text-red-400/80 font-mono text-sm mb-2 tracking-wider">
                  [SEARCH.QUERY]
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400/60 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search logs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-red-400/30 text-white placeholder-gray-500 focus:border-red-400/60 focus:outline-none font-mono transition-all duration-300"
                  />
                </div>
              </div>

              {/* Level Filter */}
              <div>
                <label className="block text-red-400/80 font-mono text-sm mb-2 tracking-wider">
                  [LOG.LEVEL]
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full py-3 px-4 rounded-xl bg-black/50 border border-red-400/30 text-white focus:border-red-400/60 focus:outline-none font-mono transition-all duration-300"
                >
                  <option value="all">ALL LEVELS</option>
                  {logLevels.map((level) => (
                    <option key={level} value={level}>
                      {level.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Controls */}
              <div>
                <label className="block text-red-400/80 font-mono text-sm mb-2 tracking-wider">
                  [SORT.BY]
                </label>
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 py-3 px-3 rounded-xl bg-black/50 border border-red-400/30 text-white focus:border-red-400/60 focus:outline-none font-mono text-sm transition-all duration-300"
                  >
                    <option value="timestamp">TIME</option>
                    <option value="level">LEVEL</option>
                    <option value="message">MESSAGE</option>
                  </select>
                  <button
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                    className="px-3 py-3 rounded-xl bg-red-400/20 border border-red-400/30 text-red-400 hover:bg-red-400/30 transition-all duration-300 font-mono text-sm"
                  >
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-between">
              <div className="mt-4 pt-4 border-t w-fit  border-red-400/10 flex flex-wrap gap-6 text-sm font-mono">
                <div className="text-red-400/70">
                  TOTAL: <span className="text-white">{logs.length}</span>
                </div>
                <div className="text-red-400/70">
                  FILTERED:{" "}
                  <span className="text-white">{filteredLogs.length}</span>
                </div>
                <div className="text-red-400/70">
                  PAGE:{" "}
                  <span className="text-white">
                    {currentPage + 1}/{maximumPageNumer}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t w-fit border-red-400/10 flex flex-wrap gap-4 text-sm font-mono">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 0}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-400/20 border border-red-400/30 text-red-400 hover:bg-red-400/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-mono text-xs"
                >
                  <ChevronLeft className="w-3 h-3" />
                  PREV
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === maximumPageNumer}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-400/20 border border-red-400/30 text-red-400 hover:bg-red-400/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-mono text-xs"
                >
                  NEXT
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Logs Display */}
          <div
            className="space-y-3 p-4 overflow-y-auto max-h-[45svh] overflow-x-hidden"
            style={{
              scrollbarWidth: "none", // Hide the scrollbar for firefox
              // @ts-ignore
              "&::-webkit-scrollbar": {
                display: "none", // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
              },
              "&-ms-overflow-style:": {
                display: "none", // Hide the scrollbar for IE
              },
            }}
          >
            {currentLogs.length === 0 ? (
              <div
                className="text-center py-12 rounded-2xl border border-red-400/20"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(0,0,0,0.8), rgba(15,23,42,0.6))",
                }}
              >
                <AlertCircle className="w-12 h-12 text-red-400/60 mx-auto mb-4" />
                <p className="text-red-400/80 font-mono">NO LOGS FOUND</p>
                <p className="text-gray-500 font-mono text-sm mt-2">
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              currentLogs.map((log, index) => (
                <ParseMessageContent
                  key={log.id || startIndex + index}
                  message={log}
                  index={currentPage * itemsPerPage + index}
                  isSelected={selectedLog?.index === startIndex + index}
                  onSelect={() => handleLogSelect(log, startIndex + index)}
                  getLevelIcon={getLevelIcon}
                  getLevelColor={getLevelColor}
                />
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              className="mt-6 p-4 rounded-2xl backdrop-blur-xl border border-red-400/20 flex items-center justify-between"
              style={{
                background:
                  "linear-gradient(145deg, rgba(0,0,0,0.8), rgba(15,23,42,0.6))",
                boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
              }}
            >
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-400/20 border border-red-400/30 text-red-400 hover:bg-red-400/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-mono"
              >
                <ChevronLeft className="w-4 h-4" />
                PREV
              </button>

              <div className="flex items-center gap-2 text-red-400/80 font-mono">
                <span>
                  PAGE {currentPage + 1} OF {totalPages}
                </span>
                <div className="w-px h-4 bg-red-400/30 mx-2"></div>
                <span className="text-sm text-red-400/60">
                  SHOWING {startIndex + 1}-
                  {Math.min(endIndex, filteredLogs.length)} OF{" "}
                  {filteredLogs.length}
                </span>
              </div>

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages - 1}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-400/20 border border-red-400/30 text-red-400 hover:bg-red-400/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-mono"
              >
                NEXT
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar for Selected Log */}
      {selectedLog && (
        <div className="fixed top-0 right-0 h-full w-1/2 bg-gradient-to-b from-gray-950 via-black to-gray-950 border-l border-red-400/20 transform transition-transform duration-300 ease-in-out z-50">
          <div className="h-full flex flex-col">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-red-400/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-mono font-bold text-red-400 tracking-wider">
                  [LOG.DETAILS]
                </h2>
                <button
                  onClick={closeSidebar}
                  className="p-2 rounded-lg bg-red-400/20 border border-red-400/30 text-red-400 hover:bg-red-400/30 transition-all duration-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Log Level Badge */}
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border font-mono text-xs font-bold tracking-wider ${getLevelColor(selectedLog.level)}`}
              >
                {getLevelIcon(selectedLog.level)}
                {selectedLog.level.toUpperCase()}
              </div>
            </div>

            {/* Sidebar Content */}
            <div
              className="flex-1 p-6 overflow-y-auto"
              style={{
                scrollbarWidth: "none", // Hide the scrollbar for firefox
                // @ts-ignore
                "&::-webkit-scrollbar": {
                  display: "none", // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
                },
                "&-ms-overflow-style:": {
                  display: "none", // Hide the scrollbar for IE
                },
              }}
            >
              {/* Timestamp */}
              <div className="mb-6">
                <label className="block text-red-400/80 font-mono text-sm mb-2 tracking-wider">
                  [TIMESTAMP]
                </label>
                <div className="flex items-center gap-2 text-gray-300 font-mono text-sm bg-black/50 p-3 rounded-xl border border-red-400/20">
                  <Clock className="w-4 h-4 text-red-400/60" />
                  {new Date(selectedLog.timestamp).toLocaleString()}
                </div>
              </div>

              {/* Log Index */}
              <div className="mb-6">
                <label className="block text-red-400/80 font-mono text-sm mb-2 tracking-wider">
                  [INDEX]
                </label>
                <div className="text-gray-300 font-mono text-sm bg-black/50 p-3 rounded-xl border border-red-400/20">
                  #{selectedLog.index}
                </div>
              </div>

              {/* Message Content */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-red-400/80 font-mono text-sm tracking-wider">
                    [MESSAGE.CONTENT]
                  </label>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        JSON.stringify(selectedLog.message, null, 2)
                      )
                    }
                    className="p-1 rounded bg-red-400/20 border border-red-400/30 text-red-400 hover:bg-red-400/30 transition-all duration-300"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
                <div
                  className="bg-black/50 p-4 rounded-xl border border-red-400/20 max-h-96 overflow-y-auto"
                  style={{
                    scrollbarWidth: "none", // Hide the scrollbar for firefox
                    // @ts-ignore
                    "&::-webkit-scrollbar": {
                      display: "none", // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
                    },
                    "&-ms-overflow-style:": {
                      display: "none", // Hide the scrollbar for IE
                    },
                  }}
                >
                  <pre className="text-gray-300 font-mono text-xs whitespace-pre-wrap break-words">
                    {typeof selectedLog.message === "string"
                      ? selectedLog.message
                      : JSON.stringify(selectedLog.message, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay for mobile */}
      {selectedLog && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}
    </div>
  );
}

function ParseMessageContent({
  message,
  index,
  isSelected,
  onSelect,
  getLevelIcon,
  getLevelColor,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "UNKNOWN TIME";
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const formatMessage = (msg) => {
    if (typeof msg === "string") return msg;
    return JSON.stringify(msg, null, 2);
  };

  const messageStr = formatMessage(message.message);
  const isLongMessage = messageStr.length > 200;
  const displayMessage = isExpanded
    ? messageStr
    : messageStr.substring(0, 200) + (isLongMessage ? "..." : "");

  return (
    <div
      className={`p-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-[1.01] cursor-pointer group ${
        isSelected
          ? "border-red-400/60 bg-red-400/5"
          : "border-red-400/20 hover:border-red-400/40"
      }`}
      style={{
        background: isSelected
          ? "linear-gradient(145deg, rgba(239,68,68,0.1), rgba(15,23,42,0.8))"
          : "linear-gradient(145deg, rgba(0,0,0,0.8), rgba(15,23,42,0.6))",
        boxShadow: isSelected
          ? "0 8px 16px rgba(239,68,68,0.2), inset 0 1px 0 rgba(255,255,255,0.05)"
          : "0 8px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
      onClick={onSelect}
    >
      <div className="flex items-center gap-4">
        {/* Log Level Badge */}
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-lg border font-mono text-xs font-bold tracking-wider ${getLevelColor(message.level)}`}
        >
          {getLevelIcon(message.level)}
          {message.level.toUpperCase()}
        </div>

        {/* Brief Log Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 text-red-400/60 font-mono text-xs mb-2">
            <Clock className="w-3 h-3" />
            {formatTimestamp(message.timestamp)}
            <div className="w-px h-3 bg-red-400/20"></div>
            <span className="text-red-400/40">#{index}</span>
            {isSelected && (
              <>
                <div className="w-px h-3 bg-red-400/20"></div>
                <span className="text-red-400/60">SELECTED</span>
              </>
            )}
          </div>

          <div className="text-gray-300 font-mono text-sm truncate">
            {displayMessage}
          </div>
        </div>

        {/* Click indicator */}
        <div
          className={`transition-colors duration-300 ${
            isSelected
              ? "text-red-400"
              : "text-red-400/40 group-hover:text-red-400/80"
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

export default Logs;
