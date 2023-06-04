import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
export default function Layout(){
    return (
        <>
      <Navbar />
      <Flex  direction="column" minH="100vh">
      <Box
      display={"flex"} flexDirection={"column"} justifyContent={"space-between"}
        flex="1"
        bgGradient="linear(to-r, teal.500, teal.300)"
        px={{ base: 4, md: 8 }}
        py={{ base: 6, md: 8 }}
      >
        <Outlet/>
      <Footer />
      </Box>
    </Flex>
      </>
      )
  };
  
  
