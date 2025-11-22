import { useEffect } from "react";
import { trefoil } from "ldrs";

type LoaderProps = {
  size?: number;
  stroke?: number;
  strokeLength?: number;
  bgOpacity?: number;
  speed?: number;
  color?: string;
  className?: string;
};

const Loader = ({
  size = 40,
  stroke = 4,
  strokeLength = 0.15,
  bgOpacity = 0.1,
  speed = 1.4,
  color = "currentColor",
  className,
}: LoaderProps) => {
  useEffect(() => {
    try {
      trefoil.register();
    } catch {}
  }, []);

  return (
    <div className={className ?? "text-primary"}>
      <l-trefoil
        size={String(size)}
        stroke={String(stroke)}
        stroke-length={String(strokeLength)}
        bg-opacity={String(bgOpacity)}
        speed={String(speed)}
        color={color}
      ></l-trefoil>
    </div>
  );
};

export default Loader;
