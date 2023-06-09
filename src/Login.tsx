import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
  CircularProgress,
} from "@chakra-ui/react";
import useApp from "./hook/useApp";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "./config/axiosClient";
import { useForm } from "react-hook-form";

function App() {
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    getValues,
  } = useForm();

  const { setWhereStay, handleLogin } = useApp();
  useEffect(() => {
    setWhereStay("register");
  }, []);

  const validatePasswordAndEmail = () => {
    const email: string = getValues("email").toString().trim();
    const password: string = getValues("password").toString().trim();    
    if (email === "") {
      toast({
        title: "Valores invalidos.",
        description: "Ingrese un email valido.",
        status: "error",
        duration: 1000,
        position: "top-left",
        isClosable: true,
      });
      setIsLoading(false);
      return false;
    }

    if (password === "") {
      toast({
        title: "Valores invalidos.",
        description: "Ingrese una contraseña valida.",
        status: "error",
        duration: 2000,
        position: "top-left",
        isClosable: true,
      });
      setIsLoading(false);
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    setIsLoading(true);
    if (!validatePasswordAndEmail()) return;
    const formData = getValues()
    try {
      const response = await apiClient.post("/auth/login", formData);
      const { data } = response;
      if (data.ok == true) {
        toast({
          title: `Bienvenido ${data.data.user.name}`,
          description: "Logueado Correctamente",
          status: "success",
          duration: 2000,
          position: "top-left",
          isClosable: true,
        });
        const userData = data.data.user;
        handleLogin(data.data.JWT, userData);
        setTimeout(() => {
          setIsLoading(false);
          navigate("/admin");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast({
        title: "Valores invalidos.",
        description: "Porfavor ingrese valores validos",
        status: "error",
        position: "top-left",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      bg={"teal"}
      maxW="md"
      color={"whiteAlpha.900"}
      mx="auto"
      mt={10}
      pt={10}
      pb={20}
      px={8}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading mb={4}>Iniciar sesión</Heading>
        <FormControl>
          <FormLabel>Correo electrónico</FormLabel>
          <Input
            fontSize={"lg"}
            {...register("email")}
            type="email"
            placeholder="Correo electrónico"
            focusBorderColor="whiteAlpha.900"
            borderColor={"whiteAlpha.300"}
            _placeholder={{ color: "whiteAlpha.900" }}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Contraseña</FormLabel>
          <Input
            {...register("password")}
            type="password"
            placeholder="Contraseña"
            focusBorderColor="whiteAlpha.900"
            borderColor={"whiteAlpha.300"}
            _placeholder={{ color: "whiteAlpha.900" }}
          />
        </FormControl>
        {isLoading ? (
          <Flex mt={4} justifyContent={"center"} alignItems={"center"}>
            <CircularProgress isIndeterminate color="green.300" />
          </Flex>
        ) : (
          <Button type="submit" mt={6} colorScheme="blue" width={"full"}>
            Iniciar sesión
          </Button>
        )}
      </form>
    </Box>
  );
}

export default App;
