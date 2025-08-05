import { usegetProjectInfo } from "@/Hooks/api/project";
import Chat from "../Project/Chat";
import Editor from "../Project/Editor";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
function StackBlitzIndex() {
  const [fileSystem, setFileSystem] = useState({});
  const params = useParams();
  const { data, loading, error } = usegetProjectInfo(params.id);
  useEffect(() => {
    if (data) {
      setFileSystem({
        ...JSON.parse(data.getProjectById.folderStructure),
      });
    }
  }, [data, loading, error]);
  return (
    <div className="overflow-y-hidden flex bg-black h-screen gap-2">
      <Chat />
      <div className="h-full p-0 my-auto bg-black w-2/3">
        {!loading && Object.keys(fileSystem).length > 0 && (
          <Editor files={fileSystem} loading={loading} />
        )}
      </div>
    </div>
  );
}

export default StackBlitzIndex;
