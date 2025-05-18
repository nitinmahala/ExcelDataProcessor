import { FileUploader } from "@/components/file-uploader"
import { Footer } from "@/components/footer"
import { FeaturesSection } from "@/components/features-section"
import { HelpSection } from "@/components/help-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          
          <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto">
            Upload CSV or Excel files and perform calculations on your data with this powerful and easy-to-use tool
          </p>
        </div>

        <FileUploader />
        <FeaturesSection />
        <HelpSection />
      </div>
      <Footer />
    </main>
  )
}
