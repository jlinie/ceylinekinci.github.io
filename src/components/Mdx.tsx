import { MDXRemote } from "next-mdx-remote/rsc";

export default function Mdx({
  source,
  imageClass = "my-6 mx-auto w-full max-w-lg rounded-xl border border-black/20 shadow",
  pClass = "mb-4 leading-relaxed opacity-90",
  h2Class = "mt-10 mb-3 text-2xl font-semibold",
}: {
  source: string;
  imageClass?: string;
  pClass?: string;
  h2Class?: string;
}) {
  return (
    <MDXRemote
      source={source}
      components={{
        p: (props) => <p className={pClass} {...props} />,
        h2: (props) => <h2 className={h2Class} {...props} />,
        img: (props) => <img {...props} className={imageClass} />,
        a: (props) => <a {...props} className="underline" />,
        ul: (props) => <ul className="mb-4 list-disc pl-6 space-y-1" {...props} />,
      }}
    />
  );
}
