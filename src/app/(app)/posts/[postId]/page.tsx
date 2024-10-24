import { getPayload } from "@/lib/payload";

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
    <div>
      <h1>{post.docs[0].title}</h1>
    </div>
  )
}

export default page;