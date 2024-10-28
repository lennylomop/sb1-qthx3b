import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const additionalInfo = formData.get("additionalInfo") as string;

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: "Keine gültige Datei gefunden" }, 
        { status: 400 }
      );
    }

    // Einfache Datei-Validierung
    const fileBuffer = await file.arrayBuffer();
    
    // Hier würde normalerweise die PDF-Verarbeitung stattfinden
    // Für den Test geben wir die Datei einfach zurück
    const processedBuffer = fileBuffer;
    
    // Als Base64 zurückgeben
    const base64 = Buffer.from(processedBuffer).toString('base64');
    const dataUrl = `data:application/pdf;base64,${base64}`;

    return NextResponse.json({
      resultUrl: dataUrl,
      message: "PDF erfolgreich verarbeitet"
    });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Verarbeitungsfehler" },
      { status: 500 }
    );
  }
}