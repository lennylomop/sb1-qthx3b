"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";
import FileUploader from "@/components/FileUploader";
import ProcessingAnimation from "@/components/ProcessingAnimation";

export default function PDFProcessor() {
  const [file, setFile] = useState<File | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!file) {
      toast({
        title: "Keine Datei ausgewählt",
        description: "Bitte wählen Sie eine PDF-Datei aus.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setResultUrl(null);
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("additionalInfo", additionalInfo);

    try {
      const response = await fetch("/api/process-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Verarbeitung fehlgeschlagen");
      }

      const data = await response.json();
      setResultUrl(data.resultUrl);
      
      toast({
        title: "Erfolg!",
        description: "Ihre PDF wurde erfolgreich verarbeitet.",
      });
    } catch (error: any) {
      console.error("Frontend Error:", error);
      toast({
        title: "Fehler",
        description: error.message || "Bei der Verarbeitung ist ein Fehler aufgetreten.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const link = document.createElement('a');
      link.href = resultUrl;
      link.download = 'processed.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div>
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">PDF Upload</h2>
          <FileUploader
            onFileSelect={setFile}
            selectedFile={file}
          />
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Zusätzliche Informationen</h2>
          <Textarea
            placeholder="Geben Sie hier zusätzliche Informationen ein..."
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            className="min-h-[200px]"
          />
        </Card>
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={!file || isProcessing}
          className="w-full max-w-md"
        >
          {isProcessing ? "Verarbeitung läuft..." : "Verarbeitung starten"}
        </Button>
      </div>

      {isProcessing && (
        <div className="mt-8 flex justify-center">
          <ProcessingAnimation />
        </div>
      )}

      {resultUrl && !isProcessing && (
        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleDownload}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Verarbeitete PDF herunterladen
          </Button>
        </div>
      )}
    </div>
  );
}