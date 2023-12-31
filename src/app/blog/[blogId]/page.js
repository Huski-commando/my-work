import getBlogById from "@/utils/getBlogsById";
import getCurrentUser from "@/utils/getCurrentUser";
import GetIcons from "@/utils/getIcons";
import Image from "next/image";

const page = async ({ params }) => {
  const currentUser = await getCurrentUser();
  const { blogId } = params;

  if (!blogId || typeof blogId !== "string") {
    return null;
  }

  const blog = await getBlogById(blogId);

  if (!blog) {
    throw new Error("No blog found");
  }
  // console.log(blogId);
  // console.log(blog);

  const { id, name, imageSrc, description } = blog;

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="w-[900px] border-2 p-4 px-10 ">
        <div className="flex gap-2 justify-between items-center ">
          <div>
            <Image src={imageSrc} alt={name} width={500} height={500} />
          </div>
          <div className="flex flex-col gap-4 leading-[1.5]">
            <h1 className="font-bold text-3xl">{name}</h1>
            <p>{description}</p>
          </div>
        </div>
        <p className="mt-2">Created By: {blog?.user?.name}</p>
        {blog?.user?.id === currentUser?.id ? <GetIcons blog={blog} /> : ""}
      </div>
    </div>
  );
};

export default page;
