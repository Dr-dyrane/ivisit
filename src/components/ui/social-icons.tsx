import React from 'react';
import { FaGoogle, FaApple, FaFacebook, FaTwitter } from 'react-icons/fa';

interface SocialIconProps {
  provider: 'google' | 'apple' | 'facebook' | 'twitter';
  onClick: () => void;
}

const SocialIcon: React.FC<SocialIconProps> = ({ provider, onClick }) => {
  const icons = {
    google: <FaGoogle className="h-5 w-5" />,
    apple: <FaApple className="h-5 w-5" />,
    facebook: <FaFacebook className="h-5 w-5" />,
    twitter: <FaTwitter className="h-5 w-5" />,
  };

  return (
    <button
      onClick={onClick}
      className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-background hover:text-foreground transition duration-150"
      aria-label={`Sign in with ${provider}`}
    >
      {icons[provider]}
    </button>
  );
};

export default SocialIcon;
