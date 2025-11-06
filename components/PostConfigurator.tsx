import React, { useState, useCallback } from 'react';
import { PostData, AspectRatio } from '../types';

interface PostConfiguratorProps {
  postData: PostData;
  onUpdate: <K extends keyof PostData>(key: K, value: PostData[K]) => void;
  onVisualize: () => void;
}

const MAX_FILES = 20;
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const PostConfigurator: React.FC<PostConfiguratorProps> = ({ postData, onUpdate, onVisualize }) => {
  const [error, setError] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const newFiles = Array.from(event.target.files || []);
    if (newFiles.length === 0) return;

    if (postData.files.length + newFiles.length > MAX_FILES) {
      setError(`Você pode selecionar no máximo ${MAX_FILES} arquivos.`);
      return;
    }

    // FIX: Explicitly type `file` as `File` to resolve TypeScript errors where `file` was inferred as `unknown`.
    const validFiles = newFiles.filter((file: File) => {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setError(`O arquivo "${file.name}" é maior que ${MAX_FILE_SIZE_MB}MB e foi ignorado.`);
        return false;
      }
      return true;
    });

    onUpdate('files', [...postData.files, ...validFiles]);
    event.target.value = ''; // Reset input to allow re-uploading the same file
  };

  const removeFile = (index: number) => {
    const updatedFiles = postData.files.filter((_, i) => i !== index);
    onUpdate('files', updatedFiles);
  };
  
  const handleVisualizeClick = () => {
    if(postData.files.length === 0) {
      setError('Por favor, adicione pelo menos um arquivo de mídia para visualizar.');
      return;
    }
    onVisualize();
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDropTargetIndex(null);
  };

  const handleDrop = (dropIndex: number) => {
    if (draggedIndex === null || draggedIndex === dropIndex) {
      handleDragEnd();
      return;
    }

    const updatedFiles = [...postData.files];
    const [draggedItem] = updatedFiles.splice(draggedIndex, 1);
    updatedFiles.splice(dropIndex, 0, draggedItem);
    
    onUpdate('files', updatedFiles);
    handleDragEnd();
  };
  
  const FilePreview: React.FC<{ file: File; index: number, onRemove: () => void }> = ({ file, index, onRemove }) => {
    const url = URL.createObjectURL(file);
    const isDragged = draggedIndex === index;
    const isDropTarget = dropTargetIndex === index && draggedIndex !== null && draggedIndex !== index;

    const dragClasses = isDragged ? 'opacity-50 scale-95' : 'opacity-100 scale-100';
    const dropTargetClasses = isDropTarget ? 'ring-2 ring-pink-500 ring-offset-2 ring-offset-zinc-800' : '';

    return (
      <div 
        draggable
        onDragStart={() => handleDragStart(index)}
        onDragEnd={handleDragEnd}
        onDrop={(e) => {
          e.preventDefault();
          handleDrop(index);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (draggedIndex !== null && draggedIndex !== index) {
            setDropTargetIndex(index);
          }
        }}
        onDragLeave={() => {
          setDropTargetIndex(null);
        }}
        className={`relative group w-24 h-24 rounded-md overflow-hidden flex-shrink-0 transition-all duration-200 cursor-grab active:cursor-grabbing ${dragClasses} ${dropTargetClasses}`}
      >
        {file.type.startsWith('video/') ? (
          <video src={url} autoPlay loop muted playsInline className="w-full h-full object-cover" />
        ) : (
          <img src={url} alt={file.name} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-colors flex items-center justify-center">
          <button
            onClick={onRemove}
            className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Remove file"
          >
            &#x2715;
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-zinc-800 p-6 rounded-lg shadow-xl space-y-6">
      {/* File Uploader */}
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">Mídia (Imagens/Vídeos)</label>
        <div className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-zinc-600 rounded-lg bg-zinc-700/50 hover:border-pink-500 transition-colors">
          <p className="text-zinc-400 mb-2">Arraste e solte ou clique para enviar</p>
          <input 
            type="file" 
            multiple 
            accept="image/*,video/*" 
            onChange={handleFileChange} 
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
            Selecionar Arquivos
          </label>
        </div>
        <p className="text-xs text-zinc-500 mt-2">Máximo de {MAX_FILES} arquivos, até {MAX_FILE_SIZE_MB}MB cada.</p>
        {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
        {postData.files.length > 0 && (
           <div className="mt-4">
            <p className="text-xs text-zinc-400 mb-2">Arraste para reordenar as mídias.</p>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {postData.files.map((file, index) => (
                <FilePreview key={`${file.name}-${file.lastModified}`} file={file} index={index} onRemove={() => removeFile(index)} />
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Aspect Ratio */}
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">Formato da Publicação</label>
        <div className="grid grid-cols-2 gap-4">
          {(['1:1', '3:4'] as AspectRatio[]).map(ratio => (
            <button
              key={ratio}
              onClick={() => onUpdate('aspectRatio', ratio)}
              className={`py-3 px-4 rounded-md text-center font-semibold transition-all duration-200 ${
                postData.aspectRatio === ratio
                  ? 'bg-pink-600 text-white ring-2 ring-pink-400'
                  : 'bg-zinc-700 hover:bg-zinc-600'
              }`}
            >
              {ratio === '1:1' ? 'Quadrado (1:1)' : 'Retrato (3:4)'}
            </button>
          ))}
        </div>
      </div>

      {/* Text Inputs */}
      <div className="grid md:grid-cols-2 gap-4">
        <InputField label="Usuário do Instagram" value={postData.username} onChange={e => onUpdate('username', e.target.value)} />
        <InputField label="Quantidade de Likes" value={postData.likes} onChange={e => onUpdate('likes', e.target.value)} />
        <InputField label="Comentários" value={postData.comments} onChange={e => onUpdate('comments', e.target.value)} />
        <InputField label="Reposts" value={postData.shares} onChange={e => onUpdate('shares', e.target.value)} />
      </div>
      
      <div>
        <label htmlFor="caption" className="block text-sm font-medium text-zinc-300 mb-2">Legenda</label>
        <textarea
          id="caption"
          rows={4}
          value={postData.caption}
          onChange={e => onUpdate('caption', e.target.value)}
          className="w-full bg-zinc-700 border border-zinc-600 rounded-md p-2 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
        />
      </div>

      {/* Action Button */}
      <button 
        onClick={handleVisualizeClick}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
      >
        Visualizar
      </button>
    </div>
  );
};

// Helper component for input fields
const InputField: React.FC<{label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = ({label, value, onChange}) => (
  <div>
    <label className="block text-sm font-medium text-zinc-300 mb-2">{label}</label>
    <input 
      type="text" 
      value={value} 
      onChange={onChange}
      className="w-full bg-zinc-700 border border-zinc-600 rounded-md p-2 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
    />
  </div>
);