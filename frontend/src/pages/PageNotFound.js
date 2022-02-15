import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
  Button,
  Center,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link as ReactLink } from "react-router-dom";

export default function PageNotFound() {
  const [urls, setUrls] = useState([]);

  async function getUrls() {
    const response = await axios.get("/api/urls");

    if (response.data) {
      setUrls(response.data);
    }
  }

  useEffect(() => {
    getUrls();
  }, []);

  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={"3xl"}>404 Error page</Heading>
        <Text color={"gray.600"} fontSize={"xl"}>
          Sorry, we could not find your shorten url. It may have already
          expired, short urls expire and are removed from the database after 1
          hour. These are the currently active short urls below.
        </Text>
        <Center>
          <Button
            rounded={"full"}
            px={6}
            colorScheme={"orange"}
            bg={"orange.400"}
            _hover={{ bg: "orange.500" }}
            width="200px"
            as={ReactLink}
            to="/"
            // onClick={openModal}
            // disabled={url === ""}
          >
            Back to home page
          </Button>
        </Center>
      </Stack>

      <Container maxW={"6xl"} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {urls.map((u, i) => (
            <HStack key={i} align={"top"}>
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600}>{u.short}</Text>
                <Text color={"gray.600"}>{u.original}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
