import { getPayload } from "@/lib/payload";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
} from "@/components/ui/card"
import { Post } from "../../payload-types";

const TopPosts = async () => {
  const posts = await (await getPayload()).find({
    collection: 'posts',
    limit: 3,
  })

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tigher sm:text-3xl md:text-4xl  text-center mb-6">Top Posts</h1>
      <div className="grid grid-cols-3 container mx-auto gap-4">
        {posts.docs.map((post: Post) => {
          const root = post.postBody.root;
          const firstParagraph = root.children.find(child => child.type === 'paragraph' && Array.isArray(child.children) && child?.children.length > 0);
          const paragraphText = firstParagraph && Array.isArray(firstParagraph.children) ? firstParagraph.children.map(child => child.text).join('') : '';

          return (
            <Card key={post.id}>
              <CardContent>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>{paragraphText}</CardContent>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default TopPosts