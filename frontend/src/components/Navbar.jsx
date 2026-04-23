import { Link, useLocation } from "react-router";
import {
  Box,
  Flex,
  Text,
  Button,
  IconButton,
  HStack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Bell, Moon, Plus, Store, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.400");
  const hoverBg = useColorModeValue("gray.200", "whiteAlpha.100");
  const navBg = useColorModeValue("white", "gray.800");
  const navBorder = useColorModeValue("gray.100", "gray.700");

  const { colorMode, toggleColorMode } = useColorMode();
  const { pathname } = useLocation();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      as="nav"
      px={8}
      py={3}
      position="sticky"
      top={0}
      zIndex={100}
      bg={scrolled ? navBg : "transparent"}
      boxShadow={scrolled ? "sm" : "none"}
      borderBottom={scrolled ? "1px solid" : "none"}
      borderColor={navBorder}
      transition="all 0.1s ease"
    >
      <Flex maxW="7xl" mx="auto" align="center" justify="space-between">
        <Link to={"/"}>
          <Flex align="center">
            <IconButton
              aria-label="Home"
              icon={<Store />}
              size="lg"
              variant="ghost"
              color={subTextColor}
              _hover={{ color: textColor, bg: hoverBg }}
            ></IconButton>
            <Text
              color={textColor}
              fontWeight="700"
              fontSize="lg"
              letterSpacing="tight"
            >
              Product Store
            </Text>
          </Flex>
        </Link>
        <HStack spacing={3}>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === "light" ? <Moon /> : <Sun />}
            onClick={toggleColorMode}
            size="sm"
            variant="solid"
            color={subTextColor}
            _hover={{ color: textColor, bg: hoverBg }}
          />
          <Link to="/create">
            <Button
              size="sm"
              colorScheme="blue"
              bg={pathname === "/create" ? "blue.400" : "blue.500"}
              _hover={{ bg: "blue.400" }}
              disabled={pathname === "/create"}
              px={5}
              fontWeight={600}
              fontSize="sm"
              rightIcon={<Plus />}
            >
              Create
            </Button>
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
}
