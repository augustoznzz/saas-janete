import Link from 'next/link';
import { Instagram, ImageIcon, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-accent/10 border-t border-accent/20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-bold text-ink">
              Janete Zuanazzi
            </h3>
            <p className="text-ink/70 text-sm leading-relaxed">
              Bordados autorais e personalizados com amor e dedicação. 
              Transformando tecidos em peças únicas e especiais.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-ink">Links Rápidos</h4>
            <nav className="space-y-2">
              <Link href="/sobre" className="block text-ink/70 hover:text-ink transition-colors text-sm">
                Sobre
              </Link>
              <Link href="/portfolio" className="block text-ink/70 hover:text-ink transition-colors text-sm">
                Portfólio
              </Link>
              <Link href="/servicos" className="block text-ink/70 hover:text-ink transition-colors text-sm">
                Serviços
              </Link>
              <Link href="/contato" className="block text-ink/70 hover:text-ink transition-colors text-sm">
                Contato
              </Link>
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-ink">Contato</h4>
            <div className="space-y-3">
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-ink/70 hover:text-ink transition-colors text-sm"
              >
                <MessageCircle size={16} />
                <span>WhatsApp</span>
              </a>
              <a
                href="https://instagram.com/janetezuanazzi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-ink/70 hover:text-ink transition-colors text-sm"
              >
                <Instagram size={16} />
                <span>@janetezuanazzi</span>
              </a>
              <a
                href="https://pinterest.com/janetezuanazzi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-ink/70 hover:text-ink transition-colors text-sm"
              >
                <ImageIcon size={16} />
                <span>Pinterest</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-accent/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-ink/50 text-sm">
              © 2024 Janete Zuanazzi. Todos os direitos reservados.
            </p>
            <p className="text-ink/50 text-sm">
              Feito com ❤️ para bordadeiras e amantes do artesanato
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
