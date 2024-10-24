import { getPayload } from "@/lib/payload";
import RichText from "@/components/RichText";

const page = async ({ params }: {
  params: {
    postId: string;
  }
}) => {
  const { postId } = await params;
  const payload = await getPayload();
  let post = await payload.find({
    collection: 'posts',
    where: {
      id: {
        equals: postId
      }
    }
  })

  if (!post || !post.docs || post.docs.length === 0 || !postId) {
    return (<div>
      <h1>Post not found</h1>
    </div>)
  }
  return (
    <div className="container mx-auto text-center pt-10">
      <h1 className="text-5xl font-bold mb-5">{post.docs[0].title}</h1>
      <RichText content={post.docs[0].postBody} />
    </div>
  )
}

export default page;