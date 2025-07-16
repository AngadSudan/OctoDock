import Chat from "./Chat";
import Editor from "./Editor";

function StackBlitzIndex() {
  return (
    <div className="flex bg-black min-h-screen gap-2">
      <Chat />
      <div className="h-full p-0 my-auto bg-black w-2/3">
        <Editor />
      </div>
    </div>
  );
}

export default StackBlitzIndex;
