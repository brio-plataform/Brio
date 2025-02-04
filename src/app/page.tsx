import Image from "next/image";
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiOutlineAcademicCap, HiOutlineLightBulb, HiOutlineUserGroup } from 'react-icons/hi';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black text-white">
      {/* Header */}
      <header className="fixed w-full bg-transparent backdrop-blur-sm z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="/brio-logo.svg"
              alt="Brio Logo"
              width={40}
              height={40}
              className="animate-pulse"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Brio
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#about" className="hover:text-purple-400 transition-colors">Sobre</a>
            <a href="#features" className="hover:text-purple-400 transition-colors">Recursos</a>
            <a href="#how-it-works" className="hover:text-purple-400 transition-colors">Como Funciona</a>
            <a href="#join" className="hover:text-purple-400 transition-colors">Participar</a>
            <a href="#contact" className="hover:text-purple-400 transition-colors">Contato</a>
          </div>
          <button className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-full text-sm hidden md:block">
            Entrar Beta
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center max-w-4xl mx-auto px-4">
          <div className="inline-block animate-bounce bg-purple-500/20 px-4 py-2 rounded-full mb-6">
            🚀 Revolucionando o compartilhamento de conhecimento
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Bem-vindo à Nova{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Ágora Digital
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Uma plataforma revolucionária onde o conhecimento é construído colaborativamente.
            A Biblioteca de Alexandria do século XXI está nascendo.
          </p>
          <div className="flex gap-4 justify-center mb-12">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 
              text-white px-8 py-3 rounded-full transition-all transform hover:scale-105">
              Comece Agora
            </button>
            <button className="border border-purple-400 hover:bg-purple-400/10 px-8 py-3 rounded-full 
              transition-all transform hover:scale-105">
              Saiba Mais
            </button>
          </div>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl hover:bg-white/10 transition-all">
              <h3 className="text-xl font-bold mb-3">📝 Criação Sem Limites</h3>
              <p className="text-gray-300">
                Escreva artigos, TCCs, livros e pesquisas em um ambiente colaborativo único.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl hover:bg-white/10 transition-all">
              <h3 className="text-xl font-bold mb-3">🔄 Versionamento Inteligente</h3>
              <p className="text-gray-300">
                Como GitHub para conhecimento: preserve histórico e evolua conteúdos continuamente.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl hover:bg-white/10 transition-all">
              <h3 className="text-xl font-bold mb-3">🏆 Meritocracia Real</h3>
              <p className="text-gray-300">
                Recompensas baseadas em impacto real, não em likes. Qualidade sobre quantidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Recursos <span className="text-purple-400">Principais</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm p-8 rounded-xl hover:bg-white/10 transition-all
                transform hover:scale-105 group">
                <div className="text-purple-400 text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section id="join" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Junte-se à <span className="text-purple-400">Revolução</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Faça parte da comunidade que está redefinindo como o conhecimento é compartilhado e construído.
          </p>
          <form className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-purple-400/30 focus:border-purple-400
                  outline-none transition-colors"
              />
              <button className="bg-purple-500 hover:bg-purple-600 px-8 py-3 rounded-full transition-colors">
                Participar
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/brio-logo.svg"
                  alt="Brio Logo"
                  width={30}
                  height={30}
                />
                <span className="text-xl font-bold">Brio</span>
              </div>
              <p className="text-gray-400">
                Democratizando o conhecimento através da colaboração.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Plataforma</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-purple-400">Recursos</a></li>
                <li><a href="#" className="hover:text-purple-400">Como Funciona</a></li>
                <li><a href="#" className="hover:text-purple-400">Preços</a></li>
                <li><a href="#" className="hover:text-purple-400">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Comunidade</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-purple-400">Blog</a></li>
                <li><a href="#" className="hover:text-purple-400">Eventos</a></li>
                <li><a href="#" className="hover:text-purple-400">Fórum</a></li>
                <li><a href="#" className="hover:text-purple-400">Discord</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Siga-nos</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-purple-400 text-2xl">
                  <FaTwitter />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 text-2xl">
                  <FaLinkedin />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 text-2xl">
                  <FaGithub />
                </a>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-400 text-sm pt-8 border-t border-gray-800">
            <p>"Conhecimento, do povo, para o povo, pelo povo." 🧠✨</p>
            <p className="mt-2">© 2024 Brio. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: <HiOutlineLightBulb />,
    title: "Criação Sem Limites",
    description: "Escreva artigos, TCCs, livros e pesquisas em um ambiente colaborativo único."
  },
  {
    icon: <HiOutlineUserGroup />,
    title: "Comunidade Ativa",
    description: "Conecte-se com pesquisadores, estudantes e entusiastas do conhecimento."
  },
  {
    icon: <HiOutlineAcademicCap />,
    title: "Validação Acadêmica",
    description: "Sistema de revisão por pares para garantir qualidade e credibilidade."
  },
  // Adicione mais features conforme necessário
];
