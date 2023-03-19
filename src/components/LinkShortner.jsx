import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";

const LinkShortner = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(longUrl)}`
      );
      setShortUrl(response.data.result.short_link);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setIsCopied(true);
  };

  return (
    <div>
      <VStack
        spacing={10}
        align="center"
        borderRadius="lg"
        boxShadow="md"
        p={8}
        bg="blue.200"
      >
        <form onSubmit={handleSubmit}>
          <FormControl id="longUrl">
            <FormLabel>Long URL</FormLabel>
            <InputGroup>
              <Input
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                placeholder="Enter Your URL"
                isRequired
              />

              <Button
                size="md"
                colorScheme="blue"
                type="submit"
                isLoading={isLoading}
                _hover={{ boxShadow: "lg" }}
              >
                Shorten
              </Button>
            </InputGroup>
          </FormControl>
        </form>
      </VStack>

      <VStack
        spacing={4}
        align="stretch"
        borderRadius="lg"
        boxShadow="md"
        p={8}
        bg="blue.200"
      >
        <form>
          {shortUrl && (
            <FormControl id="shortUrl">
              <FormLabel>Short URL</FormLabel>
              <InputGroup>
                <Input value={shortUrl} isReadOnly />

                <Button
                  size="md"
                  colorScheme="green"
                  onClick={handleCopy}
                  disabled={isCopied}
                >
                  {isCopied ? "Copied" : <FaCopy />}
                </Button>
              </InputGroup>
            </FormControl>
          )}
        </form>
      </VStack>

      {!shortUrl && !isLoading && (
        <Box mt={4} color="gray.500">
          Enter a Valid URL
        </Box>
      )}
    </div>
  );
};

export default LinkShortner;
