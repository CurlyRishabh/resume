const Footer = () => {
  const socialLinks = [
    { name: "GitHub", url: "https://github.com/yourusername" },
    { name: "LinkedIn", url: "https://linkedin.com/in/yourusername" },
    { name: "Twitter", url: "https://twitter.com/yourusername" },
  ];

  return (
    <footer className="bg-black border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-center">
            <h3 className="font-bold text-xl">Rishabh Singh Bisht</h3>
            <p className="text-primary">Software Engineer</p>
          </div>
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="text-sm">
            © {new Date().getFullYear()} Rishabh Singh Bisht. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 