"use client";

import PDFProcessor from '@/components/PDFProcessor';

export default function Home() {
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">PDF Verarbeitung</h1>
      <p className="text-center text-gray-600 mb-8">
        Laden Sie Ihre PDF-Datei hoch und fügen Sie zusätzliche Informationen hinzu
      </p>
      <PDFProcessor />
    </main>
  );
}