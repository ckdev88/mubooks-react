import ReactMarkdown from "react-markdown"

export default function BookSummarySynopsis({ synopsis }: { synopsis: string }) {
    return (
        <div className="synopsis-wrapper" style={{ paddingLeft: ".4rem", paddingRight: ".4rem" }}>
            <ReactMarkdown>{synopsis}</ReactMarkdown>
        </div>
    )
}
