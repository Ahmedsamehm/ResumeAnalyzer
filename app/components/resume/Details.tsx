import { cn } from "~/lib/utils";
import { Accordion, AccordionContent, AccordionHeader, AccordionItem } from "./Accordion";

export const ScoreBadge = ({ score }: { score: number }) => {
  return (
    <div className={cn("flex flex-row gap-1 items-center px-2 py-0.5 rounded-[96px]", score > 69 ? "bg-badge-green" : score > 39 ? "bg-badge-yellow" : "bg-badge-red")}>
      <img src={score > 69 ? "/icons/check.svg" : "/icons/warning.svg"} alt="score" className="size-4" />
      <p className={cn("text-sm font-medium", score > 69 ? "text-badge-green-text" : score > 39 ? "text-badge-yellow-text" : "text-badge-red-text")}>{score}/100</p>
    </div>
  );
};

export const CategoryHeader = ({ title, categoryScore }: { title: string; categoryScore?: number }) => {
  return (
    <div className="flex flex-row gap-4 items-center py-2">
      <p className="text-2xl font-semibold">{title}</p>
      {categoryScore && <ScoreBadge score={categoryScore} />}
    </div>
  );
};

export const CategoryContent = ({ tips, summary }: { tips?: { type: "good" | "improve"; tip: string; explanation: string }[]; summary?: string }) => {
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      {tips && (
        <>
          <div className="bg-gray-50 w-full rounded-lg px-5 py-4 grid grid-cols-2 gap-4">
            {tips.map((tip, index) => (
              <div className="flex flex-row gap-2 items-center" key={index}>
                <img src={tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"} alt="score" className="size-5" />
                <p className="text-xl text-gray-500 ">{tip.tip}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 w-full">
            {tips.map((tip, index) => (
              <div
                key={index + tip.tip}
                className={cn(
                  "flex flex-col gap-2 rounded-2xl p-4",
                  tip.type === "good" ? "bg-green-50 border border-green-200 text-green-700" : "bg-yellow-50 border border-yellow-200 text-yellow-700"
                )}
              >
                <div className="flex flex-row gap-2 items-center">
                  <img src={tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"} alt="score" className="size-5" />
                  <p className="text-xl font-semibold">{tip.tip}</p>
                </div>
                <p>{tip.explanation}</p>
              </div>
            ))}
          </div>
        </>
      )}
      {summary && (
        <div className="flex flex-col gap-4 w-full">
          <p className="text-lg text-gray-700 font-medium ">{summary}</p>
        </div>
      )}
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Accordion>
        <AccordionItem id="tone-style">
          <AccordionHeader itemId="tone-style">
            <CategoryHeader title="Tone & Style" categoryScore={feedback.sections?.toneAndStyle.score} />
          </AccordionHeader>
          <AccordionContent itemId="tone-style">
            <CategoryContent tips={feedback.sections?.toneAndStyle.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="content">
          <AccordionHeader itemId="content">
            <CategoryHeader title="Content" categoryScore={feedback.sections?.content.score} />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent tips={feedback.sections?.content.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="structure">
          <AccordionHeader itemId="structure">
            <CategoryHeader title="Structure" categoryScore={feedback.sections?.structure.score} />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent tips={feedback.sections?.structure.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="skills">
          <AccordionHeader itemId="skills">
            <CategoryHeader title="Skills" categoryScore={feedback.sections?.skills.score} />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent tips={feedback.sections?.skills.tips} />
          </AccordionContent>
          {feedback.summary && (
            <AccordionItem id="ResumeFeedback">
              <AccordionHeader itemId="ResumeFeedback">
                <CategoryHeader title="Resume Feedback" />
              </AccordionHeader>
              <AccordionContent itemId="ResumeFeedback">
                <CategoryContent summary={feedback?.summary} />
              </AccordionContent>
            </AccordionItem>
          )}
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;
