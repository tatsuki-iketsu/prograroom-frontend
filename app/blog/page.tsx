// /app/blog/page.tsx
import Link from "next/link";
import Image from "next/image";
import { client } from "@/libs/client";
import type { Blog } from "@/libs/types";

export default async function BlogPage() {
  const { contents } = await client.get<{ contents: Blog[] }>({
    endpoint: "blog",
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">ブログ記事一覧</h1>
      <ul className="space-y-6">
        {contents.map((blog) => (
          <li key={blog.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <Link href={`/blog/${blog.id}`} className="block">
              {blog.eyecatch && (
                <Image
                  src={blog.eyecatch.url}
                  alt=""
                  width={blog.eyecatch.width}
                  height={blog.eyecatch.height}
                  className="w-full h-auto"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-blue-700">{blog.title}</h2>
                <p className="text-gray-500 text-sm mt-1">
                  公開日: {new Date(blog.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
