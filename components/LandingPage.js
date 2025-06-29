import LetEmailForInfoForm from '@/components/LetEmailForInfoForm';
import {
  Flex,
  Box,
  Container,
  Image,
  Heading,
  Button,
  Center,
  Spinner,
} from '@chakra-ui/react';

const LandingPage = ({
  logoUrl,
  description,
  ctaButtonText,
  ctaButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  infoText,
  videoUrl,
  loading = false,
}) => {
  if (loading) {
    return (
      <Center w="100vw" h="100vh" bg="white">
        <Spinner size="xl" color="green.500" />
      </Center>
    );
  }

  return (
    <Box position="relative" minHeight="100vh" color="white" overflow="hidden">
      {/* Fondo (video o imagen) */}
      {videoUrl?.endsWith('.mp4') ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            zIndex: -1,
            pointerEvents: 'none',
          }}
          src={`/uploads/${videoUrl}`}
          type="video/mp4"
        />
      ) : (
        <Image
          src={`/uploads/${videoUrl}`}
          alt="Fondo"
          objectFit="cover"
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          zIndex={-1}
          opacity={0.8}
          pointerEvents="none"
        />
      )}

      {/* Overlays */}
      <Box position="fixed" inset={0} bg="rgba(0, 0, 0, 0.6)" zIndex={0} />
      <Box position="fixed" inset={0} bg="rgba(0, 150, 136, 0.2)" zIndex={0} />

      {/* Logo y botón */}
      {(logoUrl || (ctaButtonText && ctaButtonLink)) && (
        <Flex
          direction="column"
          align="center"
          justify="center"
          position="absolute"
          top={{ base: '10%', md: '5%' }}
          left="50%"
          transform="translateX(-50%)"
          zIndex={2}
          px={4}
          textAlign="center"
          w="100%"
        >
          {logoUrl && (
            <Image
              src={`/uploads/${logoUrl}`}
              alt="Logo"
              boxSize={{ base: '120px', md: '190px' }}
              mb={6}
              objectFit="contain"
              filter="drop-shadow(0 0 5px rgba(0,0,0,0.7))"
            />
          )}
          {ctaButtonText && ctaButtonLink && (
            <Button
              as="a"
              href={ctaButtonLink}
              target="_blank"
              rel="noopener noreferrer"
              bg="green.500"
              color="white"
              size="lg"
              fontSize={{ base: 'sm', md: 'xl' }}
              px={{ base: 8, md: 12 }}
              py={{ base: 5, md: 7 }}
              borderRadius="lg"
              _hover={{ bg: 'green.600' }}
              fontWeight="semibold"
              w={{ base: '90%', sm: 'auto' }}
            >
              {ctaButtonText}
            </Button>
          )}
        </Flex>
      )}

      {/* Contenido principal */}
      <Container
        maxW="container.xl"
        position="relative"
        zIndex={1}
        pt={{ base: '65vh', md: '40vh' }}
        pb={{ base: 16, md: 32 }}
        px={{ base: 4, md: 6 }}
        minHeight="100vh"
      >
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="center"
          gap={{ base: 12, md: 16 }}
          wrap="wrap"
        >
          {/* Columna izquierda */}
          <Box flex="1" textAlign={{ base: 'center', md: 'left' }} maxW="600px">
            <Heading
              as="h1"
              fontSize={{ base: '2xl', md: '4xl' }}
              fontWeight="bold"
              mb={6}
              letterSpacing="-0.5px"
            >
              {description}
            </Heading>

            {infoText && (
              <Heading
                as="h2"
                fontSize={{ base: 'lg', md: '2xl' }}
                fontWeight="semibold"
                mt={8}
              >
                {infoText}
              </Heading>
            )}

            {secondaryButtonText && (
              <Heading
                as="h2"
                fontSize={{ base: 'lg', md: '2xl' }}
                fontWeight="semibold"
                mt={6}
              >
                {secondaryButtonText}
              </Heading>
            )}
          </Box>

          {/* Formulario */}
          <Box
            flex="1"
            bg="rgba(255, 255, 255, 0.1)"
            p={{ base: 6, md: 8 }}
            borderRadius="md"
            boxShadow="lg"
            w="100%"
            maxW="500px"
          >
            <LetEmailForInfoForm />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default LandingPage;
