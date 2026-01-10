import { useEffect, useState } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const calculateTimeLeft = () => {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    const difference = endOfDay.getTime() - now.getTime();
    
    if (difference > 0) {
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      return { hours, minutes, seconds };
    }
    
    return { hours: 0, minutes: 0, seconds: 0 };
  };

  useEffect(() => {
    // Calculate initial time
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="flex items-center justify-center gap-2 text-foreground">
      <div className="text-center">
        <div className="text-4xl md:text-5xl font-bold font-heading">{formatNumber(timeLeft.hours)}</div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider">Horas</div>
      </div>
      <span className="text-4xl md:text-5xl font-bold">:</span>
      <div className="text-center">
        <div className="text-4xl md:text-5xl font-bold font-heading">{formatNumber(timeLeft.minutes)}</div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider">Minutos</div>
      </div>
      <span className="text-4xl md:text-5xl font-bold">:</span>
      <div className="text-center">
        <div className="text-4xl md:text-5xl font-bold font-heading">{formatNumber(timeLeft.seconds)}</div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider">Segundos</div>
      </div>
    </div>
  );
};

export default CountdownTimer;
