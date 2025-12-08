import { BookOpen, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
  description?: string;
  onMenuToggle?: () => void;  
  showMenuButton?: boolean;
  url?:string;
  showAddButton?: boolean;
  addButtonLabel?: string;
}

export default function Header({
  title,
  description,
  onMenuToggle,
  showMenuButton = false,
  url = "#",
  showAddButton = false,
  addButtonLabel = "Add New",
}: HeaderProps) {

  const navigate = useNavigate()
  const handleAddButton =()=>{
    navigate(url)
  }
  return (
    <div className="bg-[#111418] border-b border-gray-800 px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        
        <div className="flex items-center gap-2 sm:gap-4">
          {showMenuButton && (
            <button 
              onClick={onMenuToggle}
              className="p-2 hover:bg-gray-800 rounded lg:hidden"
            >
              <Menu size={24} className="text-gray-400" />
            </button>
          )}

          <button className="p-2 hover:bg-gray-800 rounded hidden sm:block">
            <BookOpen size={20} className="text-gray-400" />
          </button>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">{title}</h1>
            
            {description && (
              <p className="text-gray-500 text-xs sm:text-sm hidden sm:block">
                {description}
              </p>
            )}
          </div>
        </div>

        {showAddButton && (
          <button onClick={()=>handleAddButton()} className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-1 sm:gap-2 font-semibold text-sm sm:text-base">
            <span className="text-base sm:text-lg">+</span> 
            <span className="hidden sm:inline">{addButtonLabel}</span>
            <span className="sm:hidden">Add</span>
          </button>
        )}
      </div>
    </div>
  );
}
