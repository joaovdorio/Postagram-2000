import React from 'react';
import { ProfileData } from '../types';

// Icons
const VerifiedIcon = () => (
  <svg aria-label="Verified" className="w-3 h-3 ml-1 text-blue-500" fill="currentColor" viewBox="0 0 40 40">
    <path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6 6.162-3.386v-6.354L40 19.999l-3.247-5.36-6.163-3.137V5.15h-6.235L25.358 0l-5.36 3.094Zm-4.549 25.39-5.45-5.449 2.122-2.122 3.328 3.327 9.652-9.652 2.122 2.122-11.774 11.774Z" />
  </svg>
);

const BackIcon = () => <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>;
const MoreIcon = () => <svg aria-label="Options" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>;
const BellIcon = () => <svg aria-label="Notifications" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-6.12 8.351L12 21.354l-3.38-3.174C5.152 14.082 2.5 12.195 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.118-1.763a4.12 4.12 0 0 1 3.675-1.94z"></path></svg>; // Using heart as placeholder for bell/notification complexity
const GridIcon = () => <svg aria-label="Posts" className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>;
const ReelsIcon = () => <svg aria-label="Reels" className="w-6 h-6 text-zinc-500" fill="currentColor" viewBox="0 0 24 24"><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fillRule="evenodd"></path></svg>;

interface ProfilePreviewProps {
  profileData: ProfileData;
  onBack: () => void;
}

export const ProfilePreview: React.FC<ProfilePreviewProps> = ({ profileData, onBack }) => {
  return (
    <div className="flex flex-col items-center animate-fade-in">
      <div className="w-full max-w-[380px] bg-black border border-zinc-700 rounded-[30px] overflow-hidden text-white shadow-2xl relative">
        
        {/* Status Bar Mock */}
        <div className="h-6 w-full flex justify-between items-center px-6 text-[10px] font-bold mt-2">
          <span>9:41</span>
          <div className="flex gap-1">
             <div className="w-3 h-3 bg-white rounded-full opacity-20"></div>
             <div className="w-3 h-3 bg-white rounded-full opacity-20"></div>
          </div>
        </div>

        {/* Nav Bar */}
        <div className="flex justify-between items-center px-4 py-2 sticky top-0 bg-black z-10">
          <BackIcon />
          <div className="flex items-center font-bold text-sm">
            {profileData.username}
            <VerifiedIcon />
          </div>
          <div className="flex gap-4">
            <BellIcon />
            <MoreIcon />
          </div>
        </div>

        {/* Profile Info Header */}
        <div className="px-4 py-2">
          <div className="flex justify-between items-center mb-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                <div className="w-full h-full rounded-full border-2 border-black overflow-hidden bg-zinc-800">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${profileData.name}&background=random&color=fff`} 
                    alt={profileData.username} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs border-2 border-black">
                +
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-1 justify-around ml-4">
              <div className="flex flex-col items-center">
                <span className="font-bold text-base">{profileData.postsCount}</span>
                <span className="text-xs">Publicações</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-base">{profileData.followers}</span>
                <span className="text-xs">Seguidores</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-base">{profileData.following}</span>
                <span className="text-xs">Seguindo</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-4">
            <div className="font-bold text-sm">{profileData.name}</div>
            <div className="text-sm whitespace-pre-wrap text-zinc-100">{profileData.bio}</div>
            <div className="text-sm text-zinc-400 mt-1">Seguido por <span className="text-white font-semibold">neymarjr</span> e <span className="text-white font-semibold">outras 2 pessoas</span></div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mb-6">
            <button className="flex-1 bg-zinc-800 py-1.5 rounded-lg text-sm font-semibold">Seguir</button>
            <button className="flex-1 bg-zinc-800 py-1.5 rounded-lg text-sm font-semibold">Mensagem</button>
            <button className="bg-zinc-800 p-1.5 rounded-lg">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
            </button>
          </div>

          {/* Highlights Mock */}
          <div className="flex gap-4 overflow-x-hidden mb-4 opacity-70">
             {[1,2,3,4].map(i => (
               <div key={i} className="flex flex-col items-center gap-1">
                 <div className="w-14 h-14 rounded-full bg-zinc-800 border border-zinc-700"></div>
                 <div className="w-10 h-2 bg-zinc-800 rounded"></div>
               </div>
             ))}
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-t border-zinc-800">
          <div className="flex-1 flex justify-center py-3 border-b-2 border-white">
            <GridIcon />
          </div>
          <div className="flex-1 flex justify-center py-3 text-zinc-500">
            <ReelsIcon />
          </div>
          <div className="flex-1 flex justify-center py-3 text-zinc-500">
             <svg aria-label="Tagged" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10.201 3.797 12 1.997l1.799 1.8a1.59 1.59 0 0 0 1.124.465h5.259A1.818 1.818 0 0 1 22 6.08v14.104a1.818 1.818 0 0 1-1.818 1.818H3.818A1.818 1.818 0 0 1 2 20.184V6.08a1.818 1.818 0 0 1 1.818-1.818h5.26a1.59 1.59 0 0 0 1.123-.465Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M18.598 22.002V21.4a3.949 3.949 0 0 0-3.948-3.949H9.495A3.949 3.949 0 0 0 5.546 21.4v.603" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><circle cx="12.072" cy="11.075" fill="none" r="3.556" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle></svg>
          </div>
        </div>

        {/* THE GRID */}
        <div className="grid grid-cols-3 gap-0.5 bg-black pb-10">
          {profileData.files.map((file, index) => {
            const url = file ? URL.createObjectURL(file) : null;
            return (
              <div key={index} className="aspect-[3/4] bg-zinc-900 overflow-hidden relative">
                {url ? (
                  <img src={url} alt={`Post ${index}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-800 text-xs">
                    Empty
                  </div>
                )}
                {/* Pin Icon Mock for first item */}
                {index === 0 && url && (
                   <div className="absolute top-1 right-1 text-white drop-shadow-md">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M16 12V8a4 4 0 1 0-8 0v4H6v2h5v7h2v-7h5v-2h-2z"/></svg>
                   </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Bottom Bar Mock */}
        <div className="flex justify-around items-center py-3 border-t border-zinc-800 bg-black absolute bottom-0 w-full z-20">
           <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M22 10.926v1.548a.998.998 0 0 1-.821.983l-7.49 1.338a1 1 0 0 1-1.046-.648l-2.243-5.96a1 1 0 0 1 .033-.768l1.717-4.034a.998.998 0 0 1 1.574-.256l8.276 7.8Z"></path><path d="M2 12.474V10.926a.998.998 0 0 1 .821-.983l7.49-1.338a1 1 0 0 1 1.046.648l2.243 5.96a1 1 0 0 1-.033.768l-1.717 4.034a.998.998 0 0 1-1.574.256l-8.276-7.8Z"></path></svg>
           <svg className="w-6 h-6 text-zinc-500" fill="currentColor" viewBox="0 0 24 24"><path d="M21.938 12.001c.004-.05 0-.099 0-.149 0-5.213-4.453-9.451-9.938-9.451S2 6.639 2 11.852c0 .05 0 .099.005.149C2.096 17.15 6.55 21.397 12 21.397s9.904-4.247 9.938-9.396Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="17.648" x2="12.008" y1="6.612" y2="12"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.352" x2="12" y1="6.612" y2="12"></line></svg>
           <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-600"></div>
        </div>
      </div>
      
      <button 
        onClick={onBack}
        className="mt-6 bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
      >
        Voltar ao Editor
      </button>
    </div>
  );
};