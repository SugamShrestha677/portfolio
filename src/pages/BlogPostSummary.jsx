import { Helmet } from "react-helmet";

export default function BlogPostSummary() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>10 Best Practices for Clean React Code | Sugam Shrestha</title>
        <meta
          name="description"
          content="Learn 10 best practices for clean, maintainable React code. Full blog available on Dev.to."
        />
        <link
          rel="canonical"
          href="https://dev.to/sugam_7ac2961675046659e05/10-best-practices-for-clean-maintainable-react-code-11pn"
        />
      </Helmet>

      {/* Page Content */}
      <h2 className="text-2xl font-bold mb-2">
        10 Best Practices for Clean, Maintainable React Code
      </h2>
      <p>
        Learn essential practices for writing clean React code — covering hooks, components, file structure, and more.{" "}
        <a
          href="https://dev.to/sugam_7ac2961675046659e05/10-best-practices-for-clean-maintainable-react-code-11pn"
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read full blog
        </a>
      </p>
    </div>
  );
}
