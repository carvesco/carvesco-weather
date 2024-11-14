interface ObservationCardProps {
  title?: string;
  value?: number;
  icon?: React.ReactNode;
  units?: string;
}

export const ObservationCard = ({
  title,
  icon,
  value,
  units,
}: ObservationCardProps) => {
  return (
    <div className="flex flex-row rounded-xl items-center gap-2 bg-gradient-to-t from-blue-500 to-second-background text-second-foreground p-5">
      {icon}
      <h2 className="text-xl  ">{title}:</h2>
      <h2 className="text-xl text-foreground font-semibold">{value}</h2>
      <h2 className="text-xl text-foreground font-semibold">{units}</h2>
    </div>
  );
};

interface ObservationCardMultiDataProps {
  title?: string;
  value?: Record<string, string | number> | null;
  icon?: React.ReactNode;
  units?: Record<string, string>;
}

export const ObservationCardMultiData = ({
  title,
  icon,
  value,
  units,
}: ObservationCardMultiDataProps) => {
  return (
    <div className="flex flex-row rounded-xl items-center justify-center gap-2 bg-gradient-to-t from-blue-500 to-second-background text-second-foreground p-5">
      {icon}
      {title && <h2 className="text-xl  ">{title}:</h2>}
      <div className="flex flex-col items-end">
        {Object.entries(value || {}).map(([key, val]) => (
          <div key={key} className="flex flex-row">
            <h2 className="text-xl">{key}:</h2>
            <h2 className="text-xl text-foreground font-semibold">{val}</h2>
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        {Object.entries(units || {}).map(([key, val]) => (
          <div key={key} className="flex flex-row">
            <h2 className="text-xl text-foreground font-semibold">{val}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};
