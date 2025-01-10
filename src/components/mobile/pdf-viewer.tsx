import { X, ChevronLeft, ChevronRight, Download } from "lucide-react"

interface PDFViewerProps {
  document: {
    name: string
    type: string
    date: string
  }
  onClose: () => void
}

export function PDFViewer({ document, onClose }: PDFViewerProps) {
  return (
    <div className="absolute inset-0 bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="text-gray-600">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">{document.name}</span>
            <span className="text-xs text-gray-500">{document.date}</span>
          </div>
        </div>
        <button className="text-gray-600">
          <Download className="w-5 h-5" />
        </button>
      </div>

      {/* PDF Content */}
      <div className="flex-1 bg-gray-100 overflow-auto">
        <div className="p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 min-h-[140%]">
            {/* Mock PDF Content */}
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-32 bg-gray-200 rounded mt-8"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-48 bg-gray-200 rounded mt-8"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="bg-white border-t px-4 py-3 flex items-center justify-between">
        <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="text-sm text-gray-600">Seite 1 von 3</span>
        <button className="p-2 text-gray-600 hover:text-gray-800">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
} 