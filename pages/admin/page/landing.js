import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Input, Textarea, Button, VStack, Heading, Image, Box, Text
} from '@chakra-ui/react';
import Container from '@/components/Container';

export default function Landing() {
  const [config, setConfig] = useState({
    logoUrl: '',
    videoUrl: '',
    description: '',
    ctaButtonText: '',
    ctaButtonLink: '',
    infoText: '',
    secondaryButtonText: '',
    secondaryButtonLink: ''
  });

  const [uploading, setUploading] = useState(false);

  // Estado para mensaje de notificación
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: string }

  const fetchConfig = async () => {
    const { data } = await axios.get('/api/page/landing');
    setConfig(data);
  };

  const saveConfig = async () => {
    try {
      await axios.post('/api/page/landing', config);
      setMessage({ type: 'success', text: 'Configuración guardada correctamente' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al guardar la configuración' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e, target = 'logo') => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);
    const isMp4Video = file.type === 'video/mp4';

    try {
      const res = await axios.post('/api/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (isMp4Video) {
        setConfig(prev => ({ ...prev, videoUrl: res.data.filename }));
      } else {
        setConfig(prev => ({ ...prev, logoUrl: res.data.filename }));
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Error al subir el archivo' });
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  // Para limpiar el mensaje tras 5 segundos
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <Container>
      <VStack spacing={4} p={8} align="start" width="100%">

        {message && (
          <Box
            p={3}
            mb={4}
            width="100%"
            borderRadius="md"
            bg={message.type === 'success' ? 'green.100' : 'red.100'}
            color={message.type === 'success' ? 'green.800' : 'red.800'}
          >
            <Text>{message.text}</Text>
          </Box>
        )}

        <Heading size="md">Configuración Landing Page</Heading>

        <div className="my-4">
          <Image
            src={`/uploads/${config.logoUrl}`}
            alt="Logo"
            boxSize="50px"
            objectFit="contain"
          />
          <label className="form-label">Subir logo:</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={(e) => handleFileUpload(e, 'logo')}
            disabled={uploading}
          />
        </div>
        <div className="my-4">
          {config.videoUrl?.endsWith('.mp4') ? (
            <video
              src={`/uploads/${config.videoUrl}`}
              type="video/mp4"
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100px', height: 'auto' }}
            />
          ) : (
            <Image
              src={`/uploads/${config.videoUrl}?t=${Date.now()}`}
              alt="Fondo"
              objectFit="cover"
              width="10px"
            />
          )}

          <label className="form-label">Subir fondo animado (video o imagen):</label>
          <input
            type="file"
            accept="image/*,video/*"
            className="form-control"
            onChange={(e) => handleFileUpload(e, 'background')}
            disabled={uploading}
          />
        </div>
        <Input name="description" placeholder="Titulo" value={config.description} onChange={handleChange} />
        <Input name="ctaButtonText" placeholder="Texto del botón principal" value={config.ctaButtonText} onChange={handleChange} />
        <Input name="ctaButtonLink" placeholder="Enlace del botón principal" value={config.ctaButtonLink} onChange={handleChange} />
        <Textarea name="infoText" placeholder="Texto extra" value={config.infoText} onChange={handleChange} />
        <Input name="secondaryButtonText" placeholder="Texto del botón secundario" value={config.secondaryButtonText} onChange={handleChange} />
        <Button colorScheme="green" onClick={saveConfig} isLoading={uploading}>Guardar</Button>
      </VStack>
    </Container>
  );
}
