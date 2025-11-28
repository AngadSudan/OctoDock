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
  const [gitUrl, setGitUrl] = useState("");
  useEffect(() => {
    Object.keys(fileSystem).map((file, index) => {
      updatingfileSystem[file] = "loading";
    });
    if (data) {
      setFileSystem({
        ...JSON.parse(data.getProjectById.folderStructure),
      });
      setGitUrl(data.getProjectById.githubUrl);
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
          console.log({
            message: "Failed to parse SSE data:" + error.message,
            loggingLevel: "error",
            error: error,
          });
        }
      };

      sseClient.onerror = (err) => {
        console.log({ message: "SSE connection error:" + err });
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
    <div className="overflow-y-hidden flex flex-col-reverse md:flex-row bg-black h-screen gap-2">
      <Chat fileSystem={updatingfileSystem} />
      <div className="h-full p-0 my-auto bg-black w-2/3">
        {!loading && Object.keys(fileSystem).length > 0 && (
          <Editor
            files={fileSystem}
            loading={loading}
            openfile={openFile}
            code={updatedCode}
            githubUrl={gitUrl}
          />
        )}
      </div>
    </div>
  );
}

export default StackBlitzIndex;
