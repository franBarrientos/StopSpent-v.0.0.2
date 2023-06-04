import { FormEvent, useEffect, useState } from "react";
import {
  Container,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
  Flex,
  Image,
  List,
  ListItem,
  useToast,
  CircularProgress,
  StatNumber,
  Stat,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import useApp from "./hook/useApp";
import { useNavigate } from "react-router-dom";
import apiClient from "./config/axiosClient";
import { Spent } from "./interfaces/user";
export default function Admin() {
  const navigate = useNavigate();
  const { handleLoguot, isLoggedIn, user, setUser, categories } = useApp();
  const [salary, setSalary] = useState(user?.salary);
  const [editingSalary, setEditingSalary] = useState(false);
  const [updatedSalary, setUpdatedSalary] = useState(user?.salary);
  const [expenses, setExpenses] = useState(user?.spents);
  const [expenseCategory, setExpenseCategory] = useState(1);
  const [expenseAmount, setExpenseAmount] = useState("");
  const [description, setDescription] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDeleted, setIsLoadingDeleted] = useState(false);

  const toast = useToast();
  if (!isLoggedIn) {
    navigate("/");
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setSalary(parsedUser?.salary);
      setExpenses(parsedUser?.spents);
    }
  }, []);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (user && user.id) {
          // Verificar que user y user.id no sean nulos
          const response = await apiClient.get(`/spent/${user.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.ok) {
            setExpenses(response.data.data);
            const updatedUser = {
              ...user,
              spents: response.data.data,
            };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
          } else {
            throw new Error("error en useEffect");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (user) {
      fetchExpenses(); // Llamar a fetchExpenses solo si user está definido
    }
  }, [setExpenses, setUser]);

  const handleEditSalary = () => {
    setEditingSalary(true);
  };

  const handleSaveSalary = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await apiClient.put(
        `/auth/update/${user!.id}`,
        JSON.stringify({ salary: updatedSalary }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.ok) {
        const updatedUser = { ...user!, salary: updatedSalary! };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setSalary(updatedSalary);
        setEditingSalary(false);
        toast({
          title: "Salario actualizado correctamente",
          description: "Cambios realizados correctamente",
          status: "success",
          position: "top-left",
          duration: 2000,
          isClosable: true,
        });
      } else {
        throw new Error("Error en la solicitud");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelEditSalary = () => {
    setUpdatedSalary(salary);
    setEditingSalary(false);
  };

  const handleDeleteExpense = async (id: number) => {
    setIsLoadingDeleted(true)
    try {
      const token = localStorage.getItem("token");
      const response = await apiClient.delete(`/spent/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.ok) {
        const updatedExpenses = expenses?.filter(
          (expense) => expense?.id !== id
        );
        setExpenses(updatedExpenses);
        const updatedUser = {
          ...user,
          spents: updatedExpenses,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setIsLoadingDeleted(false)
        toast({
          title: `Gasto Eliminado correctamente`,
          description: "Se ha eliminado el gasto",
          status: "error",
          duration: 2000,
          position: "top-left",
          isClosable: true,
        });
      } else {
        throw new Error("Error en la solicitud");
      }
    } catch (error) {
        setIsLoadingDeleted(false)
      console.log(error);
    }
  };

  const validateAddExpense = () => {
    if (expenseName.trim() === "") {
      toast({
        title: "Valores invalidos.",
        description: "Ingrese un gasto valido.",
        status: "error",
        duration: 1000,
        position: "top-left",
        isClosable: true,
      });
      setIsLoading(false);
      return false;
    }

    if (Number(expenseAmount) <= 0) {
      toast({
        title: "Valores invalidos.",
        description: "Ingrese una Total valido.",
        status: "error",
        duration: 2000,
        position: "top-left",
        isClosable: true,
      });
      setIsLoading(false);
      return false;
    }
    if (isNaN(Number(expenseAmount))) {
      toast({
        title: "Valores invalidos.",
        description: "Ingrese una Total valido.",
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

  const handleAddExpense = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const newExpense = {
      categorySpent: expenseCategory,
      name: expenseName,
      precio: Number(expenseAmount),
      user,
      description,
    };
    if (!validateAddExpense()) return;
    try {
      const token = localStorage.getItem("token");
      const response = await apiClient.post(
        "/spent",
        JSON.stringify(newExpense),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.ok) {
        const newSpent: Spent = {
          id: response.data.data.id,
          name: response.data.data.name,
          precio: response.data.data.precio,
          description: response.data.data.description,
          isActive: response.data.data.isActive,
        };
        const updatedExpenses = [...expenses!, newSpent];
        console.log(updatedExpenses);
        setExpenses(updatedExpenses);
        const updatedUser = {
          ...user,
          spents: updatedExpenses,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        toast({
          title: `Gasto ${newExpense.name} agregado correctamente`,
          description: "Se ha agregado correctamente",
          status: "success",
          duration: 2000,
          position: "top-left",
          isClosable: true,
        });
        setExpenseCategory(1);
        setExpenseAmount("");
        setDescription("");
        setExpenseName("");
        setIsLoading(false);
      } else {
        throw new Error("Error en la solicitud");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateRemaining = () => {
    if (!expenses) {
      return salary;
    }
    const totalExpenses = expenses!.reduce(
      (total, expense) => total + expense?.precio,
      0
    );
    return salary! - totalExpenses;
  };

  return (
    <Container
      bg={"teal"}
      maxW={{ md: "md", lg: "lg" }}
      color={"whiteAlpha.900"}
      pt={0}
      pb={2}
      rounded={"2xl"}
    >
      <Flex justify="space-between" align="center">
        <Heading mt={4}>Gestión de Gastos</Heading>
        <Button size="sm" colorScheme={"red"} onClick={handleLoguot}>
          Cerrar Sesión
        </Button>
      </Flex>

      {/* Sección para mostrar el salario mensual */}
      <Stack mt={4}>
        <Heading size="md">Salario Mensual</Heading>
        {editingSalary ? (
          <FormControl>
            <FormLabel>Nuevo salario</FormLabel>
            <Input
              type="number"
              value={updatedSalary}
              onChange={(e) => setUpdatedSalary(Number(e.target.value))}
            />
          </FormControl>
        ) : (
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Stat>
              <StatNumber> ${salary}</StatNumber>
            </Stat>
            <Stack
              mt={2}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <Heading size="md">Restante</Heading>
              <Text>:${calculateRemaining()}</Text>
            </Stack>
          </Flex>
        )}
        {editingSalary ? (
          <Stack direction="row">
            <Button colorScheme="green" onClick={handleSaveSalary}>
              Guardar
            </Button>
            <Button colorScheme="red" onClick={handleCancelEditSalary}>
              Cancelar
            </Button>
          </Stack>
        ) : (
          <Button colorScheme="green" onClick={handleEditSalary}>
            Editar salario
          </Button>
        )}
      </Stack>

      {/* Sección para mostrar los gastos */}
      <Stack mt={4}>
        <Heading size="md">Gastos</Heading>
        <div style={{ maxHeight: "150px", overflowY: "auto" }}>
          <List>
          {isLoadingDeleted ? (
                    <Flex
                      mt={4}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <CircularProgress isIndeterminate color="red.600" />
                    </Flex>
                  ) : ("")}
            {expenses?.map((expense, index) => (
              <ListItem key={index} mt={1}>
                <Flex justify="space-between">
                  <Text>
                    {expense?.name} - Total: {expense?.precio} -
                    {expense?.description}
                  </Text>
                 
                    <Button
                      size={"md"}
                      colorScheme="red"
                      onClick={() => handleDeleteExpense(expense?.id!)}
                    >
                      Eliminar
                    </Button>
                  
                </Flex>
              </ListItem>
            ))}
            
          </List>
        </div>
      </Stack>

      {/* Formulario para agregar nuevos gastos */}
      <Stack mt={4}>
        <Heading size="md">Agregar Gasto</Heading>
        <form onSubmit={handleAddExpense}>
          <FormLabel>Categoría:</FormLabel>
          <Menu>
            <MenuButton
              size={"lg"}
              colorScheme="telegram"
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              {categories && categories.length > 0 && (
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  flexDirection={"row"}
                  gap={2}
                >
                  <Image
                    boxSize="2rem"
                    borderRadius="full"
                    src={`${categories[expenseCategory - 1]?.img}`}
                    alt="img logo"
                    mr="12px"
                  />
                  <span>{categories[expenseCategory - 1]?.name}</span>
                </Box>
              )}{" "}
            </MenuButton>
            <MenuList>
              {categories!.map((option) => {
                return (
                  <MenuItem
                    key={option.id}
                    color={"blackAlpha.900"}
                    minH="48px"
                    onClick={() => setExpenseCategory(Number(option.id))}
                  >
                    <Image
                      boxSize="2rem"
                      borderRadius="full"
                      src={`${option.img}`}
                      alt="img logo"
                      mr="12px"
                    />
                    <span>{option.name}</span>
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>

          <FormControl id="expenseName">
            <FormLabel>Nombre:</FormLabel>
            <Input
              type="text"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
            />
          </FormControl>

          <FormControl id="expenseAmount">
            <FormLabel>Total:</FormLabel>
            <Input
              type="text"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
            />
          </FormControl>

          <FormControl id="expenseDescription">
            <FormLabel>Descripción:</FormLabel>
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          {isLoading ? (
            <Flex mt={4} justifyContent={"center"} alignItems={"center"}>
              <CircularProgress isIndeterminate color="green.300" />
            </Flex>
          ) : (
            <Button colorScheme="green" mt={2} type="submit">
              Agregar Gasto
            </Button>
          )}
        </form>
      </Stack>
    </Container>
  );
}
