import { notFound } from "next/navigation";
import { PageHero } from "@/components/marketing/page-hero";
import { blogPosts } from "@/content/site";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((entry) => entry.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={`${post.date} · ${post.readTime}. Replace this placeholder article body with MDX, CMS data, or your editorial workflow when ready.`}
        primaryLabel="Back to blog"
        primaryHref="/blog"
      />
      <section className="px-6 pb-16 lg:px-8">
        <article className="mx-auto max-w-3xl rounded-[32px] border border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] p-8 shadow-[0_20px_60px_var(--color-card-shadow)]">
          <div className="space-y-6 text-base leading-8 text-[var(--color-muted)]">
            <p>{post.excerpt}</p>
            <p>
              This route exists to prove the site architecture is already prepared for a real blog.
              Each article can later be powered by MDX files or a headless CMS without changing the
              surrounding layout, metadata strategy, or card components.
            </p>
            <p>
              Keep the long-form visual style minimal and readable: generous line length control,
              soft contrast, clear hierarchy, and enough whitespace to preserve the premium brand tone.
            </p>
          </div>
        </article>
      </section>
    </>
  );
}
