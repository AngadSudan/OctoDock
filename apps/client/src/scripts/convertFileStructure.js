export default function wrapFilesForWebContainer(flatFiles) {
  const root = {};

  for (const [filePath, content] of Object.entries(flatFiles)) {
    const parts = filePath.split("/");
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      if (i === parts.length - 1) {
        // Last part — it's the file
        current[part] = {
          file: {
            contents: content.trimStart(),
          },
        };
      } else {
        // Directory
        if (!current[part]) {
          current[part] = {};
        }
        current = current[part];
      }
    }
  }

  return root;
}
