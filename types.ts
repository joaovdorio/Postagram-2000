
export type AspectRatio = '1:1' | '3:4';

export interface PostData {
  files: File[];
  username: string;
  caption: string;
  likes: string;
  comments: string;
  shares: string;
  aspectRatio: AspectRatio;
}
