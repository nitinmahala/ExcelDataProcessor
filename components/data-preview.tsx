import { Card } from "@/components/ui/card"

interface DataPreviewProps {
  data: any[]
}

export function DataPreview({ data }: DataPreviewProps) {
  if (!data.length) return null

  const columns = Object.keys(data[0])

  return (
    <Card className="p-6 overflow-x-auto shadow-md border border-green-100">
      <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
        <span className="inline-block w-2 h-6 bg-green-500 rounded mr-2"></span>
        Data Preview
      </h2>
      <p className="text-sm text-gray-500 mb-4">Showing first 5 rows of your data</p>

      <div className="border rounded-lg overflow-hidden shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-green-100 to-green-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider border-r last:border-r-0"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-green-50 transition-colors duration-150`}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    className="px-4 py-2 text-sm text-gray-700 border-r last:border-r-0 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs"
                  >
                    {row[column]?.toString() || ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
