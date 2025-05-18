"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, FileSpreadsheet, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-100 dark:border-green-900 bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <FileSpreadsheet className="h-6 w-6 text-green-600 dark:text-green-400" />
              <span className="text-xl font-bold text-green-700 dark:text-green-400">Excel Data Processor</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400"
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Link
              href="#features"
              className="text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 px-3 py-2 text-sm font-medium"
            >
              Features
            </Link>
            <Link
              href="#help"
              className="text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 px-3 py-2 text-sm font-medium"
            >
              Help
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="border-green-600 text-green-700 hover:bg-green-50 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-900"
            >
              Contact Us
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-100 dark:border-green-900 animate-in slide-in-from-top">
            <div className="flex flex-col space-y-3">
              <Link
                href="#features"
                className="text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 px-3 py-2 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#help"
                className="text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 px-3 py-2 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Help
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="border-green-600 text-green-700 hover:bg-green-50 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-900 justify-start"
              >
                Contact Us
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 justify-start"
                onClick={toggleTheme}
              >
                {theme === "dark" ? <Sun className="h-5 w-5 mr-2" /> : <Moon className="h-5 w-5 mr-2" />}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
