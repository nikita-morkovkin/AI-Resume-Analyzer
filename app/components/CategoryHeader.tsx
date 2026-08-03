import ScoreBadge from "./ScoreBadge";

interface CategoryHeaderProps {
  title: string;
  categoryScore: number;
}

const CategoryHeader = ({ title, categoryScore }: CategoryHeaderProps) => {
  return (
    <div className="flex flex-row gap-4 items-center py-2">
      <p className="text-2xl font-semibold">{title}</p>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

export default CategoryHeader;
