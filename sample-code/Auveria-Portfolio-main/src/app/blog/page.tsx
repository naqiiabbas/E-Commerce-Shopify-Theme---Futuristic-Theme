import { BlogCard } from "@/components/marketing/cards";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { blogPosts } from "@/content/site";

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="An editorial-ready blog structure built for later CMS or MDX migration."
        description="The entries below are polished placeholders so the information architecture is complete even before the real content team starts publishing."
      />
      <section className="px-6 pb-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.07}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
