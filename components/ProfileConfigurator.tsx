import React, { useState } from 'react';
import { ProfileData } from '../types';

interface ProfileConfiguratorProps {
  profileData: ProfileData;
  onUpdate: <K extends keyof ProfileData>(key: K, value: ProfileData[K]) => void;
  onVisualize: () => void;
}

export const ProfileConfigurator: React.FC<ProfileConfiguratorProps> = ({ profileData, onUpdate, onVisualize }) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);

  // Handle file upload for specific slots or append to first empty
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    if (newFiles.length === 0) return;

    const currentFiles = [...profileData.files];
    let newFileIndex = 0;

    // Fill empty slots first
    for (let i = 0; i < currentFiles.length; i++) {
      if (currentFiles[i] === null && newFileIndex < newFiles.length) {
        currentFiles[i] = newFiles[newFileIndex];
        newFileIndex++;
      }
    }

    // If we still have files and slots are full, warn user or ignore (or overwrite? let's just stop)
    onUpdate('files', currentFiles);
    event.target.value = '';
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...profileData.files];
    updatedFiles[index] = null;
    onUpdate('files', updatedFiles);
  };

  const clearAll = () => {
    onUpdate('files', Array(9).fill(null));
  };

  // Drag and Drop logic
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

    const updatedFiles = [...profileData.files];
    // Swap logic
    const temp = updatedFiles[draggedIndex];
    updatedFiles[draggedIndex] = updatedFiles[dropIndex];
    updatedFiles[dropIndex] = temp;
    
    onUpdate('files', updatedFiles);
    handleDragEnd();
  };

  return (
    <div className="bg-zinc-800 p-6 rounded-lg shadow-xl space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Configurar Perfil</h2>
        <button 
          onClick={clearAll}
          className="text-xs text-red-400 hover:text-red-300 underline"
        >
          Limpar Grade
        </button>
      </div>

      {/* Inputs do Perfil */}
      <div className="grid grid-cols-2 gap-4">
        <InputField label="Usuário (@)" value={profileData.username} onChange={e => onUpdate('username', e.target.value)} />
        <InputField label="Nome de Exibição" value={profileData.name} onChange={e => onUpdate('name', e.target.value)} />
        <InputField label="Seguidores" value={profileData.followers} onChange={e => onUpdate('followers', e.target.value)} />
        <InputField label="Seguindo" value={profileData.following} onChange={e => onUpdate('following', e.target.value)} />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">Bio</label>
        <textarea
          rows={3}
          value={profileData.bio}
          onChange={e => onUpdate('bio', e.target.value)}
          className="w-full bg-zinc-700 border border-zinc-600 rounded-md p-2 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors text-sm"
        />
      </div>

      {/* Grid Uploader */}
      <div>
        <div className="flex justify-between items-end mb-2">
          <label className="block text-sm font-medium text-zinc-300">
            Grade de Mídia (3x3 - Aspecto 3:4)
          </label>
           <div className="relative overflow-hidden">
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              onChange={handleFileUpload} 
              className="absolute inset-0 opacity-0 cursor-pointer"
              title="Upload images"
            />
            <button className="bg-zinc-700 hover:bg-zinc-600 text-white text-xs py-1 px-3 rounded transition-colors pointer-events-none">
              + Adicionar Múltiplos
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 bg-black p-2 rounded-lg border border-zinc-700">
          {profileData.files.map((file, index) => {
             const url = file ? URL.createObjectURL(file) : null;
             const isDragged = draggedIndex === index;
             const isDropTarget = dropTargetIndex === index && draggedIndex !== null && draggedIndex !== index;
             
             return (
              <div 
                key={index}
                draggable={!!file || draggedIndex !== null} // Allow dropping on empty slots too
                onDragStart={() => handleDragStart(index)}
                onDragEnd={handleDragEnd}
                onDrop={(e) => { e.preventDefault(); handleDrop(index); }}
                onDragOver={(e) => { e.preventDefault(); setDropTargetIndex(index); }}
                onDragLeave={() => setDropTargetIndex(null)}
                className={`
                  aspect-[3/4] relative rounded bg-zinc-900 border-2 border-dashed 
                  ${file ? 'border-transparent' : 'border-zinc-700 hover:border-zinc-500'} 
                  ${isDragged ? 'opacity-50' : ''}
                  ${isDropTarget ? 'border-pink-500 bg-zinc-800' : ''}
                  transition-all flex flex-col items-center justify-center overflow-hidden group
                `}
              >
                {url ? (
                  <>
                    <img src={url} alt={`Slot ${index}`} className="w-full h-full object-cover pointer-events-none" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <button 
                        onClick={() => removeFile(index)}
                        className="bg-red-600 text-white rounded-full p-1 w-8 h-8 flex items-center justify-center hover:bg-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-zinc-600 font-bold text-lg opacity-50">{index + 1}</span>
                    <span className="text-zinc-600 text-[10px] mt-1">Vazio</span>
                    <input 
                      type="file" 
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if(f) {
                          const updated = [...profileData.files];
                          updated[index] = f;
                          onUpdate('files', updated);
                        }
                      }}
                    />
                  </>
                )}
              </div>
             );
          })}
        </div>
        <p className="text-xs text-zinc-500 mt-2">
          Dica: Arraste as imagens para reordenar. Clique em um slot vazio para adicionar uma única imagem.
        </p>
      </div>

      <button 
        onClick={onVisualize}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
      >
        Visualizar Perfil
      </button>
    </div>
  );
};

const InputField: React.FC<{label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = ({label, value, onChange}) => (
  <div>
    <label className="block text-sm font-medium text-zinc-300 mb-1">{label}</label>
    <input 
      type="text" 
      value={value} 
      onChange={onChange}
      className="w-full bg-zinc-700 border border-zinc-600 rounded-md p-2 text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
    />
  </div>
);