import type { FC } from 'react';
import { ScreenId } from '../types';
import { QUESTIONS } from '../data/questions';
import { sounds } from '../utils/audio';
import { ASSETS } from '../assets';
import { WizardStepper } from '../components/WizardStepper';
import {
  Laptop,
  Palette,
  Calendar,
  Megaphone,
  Code,
  Layout,
  Users,
  TrendingUp,
  Cpu,
  Feather,
  Heart,
  Share2,
  GitMerge,
  Figma,
  CheckSquare,
  Mic,
  Terminal,
  PenTool,
  MessageCircle,
  Server,
  Image,
  Volume2,
  Video,
  Eye,
  Shield,
  Send,
  BookOpen,
  Globe,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

// Icon mapper for question options
const renderOptionIcon = (iconName?: string) => {
  switch (iconName) {
    case 'laptop':
      return <Laptop className="w-5 h-5" />;
    case 'palette':
      return <Palette className="w-5 h-5" />;
    case 'calendar':
      return <Calendar className="w-5 h-5" />;
    case 'megaphone':
      return <Megaphone className="w-5 h-5" />;
    case 'code':
      return <Code className="w-5 h-5" />;
    case 'layout':
      return <Layout className="w-5 h-5" />;
    case 'users':
      return <Users className="w-5 h-5" />;
    case 'trending-up':
      return <TrendingUp className="w-5 h-5" />;
    case 'cpu':
      return <Cpu className="w-5 h-5" />;
    case 'feather':
      return <Feather className="w-5 h-5" />;
    case 'heart':
      return <Heart className="w-5 h-5" />;
    case 'share-2':
      return <Share2 className="w-5 h-5" />;
    case 'git-merge':
      return <GitMerge className="w-5 h-5" />;
    case 'figma':
      return <Figma className="w-5 h-5" />;
    case 'check-square':
      return <CheckSquare className="w-5 h-5" />;
    case 'mic':
      return <Mic className="w-5 h-5" />;
    case 'terminal':
      return <Terminal className="w-5 h-5" />;
    case 'pen-tool':
      return <PenTool className="w-5 h-5" />;
    case 'message-circle':
      return <MessageCircle className="w-5 h-5" />;
    case 'server':
      return <Server className="w-5 h-5" />;
    case 'image':
      return <Image className="w-5 h-5" />;
    case 'volume-2':
      return <Volume2 className="w-5 h-5" />;
    case 'video':
      return <Video className="w-5 h-5" />;
    case 'eye':
      return <Eye className="w-5 h-5" />;
    case 'shield':
      return <Shield className="w-5 h-5" />;
    case 'send':
      return <Send className="w-5 h-5" />;
    case 'globe':
      return <Globe className="w-5 h-5" />;
    case 'briefcase':
      return <Briefcase className="w-5 h-5" />;
    default:
      return <Sparkles className="w-5 h-5" />;
  }
};

interface Screen4QuestionnaireProps {
  currentQuestionIndex: number;
  answers: Record<number, string>;
  onSelectOption: (questionId: number, optionId: string) => void;
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  onSubmitQuestionnaire: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const Screen4Questionnaire: FC<Screen4QuestionnaireProps> = ({
  currentQuestionIndex,
  answers,
  onSelectOption,
  onNextQuestion,
  onPreviousQuestion,
  onSubmitQuestionnaire,
  onNavigate,
}) => {
  const currentQuestion = QUESTIONS[currentQuestionIndex] || QUESTIONS[0];
  const totalQuestions = QUESTIONS.length;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);
  const selectedOptionId = answers[currentQuestion.id];
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleNext = () => {
    if (!selectedOptionId) {
      sounds.playClick();
      return;
    }
    sounds.playClick();
    if (isLastQuestion) {
      onSubmitQuestionnaire();
    } else {
      onNextQuestion();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left: Stepper Navigation */}
        <WizardStepper currentScreen="questionnaire" onStepClick={onNavigate} />

        {/* Center: Questionnaire Content */}
        <div className="flex-1 w-full space-y-5">
          {/* Top Progress & Title Block */}
          <div className="text-center space-y-2">
            <div className="text-xs font-fantasy tracking-widest uppercase text-amber-400 font-bold">
              ✦ THE SDG SORTING HAT ✦
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-fantasy text-amber-100 tracking-tight">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/70 max-w-md mx-auto">
              Choose the option that best describes you. There are no right or wrong answers.
            </p>

            {/* Glowing Golden Progress Bar */}
            <div className="max-w-md mx-auto pt-2 flex items-center gap-3">
              <div className="flex-1 h-2 rounded-full bg-slate-900 border border-amber-900/40 overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-300 rounded-full transition-all duration-300 shadow-[0_0_10px_#f59e0b]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="font-mono text-xs font-bold text-amber-300 w-10 text-right">
                {progressPercent}%
              </span>
            </div>
          </div>

          {/* Parchment Question Card */}
          <div className="parchment-card parchment-flourish p-6 sm:p-8 relative overflow-visible">
            {/* Question Header */}
            <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-amber-900/20">
              <div className="w-12 h-12 rounded-xl bg-blue-700 text-white flex items-center justify-center shadow-md shrink-0">
                <Code className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-fantasy font-bold text-xl sm:text-2xl text-amber-950">
                  {currentQuestion.title}
                </h3>
                <span className="text-xs text-amber-900/70">Choose one option</span>
              </div>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      sounds.playChime(580);
                      onSelectOption(currentQuestion.id, opt.id);
                    }}
                    style={isSelected ? {
                      clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)'
                    } : {}}
                    className={`w-full text-left p-4 border transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-300/90 via-amber-200/80 to-amber-300/70 border-amber-800 shadow-[0_4px_15px_rgba(180,120,40,0.35)]'
                        : 'rounded-xl bg-amber-100/60 hover:bg-amber-100/90 border-amber-900/20 hover:border-amber-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-amber-900 text-amber-100'
                            : 'bg-amber-900/15 text-amber-950'
                        }`}
                      >
                        {renderOptionIcon(opt.icon)}
                      </div>
                      <div>
                        <div className="font-bold text-sm sm:text-base text-amber-950">
                          {opt.text}
                        </div>
                        {opt.desc && (
                          <div className="text-xs text-amber-900/80 mt-0.5 leading-snug">
                            {opt.desc}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Radio Indicator */}
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? 'border-amber-950 bg-amber-950'
                          : 'border-amber-900/40 bg-transparent'
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-amber-100" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="pt-6 mt-6 border-t border-amber-900/20 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  onPreviousQuestion();
                }}
                className="btn-notch-ghost px-5 py-2.5 text-xs sm:text-sm flex items-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>← Previous</span>
              </button>

              <button
                type="button"
                disabled={!selectedOptionId}
                onClick={handleNext}
                className={`btn-notch-primary px-7 py-2.5 text-xs sm:text-sm flex items-center gap-2 ${
                  !selectedOptionId ? 'opacity-40 cursor-not-allowed' : ''
                }`}
              >
                <span>{isLastQuestion ? 'Submit to Sorting Hat' : 'Next'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Tome Stack and Sorting Hat */}
        <div className="hidden xl:flex flex-col items-center justify-center w-72 shrink-0 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl bg-[#0e1017]">
            <img
              src={ASSETS.hatCloseup}
              alt="The Sorting Hat on ancient spellbooks"
              className="w-full h-auto object-cover"
            />
            <div className="p-3 text-center bg-[#090b10] border-t border-amber-900/30">
              <div className="font-fantasy font-bold text-xs tracking-wider text-amber-300">
                EVALUATION IN PROGRESS
              </div>
              <div className="text-[10px] text-amber-200/50 mt-0.5">
                Answer truth-seeking queries
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
