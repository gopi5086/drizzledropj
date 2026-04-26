import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import { blogPostsData } from "@/data/blogData";
import SocialShare from "@/components/SocialShare";

export default function BlogPost() {
  const { slug } = useParams();
  const post = slug ? blogPostsData[slug] : null;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://drizzledropinn.com/blog/${slug}`;

  if (!post) {
    return (
      <div className="section-padding text-center min-h-[50vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
        <Link to="/" className="text-primary hover:underline">Return Home</Link>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${post.title} | DrizzleDropinn`}
        description={post.excerpt}
      />
      <div className="bg-secondary/5 pt-32 pb-12">
        <div className="container-luxury max-w-4xl">
          <Reveal>
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary mb-4">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
              <span className="flex items-center gap-1"><User className="w-3 h-3" /> Admin</span>
              <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> {post.category}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden mb-12 shadow-lg">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          </Reveal>
          
          <Reveal delay={0.2}>
            <article className="prose prose-lg max-w-none text-muted-foreground">
              {post.content}
              
              <SocialShare url={currentUrl} title={post.title} />

              <div className="bg-primary/5 border border-primary/20 p-8 rounded-2xl my-12">
                <h2 className="text-2xl font-bold text-primary mb-4">What Makes DrizzleDropinn the Best Hotel in Ooty?</h2>
                <p className="mb-4">At DrizzleDropinn, we have carefully crafted an experience that combines the tranquility of the hills with the convenience of town access. Here is why our guests consistently rate us as a top choice:</p>
                <ul className="list-disc pl-6 space-y-3">
                  <li><strong>Unbeatable Location and Views:</strong> Imagine waking up to the sound of chirping birds and drawing your curtains to reveal a sea of clouds rolling over the Nilgiris. We offer spectacular valley views.</li>
                  <li><strong>Luxury at Budget-Friendly Prices:</strong> Finding a high-quality budget stay that doesn't compromise on cleanliness or amenities can be tough. We bridge that gap with high-speed Wi-Fi, 24/7 hot water, and room service.</li>
                  <li><strong>Tailored for Families and Couples:</strong> Private, couple-friendly rooms with breathtaking views, as well as spacious family rooms ensuring everyone has enough space.</li>
                  <li><strong>Warm Hospitality:</strong> Our staff are local experts. Want to know the best time to visit the Rose Garden or buy authentic homemade chocolates? We have you covered.</li>
                </ul>
              </div>

              <div className="mt-12 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">Ready for the perfect mountain getaway?</h3>
                <Link to="/ooty/rooms" className="inline-flex px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors rounded-full shadow-lg hover:shadow-xl">
                  Check Availability & Book Now
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </>
  );
}
