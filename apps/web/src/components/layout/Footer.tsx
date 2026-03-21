import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full rounded-t-[3rem] mt-20 bg-surface-container-low">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6 md:px-16 py-16 max-w-[1440px] mx-auto text-center md:text-left">
        {/* Brand Info */}
        <div>
          <div className="text-xl font-bold text-[#785900] mb-6">Kid's Gallery</div>
          <p className="text-body-md text-[#785900] mb-6">
            We believe play is the highest form of research. Our curated collections bring beauty and imagination into the nursery.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Link href="#" className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
              <span className="material-symbols-outlined">star</span>
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
              <span className="material-symbols-outlined">favorite</span>
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
              <span className="material-symbols-outlined">explore</span>
            </Link>
          </div>
        </div>
        
        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-lg mb-2 text-on-background">Our World</h4>
          <Link href="/about" className="text-body-md text-[#785900] hover:underline decoration-2 underline-offset-4 transition-opacity">About Us</Link>
          <Link href="/shipping" className="text-body-md text-[#785900] hover:underline decoration-2 underline-offset-4 transition-opacity">Shipping Policy</Link>
          <Link href="/contact" className="text-body-md text-[#785900] hover:underline decoration-2 underline-offset-4 transition-opacity">Contact Support</Link>
          <a href="#" className="text-body-md text-[#785900] hover:underline decoration-2 underline-offset-4 transition-opacity">Instagram</a>
          <a href="#" className="text-body-md text-[#785900] hover:underline decoration-2 underline-offset-4 transition-opacity">Pinterest</a>
        </div>
        
        {/* Shop Info */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-lg mb-2 text-on-background">Visit the Gallery</h4>
          <p className="text-body-md text-[#785900]">
            123 Imagination Lane<br/>Curiosity District<br/>New York, NY 10001
          </p>
          <p className="text-body-md text-[#785900] mt-4">
            Open Daily: 10am - 6pm
          </p>
        </div>
      </div>
      
      <div className="border-t border-outline-variant/30 py-8 px-6 md:px-16 max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-body-md text-[#785900] opacity-60">© {new Date().getFullYear()} Kid's Gallery. Made with imagination.</p>
        <div className="flex gap-6 opacity-60">
          <span className="material-symbols-outlined text-secondary">payments</span>
          <span className="material-symbols-outlined text-secondary">shopping_bag</span>
          <span className="material-symbols-outlined text-secondary">verified</span>
        </div>
      </div>
    </footer>
  );
}
