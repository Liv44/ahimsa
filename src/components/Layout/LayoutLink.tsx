import { Link } from 'react-router-dom';

interface LayoutLinkProps {
  path: string;
  label: string;
  isActive: (path: string) => boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const LayoutLink = ({
  path,
  label,
  isActive,
  setIsMenuOpen,
}: LayoutLinkProps) => {
  return (
    <Link
      key={path}
      to={path}
      className={`block px-3 py-2 text-base font-medium text-white hover:text-light-orange hover:underline ${
        isActive(path)
          ? 'font-extrabold border-b-2 border-light-orange'
          : 'font-normal'
      }`}
      onClick={() => setIsMenuOpen(false)}
    >
      {label}
    </Link>
  );
};

export default LayoutLink;
