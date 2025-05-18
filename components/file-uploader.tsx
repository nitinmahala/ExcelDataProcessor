"use client"

import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { FileSpreadsheet, AlertCircle, Upload } from "lucide-react"
import * as XLSX from "xlsx"
import Papa from "papaparse"
import { DataTable } from "./data-table"
import { OperationsPanel } from "./operations-panel"
import { Card } from "@/components/ui/card"

export function FileUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [data, setData] = useState<any[]>([])
  const [columns, setColumns] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<{ operation: string; value: number | null; row?: any } | null>(null)

  const onDrop = async (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0]
    if (!selectedFile) return

    const fileType = selectedFile.name.split(".").pop()?.toLowerCase()

    if (fileType !== "csv" && fileType !== "xlsx" && fileType !== "xls") {
      setError("Please upload a CSV or Excel file")
      return
    }

    setLoading(true)
    setFile(selectedFile)
    setError(null)

    try {
      if (fileType === "csv") {
        Papa.parse(selectedFile, {
          header: true,
          complete: (results) => {
            const parsedData = results.data as any[]
            setData(parsedData.filter((row) => Object.values(row).some((val) => val !== "")))
            setColumns(results.meta.fields || [])
            setLoading(false)
          },
          error: () => {
            setError("Error parsing CSV file")
            setLoading(false)
          },
        })
      } else {
        // Excel file
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const workbook = XLSX.read(e.target?.result, { type: "binary" })
            const sheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[sheetName]
            const parsedData = XLSX.utils.sheet_to_json(worksheet)

            if (parsedData.length > 0) {
              setData(parsedData)
              setColumns(Object.keys(parsedData[0]))
            } else {
              setError("No data found in the Excel file")
            }
          } catch (err) {
            setError("Error parsing Excel file")
          }
          setLoading(false)
        }
        reader.readAsBinaryString(selectedFile)
      }
    } catch (err) {
      setError("Error processing file")
      setLoading(false)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
  })

  const performOperation = (column: string, operation: string) => {
    if (!column || !data.length) return

    setLoading(true)

    try {
      // Extract numeric values from the selected column
      const values = data.map((row) => Number.parseFloat(row[column])).filter((val) => !isNaN(val))

      if (values.length === 0) {
        setError(`No numeric values found in column "${column}"`)
        setResults(null)
        setLoading(false)
        return
      }

      let result: number | null = null
      let resultRow = null

      switch (operation) {
        case "max":
          result = Math.max(...values)
          resultRow = data.find((row) => Number.parseFloat(row[column]) === result)
          break
        case "min":
          result = Math.min(...values)
          resultRow = data.find((row) => Number.parseFloat(row[column]) === result)
          break
        case "sum":
          result = values.reduce((sum, val) => sum + val, 0)
          break
        case "avg":
          result = values.reduce((sum, val) => sum + val, 0) / values.length
          break
        default:
          setError("Invalid operation")
          break
      }

      setResults({ operation, value: result, row: resultRow })
    } catch (err) {
      setError("Error performing calculation")
    }

    setLoading(false)
  }

  const downloadResults = () => {
    if (!data.length || !results) return

    try {
      // Create a new workbook with the original data and results
      const ws = XLSX.utils.json_to_sheet(data)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, "Data")

      // Add results to a new sheet
      const resultsData = [{ Operation: results.operation, Value: results.value }]
      const resultsWs = XLSX.utils.json_to_sheet(resultsData)
      XLSX.utils.book_append_sheet(wb, resultsWs, "Results")

      // Generate and download the file
      XLSX.writeFile(wb, "processed_data.xlsx")
    } catch (err) {
      setError("Error downloading results")
    }
  }

  return (
    <div className="space-y-6 mb-12">
      <Card className="p-4 md:p-6 shadow-lg border border-green-100 dark:border-green-900 dark:bg-gray-800 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-400 to-green-600"></div>
        <h2 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-4 flex items-center">
          <Upload className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
          Upload File
        </h2>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-4 md:p-8 text-center cursor-pointer transition-all duration-200 ${
            isDragActive
              ? "border-green-500 bg-green-50 dark:bg-green-900/30 shadow-inner"
              : "border-gray-300 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 hover:shadow-md"
          }`}
        >
          <input {...getInputProps()} />
          <FileSpreadsheet
            className={`mx-auto h-12 w-12 md:h-16 md:w-16 ${
              isDragActive ? "text-green-600 dark:text-green-400" : "text-green-500 dark:text-green-500"
            } mb-3 transition-all duration-200`}
          />

          {isDragActive ? (
            <p className="text-green-600 dark:text-green-400 font-medium text-lg">Drop the file here...</p>
          ) : (
            <div>
              <p className="text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Drag & drop a CSV or Excel file here, or click to select
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Supported formats: .csv, .xlsx, .xls</p>
            </div>
          )}
        </div>

        {file && (
          <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-white dark:from-green-900/30 dark:to-gray-800 rounded-md border border-green-200 dark:border-green-800 shadow-sm">
            <p className="text-sm text-gray-700 dark:text-gray-300 flex flex-wrap items-center gap-2">
              <span className="font-medium">File:</span>
              <span className="bg-green-100 dark:bg-green-900 px-2 py-1 rounded text-green-800 dark:text-green-300">
                {file.name}
              </span>
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              <span className="font-medium mr-2">Size:</span>
              <span>{(file.size / 1024).toFixed(2)} KB</span>
            </p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800 flex items-start animate-pulse">
            <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}
      </Card>

      {loading && (
        <div className="flex justify-center my-8">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 dark:border-green-400"></div>
            <div className="absolute top-0 left-0 animate-ping rounded-full h-12 w-12 border border-green-400 dark:border-green-600 opacity-20"></div>
          </div>
        </div>
      )}

      {data.length > 0 && (
        <>
          <DataTable data={data} title="Data Preview" />

          <OperationsPanel
            columns={columns}
            onPerformOperation={performOperation}
            results={results}
            onDownload={downloadResults}
          />
        </>
      )}
    </div>
  )
}
