import { usegetProjectInfo } from "@/Hooks/api/project";
import Chat from "../Project/Chat";
import Editor from "../Project/Editor";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import configuration from "@/conf/configuration";

function StackBlitzIndex() {
  const [fileSystem, setFileSystem] = useState({});
  const [updatingfileSystem, setUpdatingFileSystem] = useState({});
  const params = useParams();
  const [openFile, setOpenFile] = useState("src/index.js");
  const [updatedCode, setupdatedCode] = useState("src/index.js");
  const { data, loading, error } = usegetProjectInfo(params.id);
  const [initializing, setIsInitialized] = useState("pending");
  useEffect(() => {
    Object.keys(fileSystem).map((file, index) => {
      updatingfileSystem[file] = "loading";
    });
    if (data) {
      setFileSystem({
        ...JSON.parse(data.getProjectById.folderStructure),
      });
    }

    const startUpdatingFiles = async () => {
      const responseURL = `${configuration.backend_url}/initialize-project?projectID=${params.id}`;
      const sseClient = new EventSource(responseURL, {
        withCredentials: true,
      });

      sseClient.onmessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          setUpdatingFileSystem({
            ...updatingfileSystem,
            [openFile]: "success",
          });

          setupdatedCode(data.code);
          setOpenFile(data.filename);
          setUpdatingFileSystem({
            ...updatingfileSystem,
            [openFile]: "processing",
          });
        } catch (error) {
          console.error("Failed to parse SSE data:", error);
        }
      };

      sseClient.onerror = (err) => {
        console.log("SSE connection error:", err);
        sseClient.close();
      };
    };
    if (data && !data.getProjectById.isInitialized) {
      setIsInitialized("loading");
      startUpdatingFiles();
      setIsInitialized("completed");
    }
    if (data && data.getProjectById.isInitialized) {
      Object.keys(fileSystem).map((file, index) => {
        updatingfileSystem[file] = "success";
      });
    }
  }, [data, loading, error]);
  return (
    <div className="overflow-y-hidden flex bg-black h-screen gap-2">
      <Chat fileSystem={updatingfileSystem} />
      <div className="h-full p-0 my-auto bg-black w-2/3">
        {!loading && Object.keys(fileSystem).length > 0 && (
          <Editor
            files={fileSystem}
            loading={loading}
            openfile={openFile}
            code={updatedCode}
          />
        )}
      </div>
    </div>
  );
}

export default StackBlitzIndex;
