"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { File, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

export default function FileUploader({ onFileSelect, selectedFile }: FileUploaderProps) {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 hover:border-primary",
          selectedFile && "border-green-500 bg-green-50 dark:bg-green-900/10"
        )}
        onDragEnter={() => setIsDragActive(true)}
        onDragLeave={() => setIsDragActive(false)}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-4">
          <div className="flex justify-center">
            <File className="w-12 h-12 text-gray-400" />
          </div>
          
          {selectedFile ? (
            <div className="space-y-2">
              <p className="text-sm font-medium">Ausgewählte Datei:</p>
              <p className="text-green-600 dark:text-green-400 font-medium">
                {selectedFile.name}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm font-medium">
                PDF hier ablegen oder klicken zum Auswählen
              </p>
              <p className="text-xs text-gray-500">
                Nur PDF-Dateien werden akzeptiert
              </p>
            </div>
          )}
        </div>
      </div>

      {selectedFile && (
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onFileSelect(null as any);
          }}
          className="w-full"
        >
          <X className="w-4 h-4 mr-2" />
          Datei entfernen
        </Button>
      )}
    </div>
  );
}