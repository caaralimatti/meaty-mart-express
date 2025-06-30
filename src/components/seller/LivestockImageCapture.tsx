
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Upload, X } from 'lucide-react';
import { toast } from 'sonner';

interface LivestockImageCaptureProps {
  onImagesCapture: (images: File[]) => void;
  maxImages?: number;
}

const LivestockImageCapture = ({ onImagesCapture, maxImages = 5 }: LivestockImageCaptureProps) => {
  const [capturedImages, setCapturedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    if (capturedImages.length + newFiles.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    const updatedImages = [...capturedImages, ...newFiles];
    setCapturedImages(updatedImages);

    // Create preview URLs
    const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
    const updatedPreviews = [...previewUrls, ...newPreviewUrls];
    setPreviewUrls(updatedPreviews);

    onImagesCapture(updatedImages);
    
    // Reset input
    if (event.target) {
      event.target.value = '';
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    if (capturedImages.length + newFiles.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    const updatedImages = [...capturedImages, ...newFiles];
    setCapturedImages(updatedImages);

    // Create preview URLs
    const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
    const updatedPreviews = [...previewUrls, ...newPreviewUrls];
    setPreviewUrls(updatedPreviews);

    onImagesCapture(updatedImages);
    
    // Reset input
    if (event.target) {
      event.target.value = '';
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = capturedImages.filter((_, i) => i !== index);
    const updatedPreviews = previewUrls.filter((_, i) => i !== index);
    
    // Clean up the URL object
    URL.revokeObjectURL(previewUrls[index]);
    
    setCapturedImages(updatedImages);
    setPreviewUrls(updatedPreviews);
    onImagesCapture(updatedImages);
  };

  const checkCameraSupport = () => {
    return 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices;
  };

  const isCameraSupported = checkCameraSupport();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        {/* Primary option: Camera capture */}
        <div className="flex-1">
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            onChange={handleCameraCapture}
            className="hidden"
          />
          <Button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={capturedImages.length >= maxImages}
          >
            <Camera className="w-4 h-4 mr-2" />
            {isCameraSupported ? 'Take Photos' : 'Select from Camera'}
          </Button>
        </div>

        {/* Secondary option: File upload (only if camera not available) */}
        {!isCameraSupported && (
          <div className="flex-1">
            <input
              ref={uploadInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => uploadInputRef.current?.click()}
              className="w-full"
              disabled={capturedImages.length >= maxImages}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Photos
            </Button>
          </div>
        )}
      </div>

      <p className="text-sm text-gray-600 text-center">
        {isCameraSupported 
          ? `Use your camera to take live photos of livestock. ${capturedImages.length}/${maxImages} images`
          : `Camera not available. Upload from gallery. ${capturedImages.length}/${maxImages} images`
        }
      </p>

      {/* Image Previews */}
      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {previewUrls.map((url, index) => (
            <Card key={index} className="relative">
              <CardContent className="p-2">
                <img
                  src={url}
                  alt={`Livestock ${index + 1}`}
                  className="w-full h-24 object-cover rounded"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                  onClick={() => removeImage(index)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default LivestockImageCapture;
