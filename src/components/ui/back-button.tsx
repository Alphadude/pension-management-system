import { Button } from "@mantine/core";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

const BackButton = () => {
  const router = useRouter();
  const [redirectParams] = useQueryState("redirect");
  const handleBack = () => {
    if (redirectParams) {
      router.push(redirectParams);
    } else {
      router.back();
    }
  };
  return (
    <Button
      onClick={handleBack}
      variant="transparent"
      leftSection={<ArrowLeft size={16} color="#2E5AAC" />}
      className="w-fit p-0 text-xs font-semibold text-[#2E5AAC]"
    >
      Go Back
    </Button>
  );
};

export default BackButton;
