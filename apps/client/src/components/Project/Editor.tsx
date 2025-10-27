import { useEffect, useRef, useState } from "react";
import sdk, { type VM } from "@stackblitz/sdk";
import axios from "axios";
import configuration from "@/conf/configuration";
import { redirect, useParams } from "react-router";
import type { RootState } from "@/redux";
import { useSelector } from "react-redux";
import { GitBranch, CheckCircle, XCircle, Loader2 } from "lucide-react";
import Deployment from "./Deployment";

export default function Editor({
  files,
  loading = true,
  openfile,
  code,
  githubUrl,
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const vmRef = useRef<VM | null>(null);
  const [isLoaded, setIsLoaded] = useState(loading);
  const [error, setError] = useState<string | null>(null);
  const [gitPush, setGitPush] = useState(false);
  const [deployment, setDeployment] = useState(false);
  const [gitMessage, setGitMessage] = useState("staging your code");

  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;

    if (Object.keys(files).length > 0) {
      const timeout = setTimeout(() => {
        // sdk
        //   .embedGithubProject(
        //     containerRef.current!,
        //     githubUrl
        //       .replace("https://api.github.com/repos/", "")
        //       .replace(".git", "")
        //   )
        //   .then((vm) => {
        //     if (!cancelled) {
        //       setIsLoaded(true);
        //       vmRef.current = vm;
        //     }
        //   })
        //   .catch((err) => {
        //     console.error("StackBlitz embed error:", err);

        //     // Set error state
        //     setError(err?.message || "Failed to load StackBlitz");
        //   })
        // Optional fallback: embed a custom project if GitHub embed fails
        // Uncomment if you want fallback

        sdk
          .embedProject(
            containerRef.current!,
            {
              title: "Simple HTML/CSS/JS App",
              description: "A basic example",
              template: "node",
              files: files,
            },
            {
              forceEmbedLayout: true,
              height: "100%",
              width: "100%",
              hideExplorer: false,
            },
          )
          .then((vm) => {
            if (!cancelled) {
              setIsLoaded(true);
              vmRef.current = vm;
            }
          })
          .catch((fallbackErr) => {
            console.error("Fallback embed error:", fallbackErr);
            setError(
              fallbackErr?.message || "Failed to load StackBlitz fallback",
            );
          });

        // });
      }, 1000);

      return () => {
        cancelled = true;
        clearTimeout(timeout);
      };
    }
  }, []);
  const param = useParams();
  useEffect(() => {
    if (!openfile || !code) return;
    openFile(openfile);
    updateFileContent(openfile, code);
  }, [openfile, code]);
  const updateFileContent = async (file: string, text: string) => {
    if (!vmRef.current) {
      console.log({
        message: "StackBlitz VM is not available",
        loggingLevel: "error",
      });
      return;
    }
    try {
      await vmRef.current.applyFsDiff({
        create: {
          [file]: text,
        },
        destroy: [],
      });
    } catch (err) {
      console.log({
        message: "Failed to update file:" + err.message,
        loggingLevel: "error",
        error: err,
      });
    }
  };

  const openFile = async (file: string) => {
    if (!vmRef.current) {
      console.log({
        message: "StackBlitz VM is not available",
        loggingLevel: "error",
      });
      return;
    }
    try {
      await vmRef.current.editor.openFile(file);
    } catch (err) {
      console.log({
        message: "Failed to open file:" + err.message,
        loggingLevel: "error",
        error: err,
      });
    }
  };

  const getFolderStructure = async () => {
    if (!vmRef.current) return;

    try {
      const response = await vmRef.current.getFsSnapshot();
      return response;
    } catch (error) {
      console.log({
        message: error.message,
        loggingLevel: "error",
        error: error,
      });
    }
  };
  const username = useSelector((state: RootState) => state.auth.user.login);

  const handleGitPush = async () => {
    setGitPush(true);
    const fileStructure = await getFolderStructure();
    setTimeout(() => {
      setGitMessage("commiting your code");
    }, 5000);
    setTimeout(() => {
      setGitMessage("pushing your code");
    }, 17000);
    setTimeout(() => {
      setGitPush(false);
    }, 20000);
    const response = await axios.post(
      `${configuration.backend_url}/push/${param.id}`,
      {
        username,
        foldername: fileStructure,
      },
    );
  };
  const handleDeployemnt = async () => {
    setDeployment(true);
    const response = await axios.post(
      configuration.builder_server + "/deploy",
      {
        projectId: param.id,
      },
    );

    if (response.data) {
      redirect("/deployment/" + param.id);
    }
    setDeployment(false);
  };

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case "error":
        return <XCircle className="w-6 h-6 text-red-400" />;
      default:
        return <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "from-green-500/20 to-emerald-500/20 border-green-500/30";
      case "error":
        return "from-red-500/20 to-rose-500/20 border-red-500/30";
      default:
        return "from-purple-500/20 to-cyan-500/20 border-purple-500/30";
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case "success":
        return "Successfully pushed to your repository";
      case "error":
        return "Failed to push to your repository. Please try again.";
      default:
        return "Syncing your changes to GitHub...";
    }
  };

  return (
    <div className="w-full max-w-full mx-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 min-h-screen relative">
      {/* Subtle gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-purple-500/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,75,75,0.1),transparent_70%)]"></div>

      <div className="relative z-10">
        {/* Professional header with controls */}
        <div className="px-6 py-4 border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
              <h1 className="text-slate-200 font-semibold text-sm tracking-wide">
                Code Editor
              </h1>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-3">
              <button
                className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-lg text-slate-200 text-xs font-medium hover:from-red-500/30 hover:to-orange-500/30 transition-all duration-200 backdrop-blur-sm"
                onClick={handleGitPush}
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span>Push to GitHub</span>
              </button>
              <button
                className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-cyan-500/20 to-cyan-500/20 border border-cyan-500/30 rounded-lg text-slate-200 text-xs font-medium hover:from-cyan-500/30 hover:to-cyan-500/30 transition-all duration-200 backdrop-blur-sm"
                onClick={handleDeployemnt}
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span>Create Deployment</span>
              </button>
            </div>
          </div>
        </div>

        {/* Editor container */}
        <div className="p-6">
          <div className="relative">
            {/* Subtle glow effect around editor */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-purple-500/5 rounded-xl blur-xl"></div>

            <div className="relative bg-slate-900/30 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden shadow-2xl">
              <div
                ref={containerRef}
                className="min-h-[calc(100vh-180px)] w-full"
              />
            </div>
          </div>
        </div>

        {/* Loading state */}
        {!isLoaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-8 h-8 border-2 border-slate-600 border-t-red-500 rounded-full animate-spin"></div>
              <div className="text-slate-400 text-sm font-medium">
                Loading StackBlitz Editor...
              </div>
            </div>
          </div>
        )}

        {/* push to github overlay  */}
        {gitPush && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div
              className={`bg-gradient-to-br ${getStatusColor()} backdrop-blur-md border rounded-2xl p-8 max-w-md mx-6 shadow-2xl transform transition-all duration-300 scale-100`}
            >
              {/* Icon and Title Section */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-shrink-0">{getStatusIcon()}</div>
                <div className="flex-1">
                  <h3 className="text-white text-xl font-semibold flex items-center gap-2">
                    <GitBranch className="w-5 h-5" />
                    {gitMessage} to GitHub
                  </h3>
                </div>
              </div>

              {/* Status Message */}
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                {getStatusMessage()}
              </p>

              {/* Progress Bar (only for loading) */}
              {status === "loading" && (
                <div className="mb-6">
                  <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-pulse w-3/4"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {deployment && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <Deployment />
          </div>
        )}
        {/* Error state */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 max-w-md mx-6 shadow-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-slate-200 text-lg font-semibold">
                  Failed to load StackBlitz
                </h3>
              </div>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-medium hover:from-red-600 hover:to-orange-600 transition-all duration-200 shadow-lg"
              >
                Retry Loading
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Luxury ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-red-500/8 to-orange-500/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-gradient-to-r from-blue-500/8 to-purple-500/8 rounded-full blur-3xl"></div>
    </div>
  );
}
