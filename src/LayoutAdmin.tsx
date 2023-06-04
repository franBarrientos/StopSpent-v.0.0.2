import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function LayoutAdmin() {
  return (
    <>
  <Flex  direction="column" minH="100vh">
  <Box
  display={"flex"} flexDirection={"column"} justifyContent={"space-between"}
    flex="1"
    bgGradient="linear(to-r, teal.500, teal.300)"
    px={{ base: 4, md: 8 }}
    py={{ base: 6, md: 8 }}
  >
    <Outlet/>
  </Box>
</Flex>
  </>
  )
}
