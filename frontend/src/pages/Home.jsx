import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  Box,
  Flex,
  Text,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  useColorModeValue,
} from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/product";
import toast from "react-hot-toast";

export default function Home() {
  const pageBg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");
  const titleColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.400", "gray.500");
  const addTileColor = useColorModeValue("gray.400", "gray.500");
  const addTileHoverBg = useColorModeValue("blue.50", "blue.900");

  const [loading, setLoading] = useState(true);

  const { fetchProduct, products } = useProductStore();
  useEffect(() => {
    const load = async () => {
      try {
        await fetchProduct();
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [fetchProduct]);

  return (
    <Box maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} py={8} bg={pageBg}>
      <Flex
        justify="space-between"
        align="flex-start"
        mb={6}
        wrap="wrap"
        gap={4}
      >
        <Box>
          <Text
            fontSize="2xl"
            fontWeight="700"
            color={titleColor}
            lineHeight={1.2}
          >
            Product Inventory
          </Text>
          <Text fontSize="sm" color={subTextColor} mt={1}>
            Manage your product inventory here
          </Text>
        </Box>
      </Flex>

      {loading ? (
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Box
              key={i}
              bg={cardBg}
              borderRadius="10px"
              overflow="hidden"
              border="1px solid"
              borderColor={borderColor}
            >
              <Skeleton h="180px" />
              <Box p={3}>
                <Skeleton h="14px" mb={1.5} />
                <Skeleton h="12px" w="70%" mb={2} />
                <Skeleton h="14px" w="50%" />
                <Box
                  mt={2}
                  pt={2}
                  borderTop="1px solid"
                  borderColor={borderColor}
                >
                  <Skeleton h="10px" w="40%" />
                </Box>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
          {(Array.isArray(products) ? products : []).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}

          <Link to="/create">
            <Box
              h="full"
              minH="260px"
              border="2px dashed"
              borderColor={borderColor}
              borderRadius="10px"
              display="flex"
              flexDir="column"
              alignItems="center"
              justifyContent="center"
              gap={2}
              cursor="pointer"
              color={addTileColor}
              _hover={{
                borderColor: "blue.300",
                color: "blue.400",
                bg: addTileHoverBg,
              }}
              transition="all 0.2s"
            >
              <Box
                w={10}
                h={10}
                borderRadius="full"
                border="2px solid"
                borderColor="currentColor"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="xl"
              >
                +
              </Box>
              <Text fontWeight="600" fontSize="sm">
                Add New Product
              </Text>
              <Text fontSize="xs" textAlign="center" px={4}>
                Upload image and details
              </Text>
            </Box>
          </Link>
        </SimpleGrid>
      )}
    </Box>
  );
}
