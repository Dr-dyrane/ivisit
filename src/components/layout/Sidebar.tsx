import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Home, Calendar, User, LogOut, Moon, Sun } from 'lucide-react';
import { FaUserCircle } from 'react-icons/fa';
import { Dialog } from '@headlessui/react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/Button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { logoutUser } from '@/lib/slices/authSlice';
import { RootState, AppDispatch } from '@/lib/store';
import { useTheme } from '@/providers/ThemeContext';
import { navItems, isHomePage } from './navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { toggleTheme, theme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/');
  };

  const sidebarContent = (
    <>
      <ScrollArea className="flex-grow">
        <div className="p-6 flex flex-col h-full">
          {/* User Card */}
          <div className="mb-4">
            <Link to="/profile" className="flex items-center space-x-4 py-4 px-2 bg-muted rounded-lg hover:shadow-md dark:hover:shadow-white/50 transition-colors">
              <Avatar>
                <AvatarImage src={user?.avatarUrl} />
                <AvatarFallback><FaUserCircle className="w-10 h-10" /></AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </Link>
          </div>

          <Separator className="my-4" />

          {/* Navigation Links */}
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-start space-x-3 px-2 py-1.5 rounded-md transition-colors ${(isHomePage(location.pathname) && isHomePage(item.path)) || location.pathname === item.path
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground'
                  }`}
              >
                <item.icon size={16} className='text-muted-foreground'/>
                <span className='flex items-center justify-center'>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-6 mt-auto">
        <Separator className="my-4" />
        <div className="flex items-center justify-between rounded-2xl">
          <Button
            variant="ghost"
            //  size="icon"
            onClick={toggleTheme}
            className='hover:bg-muted-foreground p-3 rounded-full bg-accent'
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </Button>
          <Button variant="ghost" onClick={handleLogout} className='hover:bg-accent-200 bg-accent rounded-md hover:text-accent-500'>
            <LogOut size={20} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-[30vw] max-w-80 bg-background rounded-r-xl shadow-lg z-50">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Dialog */}
      <Dialog as="div" className="md:hidden" open={isOpen} onClose={onClose}>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Panel className="fixed inset-y-0 left-0 z-50 w-[80vw] sm:w-[50vw] bg-background rounded-r-xl shadow-lg flex flex-col">
          {sidebarContent}
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default Sidebar;

