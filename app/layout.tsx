import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase:new URL("https://happy-deco-web.netlify.app"),
  title:"Happy Deco | Magia en cada evento",
  description:"Ambientaciones integrales para cumpleaños y celebraciones especiales en Santiago del Estero.",
  openGraph:{title:"Magia en cada evento | Happy Deco",description:"Ambientaciones integrales creadas con sensibilidad, creatividad y atención por los detalles.",images:["/og.png"]},
  twitter:{card:"summary_large_image",title:"Magia en cada evento | Happy Deco",description:"Ambientaciones integrales creadas con sensibilidad, creatividad y atención por los detalles.",images:["/og.png"]}
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>}
