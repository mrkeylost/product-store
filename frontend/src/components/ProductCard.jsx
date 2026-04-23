import {
  Box,
  Image,
  Text,
  HStack,
  Badge,
  useColorModeValue,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { formatIDR } from "../utils/formatCurrency";
import { Pencil, Trash2 } from "lucide-react";
import EditProductModal from "./EditModal";
import DeleteProductDialog from "./DeleteDialog";
import { useState } from "react";
import { useProductStore } from "../store/product";
import toast from "react-hot-toast";

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

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const [selectedProduct, setSelectedProduct] = useState(product);
  const [isLoading, setIsLoading] = useState(false);

  const { updateProduct, deleteProduct } = useProductStore();

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    try {
      const { success, message } = await updateProduct(id, selectedProduct);

      if (success) {
        toast.success(message);
        onEditClose();
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      const { success, message } = await deleteProduct(id);

      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

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
      <Box
        position="absolute"
        top={2.5}
        right={2.5}
        zIndex={2}
        opacity={0}
        _groupHover={{ opacity: 1 }}
        transition="opacity 0.2s"
      >
        <HStack spacing={1}>
          <IconButton
            size="sm"
            colorScheme="yellow"
            icon={<Pencil size={15} />}
            onClick={onEditOpen}
          />
          <IconButton
            size="sm"
            colorScheme="red"
            icon={<Trash2 size={15} />}
            onClick={onDeleteOpen}
          />
        </HStack>
      </Box>

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
        <Box
          position="absolute"
          top={0}
          left={0}
          w="full"
          h="full"
          bg="blackAlpha.200"
          opacity={0}
          _groupHover={{ opacity: 1 }}
          transition="opacity 0.3s"
          pointerEvents="none"
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
          <Box w={1.5} h={1.5} borderRadius="full" bg={"green.400"} />
          <Text fontSize="2xs" color={subColor}>
            In stock
          </Text>
        </HStack>
      </Box>

      <EditProductModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        product={selectedProduct}
        setProduct={setSelectedProduct}
        handleUpdate={handleUpdate}
        isLoading={isLoading}
      />

      <DeleteProductDialog
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        product={selectedProduct}
        handleDelete={handleDelete}
      />
    </Box>
  );
}
