interface Props {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: Props) => {
  const percent = (current / total) * 100;

  return (
    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
      <div className="bg-primary h-full transition-all duration-300" style={{ width: `${percent}%` }} />
    </div>
  );
};

export default ProgressBar;
