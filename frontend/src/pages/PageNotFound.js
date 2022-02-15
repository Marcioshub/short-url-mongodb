import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  Container,
  Heading,
  Button,
  Center,
} from "@chakra-ui/react";
import {
  FcAssistant,
  FcDonate,
  FcInTransit,
  FcCheckmark,
} from "react-icons/fc";
import { FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link as ReactLink } from "react-router-dom";

const Feature = ({ title, text, icon }) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  );
};

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
          >
            Back to home page
          </Button>
        </Center>
      </Stack>
      <br />
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {urls.map((u, i) => (
          <Feature
            key={i}
            icon={<Icon as={FcCheckmark} w={10} h={10} />}
            title={u.short}
            text={u.original}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
