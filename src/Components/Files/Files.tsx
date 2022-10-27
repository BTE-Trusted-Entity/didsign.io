import { createContext, useContext, useMemo, useState } from 'react';

export interface FileEntry {
  file: File;
  buffer: ArrayBuffer;
  name: string;
  hash: string;
  verified?: boolean;
}

interface FilesType {
  files: Array<FileEntry>;

  setFiles: (
    filesOrSetter: FileEntry[] | ((values: FileEntry[]) => FileEntry[]),
  ) => void;
}

const FilesContext = createContext<FilesType>({
  files: [],
  setFiles() {
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
  const value = useMemo(() => ({ files, setFiles }), [files]);
  return (
    <FilesContext.Provider value={value}>{children}</FilesContext.Provider>
  );
}
