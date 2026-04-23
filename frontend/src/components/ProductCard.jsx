import {
  Box,
  Image,
  Text,
  HStack,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { formatIDR } from "../utils/formatCurrency";

const FALLBACK = "https://placehold.co/400x300/E2E8F0/94A3B8?text=No+Image";

const BADGE_COLORS = {
  "New Arrival": "blue",
  Limited: "orange",
  "Best Seller": "green",
};

export default function ProductCard({ product }) {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");
  const imageBg = useColorModeValue("gray.50", "gray.700");
  const nameColor = useColorModeValue("gray.800", "white");
  const subColor = useColorModeValue("gray.400", "gray.500");
  const stockBorder = useColorModeValue("gray.100", "gray.700");

  const badge = product.badge || null;

  return (
    <Box
      bg={cardBg}
      borderRadius="10px"
      overflow="hidden"
      border="1px solid"
      borderColor={borderColor}
      transition="box-shadow 0.2s, transform 0.2s"
      _hover={{ shadow: "md", transform: "translateY(-2px)" }}
      role="group"
      position="relative"
    >
      {badge && (
        <Badge
          position="absolute"
          top={2.5}
          left={2.5}
          zIndex={1}
          colorScheme={BADGE_COLORS[badge] || "gray"}
          fontSize="2xs"
          px={2}
          py={0.5}
          borderRadius="4px"
          textTransform="none"
          fontWeight="600"
        >
          {badge}
        </Badge>
      )}

      <Box h="180px" overflow="hidden" bg={imageBg}>
        <Image
          src={product.image.url || FALLBACK}
          alt={product.name}
          w="full"
          h="full"
          objectFit="cover"
          fallbackSrc={FALLBACK}
          transition="transform 0.4s"
          _groupHover={{ transform: "scale(1.04)" }}
        />
      </Box>

      <Box p={3}>
        <Text
          fontWeight="600"
          fontSize="sm"
          color={nameColor}
          noOfLines={1}
          mb={0.5}
        >
          {product.name}
        </Text>
        <Text fontSize="xs" color={subColor} noOfLines={1} mb={2}>
          {product.subtitle || ""}
        </Text>
        <Text fontWeight="700" fontSize="sm" color="blue.500">
          {formatIDR(product.price)}
        </Text>

        <HStack
          mt={2}
          pt={2}
          borderTop="1px solid"
          borderColor={stockBorder}
          spacing={1.5}
        >
          <Box
            w={1.5}
            h={1.5}
            borderRadius="full"
            bg={product.inStock !== false ? "green.400" : "red.400"}
          />
          <Text fontSize="2xs" color={subColor}>
            {product.inStock !== false ? "In stock" : "Out of stock"}
          </Text>
        </HStack>
      </Box>
    </Box>
  );
}
