"use client";
import React from 'react';

type Props = {
  src: string;
  title?: string;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
};

export default function VideoPlayer({ src, title, onProgress, onComplete }: Props) {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [progress, setProgress] = React.useState(0);
  const [hasCompleted, setHasCompleted] = React.useState(false);

  React.useEffect(() => {
    // Para vídeos do YouTube, precisamos usar a API do YouTube
    // Como estamos usando iframe, vamos simular o progresso baseado no tempo
    // Em um ambiente real, você usaria a YouTube Player API
    
    const checkProgress = () => {
      // Simulação de progresso - em produção, você usaria a API real do YouTube
      // Por enquanto, vamos simular um progresso baseado no tempo decorrido
      const currentTime = Date.now();
      const startTime = currentTime - (progress * 1000); // Simulação
      
      // Incrementa progresso gradualmente
      if (progress < 1) {
        const newProgress = Math.min(progress + 0.01, 1);
        setProgress(newProgress);
        onProgress?.(newProgress);
        
        // Marca como completa quando atinge 60%
        if (newProgress >= 0.6 && !hasCompleted) {
          setHasCompleted(true);
          onComplete?.();
        }
      }
    };

    const interval = setInterval(checkProgress, 1000);
    return () => clearInterval(interval);
  }, [progress, onProgress, onComplete, hasCompleted]);

  return (
    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
      <iframe
        ref={iframeRef}
        className="w-full h-full"
        src={src}
        title={title ?? 'Video player'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="no-referrer"
        allowFullScreen
      />
    </div>
  );
}


