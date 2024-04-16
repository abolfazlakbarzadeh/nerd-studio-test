import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import CodeCopyBtn from "./code_copy_btn";
import classNames from "classnames";

export function MarkdownRender({ content, className }) {
  const handleClick = (code) => {
    navigator.clipboard.writeText(code);
  };
  const Pre = ({ children }) => {
    return (
      <pre className="blog-pre">
        <CodeCopyBtn onClick={() => handleClick(children.props.children)}>
          {children}
        </CodeCopyBtn>
        {children}
      </pre>
    );
  };

  return (
    <ReactMarkdown
      className={classNames("post-markdown prose", className)}
      // linkTarget="_blank"
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
      components={{
        pre: Pre,
        code({ node, inline, className = "blog-code", children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={a11yDark}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
