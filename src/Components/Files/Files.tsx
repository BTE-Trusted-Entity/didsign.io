import { createContext, useContext, useMemo, useState } from 'react';

interface FileEntry {
  file: File;
  buffer: ArrayBuffer;
  name: string;
}

interface FilesType {
  files: Array<FileEntry>;
  zip?: string;

  setFiles: (
    filesOrSetter: FileEntry[] | ((values: FileEntry[]) => FileEntry[]),
  ) => void;

  setZip(name?: string): void;
}

const FilesContext = createContext<FilesType>({
  files: [],
  setFiles() {
    return undefined;
  },
  setZip() {
    return undefined;
  },
});

export function useFiles(): FilesType {
  return useContext(FilesContext);
}

export function FilesProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [zip, setZip] = useState<string>();

  const value = useMemo(
    () => ({
      files,
      setFiles,
      zip,
      setZip,
    }),
    [files, zip],
  );

  return (
    <FilesContext.Provider value={value}>{children}</FilesContext.Provider>
  );
}
