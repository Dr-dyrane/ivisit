import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { toggleTheme, theme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
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
          <div className="mb-6">
            <Link to="/profile" className="flex items-center space-x-4 p-2 rounded-lg hover:bg-accent transition-colors">
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
            <Link to="/emergency" className="flex items-center space-x-2 px-2 py-1.5 rounded-md hover:bg-accent transition-colors">
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link to="/visits" className="flex items-center space-x-2 px-2 py-1.5 rounded-md hover:bg-accent transition-colors">
              <Calendar size={20} />
              <span>Visits</span>
            </Link>
            <Link to="/profile" className="flex items-center space-x-2 px-2 py-1.5 rounded-md hover:bg-accent transition-colors">
              <User size={20} />
              <span>Profile</span>
            </Link>
          </nav>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-6 mt-auto">
        <Separator className="my-4" />
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
          //  size="icon"
            onClick={toggleTheme}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </Button>
          <Button variant="ghost" onClick={handleLogout}>
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
      <aside className="hidden md:flex md:flex-col md:w-[40vw] bg-background rounded-r-xl shadow-lg z-50">
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

