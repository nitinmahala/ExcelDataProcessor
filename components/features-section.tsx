import { Card } from "@/components/ui/card"
import { FileSpreadsheet, Search, Calculator, BarChart, Download, Save } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: <FileSpreadsheet className="h-8 w-8 text-green-600 dark:text-green-400" />,
      title: "File Upload",
      description: "Upload CSV and Excel files with drag-and-drop functionality. Preview your data instantly.",
    },
    {
      icon: <Search className="h-8 w-8 text-green-600 dark:text-green-400" />,
      title: "Search & Filter",
      description: "Quickly find the data you need with powerful search and filtering capabilities.",
    },
    {
      icon: <Calculator className="h-8 w-8 text-green-600 dark:text-green-400" />,
      title: "Data Operations",
      description: "Perform calculations like max, min, sum, and average on your data with a single click.",
    },
    {
      icon: <BarChart className="h-8 w-8 text-green-600 dark:text-green-400" />,
      title: "Data Visualization",
      description: "Visualize your data with charts and graphs to gain better insights.",
    },
    {
      icon: <Download className="h-8 w-8 text-green-600 dark:text-green-400" />,
      title: "Export Options",
      description: "Export your processed data in various formats including CSV and Excel.",
    },
    {
      icon: <Save className="h-8 w-8 text-green-600 dark:text-green-400" />,
      title: "Save Sessions",
      description: "Save your analysis sessions and continue where you left off.",
    },
  ]

  return (
    <section id="features" className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-4">Features</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our Excel Data Processor provides powerful tools to analyze and process your spreadsheet data
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 border border-green-100 dark:border-green-900 dark:bg-gray-800 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 rounded-full">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
