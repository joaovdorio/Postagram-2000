
import React, { useState } from 'react';
import { PostConfigurator } from './components/PostConfigurator';
import { PostPreview } from './components/PostPreview';
import { ProfileConfigurator } from './components/ProfileConfigurator';
import { ProfilePreview } from './components/ProfilePreview';
import { PostData, ProfileData, AppMode } from './types';

const App: React.FC = () => {
  const [appMode, setAppMode] = useState<AppMode>('post');
  const [showPreview, setShowPreview] = useState(false);
  
  // State for Single Post/Carousel/Reels
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

  // State for Profile Grid (9 slots)
  const [profileData, setProfileData] = useState<ProfileData>({
    username: 'seu_usuario',
    name: 'Seu Nome',
    bio: 'Uma bio incrível para projetar seu perfil.\nCriador de conteúdo | Lifestyle',
    followers: '10.5K',
    following: '420',
    postsCount: '150',
    files: Array(9).fill(null),
    profileImage: null,
  });

  const handlePostUpdate = <K extends keyof PostData>(key: K, value: PostData[K]) => {
    setPostData(prev => ({ ...prev, [key]: value }));
  };

  const handleProfileUpdate = <K extends keyof ProfileData>(key: K, value: ProfileData[K]) => {
    setProfileData(prev => ({ ...prev, [key]: value }));
  };

  const renderContent = () => {
    if (showPreview) {
      if (appMode === 'post') {
        return <PostPreview postData={postData} onBack={() => setShowPreview(false)} />;
      } else {
        return <ProfilePreview profileData={profileData} onBack={() => setShowPreview(false)} />;
      }
    }

    if (appMode === 'post') {
      return (
        <PostConfigurator 
          postData={postData} 
          onUpdate={handlePostUpdate} 
          onVisualize={() => setShowPreview(true)} 
        />
      );
    } else {
      return (
        <ProfileConfigurator 
          profileData={profileData}
          onUpdate={handleProfileUpdate}
          onVisualize={() => setShowPreview(true)}
        />
      );
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white font-sans flex flex-col items-center p-4 sm:p-6 md:p-8">
      <header className="w-full max-w-4xl mb-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Visualizador de Instagram
        </h1>
        <p className="text-zinc-400 mt-2 mb-6">
          Crie posts individuais ou planeje a grade do seu perfil.
        </p>

        {!showPreview && (
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setAppMode('post')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                appMode === 'post' 
                  ? 'bg-white text-black shadow-lg shadow-white/20' 
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              Criar Post
            </button>
            <button
              onClick={() => setAppMode('profile')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                appMode === 'profile' 
                  ? 'bg-white text-black shadow-lg shadow-white/20' 
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              Planejar Feed (3x3)
            </button>
          </div>
        )}
      </header>

      <main className="w-full max-w-4xl">
        {renderContent()}
      </main>
      
       <footer className="w-full max-w-4xl mt-12 text-center text-zinc-500 text-sm">
        <p>Desenvolvido internamente na Todolivro.</p>
        <p>Todas as mídias são processadas localmente.</p>
      </footer>
    </div>
  );
};

export default App;
