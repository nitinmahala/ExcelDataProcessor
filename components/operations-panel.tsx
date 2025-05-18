"use client"

import { useState } from "react"
import { Calculator, Download, ChevronDown, ChevronUp, BarChart3 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface OperationsPanelProps {
  columns: string[]
  onPerformOperation: (column: string, operation: string) => void
  results: { operation: string; value: number | null; row?: any } | null
  onDownload: () => void
}

export function OperationsPanel({ columns, onPerformOperation, results, onDownload }: OperationsPanelProps) {
  const [selectedColumn, setSelectedColumn] = useState<string>("")
  const [showDetailView, setShowDetailView] = useState(false)

  const operations = [
    {
      id: "max",
      label: "Maximum",
      icon: "↑",
      color: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800",
    },
    {
      id: "min",
      label: "Minimum",
      icon: "↓",
      color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800",
    },
    {
      id: "sum",
      label: "Sum",
      icon: "Σ",
      color:
        "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-800",
    },
    {
      id: "avg",
      label: "Average",
      icon: "x̄",
      color: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900 dark:text-amber-300 dark:border-amber-800",
    },
  ]

  return (
    <Card className="p-4 md:p-6 shadow-lg border border-green-100 dark:border-green-900 dark:bg-gray-800 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-500 to-green-700 dark:from-green-400 dark:to-green-600"></div>
      <h2 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-4 flex items-center">
        <BarChart3 className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
        Data Operations
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="column-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Select Column
            </label>
            <Select value={selectedColumn} onValueChange={setSelectedColumn}>
              <SelectTrigger className="w-full border-green-200 dark:border-green-800 focus:ring-green-500 dark:bg-gray-700 dark:text-white">
                <SelectValue placeholder="Select a column" />
              </SelectTrigger>
              <SelectContent>
                {columns.map((column) => (
                  <SelectItem key={column} value={column}>
                    {column}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Operation</p>
            <div className="grid grid-cols-2 gap-3">
              {operations.map((op) => (
                <Button
                  key={op.id}
                  variant="outline"
                  className={`bg-white dark:bg-gray-800 border-green-300 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/30 hover:border-green-400 dark:hover:border-green-600 text-green-700 dark:text-green-400 justify-start transition-all duration-200 hover:shadow-md ${
                    results?.operation === op.id ? "ring-2 ring-green-400 dark:ring-green-500 ring-opacity-50" : ""
                  }`}
                  disabled={!selectedColumn}
                  onClick={() => onPerformOperation(selectedColumn, op.id)}
                >
                  <span className={`mr-2 text-lg font-semibold px-2 py-0.5 rounded ${op.color}`}>{op.icon}</span>
                  {op.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-white dark:from-green-900/30 dark:to-gray-800 rounded-lg p-5 border border-green-200 dark:border-green-800 shadow-md">
          <h3 className="text-lg font-medium text-green-800 dark:text-green-300 mb-3 flex items-center">
            <Calculator className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
            Results
          </h3>

          {results ? (
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Operation</p>
                <p className="text-lg font-medium text-green-700 dark:text-green-400 capitalize">{results.operation}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Column</p>
                <p className="text-lg font-medium text-green-700 dark:text-green-400">{selectedColumn}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Result</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-400 bg-white dark:bg-gray-800 p-2 rounded border border-green-100 dark:border-green-800 shadow-sm">
                  {typeof results.value === "number"
                    ? results.value.toLocaleString(undefined, {
                        maximumFractionDigits: 4,
                      })
                    : "N/A"}
                </p>
              </div>

              {results.row && (results.operation === "max" || results.operation === "min") && (
                <Button
                  variant="outline"
                  className="w-full mt-2 border-green-300 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/30 text-green-700 dark:text-green-400 flex items-center justify-center transition-all duration-200"
                  onClick={() => setShowDetailView(!showDetailView)}
                >
                  {showDetailView ? (
                    <>
                      <ChevronUp className="mr-1 h-4 w-4" />
                      Hide Details
                    </>
                  ) : (
                    <>
                      <ChevronDown className="mr-1 h-4 w-4" />
                      View Complete Record
                    </>
                  )}
                </Button>
              )}

              {showDetailView && results.row && (
                <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-green-200 dark:border-green-800 max-h-60 overflow-y-auto shadow-inner transition-all duration-300 animate-in fade-in">
                  <h4 className="font-medium text-green-800 dark:text-green-300 mb-3 pb-2 border-b border-green-100 dark:border-green-800">
                    Complete Record Details
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(results.row).map(([key, value]) => (
                      <div
                        key={key}
                        className="grid grid-cols-2 gap-2 py-1 border-b border-gray-100 dark:border-gray-700 last:border-0"
                      >
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{key}:</p>
                        <p
                          className={`text-sm text-gray-800 dark:text-gray-200 ${
                            key === selectedColumn
                              ? "font-bold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded"
                              : ""
                          }`}
                        >
                          {String(value)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button
                className="w-full mt-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 dark:from-green-600 dark:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 transition-all duration-200 shadow-md"
                onClick={onDownload}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Results
              </Button>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>Select a column and operation to see results</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
