import { forwardRef } from "react";
import { generateGradient } from "../../utils/generateGradient";

interface AvatarProps {
  name: string;
  size?: number;
}

const Avatar = forwardRef<SVGSVGElement, AvatarProps>(
  ({ name, size = 64 }, ref) => {
    const initials = name ? name[0].toUpperCase() : "?";
    const [color1, color2] = generateGradient(name);

    return (
      <svg
        ref={ref || null}
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id={`grad-${name}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={color1} />
            <stop offset="100%" stopColor={color2} />
          </linearGradient>
        </defs>

        <circle cx="50" cy="50" r="50" fill={`url(#grad-${name})`} />

        <text
          x="50%"
          y="55%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="40"
          fill="white"
          fontFamily="Arial, sans-serif"
        >
          {initials}
        </text>
      </svg>
    );
  }
);

export default Avatar;
