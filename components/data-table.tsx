"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, ArrowUpDown, Download, BarChart } from "lucide-react"
import { SearchFilter } from "./search-filter"
import * as XLSX from "xlsx"

interface DataTableProps {
  data: any[]
  title?: string
}

export function DataTable({ data, title = "Data Preview" }: DataTableProps) {
  const [filteredData, setFilteredData] = useState<any[]>(data)
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "ascending" | "descending" } | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [expandedRow, setExpandedRow] = useState<number | null>(null)

  const columns = data.length > 0 ? Object.keys(data[0]) : []

  // Sorting logic
  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending"

    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }

    setSortConfig({ key, direction })
  }

  const getSortedData = () => {
    if (!sortConfig) return filteredData

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      // Handle numeric values
      if (!isNaN(Number(aValue)) && !isNaN(Number(bValue))) {
        return sortConfig.direction === "ascending" ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue)
      }

      // Handle string values
      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1
      }
      return 0
    })
  }

  // Pagination logic
  const totalPages = Math.ceil(getSortedData().length / rowsPerPage)
  const paginatedData = getSortedData().slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

  // Export data
  const exportData = (format: "xlsx" | "csv") => {
    const ws = XLSX.utils.json_to_sheet(filteredData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Data")

    if (format === "xlsx") {
      XLSX.writeFile(wb, "exported_data.xlsx")
    } else {
      XLSX.writeFile(wb, "exported_data.csv")
    }
  }

  // Toggle row expansion
  const toggleRowExpansion = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index)
  }

  return (
    <Card className="p-4 md:p-6 shadow-md border border-green-100 dark:border-green-900 dark:bg-gray-800 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
        <h2 className="text-xl font-semibold text-green-700 dark:text-green-400 flex items-center">
          <span className="inline-block w-2 h-6 bg-green-500 dark:bg-green-400 rounded mr-2"></span>
          {title}
          <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
            ({filteredData.length} records)
          </span>
        </h2>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900"
            onClick={() => exportData("xlsx")}
          >
            <Download className="h-4 w-4 mr-1" />
            Export XLSX
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900"
            onClick={() => exportData("csv")}
          >
            <Download className="h-4 w-4 mr-1" />
            Export CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900"
          >
            <BarChart className="h-4 w-4 mr-1" />
            Visualize
          </Button>
        </div>
      </div>

      <SearchFilter data={data} columns={columns} onFilteredData={setFilteredData} />

      <div className="border rounded-lg overflow-hidden shadow-sm dark:border-green-900">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900 dark:to-green-800">
              <tr>
                <th className="px-2 py-3 text-left text-xs font-medium text-green-800 dark:text-green-300 uppercase tracking-wider w-10"></th>
                {columns.map((column) => (
                  <th
                    key={column}
                    className="px-4 py-3 text-left text-xs font-medium text-green-800 dark:text-green-300 uppercase tracking-wider border-r last:border-r-0 dark:border-green-700 cursor-pointer hover:bg-green-200 dark:hover:bg-green-700"
                    onClick={() => requestSort(column)}
                  >
                    <div className="flex items-center">
                      {column}
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                      {sortConfig?.key === column && (
                        <span className="ml-1">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedData.length > 0 ? (
                paginatedData.map((row, rowIndex) => (
                  <>
                    <tr
                      key={rowIndex}
                      className={`${
                        rowIndex % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"
                      } hover:bg-green-50 dark:hover:bg-green-900 transition-colors duration-150 cursor-pointer`}
                      onClick={() => toggleRowExpansion(rowIndex)}
                    >
                      <td className="px-2 py-2 text-center">
                        {expandedRow === rowIndex ? (
                          <ChevronUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        )}
                      </td>
                      {columns.map((column, colIndex) => (
                        <td
                          key={`${rowIndex}-${colIndex}`}
                          className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-r last:border-r-0 dark:border-gray-700 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs"
                        >
                          {row[column]?.toString() || ""}
                        </td>
                      ))}
                    </tr>
                    {expandedRow === rowIndex && (
                      <tr className="bg-green-50 dark:bg-green-900">
                        <td colSpan={columns.length + 1} className="px-4 py-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {columns.map((column, colIndex) => (
                              <div key={colIndex} className="flex flex-col">
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{column}</span>
                                <span className="text-sm font-medium text-gray-800 dark:text-gray-200 break-words">
                                  {row[column]?.toString() || ""}
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">Rows per page:</span>
            <Select
              value={rowsPerPage.toString()}
              onValueChange={(value) => {
                setRowsPerPage(Number(value))
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="w-[70px] border-green-200 focus:ring-green-400 dark:border-green-800 dark:bg-gray-700">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900"
            >
              First
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900"
            >
              Prev
            </Button>
            <span className="px-3 py-1 text-sm text-gray-700 dark:text-gray-300">
              {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900"
            >
              Next
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900"
            >
              Last
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}
