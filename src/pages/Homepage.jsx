import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { Navbar } from "../components/Homepage/Navbar";
import noteimage from "../assets/noteimage.png";

export default function Homepage() {
  return (
    <Box padding={8}>
      <Image className="imgnote"position={"absolute"} src={noteimage} />
      <Heading mt={16} textAlign={"start"} size={"4xl"}>
        Note App
      </Heading>
      {/* <Text mt={8} maxW={"50%"} textAlign={"justify"}>
        A note application is a software program that allows users to create,
        organize, and manage their digital notes. It is an essential tool for
        anyone looking to streamline their daily tasks, increase productivity,
        and stay organized. With its user-friendly interface and powerful
        features, a note application is perfect for students, professionals, and
        anyone who needs to keep track of their ideas, tasks, and goals. One of
        the main features of a note application is its ability to create and
        edit notes. 
        
      </Text>
     */}

    </Box>
  );
}
