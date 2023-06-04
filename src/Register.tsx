import { ChangeEvent, FormEvent, useEffect, useState } from "react";
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
  Flex
} from "@chakra-ui/react";
import apiClient from "./config/axiosClient";

export default function Register() {
  const { setWhereStay } = useApp();
  useEffect(() => {
    setWhereStay("login");
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [surname, setSurname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleSetSalary = (event: ChangeEvent<HTMLInputElement>) => {
    setSalary(event.target.value);
  };
  const handleSurnameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSurname(event.target.value);
  };

  const validate = () => {
    if (email.trim() === "") {
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

    if (password.trim() === "") {
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
    if (name.trim() === "") {
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
    if (surname.trim() === "") {
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
    if (salary.trim() === "") {
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (!validate()) return;
    const formData = {
      name,
      surname,
      email,
      password,
      salary: Number(salary),
    };
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
      <form onSubmit={handleSubmit}>
        <Heading mb={4}>Registrarme</Heading>
        <FormControl mt={4}>
          <FormLabel>Nombre</FormLabel>
          <Input
            onChange={handleNameChange}
            value={name}
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
            onChange={handleSurnameChange}
            value={surname}
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
            onChange={handleEmailChange}
            value={email}
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
            onChange={handlePasswordChange}
            value={password}
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
            onChange={handleSetSalary}
            value={salary}
            type="number"
            placeholder="Ingrese el monto Ej: 150000"
            focusBorderColor="whiteAlpha.900"
            borderColor={"whiteAlpha.300"}
            _placeholder={{ color: "whiteAlpha.900" }}
          />
        </FormControl>
        {isLoading ? (
          <Flex mt={4} justifyContent={"center"} alignItems={"center"}>
            <CircularProgress isIndeterminate color='green.300' />
          </Flex>
        ) : (
        <Button type="submit" mt={6} colorScheme="blue" width={"full"}>
          Registrarme
        </Button>)}
      </form>
    </Box>
  );
}
