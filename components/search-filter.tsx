"use client"

import { useState, useEffect } from "react"
import { Search, Filter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SearchFilterProps {
  data: any[]
  columns: string[]
  onFilteredData: (data: any[]) => void
}

export function SearchFilter({ data, columns, onFilteredData }: SearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedColumn, setSelectedColumn] = useState<string>("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    if (!searchTerm.trim()) {
      onFilteredData(data)
      return
    }

    const lowercasedTerm = searchTerm.toLowerCase()

    const filtered = data.filter((item) => {
      if (selectedColumn === "all") {
        // Search in all columns
        return Object.values(item).some((value) => String(value).toLowerCase().includes(lowercasedTerm))
      } else {
        // Search in specific column
        const value = item[selectedColumn]
        return value && String(value).toLowerCase().includes(lowercasedTerm)
      }
    })

    onFilteredData(filtered)
  }, [searchTerm, selectedColumn, data, onFilteredData])

  const clearSearch = () => {
    setSearchTerm("")
    setSelectedColumn("all")
  }

  return (
    <div className="mb-4 space-y-3">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search data..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-9 border-green-200 focus:border-green-400 focus:ring-green-400 dark:border-green-800 dark:bg-gray-800 dark:text-white"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <Button
          variant="outline"
          size="icon"
          className={`border-green-200 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-900 ${isFilterOpen ? "bg-green-50 dark:bg-green-900" : ""}`}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {isFilterOpen && (
        <div className="p-3 border border-green-200 rounded-md bg-white dark:bg-gray-800 dark:border-green-800 animate-in slide-in-from-top">
          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Search in:</label>
            <Select value={selectedColumn} onValueChange={setSelectedColumn}>
              <SelectTrigger className="w-full sm:w-auto border-green-200 focus:ring-green-400 dark:border-green-800 dark:bg-gray-700">
                <SelectValue placeholder="Select column" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Columns</SelectItem>
                {columns.map((column) => (
                  <SelectItem key={column} value={column}>
                    {column}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  )
}
