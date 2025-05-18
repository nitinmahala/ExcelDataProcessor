import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

export function HelpSection() {
  const faqs = [
    {
      question: "What file formats are supported?",
      answer:
        "Our Excel Data Processor supports CSV (.csv), Excel 97-2003 (.xls), and Excel 2007+ (.xlsx) file formats.",
    },
    {
      question: "How do I perform calculations on my data?",
      answer:
        "After uploading your file, select a column from the dropdown in the Operations Panel, then click on one of the operation buttons (Max, Min, Sum, Avg). The result will be displayed in the Results section.",
    },
    {
      question: "Can I search for specific data in my spreadsheet?",
      answer:
        "Yes, you can use the search bar to find specific data across all columns or filter by a specific column using the filter option.",
    },
    {
      question: "How do I export my processed data?",
      answer:
        "After performing operations, click the 'Download Results' button to export your data with the results. You can also export the entire dataset in CSV or Excel format using the export buttons in the data table.",
    },
    {
      question: "Is my data secure?",
      answer: "Yes, all processing happens in your browser. Your data is never sent to our servers or stored anywhere.",
    },
    {
      question: "How do I view all details for a specific record?",
      answer:
        "Click on any row in the data table to expand it and see all the details for that record. For max/min operations, you can also click 'View Complete Record' in the results panel.",
    },
  ]

  return (
    <section id="help" className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-4 flex items-center justify-center">
            <HelpCircle className="mr-2 h-8 w-8" />
            Help & FAQ
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about using the Excel Data Processor
          </p>
        </div>

        <Card className="max-w-3xl mx-auto border border-green-100 dark:border-green-900 dark:bg-gray-800 shadow-md">
          <div className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Card>
      </div>
    </section>
  )
}
