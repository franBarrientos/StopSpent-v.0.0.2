import { Box, Flex,  Link, Button } from "@chakra-ui/react";
import { Link as HREFTO } from "react-router-dom";
import useApp from "../hook/useApp";
const Navbar = () => {
    const { whereStay} = useApp()

  return (
    <Box bg="teal.500" px={4} py={5}>
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Link color="white" fontWeight="bold" fontSize="xl" href="/">
            StopSpent
          </Link>
        </Box>
        <Box display={"flex"} gap={2}>
            <HREFTO to={"/about"}>
          <Button bg={"Menu"} w={"20"} colorScheme="teal" variant="outline">
            Sobre mi
          </Button>
            </HREFTO>
            {(whereStay == "login")? (<HREFTO to={"/"}>
          <Button bg={"Menu"} colorScheme="teal" variant="outline">
            Iniciar Sesion
          </Button>
            </HREFTO>): (<HREFTO to={"/register"}>
          <Button bg={"Menu"} colorScheme="teal" variant="outline">
            Registrarme
          </Button>
            </HREFTO>)}
            
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
