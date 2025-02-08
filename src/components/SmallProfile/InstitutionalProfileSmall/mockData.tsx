import { Institution } from './types'

export const MOCK_INSTITUTION: Institution = {
  id: "1",
  name: "Harvard University",
  username: "harvard",
  avatar: "/institutions/harvard.jpg",
  type: "university",
  verified: true,
  description: "Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Established in 1636, it is the oldest institution of higher education in the United States.",
  location: "Cambridge, Massachusetts",
  stats: {
    professors: 2400,
    publications: 45000,
    students: 23000,
    ranking: "#1"
  },
  researchAreas: [
    "Computer Science",
    "Medicine",
    "Law",
    "Business",
    "Engineering"
  ],
  achievements: [
    "Top Global University",
    "Most Published Papers",
    "Best Research Impact"
  ]
} 