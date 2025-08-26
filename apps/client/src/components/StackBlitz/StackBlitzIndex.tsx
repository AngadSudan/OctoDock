import { usegetProjectInfo } from "@/Hooks/api/project";
import Chat from "../Project/Chat";
import Editor from "../Project/Editor";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import configuration from "@/conf/configuration";
function StackBlitzIndex() {
  const [fileSystem, setFileSystem] = useState({});
  const params = useParams();
  const [openFile, setOpenFile] = useState("src/index.js");
  const [updatedCode, setupdatedCode] = useState("src/index.js");
  const { data, loading, error } = usegetProjectInfo(params.id);
  useEffect(() => {
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
          console.log("System Metrics:", data);
          console.log(data.code, data.file);
          setupdatedCode(data.code);
          setOpenFile(data.filename);
        } catch (error) {
          console.error("Failed to parse SSE data:", error);
        }
      };

      sseClient.onerror = (err) => {
        console.log("SSE connection error:", err);
        sseClient.close();
      };
    };
    if (data) {
      console.log(data);
      console.log(data);
      console.log(data, " ", data.isInitialized);
    }
    if (data && !data.isInitialized) {
      startUpdatingFiles();
    }
  }, [data, loading, error]);
  return (
    <div className="overflow-y-hidden flex bg-black h-screen gap-2">
      <Chat />
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
