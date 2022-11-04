import { createContext, useContext } from 'react';

export interface FileEntry {
  file: File;
  buffer: ArrayBuffer;
  name: string;
  hash: string;
}

interface FilesType {
  files: Array<FileEntry>;

  setFiles: (
    filesOrSetter: FileEntry[] | ((values: FileEntry[]) => FileEntry[]),
  ) => void;
}

export const FilesContext = createContext<FilesType>({
  files: [],
  setFiles() {
    return undefined;
  },
});

export function useFiles(): FilesType {
  return useContext(FilesContext);
}
