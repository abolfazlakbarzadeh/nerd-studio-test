import Markdown from "react-markdown";

export default function Home() {
  const markdown = `
  
  \`\`\`js
  const project = "AI Tools";
  const developer = "Abolfazl Akbarzadeh";
  \`\`\`
  `
  return (
    <div className="h-full flex justify-center items-center">
      <Markdown className="prose">{markdown}</Markdown>
    </div>
  );
}
