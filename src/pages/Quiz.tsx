import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useWebhook } from "@/hooks/useWebhook";
import { 
  Sparkles, 
  CheckCircle2, 
  Trophy, 
  Star, 
  Zap, 
  TrendingUp,
  Award,
  Target
} from "lucide-react";
import { addUtmToCheckoutUrl, saveUtmParams } from "@/utils/utmHelper";
import { motion, AnimatePresence } from "framer-motion";

interface QuizAnswer {
  question: number;
  answer: string;
  xp: number;
}

interface Level {
  name: string;
  icon: React.ReactNode;
  color: string;
  minXP: number;
}

const Quiz = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [name, setName] = useState("");
  const [showBadge, setShowBadge] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [badgeProgress, setBadgeProgress] = useState(25);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const { sendLead, isLoading } = useWebhook();

  // Sistema de níveis gamificado
  const levels: Level[] = [
    { name: "Iniciante", icon: <Star className="w-5 h-5" />, color: "text-yellow-500", minXP: 0 },
    { name: "Buscador", icon: <Zap className="w-5 h-5" />, color: "text-blue-500", minXP: 25 },
    { name: "Discípulo", icon: <TrendingUp className="w-5 h-5" />, color: "text-purple-500", minXP: 50 },
    { name: "Mestre", icon: <Trophy className="w-5 h-5" />, color: "text-orange-500", minXP: 75 },
    { name: "Iluminado", icon: <Award className="w-5 h-5" />, color: "text-primary", minXP: 100 },
  ];

  // Calcular nível atual baseado em XP
  const calculateLevel = (xp: number) => {
    for (let i = levels.length - 1; i >= 0; i--) {
      if (xp >= levels[i].minXP) {
        return i;
      }
    }
    return 0;
  };

  // Audio notification sounds and UTM tracking
  useEffect(() => {
    saveUtmParams();
  }, []);

  // Atualizar nível quando XP muda
  useEffect(() => {
    const newLevel = calculateLevel(totalXP);
    if (newLevel > currentLevel) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }
    setCurrentLevel(newLevel);
  }, [totalXP]);

  const questions = [
    {
      title: "¿Qué sientes que más falta en tu vida hoy?",
      description: "Elige la opción que mejor refleje tu situación actual",
      options: [
        { emoji: "🕊️", text: "Paz interior y tranquilidad espiritual", value: "paz", xp: 30 },
        { emoji: "💰", text: "Prosperidad financiera y estabilidad económica", value: "prosperidad", xp: 25 },
        { emoji: "🧭", text: "Dirección clara y propósito de vida", value: "direccion", xp: 35 },
        { emoji: "🔥", text: "Fortalecimiento de la fe y conexión divina", value: "fe", xp: 40 },
      ],
    },
    {
      title: "¿Con qué frecuencia oras o meditas diariamente?",
      description: "Sé honesto contigo mismo para obtener el mejor resultado",
      options: [
        { emoji: "☀️", text: "Todos los días, es parte de mi rutina", value: "todos-dias", xp: 40 },
        { emoji: "📅", text: "Algunas veces a la semana", value: "veces-semana", xp: 25 },
        { emoji: "🌙", text: "Raramente, cuando tengo tiempo", value: "raramente", xp: 15 },
        { emoji: "🙏", text: "Solo cuando siento que lo necesito", value: "necesito", xp: 20 },
      ],
    },
    {
      title: "¿En qué área de tu vida te gustaría más sentir la presencia de Dios?",
      description: "Identifica dónde necesitas más guía divina",
      options: [
        { emoji: "💼", text: "En el trabajo, carrera y proyectos profesionales", value: "trabajo", xp: 25 },
        { emoji: "👨‍👩‍👧‍👦", text: "En la familia y relaciones personales", value: "familia", xp: 30 },
        { emoji: "❤️", text: "En la salud física y bienestar emocional", value: "salud", xp: 35 },
        { emoji: "🌟", text: "En la prosperidad y abundancia material", value: "abundancia", xp: 20 },
      ],
    },
  ];

  const playClickSound = () => {
    const clickSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBi2Gyv');
    clickSound.volume = 0.3;
    clickSound.play().catch(() => {});
  };

  const playAchievementSound = () => {
    const achievementSound = new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=');
    achievementSound.volume = 0.5;
    achievementSound.play().catch(() => {});
  };

  const handleAnswer = (value: string, xp: number) => {
    playClickSound();
    
    const newAnswers = [...answers, { question: currentStep, answer: value, xp }];
    setAnswers(newAnswers);
    
    const newTotalXP = totalXP + xp;
    setTotalXP(newTotalXP);
    
    const newProgress = ((currentStep + 1) / questions.length) * 100;
    setProgress(newProgress);
    setBadgeProgress(Math.round((100 / questions.length) * (currentStep + 1)));
    
    // Show gamification badge
    setShowBadge(true);
    playAchievementSound();
    
    setTimeout(() => {
      setShowBadge(false);
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentStep(currentStep + 1); // Move to form
      }
    }, 1500);
  };

  const handleNameChange = async (value: string) => {
    setName(value);
    
    if (value.length >= 3) {
      try {
        const webhookData = {
          event: 'quiz.name_entered',
          timestamp: new Date().toISOString(),
          source: 'quiz-form',
          name: value,
          answers: answers.map(a => ({
            question: questions[a.question].title,
            answer: a.answer
          })),
          progress: "100%",
          total_xp: totalXP,
          level: levels[currentLevel].name,
          page_url: window.location.href,
          user_agent: navigator.userAgent,
          language: navigator.language,
          screen_resolution: `${window.screen.width}x${window.screen.height}`,
          viewport_size: `${window.innerWidth}x${window.innerHeight}`,
          device_type: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        };

        await fetch('https://wbn.araxa.app/webhook/receive-checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData),
        });
      } catch (error) {
        console.error('Error sending webhook:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Redireciona para a página principal (VSL de vendas)
    console.log('✅ Quiz completo! Redirecionando para página de vendas...');
    navigate('/vendas');
  };

  // Barra de progresso do funil gamificado
  const FunnelProgress = () => {
    const funnelSteps = [
      { label: "Início", progress: 0 },
      { label: "Descoberta", progress: 33 },
      { label: "Conexão", progress: 67 },
      { label: "Iluminação", progress: 100 },
    ];

    const currentFunnelStep = funnelSteps.findIndex(
      (step, idx) => progress >= step.progress && (idx === funnelSteps.length - 1 || progress < funnelSteps[idx + 1].progress)
    );

    return (
      <div className="w-full max-w-3xl mx-auto mb-8">
        {/* Barra de progresso principal */}
        <div className="relative mb-4">
          <Progress value={progress} className="h-3" />
          <div className="absolute inset-0 flex items-center justify-between px-2">
            {funnelSteps.map((step, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  progress >= step.progress
                    ? "bg-primary scale-150 shadow-lg shadow-primary/50"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Labels do funil */}
        <div className="flex justify-between text-xs sm:text-sm">
          {funnelSteps.map((step, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center transition-all duration-500 ${
                progress >= step.progress
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              <span className="hidden sm:inline">{step.label}</span>
              <span className="sm:hidden">{idx + 1}</span>
            </div>
          ))}
        </div>

        {/* Indicador de nível e XP */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
            <div className={levels[currentLevel].color}>
              {levels[currentLevel].icon}
            </div>
            <span className="text-sm font-semibold">{levels[currentLevel].name}</span>
          </div>
          <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold">{totalXP} XP</span>
          </div>
        </div>
      </div>
    );
  };

  // Badge de conquista animado
  const GamificationBadge = () => (
    <AnimatePresence>
      {showBadge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -50 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 10 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.5 }}
            className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground px-8 py-6 rounded-3xl shadow-2xl flex flex-col items-center gap-3 mx-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-12 h-12" />
            </motion.div>
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-3xl font-bold"
            >
              +{badgeProgress}%
            </motion.p>
            <p className="text-sm text-center">¡Espiritualidad Desbloqueada!</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Badge de level up
  const LevelUpBadge = () => (
    <AnimatePresence>
      {showLevelUp && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="fixed top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <Trophy className="w-6 h-6" />
            <div>
              <p className="font-bold text-lg">¡Level Up!</p>
              <p className="text-sm">Ahora eres {levels[currentLevel].name}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Form step
  if (currentStep >= questions.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background flex items-center justify-center px-4 py-12"
      >
        <div className="w-full max-w-md">
          <FunnelProgress />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-3xl shadow-2xl p-8 border border-border"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mb-4"
              >
                <Sparkles className="w-10 h-10 text-primary" />
              </motion.div>
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-3xl font-bold text-foreground mb-2"
              >
                ¡Tu Resultado Está Listo! 🎉
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-muted-foreground"
              >
                Para recibir tu resultado personalizado y la Guía de 30 Oraciones para la Prosperidad, deja tus datos:
              </motion.p>
            </div>

            {/* Mostrar nível alcançado */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={levels[currentLevel].color}>
                    {levels[currentLevel].icon}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Nivel alcanzado</p>
                    <p className="font-bold text-lg">{levels[currentLevel].name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Puntos ganados</p>
                  <p className="font-bold text-lg text-primary">{totalXP} XP</p>
                </div>
              </div>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Tu nombre
                </label>
                <Input
                  type="text"
                  placeholder="Escribe tu nombre"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                  className="h-12 text-base"
                  minLength={3}
                />
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 text-base font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? "Enviando..." : "Ver Mi Resultado →"}
                </Button>
              </motion.div>

              <p className="text-xs text-center text-muted-foreground">
                Tus datos están seguros
              </p>
            </form>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-6 pt-6 border-t border-border"
            >
              <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Recibirás:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Resultado personalizado basado en tus respuestas</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Guía de 30 Oraciones para la Prosperidad (GRATIS)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Acceso a contenido exclusivo según tu nivel</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  const currentQuestion = questions[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background flex items-center justify-center px-4 py-8 sm:py-12">
      <GamificationBadge />
      <LevelUpBadge />
      
      <div className="w-full max-w-3xl">
        <FunnelProgress />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Logo/Icon */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <Target className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </motion.div>
            </div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground mb-4 px-2"
            >
              {currentQuestion.title}
            </motion.h2>

            {currentQuestion.description && (
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center text-muted-foreground mb-8 px-2"
              >
                {currentQuestion.description}
              </motion.p>
            )}

            <div className="grid gap-3 sm:gap-4">
              {currentQuestion.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (idx + 1) }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(option.value, option.xp)}
                  className="group bg-card hover:bg-primary/5 border-2 border-border hover:border-primary rounded-xl sm:rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-xl active:scale-[0.98] touch-manipulation relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="text-4xl sm:text-5xl flex-shrink-0">{option.emoji}</div>
                    <span className="text-base sm:text-lg font-medium text-foreground group-hover:text-primary transition-colors text-left flex-1">
                      {option.text}
                    </span>
                    <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                      <Sparkles className="w-3 h-3" />
                      <span>+{option.xp} XP</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Indicador de pergunta */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-8 text-sm text-muted-foreground"
            >
              Pregunta {currentStep + 1} de {questions.length}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quiz;
