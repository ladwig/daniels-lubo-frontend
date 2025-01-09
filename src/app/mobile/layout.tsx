import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lubo Mobile",
  description: "Mobile application for Lubo",
}

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
          {/* Phone frame */}
          <div className="w-[390px] h-[844px] bg-white rounded-[60px] overflow-hidden shadow-2xl relative">
            {/* Status bar */}
            <div className="h-12 bg-black flex items-center justify-between px-6">
              <div className="text-white text-sm">9:41</div>
              <div className="flex items-center gap-2">
                <div className="text-white text-sm">5G</div>
                <div className="text-white text-sm">100%</div>
              </div>
            </div>
            {/* Dynamic notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-[160px] bg-black rounded-b-3xl" />
            {/* Content area */}
            <main className="h-[calc(100%-48px)] overflow-y-auto bg-gray-50">
              {children}
            </main>
            {/* Home indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black rounded-full" />
          </div>
        </div>
      </body>
    </html>
  )
} 