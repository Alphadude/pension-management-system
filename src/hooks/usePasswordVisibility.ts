import { Eye, EyeOff } from "lucide-react";
import { useCallback, useState } from "react";

const usePasswordVisibility = () => {
  const [visible, setVisible] = useState(false);

  const toggle = useCallback(() => {
    setVisible((v) => !v);
  }, []);

  return {
    type: visible ? "text" : "password",
    toggle,
    Icon: visible ? Eye : EyeOff,
  };
};

export default usePasswordVisibility;
