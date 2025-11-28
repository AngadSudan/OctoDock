import React, { useEffect, useState } from "react";
import {
  Calendar,
  GitBranch,
  ExternalLink,
  Code,
  Globe,
  MoreVertical,
} from "lucide-react";
import { useGetAllDeploymentData } from "@/Hooks/api/deployment";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux";
import { useNavigate } from "react-router";

function OctadockAccount() {
  const router = useNavigate();
  const [deployment, setDeployments] = useState([]);
  const [activeTab, setActiveTab] = useState("deployments");

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  let userId;
  if (!isAuthenticated) {
    router("/login");
  } else {
    userId = useSelector((state: RootState) => state.auth.user.login);
  }

  const { data, loading, error } = useGetAllDeploymentData(userId);

  useEffect(() => {
    if (data) {
      setDeployments(data.getAllUserDeployment);
    }
  }, [data, loading, error]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    // @ts-ignore
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 30) return `${diffDays} days ago`;

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="min-h-screen text-white p-6">
      {/* Deployments Grid */}
      <div className="md:max-w-7xl mx-auto space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-400">Loading deployments...</p>
          </div>
        ) : deployment && deployment.length > 0 ? (
          deployment.map((dep, index) => (
            <div
              key={dep.id}
              className="bg-gradient-to-br from-slate-900/90 to-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 shadow-xl hover:shadow-purple-500/10 backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="hidden md:flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <Code className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1 capitalize">
                        {dep.project.name}
                      </h3>
                      <p className="text-slate-400 text-sm w-[90%] text-wrap line-clamp-2">
                        {dep.project.description}
                      </p>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full flex items-center gap-1.5 border border-yellow-500/20">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                        <span className="font-medium">Draft</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(dep.createdAt)}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Globe className="w-4 h-4" />
                      <span>Docker slug:</span>
                      <span className="font-mono text-xs bg-slate-800 px-2 py-1 rounded">
                        {dep.urlSlug}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Code className="w-4 h-4" />
                      <span>Docker image:</span>
                      <span className="font-mono text-xs bg-slate-800 px-2 py-1 rounded">
                        {dep.dockerImage}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-slate-900/50 rounded-xl border border-slate-800">
            <Code className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">
              No Deployments Yet
            </h3>
            <p className="text-slate-500 mb-6">
              Get started by creating your first deployment
            </p>
            <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg shadow-purple-500/25">
              Create Deployment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OctadockAccount;
