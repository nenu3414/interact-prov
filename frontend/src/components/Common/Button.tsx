import { LOGO } from "../../assets/logos";

interface Props {
  text: string;
  onClick?: () => void;
  type: "primary" | "outlined" | "text";
  disabled?: boolean;
  loading?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  block?: boolean;
  className?: string;
  fontSize?: number;
  id?: string;
  rounded?: string;
  buttonType?: "submit" | "reset" | "button";
}

export function Button({
  text,
  type = "primary",
  disabled = false,
  loading = false,
  onClick,
  block,
  size = "md",
  className,
  fontSize = 14,
  id,
  rounded,
  buttonType,
}: Props) {
  const width = block ? "w-full" : "w-max";
  const height =
    size === "xs"
      ? "h-8"
      : size === "sm"
      ? "h-9"
      : size === "md"
      ? "h-10"
      : size === "lg"
      ? "h-12"
      : "h-10";

  if (type === "primary") {
    return (
      <button
        id={id}
        type={buttonType}
        disabled={disabled}
        onClick={() => onClick && onClick()}
        style={{ fontSize: fontSize }}
        className={`${width} ${height} px-4 font-semibold ${rounded} text-center bg-blue-500 text-white border cursor-pointer transition-all flex items-center justify-center ${
          disabled ? "opacity-70" : "opacity-100"
        } ${className}`}
      >
        {loading ? (
          <img src={LOGO} alt="loader" className=" h-6 fill-white text-white" />
        ) : (
          text
        )}
      </button>
    );
  }

  if (type === "outlined") {
    return (
      <button
        id={id}
        type={buttonType}
        disabled={disabled}
        onClick={() => onClick && onClick()}
        style={{ fontSize: fontSize }}
        className={`${width} ${height} px-4 font-semibold ${rounded} text-center bg-transparent border-blue-500 text-blue-500 border cursor-pointer transition-all flex items-center justify-center ${
          disabled ? "opacity-70" : "opacity-100"
        }  ${className}`}
      >
        {loading ? (
          <img src={LOGO} alt="loader" className=" h-6 fill-white text-white" />
        ) : (
          text
        )}
      </button>
    );
  }

  return (
    <button
      id={id}
      disabled={disabled}
      onClick={() => onClick && onClick()}
      style={{ fontSize: fontSize }}
      className={`${block ? "w-full" : "w-max text-blue-500"} ${
        disabled ? "opacity-70" : "opacity-100 flex items-center justify-center"
      } ${className} `}
    >
      {loading ? (
        <img
          src={LOGO}
          alt="loader"
          className=" h-6 fill-white text-white flex items-center justify-center"
        />
      ) : (
        text
      )}
    </button>
  );
}
