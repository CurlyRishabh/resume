import { contactData, homeData } from "../home/data";

const Footer = () => {
  const socialLinks = [
    { name: "GitHub", url: contactData.social.github },
    { name: "LinkedIn", url: contactData.social.linkedin },
    { name: "Email", url: `mailto:${contactData.email}` },
    { name: "Resume", url: homeData.resume },
  ];

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-center">
            <h3 className="font-bold text-xl">Rishabh Singh Bisht</h3>
            <p className="text-primary">{homeData.headline} · {homeData.focus}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
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
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Rishabh Singh Bisht. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 