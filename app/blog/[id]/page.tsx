// /app/blog/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { client } from "@/libs/client";
import type { Blog } from "@/libs/types";
import { Metadata } from "next";

type Props = {
  params: { id: string };
};

// 静的パスを生成する
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

// ページのメタ情報（タイトルなど）を動的に設定
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const blog = await client.get<Blog>({ endpoint: "blog", contentId: id });
  return {
    title: blog.title,
  };
}

// メインのページコンポーネント
export default async function BlogDetail({ params }: Props) {
  const { id } = params;
  const blog = await client.get<Blog>({ endpoint: "blog", contentId: id });

  return (
    <article className="p-4 md:p-0">
      {blog.eyecatch && (
        <Image
          src={blog.eyecatch.url}
          alt={blog.title} // 代替テキストをタイトルに設定
          width={blog.eyecatch.width}
          height={blog.eyecatch.height}
          className="w-full h-auto rounded-lg mb-8"
        />
      )}
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-500 mb-8">
        公開日: {new Date(blog.publishedAt).toLocaleDateString()}
      </p>
      <div
        dangerouslySetInnerHTML={{ __html: blog.content }}
        className="prose lg:prose-xl max-w-none mb-8"
      />
      <div className="text-center mt-12">
        <Link href="/blog" className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors">
          ブログ一覧へ戻る
        </Link>
      </div>
    </article>
  );
}
