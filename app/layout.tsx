import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {title:"Happy Deco | Magia en cada evento",description:"Ambientaciones integrales para cumpleaños y celebraciones especiales en Santiago del Estero."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>}
