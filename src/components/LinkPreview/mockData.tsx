import { LinkPreviewProps } from './types'
import placeholder from "../../../public/images/placeholder.svg"

export const MOCK_LINK_PREVIEWS: LinkPreviewProps[] = [
  {
    url: "https://example.com/quantum-computing",
    title: "The Future of Quantum Computing: A Comprehensive Guide",
    description: "Explore the latest advancements in quantum computing, from quantum supremacy to practical applications in cryptography and optimization.",
    image: placeholder
  },
  {
    url: "https://example.com/ai-research",
    title: "Artificial Intelligence Research Breakthroughs 2024",
    description: "A detailed analysis of the most significant AI research developments in 2024, including advances in large language models and neural networks.",
    image: placeholder
  },
  {
    url: "https://example.com/physics-paper",
    title: "New Discoveries in Particle Physics",
    description: "Recent experimental results from CERN reveal unexpected properties of the Higgs boson.",
    image: placeholder
  }
] 