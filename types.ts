export type AspectRatio = '1:1' | '3:4' | '9:16';
export type PostType = 'Photo' | 'Carousel' | 'Reels';

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
