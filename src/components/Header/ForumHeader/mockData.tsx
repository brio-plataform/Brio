import { ForumHeaderProps } from './types'
import placeholder from "../../../../public/images/placeholder.svg"

export const MOCK_FORUM_HEADER: ForumHeaderProps = {
  name: "Programming Hub",
  description: "A vibrant community dedicated to programming, software development, and computer science. Join us to learn, share knowledge, and grow together.",
  image: placeholder,
  banner: "/banners/programming-hub.jpg",
  memberCount: 25000,
  postCount: 15420,
  isVerified: true,
  departments: [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "DevOps"
  ],
  researchCenters: [
    "AI Research Lab",
    "Cloud Computing Center",
    "Cybersecurity Institute"
  ],
  resources: [
    "Learning Paths",
    "Code Challenges",
    "Project Ideas",
    "Documentation"
  ]
} 