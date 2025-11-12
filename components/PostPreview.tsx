import React from 'react';
import { PostData } from '../types';
import { Carousel } from './Carousel';
import { ReelsPreview } from './ReelsPreview';
import { CommentIcon } from './icons/CommentIcon';
import { HeartIcon } from './icons/HeartIcon';
import { MoreIcon } from './icons/MoreIcon';
import { RepostIcon } from './icons/RepostIcon';
import { SaveIcon } from './icons/SaveIcon';
import { ShareIcon } from './icons/ShareIcon';

interface PostPreviewProps {
  postData: PostData;
  onBack: () => void;
}

export const PostPreview: React.FC<PostPreviewProps> = ({ postData, onBack }) => {
  return (
    <div className="flex flex-col items-center animate-fade-in">
      {postData.postType === 'Reels' ? (
        <ReelsPreview postData={postData} />
      ) : (
        <div className="w-full max-w-[470px] bg-black border border-zinc-700 rounded-lg overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-3">
              <img src={`https://picsum.photos/seed/${postData.username}/32/32`} alt="avatar" className="w-8 h-8 rounded-full" />
              <span className="font-bold text-sm">{postData.username}</span>
            </div>
            <MoreIcon />
          </div>

          {/* Media Carousel */}
          <Carousel files={postData.files} aspectRatio={postData.aspectRatio} />

          {/* Actions & Details */}
          <div className="p-3 text-sm space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 cursor-pointer text-white hover:text-zinc-500 transition-colors">
                  <HeartIcon />
                  {postData.likes && <span className="font-semibold text-sm -translate-y-px">{postData.likes}</span>}
                </div>
                <div className="flex items-center gap-1.5 cursor-pointer text-white hover:text-zinc-500 transition-colors">
                  <CommentIcon />
                  {postData.comments && <span className="font-semibold text-sm -translate-y-px">{postData.comments}</span>}
                </div>
                 <div className="flex items-center gap-1.5 cursor-pointer text-white hover:text-zinc-500 transition-colors">
                  <RepostIcon />
                  {postData.shares && <span className="font-semibold text-sm -translate-y-px">{postData.shares}</span>}
                </div>
                <ShareIcon />
              </div>
              <SaveIcon />
            </div>
            
            <p>
              <span className="font-bold mr-2">{postData.username}</span>
              <span>{postData.caption}</span>
            </p>

            <p className="text-zinc-600 text-xs uppercase">1 hour ago</p>
          </div>
        </div>
      )}
      <button 
        onClick={onBack}
        className="mt-6 bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
      >
        Voltar ao Editor
      </button>
    </div>
  );
};
