import { useEffect, useState } from "react";
import useApp from "./hook/useApp";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
  CircularProgress,
  Flex,
} from "@chakra-ui/react";
import apiClient from "./config/axiosClient";
import { useForm } from "react-hook-form";
import { UserData } from "./interfaces/user";
export default function Register() {
  const { setWhereStay } = useApp();
  useEffect(() => {
    setWhereStay("login");
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { handleSubmit, register, getValues } = useForm();

  const validate = ({email, password, name, surname, salary}:UserData) => {
    if (!email || email.trim() === "") {
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

    if (!password || password.trim() === "") {
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
    if (!name || name.trim() === "") {
      toast({
        title: "Valores invalidos.",
        description: "Ingrese un nombre valido.",
        status: "error",
        duration: 2000,
        position: "top-left",
        isClosable: true,
      });
      setIsLoading(false);
      return false;
    }
    if (!surname || surname.trim() === "") {
      toast({
        title: "Valores invalidos.",
        description: "Ingrese una apellido valido.",
        status: "error",
        duration: 2000,
        position: "top-left",
        isClosable: true,
      });
      setIsLoading(false);
      return false;
    }
    if (!salary || salary.toString().trim() === "") {
      toast({
        title: "Valores invalidos.",
        description: "Ingrese una salario valido.",
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
    const formData = getValues()
    if (!validate(formData as UserData)) return;
    formData.salary = Number(formData.salary)
    try {
      const response = await apiClient.post("/auth/register", formData);
      const { data } = response;
      if (data.ok == true) {
        console.log(data.data);
        toast({
          title: `Bienvenido ${data.data.user.name}`,
          description: "Logueate por favor",
          status: "success",
          duration: 2000,
          position: "top-left",
          isClosable: true,
        });
        setTimeout(() => {
          setIsLoading(false);
          navigate("/");
        }, 1000);
      }
    } catch (error) {
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
      pb={10}
      px={8}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading mb={4}>Registrarme</Heading>
        <FormControl mt={4}>
          <FormLabel>Nombre</FormLabel>
          <Input
            {...register("name")}
            type="text"
            placeholder="Nombre"
            focusBorderColor="whiteAlpha.900"
            borderColor={"whiteAlpha.300"}
            _placeholder={{ color: "whiteAlpha.900" }}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Apellido</FormLabel>
          <Input
            {...register("surname")}
            type="text"
            placeholder="Apellido"
            focusBorderColor="whiteAlpha.900"
            borderColor={"whiteAlpha.300"}
            _placeholder={{ color: "whiteAlpha.900" }}
          />
        </FormControl>
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
        <FormControl mt={4}>
          <FormLabel>Mi Salario Mensual</FormLabel>
          <Input
            {...register("salary")}
            type="number"
            placeholder="Ingrese el monto Ej: 150000"
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
            Registrarme
          </Button>
        )}
      </form>
    </Box>
  );
}
