import React from "react";
import { FileText, Folder, FolderOpen } from "lucide-react";

const CharCard = ({ messages = [] }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col space-y-6 p-4">
      {messages.map((message) => (
        <div key={message._id} className="space-y-4">
          {/* User Message */}
          <div className="flex justify-end">
            <div className="max-w-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl rounded-tr-md px-4 py-3 shadow-lg">
              <p className="text-sm font-medium">{message.userPrompt}</p>
              <p className="text-xs text-orange-100 mt-1">
                {formatTime(message.createdAt)}
              </p>
            </div>
          </div>

          {/* AI Response */}
          <div className="flex justify-start">
            <div className="max-w-4xl bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-lg border border-gray-200">
              <div className="flex items-start mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 flex items-center justify-center mr-3 flex-shrink-0">
                  <div className="text-white font-bold text-sm">🐙</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    OctoDock AI
                  </p>
                  <div className="space-y-3">
                    {/* Reported Answer */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Response:
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {message.reportedAnswer}
                      </p>
                    </div>

                    {/* Folder Structure */}
                    {/* <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Updated Project:
                      </h4>
                      {renderFolderStructure(message.folderStructure)}
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    message.sucessResponse === "SUCCESS"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {message.sucessResponse}
                </span>
                <p className="text-xs text-gray-400">
                  {formatTime(message.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharCard;
