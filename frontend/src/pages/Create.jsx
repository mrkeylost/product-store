import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Flex,
  Grid,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  FormControl,
  FormLabel,
  VStack,
  HStack,
  Image,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import { CloudUpload } from "lucide-react";
import { useProductStore } from "../store/product";
import toast from "react-hot-toast";

export default function Create() {
  const pageBg = useColorModeValue("white", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");
  const titleColor = useColorModeValue("gray.800", "white");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const subTextColor = useColorModeValue("gray.400", "gray.500");
  const inputBg = useColorModeValue("white", "gray.700");
  const hoverBg = useColorModeValue("gray.100", "whiteAlpha.100");
  const dropBg = useColorModeValue("gray.50", "gray.700");
  const dropActiveBg = useColorModeValue("blue.50", "blue.900");
  const previewBg = useColorModeValue("gray.50", "gray.700");
  const iconCircleBg = useColorModeValue("blue.50", "blue.900");
  const fileMetaColor = useColorModeValue("gray.500", "gray.400");

  const navigate = useNavigate();
  const fileRef = useRef();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fileSizeLabel = file
    ? file.size / 1024 < 1024
      ? `${(file.size / 1024).toFixed(0)} KB`
      : `${(file.size / 1024 / 1024).toFixed(1)} MB`
    : "";

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const { createProduct } = useProductStore();
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { success, message } = await createProduct({
        name,
        price,
        image: file,
      });

      if (success) {
        toast.success(message);
        navigate("/");
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.error === 429) {
        toast.error("Rate limit activated, please do not spam");
      } else {
        toast.error("Failed to create product");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxW="5xl" mx="auto" px={{ base: 4, md: 8 }} py={10} bg={pageBg}>
      <Box textAlign="center" mb={8}>
        <Text fontSize="2xl" fontWeight="700" color={titleColor}>
          Create New Product
        </Text>
        <Text fontSize="sm" color={subTextColor} mt={1}>
          List a new accessory or device in the inventory.
        </Text>
      </Box>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
        <Box
          bg={cardBg}
          borderRadius="10px"
          p={5}
          border="1px solid"
          borderColor={borderColor}
        >
          <Text fontWeight="600" fontSize="sm" color={textColor} mb={1}>
            Product Image
          </Text>
          <Text fontSize="xs" color={subTextColor} mb={4}>
            Upload a single image to represent this product.
          </Text>

          {preview ? (
            <Box>
              <Box
                borderRadius="8px"
                overflow="hidden"
                border="1px solid"
                borderColor={borderColor}
                bg={previewBg}
                h="220px"
              >
                <Image
                  src={preview}
                  alt="Preview"
                  w="full"
                  h="full"
                  objectFit="contain"
                  p={3}
                />
              </Box>

              {/* File meta */}
              <HStack mt={3} spacing={2} px={1}>
                <CloudUpload size={20} />
                <Text
                  fontSize="xs"
                  color={fileMetaColor}
                  noOfLines={1}
                  flex={1}
                >
                  {file?.name}
                </Text>
                <Text fontSize="xs" color={subTextColor} flexShrink={0}>
                  {fileSizeLabel}
                </Text>
              </HStack>

              {/* Actions */}
              <HStack mt={3} spacing={2}>
                <Button
                  size="sm"
                  variant="outline"
                  borderColor={borderColor}
                  color={textColor}
                  fontSize="xs"
                  fontWeight={500}
                  flex={1}
                  onClick={() => fileRef.current.click()}
                  _hover={{ bg: hoverBg }}
                >
                  Replace Image
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  color="red.400"
                  fontSize="xs"
                  fontWeight={500}
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                  }}
                  _hover={{ bg: "red.50", color: "red.500" }}
                >
                  Remove
                </Button>
              </HStack>
            </Box>
          ) : (
            <Box
              border="2px dashed"
              borderColor={dragOver ? "blue.400" : borderColor}
              borderRadius="8px"
              bg={dragOver ? dropActiveBg : dropBg}
              h="220px"
              display="flex"
              flexDir="column"
              alignItems="center"
              justifyContent="center"
              gap={3}
              cursor="pointer"
              transition="all 0.2s"
              onClick={() => fileRef.current.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                handleFile(e.dataTransfer.files[0]);
              }}
            >
              <Box
                w={12}
                h={12}
                borderRadius="full"
                bg={iconCircleBg}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <CloudUpload size={20} />
              </Box>
              <VStack spacing={1}>
                <Text fontWeight="600" fontSize="sm" color={textColor}>
                  Drag & drop or click to upload
                </Text>
                <Text fontSize="xs" color={subTextColor}>
                  PNG, JPG or WebP
                </Text>
              </VStack>
              <Button
                size="sm"
                variant="outline"
                borderColor={borderColor}
                color={textColor}
                fontSize="xs"
                fontWeight={600}
                bg={cardBg}
                _hover={{ bg: hoverBg }}
                onClick={(e) => {
                  e.stopPropagation();
                  fileRef.current.click();
                }}
              >
                Browse Files
              </Button>
            </Box>
          )}

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </Box>

        {/* RIGHT — Form Fields */}
        <Box
          bg={cardBg}
          borderRadius="10px"
          p={5}
          border="1px solid"
          borderColor={borderColor}
        >
          <VStack spacing={5} align="stretch">
            <FormControl>
              <FormLabel
                fontSize="sm"
                fontWeight="700"
                color={textColor}
                mb={1}
              >
                Product Name
              </FormLabel>
              <Input
                placeholder="e.g. Wireless Earbuds"
                value={name}
                onChange={(e) => setName(e.target.value)}
                bg={inputBg}
                borderColor={borderColor}
                focusBorderColor="blue.400"
                borderRadius="6px"
                fontSize="sm"
                _placeholder={{ color: subTextColor }}
              />
            </FormControl>

            <FormControl>
              <FormLabel
                fontSize="sm"
                fontWeight="700"
                color={textColor}
                mb={1}
              >
                Price (Rupiah)
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color={textColor}
                  fontSize="sm"
                >
                  Rp
                </InputLeftElement>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  bg={inputBg}
                  borderColor={borderColor}
                  focusBorderColor="blue.400"
                  pl={8}
                  borderRadius="6px"
                  fontSize="sm"
                  _placeholder={{ color: subTextColor }}
                />
              </InputGroup>
            </FormControl>

            <Box flex={1} />

            <HStack
              justify="flex-end"
              spacing={3}
              pt={4}
              borderTop="1px solid"
              borderColor={borderColor}
            >
              <Button
                variant="ghost"
                size="sm"
                color={subTextColor}
                _hover={{ bg: hoverBg }}
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                size="sm"
                px={6}
                fontWeight={600}
                isLoading={isLoading}
                loadingText="Creating..."
                onClick={handleAddProduct}
              >
                Create Product
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Grid>
    </Box>
  );
}
