import { useState, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Box,
  Image,
  Text,
  Flex,
} from "@chakra-ui/react";

const FALLBACK = "https://placehold.co/400x300/E2E8F0/94A3B8?text=No+Image";

export default function EditProductModal({
  isOpen,
  onClose,
  product,
  setProduct,
  handleUpdate,
  isLoading,
}) {
  const [previewUrl, setPreviewUrl] = useState(product.image?.url || FALLBACK);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct((prev) => ({ ...prev, image: file }));
      const newPreview = URL.createObjectURL(file);
      setPreviewUrl(newPreview);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(2px)" />
      <ModalContent borderRadius="xl" p={2}>
        <ModalHeader fontWeight="bold" fontSize="lg">
          Edit Product
        </ModalHeader>
        <ModalCloseButton mt={3} mr={3} />

        <ModalBody pb={6}>
          <FormControl mb={5}>
            <FormLabel
              fontSize="xs"
              fontWeight="700"
              color="gray.500"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              Product Image
            </FormLabel>

            <Box
              w="full"
              h="160px"
              borderRadius="lg"
              overflow="hidden"
              position="relative"
              cursor="pointer"
              role="group"
              onClick={handleImageClick}
              border="1px solid"
              borderColor="gray.200"
            >
              <Image
                src={previewUrl}
                alt="Product Preview"
                w="full"
                h="full"
                objectFit="cover"
                transition="all 0.2s"
                _groupHover={{ filter: "brightness(0.7)" }}
              />
              <Flex
                position="absolute"
                inset={0}
                align="center"
                justify="center"
                opacity={0}
                bg="blackAlpha.400"
                transition="all 0.2s"
                _groupHover={{ opacity: 1 }}
              >
                <Text color="white" fontWeight="600" fontSize="sm">
                  Click to change image
                </Text>
              </Flex>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </Box>
          </FormControl>

          <FormControl mb={5}>
            <FormLabel
              fontSize="xs"
              fontWeight="700"
              color="gray.500"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              Product Name
            </FormLabel>
            <Input
              value={product.name || ""}
              borderRadius="md"
              borderColor="gray.300"
              _focus={{
                borderColor: "blue.500",
                boxShadow: "0 0 0 1px #3182ce",
              }}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
          </FormControl>

          {/* Price Section */}
          <FormControl mb={2}>
            <FormLabel
              fontSize="xs"
              fontWeight="700"
              color="gray.500"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              Price (USD)
            </FormLabel>
            <NumberInput
              value={product.price || 0}
              onChange={(valString, valNumber) =>
                setProduct({ ...product, price: valNumber })
              }
            >
              <NumberInputField
                borderRadius="md"
                borderColor="gray.300"
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px #3182ce",
                }}
              />
            </NumberInput>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose} fontWeight="600">
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            fontWeight="600"
            isLoading={isLoading}
            loadingText="Updating..."
            onClick={(e) => handleUpdate(e, product._id)}
          >
            Update Product
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
