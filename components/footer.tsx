import { Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-800 to-green-700 dark:from-green-900 dark:to-green-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">&copy; {new Date().getFullYear()} Excel Data Processor. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            
            <a
              href="https://github.com/nitinmahala"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-green-200 transition-colors flex items-center"
            >
              <Github className="h-5 w-5 mr-1" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
