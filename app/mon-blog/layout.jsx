import BlogLayoutNavbar from "../components/BlogLayoutNavbar";

const BlogLayout = ({ children }) => {
  return (
    <>
      <BlogLayoutNavbar />
      {children}
    </>
  );
};


export default BlogLayout;
