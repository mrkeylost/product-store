import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Box
      minH={"100vh"}
      display={"flex"}
      flexDir={"column"}
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </Box>
  );
}
