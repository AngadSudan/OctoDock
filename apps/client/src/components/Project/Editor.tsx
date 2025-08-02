import { useEffect, useRef, useState } from "react";
import sdk, { type VM } from "@stackblitz/sdk";
export default function Editor({ files, loading = true }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const vmRef = useRef<VM | null>(null);
  const [isLoaded, setIsLoaded] = useState(loading);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;

    if (Object.keys(files).length > 0) {
      const createFileSystem = {};

      for (const file in files) {
        // @ts-ignore
        if (files[file].path && files[file].content) {
          createFileSystem[files[file].path] = files[file].content;
        } else if (files[file].path && !files[file].content) {
          createFileSystem[files[file].path] = `// basic init`;
        } else {
          console.log(files[file]);
          createFileSystem[files[file]] = `// basic init`;
        }
        console.log(
          "mapping values in files, current value is ",
          createFileSystem
        );
      }
      console.log("created fileTree is ");
      console.log(files);
      const timeout = setTimeout(() => {
        sdk
          .embedProject(
            containerRef.current!,
            {
              title: "Simple HTML/CSS/JS App",
              description: "A basic example",
              template: "node",
              files: createFileSystem,
            },
            {
              forceEmbedLayout: true,
              height: "100%",
              width: "100%",
              hideExplorer: false,
            }
          )
          .then((vm) => {
            if (!cancelled) {
              setIsLoaded(true);
              vmRef.current = vm;
            }
          })
          .catch((err) => {
            console.error("StackBlitz embed error:", err);
            setError(err?.message || "Failed to load StackBlitz");
          });
      }, 300);

      return () => {
        cancelled = true;
        clearTimeout(timeout);
      };
    }
  }, []);

  const updateFileContent = async (file: string, text: string) => {
    if (!vmRef.current) {
      console.error("StackBlitz VM is not available");
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
      console.error("Failed to update file:", err);
    }
  };

  const openFile = async (file: string) => {
    if (!vmRef.current) {
      console.error("StackBlitz VM is not available");
      return;
    }
    try {
      await vmRef.current.editor.openFile(file);
    } catch (err) {
      console.error("Failed to open file:", err);
    }
  };

  const getFolderStructure = async () => {
    if (!vmRef.current) return;

    try {
      const response = await vmRef.current.getFsSnapshot();
      console.log(response);
    } catch (error) {
      console.log(error);
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
                onClick={() =>
                  updateFileContent(
                    "src/index.js",
                    "console.log('i love you palak');"
                  )
                }
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
                className="flex items-center space-x-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-200 text-xs font-medium hover:bg-slate-700/50 transition-all duration-200 backdrop-blur-sm"
                onClick={() => openFile("src/script.js")}
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>Open File</span>
              </button>

              <button
                className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg text-slate-200 text-xs font-medium hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-200 backdrop-blur-sm"
                onClick={() => getFolderStructure()}
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
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
                <span>Structure</span>
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
