import { Box, Heading, Text, Stack, Avatar, Flex } from "@chakra-ui/react";

export default function About() {
  return (
    <Box bg={"teal.600"} maxW="md" mx="auto" py={1} px={6} borderWidth={1} borderRadius="md" boxShadow="md">
      <Heading textAlign={"center"} textColor={"white"} mt={4} fontSize="xl">Acerca de mí</Heading>
      <Flex alignItems={"center"} justifyContent={"space-between"} gap={2}>
      <Avatar size="xl" src="me.jpg" />
      <Text fontSize={"lg"} fontWeight={"light"} textColor={"whiteAlpha.900"} mt={2}>
      ¡Hola! Soy Franco, un estudiante de Licenciatura en sistemas de informacion en la Universidad Nacional del Nordeste,
      </Text>
      </Flex>
      <Text fontSize={"lg"} fontWeight={"light"} textColor={"white"} lineHeight={"7"} mt={2}>
         Soy un apasionado del desarrollo de software. Me encanta Desarrollar apliacaciones y programar sistemas. Mi objetivo principal es compartir y presentar la aplicación de administración de gastos que he desarrollado. Me gustaría mostrar cómo la aplicación puede ayudar a las personas a realizar un seguimiento eficiente de sus gastos, administrar su presupuesto y tomar decisiones financieras más informadas. Además, estoy abierto a recibir comentarios y sugerencias para mejorar aún más la aplicación y aprender de la experiencia de otros desarrolladores y usuarios..
      </Text>
      <Stack color={"white"} direction="row" mt={4} spacing={2}>
        <Text fontWeight="bold">Email:</Text>
        <Text>francobarrientos56@gmail.com</Text>
      </Stack>
      <Stack color={"white"} direction="row" spacing={2}>
        <Text fontWeight="bold">Sitio web:</Text>
        <Text>frandesigns.netlify.app/</Text>
      </Stack>
    </Box>
  );
}
