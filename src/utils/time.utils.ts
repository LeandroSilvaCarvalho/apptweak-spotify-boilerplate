const formatDuration = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [];

  if (hours > 0) parts.push(`${hours}`);
  if (minutes > 0 || hours > 0) parts.push(`${minutes}`);
  parts.push(`${String(seconds).padStart(2, "0")}`);

  return parts.join(":");
};

export { formatDuration };
