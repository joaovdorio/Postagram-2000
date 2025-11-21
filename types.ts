
export type AspectRatio = '1:1' | '3:4' | '9:16';
export type PostType = 'Photo' | 'Carousel' | 'Reels';
export type AppMode = 'post' | 'profile';

export interface PostData {
  files: File[];
  username: string;
  caption: string;
  likes: string;
  comments: string;
  shares: string;
  aspectRatio: AspectRatio;
  postType: PostType;
}

export interface ProfileData {
  username: string;
  name: string;
  bio: string;
  followers: string;
  following: string;
  postsCount: string;
  files: (File | null)[]; // Fixed 9 slots
  profileImage?: File | null;
}
