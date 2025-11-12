import React, { useState } from 'react';
import { PostConfigurator } from './components/PostConfigurator';
import { PostPreview } from './components/PostPreview';
import { PostData } from './types';

const App: React.FC = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [postData, setPostData] = useState<PostData>({
    files: [],
    username: 'seu_usuario',
    caption: 'Esta é uma legenda de exemplo para a sua incrível postagem no Instagram! ✨',
    likes: '1.234',
    comments: '56',
    shares: '7',
    aspectRatio: '1:1',
    postType: 'Carousel',
  });

  const handleUpdate = <K extends keyof PostData>(key: K, value: PostData[K]) => {
    setPostData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white font-sans flex flex-col items-center p-4 sm:p-6 md:p-8">
      <header className="w-full max-w-4xl mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Visualizador de Postagem do Instagram
        </h1>
        <p className="text-zinc-400 mt-2">
          Crie e visualize seu carrossel antes de postar.
        </p>
      </header>

      <main className="w-full max-w-4xl">
        {showPreview ? (
          <PostPreview postData={postData} onBack={() => setShowPreview(false)} />
        ) : (
          <PostConfigurator 
            postData={postData} 
            onUpdate={handleUpdate} 
            onVisualize={() => setShowPreview(true)} 
          />
        )}
      </main>
       <footer className="w-full max-w-4xl mt-12 text-center text-zinc-500 text-sm">
        <p>Desenvolvido internamente na Todolivro.</p>
        <p>Todas as mídias são processadas localmente e não são enviadas para nenhum servidor. Você está seguro.</p>
      </footer>
    </div>
  );
};

export default App;
