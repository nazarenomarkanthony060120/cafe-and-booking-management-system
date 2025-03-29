import { Passion_One, Inter } from "next/font/google"

const Passion_One_Font = Passion_One({
  variable: "--font-passion-one",
  subsets: ["latin"],
  weight: ["700", "400"],
})

const Inter_Font = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["700", "400"],
})

export { Passion_One_Font, Inter_Font }