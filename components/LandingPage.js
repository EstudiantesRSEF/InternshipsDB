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
  useBreakpointValue,
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
  // Absolute sólo en pantallas extra grandes (>1200px)
  const isXL = useBreakpointValue({ base: false, xl: true });

  if (loading) {
    return (
      <Center w="100vw" h="100vh" bg="white">
        <Spinner size="xl" color="green.500" />
      </Center>
    );
  }

  return (
    <Box position="relative" minHeight="100vh" color="white" overflow="hidden">
      {/* Fondo */}
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
          position="static" // <-- SIEMPRE en el flujo
          zIndex={2}
          px={4}
          textAlign="center"
          w="100%"
          mb={6}
        >
          {logoUrl && (
            <Image
              src={`/uploads/${logoUrl}`}
              alt="Logo"
              boxSize={{ base: '70px', sm: '100px', md: '120px', lg: '150px', xl: '190px' }}
              mb={4}
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
              size={{ base: 'md', md: 'lg', xl: 'lg' }}
              fontSize={{ base: 'sm', sm: 'md', md: 'lg', xl: 'xl' }}
              px={{ base: 6, sm: 8, md: 10, xl: 12 }}
              py={{ base: 4, sm: 5, md: 6, xl: 7 }}
              borderRadius="lg"
              _hover={{ bg: 'green.600' }}
              fontWeight="semibold"
              w={{ base: '90%', sm: 'auto' }}
              mt={logoUrl ? 2 : 0}
            >
              {ctaButtonText}
            </Button>
          )}
        </Flex>
      )}

      {/* Contenido principal, menos padding-top en laptops */}
<Container
  maxW="container.xl"
  position="relative"
  zIndex={1}
  pt={{ base: 6, md: 10, lg: 16, xl: 20 }} // NO MÁS DE 80px (20) NI EN XL
  pb={{ base: 12, md: 20, xl: 32 }}
  px={{ base: 4, md: 6 }}
  minHeight="100vh"
>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="center"
          gap={{ base: 8, md: 12, xl: 16 }}
          wrap="wrap"
        >
          <Box flex="1" textAlign={{ base: 'center', md: 'left' }} maxW="600px">
            <Heading
              as="h1"
              fontSize={{ base: 'xl', sm: '2xl', md: '3xl', xl: '4xl' }}
              fontWeight="bold"
              mb={6}
              letterSpacing="-0.5px"
            >
              {description}
            </Heading>
            {infoText && (
              <Heading
                as="h2"
                fontSize={{ base: 'md', md: 'xl', xl: '2xl' }}
                fontWeight="semibold"
                mt={8}
              >
                {infoText}
              </Heading>
            )}
            {secondaryButtonText && (
              <Heading
                as="h2"
                fontSize={{ base: 'md', md: 'xl', xl: '2xl' }}
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
            p={{ base: 4, md: 6, xl: 8 }}
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