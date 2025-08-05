// /app/blog/[id]/page.tsx
// エラー原因特定 ステップ1

import { client } from "@/libs/client";
import type { Blog } from "@/libs/types";
import Link from "next/link";

// generateStaticParamsを復元して、ビルド時に静的パスを生成させる
export async function generateStaticParams() {
  const { contents } = await client.get<{ contents: Pick<Blog, 'id'>[] }>({
    endpoint: "blog",
    queries: { fields: 'id' }
  });

  const paths = contents.map((post) => ({
    id: post.id,
  }));

  return paths;
}

// メインのページコンポーネントは最小構成のまま
export default function BlogDetail({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>ブログ詳細ページ（ビルドテスト Step1）</h1>
      <p>記事ID: {params.id}</p>
      <div className="text-center mt-12">
        <Link href="/blog" className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors">
          ブログ一覧へ戻る
        </Link>
      </div>
    </div>
  );
}