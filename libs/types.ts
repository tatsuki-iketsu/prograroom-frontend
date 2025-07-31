// /libs/types.ts

// microCMSの画像オブジェクトの型
export type EyeCatch = {
  url: string;
  height: number;
  width: number;
};

// ブログ記事の型
export type Blog = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  eyecatch?: EyeCatch; // アイキャッチ（任意）
  workingDay?: string; // 作業日（任意）
//   createdAt: string;
//   updatedAt: string;
//   publishedAt: string;
//   revisedAt: string;
};

