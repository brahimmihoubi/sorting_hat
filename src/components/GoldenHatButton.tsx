import { FC } from 'react';
import { ASSETS } from '../assets';
import { sounds } from '../utils/audio';

interface GoldenHatButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  showArrow?: boolean;
}

export const GoldenHatButton: FC<GoldenHatButtonProps> = ({
  text = 'Take the Sorting Hat Test',
  onClick,
  className = '',
  showArrow = true,
}) => {
  const handleClick = () => {
    sounds.playChime(680);
    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`btn-golden-hat px-4 sm:px-6 py-2 sm:py-2.5 rounded-none text-xs sm:text-sm tracking-wider shadow-xl relative group cursor-pointer ${className}`}
    >
      <div className="flex items-center gap-2 sm:gap-2.5 z-10">
        {/* Left Sorting Hat Emblem */}
        <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center p-0.5 group-hover:scale-110 transition-transform shrink-0 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
          <img
            src={ASSETS.logo}
            alt="Sorting Hat Crest"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Center Title Case Serif Text */}
        <div className="flex flex-col text-center sm:text-left">
          <span className="font-fantasy font-bold text-black text-xs sm:text-sm tracking-wide leading-tight">
            {text}
          </span>
        </div>

        {/* Right Arrow */}
        {showArrow && (
          <span className="text-black font-bold text-xs sm:text-sm transition-transform group-hover:translate-x-1 shrink-0">
            →
          </span>
        )}
      </div>
    </button>
  );
};
