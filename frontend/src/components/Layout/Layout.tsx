import logo from '@/assets/logo.svg';
import { useAuth } from '@/hooks/useAuth';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import LayoutLink from './LayoutLink';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (location.pathname === '/register' && path === '/login') {
      return true;
    }
    return location.pathname === path;
  };

  const { user } = useAuth();

  const navItems = [
    { path: '/', label: t('layout.navigation.home') },
    { path: '/feelings-list', label: t('layout.navigation.feelings-list') },
    { path: '/discussion', label: t('layout.navigation.discussion') },
    {
      path: user ? '/profile' : '/login',
      label: user
        ? t('layout.navigation.profile')
        : t('layout.navigation.login'),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-dark-blue">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-auto py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="flex items-center"
                aria-label={t('layout.navigation.aria-label.home')}
              >
                <img src={logo} alt="" className="h-20 w-auto" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <LayoutLink
                    key={item.path}
                    path={item.path}
                    label={item.label}
                    isActive={isActive}
                    setIsMenuOpen={setIsMenuOpen}
                  />
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="size-6 text-white hover:text-dark-blue focus:outline-none"
                aria-label={
                  isMenuOpen
                    ? t('layout.navigation.aria-label.menu-button-close')
                    : t('layout.navigation.aria-label.menu-button-open')
                }
              >
                {isMenuOpen ? (
                  <X
                    id="menu-button"
                    className="size-6"
                    data-testid="menu-button-close"
                    aria-hidden="true"
                  />
                ) : (
                  <Menu
                    id="menu-button"
                    className="size-6"
                    data-testid="menu-button-open"
                    aria-hidden="true"
                  />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 sm:px-3 mt-2">
                {navItems.map((item) => (
                  <LayoutLink
                    key={item.path}
                    path={item.path}
                    label={item.label}
                    isActive={isActive}
                    setIsMenuOpen={setIsMenuOpen}
                  />
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>

      {/* Footer */}
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <li>
              <p className="text-lg font-semibold mb-4">
                {t('layout.footer.title')}
              </p>
              <p className="text-light-blue">
                {t('layout.footer.description')}
              </p>
            </li>
            <li>
              <p className="text-lg font-semibold mb-4">
                {t('layout.footer.navigation.title')}
              </p>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <LayoutLink
                      path={item.path}
                      label={item.label}
                      isActive={isActive}
                      setIsMenuOpen={setIsMenuOpen}
                    />
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <div className="mt-8 pt-8 border-t border-gray text-center text-light-blue">
            <p>{t('layout.footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
