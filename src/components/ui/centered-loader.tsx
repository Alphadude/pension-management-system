import { Flex, Loader } from "@mantine/core";

const CenteredLoader = () => {
  return (
    <Flex className="h-screen w-full items-center justify-center">
      <Loader />
    </Flex>
  );
};

export default CenteredLoader;
