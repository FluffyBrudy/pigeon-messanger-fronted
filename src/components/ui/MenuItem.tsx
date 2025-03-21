import { FC } from "react";

const emptyEvent = () => {};

interface MenuItemProps {
  onClick?: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  label: string;
  width?: number;
}

const MenuItem: FC<MenuItemProps> = ({ onClick, label, width = 1 }) => {
  const width_ = `${Math.max(0, Math.min(Number(width), 1)) * 95}%`;

  return (
    <div
      className="px-4 py-2 cursor-pointer text-center transition-all border border-slate-600
                  hover:bg-gray-700/90 hover:shadow-lg hover:scale-105 hover:text-white"
      style={{ width: width_ }}
      onClick={onClick || emptyEvent}
    >
      <p className="font-semibold text-sm tracking-[1.5px] uppercase">
        {label}
      </p>
    </div>
  );
};

export default MenuItem;
