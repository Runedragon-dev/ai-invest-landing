/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ReactNode } from "react";
import { 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  Zap, 
  MessageSquare, 
  ArrowRight,
  Menu,
  X,
  Lock,
  Eye,
  CreditCard,
  Target
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#080b12]/60 backdrop-blur-xl border-b border-white/10 py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <TrendingUp className="text-[#080b12] w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white uppercase">AI-Invest <span className="text-primary">Bot</span></span>
        </div>

        <div className="hidden lg:flex items-center gap-3 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-primary uppercase tracking-tight">14,208 активных сигналов сегодня</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-text-dim hover:text-white transition-colors">Как это работает</a>
          <a href="#security" className="text-sm font-medium text-text-dim hover:text-white transition-colors">Безопасность</a>
          <a href="#pricing" className="text-sm font-medium text-text-dim hover:text-white transition-colors">Тарифы</a>
          <button className="bg-primary hover:bg-primary/80 text-[#080b12] px-5 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 active:scale-95 shadow-[0_10px_20px_rgba(77,181,255,0.3)]">
            Подключить
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-[#080b12]/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-4"
          >
            <a href="#features" onClick={() => setIsOpen(false)} className="text-lg font-medium text-text-dim">Как это работает</a>
            <a href="#security" onClick={() => setIsOpen(false)} className="text-lg font-medium text-text-dim">Безопасность</a>
            <a href="#pricing" onClick={() => setIsOpen(false)} className="text-lg font-medium text-text-dim">Тарифы</a>
            <button className="bg-primary text-[#080b12] px-5 py-3 rounded-xl font-bold">
              Подключить к Telegram
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ children, subtitle, light = false }: { children: ReactNode, subtitle?: string, light?: boolean }) => (
  <div className="text-center mb-16 px-6">
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-white to-[#8ab4f8] bg-clip-text text-transparent`}
    >
      {children}
    </motion.h2>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-panel p-8 rounded-3xl"
  >
    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20">
      <Icon className="text-primary w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-text-dim leading-relaxed text-sm">{description}</p>
  </motion.div>
);

const StepCard = ({ number, title, text }: { number: string, title: string, text: string }) => (
  <div className="relative pl-16 pb-8 border-l border-white/5 last:pb-0">
    <div className="absolute left-[-16px] top-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm border-2 border-primary/20 backdrop-blur-sm">
      {number}
    </div>
    <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
    <p className="text-text-dim text-sm leading-relaxed">{text}</p>
  </div>
);

const PriceCard = ({ title, highlight, price, features, buttonText, secondary = false }: { title: string, highlight?: string, price: string, features: string[], buttonText: string, secondary?: boolean }) => (
  <div className={`relative flex flex-col p-8 rounded-3xl border ${secondary ? "glass-panel border-primary/50 shadow-[0_0_30px_rgba(77,181,255,0.1)]" : "glass-card border-white/10"}`}>
    {highlight && (
      <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-primary text-[#080b12] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
        {highlight}
      </div>
    )}
    <h3 className={`text-xl font-black uppercase tracking-tighter mb-2 ${secondary ? "text-primary" : "text-white"}`}>{title}</h3>
    <div className="mb-8">
      <span className={`text-4xl font-bold text-white`}>{price}</span>
    </div>
    <ul className="flex-1 space-y-4 mb-8">
      {features.map((f, i) => (
        <li key={i} className="flex gap-3 items-start">
          <CheckCircle2 className={`w-5 h-5 flex-shrink-0 text-primary`} />
          <span className={`text-sm text-text-dim`}>{f}</span>
        </li>
      ))}
    </ul>
    <button className={`w-full py-4 rounded-xl font-bold transition-all active:scale-95 ${secondary ? "bg-primary text-[#080b12] hover:bg-primary/80" : "bg-white/10 text-white hover:bg-white/20 border border-white/10"}`}>
      {buttonText}
    </button>
  </div>
);

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-primary transition-colors"
      >
        <span className="text-lg font-bold text-white">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronRight className="w-5 h-5 text-text-muted" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-text-dim leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- App Layout ---

export default function App() {
  return (
    <div className="min-h-screen bg-transparent font-sans selection:bg-primary selection:text-[#080b12]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-md"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Инвестируй с интеллектом</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black bg-gradient-to-br from-white to-[#8ab4f8] bg-clip-text text-transparent leading-tight mb-6 tracking-tighter"
          >
            Зарабатывайте на новостях,<br /> а не тратьте время на чтение
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-dim text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            ИИ-ассистент AI-Invest Bot анализирует тысячи финансовых сводок за секунды и присылает готовые решения прямо в ваш Telegram. Безопасно. Прозрачно. Без плечей.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="w-full sm:w-auto bg-primary hover:bg-primary/80 text-[#080b12] px-10 py-5 rounded-2xl font-black text-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(77,181,255,0.4)]">
              Запустить бота <ArrowRight className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 px-6 py-4 rounded-2xl glass-card text-text-dim text-sm">
              <ShieldCheck className="text-primary w-5 h-5" />
              <span>Лицензия брокера не требуется</span>
            </div>
          </motion.div>

          {/* Social Proof */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-12 opacity-50 filter grayscale transition-all hover:grayscale-0 hover:opacity-100"
          >
            <div className="text-white font-bold text-xl tracking-tighter italic">ALFA-BANK API</div>
            <div className="text-white font-bold text-xl tracking-tighter italic">T-BANK</div>
            <div className="text-white font-bold text-xl tracking-tighter italic">FINAM</div>
          </motion.div>
        </div>
      </section>

      {/* Problems vs Solution */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Проблема vs Решение">Ваш персональный Copilot на бирже</SectionHeading>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Clock} 
              title="Не тратьте часы на анализ" 
              description="ИИ читает Bloomberg, Reuters и отчеты компаний за вас. Вы получаете только самую суть, когда на этом можно заработать."
            />
            <FeatureCard 
              icon={AlertTriangle} 
              title="Уберите страх и риск" 
              description="Мы полностью запретили маржинальную торговлю. Вы используете только свои средства, исключая риск уйти в минус."
            />
            <FeatureCard 
              icon={Zap} 
              title="Реагируйте мгновенно" 
              description="Событие на рынке происходит сейчас — сигнал приходит через секунду. Одобрите сделку одной кнопкой в Telegram."
            />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading subtitle="Простота и прозрачность">Всего 3 шага до первой сделки</SectionHeading>
              <div className="space-y-4 text-left">
                <StepCard 
                  number="1" 
                  title="Подключение API" 
                  text="Сгенерируйте API-ключ у своего брокера (например, Альфа-Инвестиции) только на чтение и торговлю. Без права вывода средств."
                />
                <StepCard 
                  number="2" 
                  title="Выбор стратегии" 
                  text="Настройте риск-профиль: от консервативных дивидендных историй до агрессивных полетов на новостях."
                />
                <StepCard 
                  number="3" 
                  title="Одобрение сделок" 
                  text="Получайте сигнал с подробным объяснением ИИ: почему акция вырастет? Нажмите «Ок» — и бот исполнит сделку у брокера."
                />
              </div>
            </div>

            {/* Simulated Bot Interface */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10" />
              <motion.div 
                initial={{ rotateY: 20, rotateX: 10 }}
                whileInView={{ rotateY: 0, rotateX: 0 }}
                className="glass-panel rounded-[40px] shadow-2xl overflow-hidden p-6 max-w-[400px] mx-auto border-white/20"
              >
                <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <TrendingUp className="text-[#080b12] w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">AI-Invest Bot</p>
                      <p className="text-primary text-[10px] font-bold uppercase tracking-widest">Active Analysing</p>
                    </div>
                  </div>
                  <X className="text-text-muted w-5 h-5" />
                </div>

                <div className="space-y-4">
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5">
                    <p className="text-text-dim text-sm italic">
                      "Анализ новости: Nvidia представила новый чип H200. Прогноз роста спроса на +12%. Исторически после таких новостей акции растут на 2-4% в течение дня."
                    </p>
                  </div>
                  
                  <div className="bg-primary/5 border border-primary/20 p-5 rounded-2xl">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-primary font-black text-lg">КУПИТЬ NVDA</h4>
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-md font-bold">Сигнал: Strong Buy</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-text-muted text-[10px] uppercase font-bold">Цена входа</p>
                        <p className="text-white font-bold">$784.20</p>
                      </div>
                      <div>
                        <p className="text-text-muted text-[10px] uppercase font-bold">Цель (TP)</p>
                        <p className="text-white font-bold">$810.00</p>
                      </div>
                    </div>
                    <button className="w-full bg-primary py-3 rounded-xl text-[#080b12] font-black flex items-center justify-center gap-2 hover:bg-primary/80 transition-colors">
                      <CheckCircle2 className="w-5 h-5" /> Одобрить сделку
                    </button>
                    <p className="text-center text-[9px] text-text-muted mt-3 flex items-center justify-center gap-1">
                      <Lock className="w-3 h-3" /> API: Trading Access ONLY
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Block */}
      <section id="security" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Безопасность — наш фундамент">Ваши деньги всегда под вашим контролем</SectionHeading>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-panel p-8 rounded-3xl border-accent/20">
              <div className="inline-block px-2 py-1 bg-accent/10 border border-accent/20 rounded mb-4">
                <span className="text-[10px] font-black text-accent uppercase tracking-widest">A+ SECURITY</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Только Read/Trade</h4>
              <p className="text-text-dim text-sm">Бот не имеет технической возможности выводить средства. Ваши деньги остаются на брокерском счету.</p>
            </div>
            <div className="glass-panel p-8 rounded-3xl">
              <Lock className="text-primary w-8 h-8 mb-4 opacity-50" />
              <h4 className="text-lg font-bold text-white mb-2">AES-256 Шифрование</h4>
              <p className="text-text-dim text-sm">Ваши API-ключи хранятся в изолированном защищенном контуре. Доступ к ним зашифрован на уровне ядра.</p>
            </div>
            <div className="glass-panel p-8 rounded-3xl">
              <Target className="text-primary w-8 h-8 mb-4 opacity-50" />
              <h4 className="text-lg font-bold text-white mb-2">Запрет на плечи</h4>
              <p className="text-text-dim text-sm">Мы программно блокируем маржинальные сделки. Вы не можете потерять больше, чем инвестировали.</p>
            </div>
            <div className="glass-panel p-8 rounded-3xl">
              <MessageSquare className="text-primary w-8 h-8 mb-4 opacity-50" />
              <h4 className="text-lg font-bold text-white mb-2">Вы — решаете</h4>
              <p className="text-text-dim text-sm">Бот не торгует самостоятельно вслепую. Каждая сделка требует вашего подтверждения в один клик.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Тарифы">Выберите свой формат прибыли</SectionHeading>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <PriceCard 
              title="Советник" 
              price="3 900 ₽ / мес" 
              features={[
                "Безлимитные ИИ-подсказки",
                "Анализ мирового рынка 24/7",
                "Подключение одного брокера",
                "Техподдержка 24/7",
                "Сигналы в Telegram"
              ]}
              buttonText="Оформить подписку"
            />
            <PriceCard 
              secondary
              highlight="Выгодно при росте"
              title="Win-Win" 
              price="15% с прибыли" 
              features={[
                "0 ₽ абонентской платы",
                "Мы зарабатываем только когда вы в плюсе",
                "Автоматический расчет Success Fee",
                "Доступ ко всем алгоритмам",
                "Персональные стратегии"
              ]}
              buttonText="Начать бесплатно"
            />
          </div>
          
          <p className="text-center text-text-muted text-xs mt-12 max-w-xl mx-auto italic">
            *Мы не даем гарантий доходности. Инвестиции на фондовом рынке сопряжены с риском потери капитала. Используйте ИИ ответственно.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeading subtitle="FAQ">Часто задаваемые вопросы</SectionHeading>
          <div className="space-y-2 glass-panel p-8 rounded-[40px] border-white/5">
            <AccordionItem 
              question="Безопасно ли передавать API-ключ боту?"
              answer="Да, абсолютно. При создании ключа у брокера вы сами выбираете права: 'Просмотр' и 'Торговля'. Права на 'Вывод средств' остаются закрытыми. Технически бот не сможет вывести ни рубля на другой счет."
            />
            <AccordionItem 
              question="Что будет, если ИИ-бот ошибется?"
              answer="ИИ анализирует вероятности, но не предсказывает будущее со 100% точностью. Именно поэтому бот работает в режиме Copilot — он присылает вам обоснованный сигнал, а финальное решение всегда остается за вами."
            />
            <AccordionItem 
              question="Могу ли я уйти в минус (маржинальный риск)?"
              answer="Нет. AI-Invest Bot на уровне программного кода игнорирует сигналы, требующие использование кредитного плеча. Бот торгует только на ваши свободные деньги на счету брокера."
            />
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold bg-gradient-to-br from-white to-[#8ab4f8] bg-clip-text text-transparent mb-8 tracking-tight">Готовы изменить свой подход к инвестициям?</h2>
          <button className="bg-primary hover:bg-primary/80 text-[#080b12] px-12 py-6 rounded-3xl font-black text-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 mx-auto mb-16 shadow-[0_20px_50px_rgba(77,181,255,0.2)]">
            Запустить ИИ в Telegram
          </button>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/20">
                <TrendingUp className="text-primary w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-white uppercase tracking-tighter">AI-Invest Bot © 2026</span>
            </div>
            <div className="text-text-muted text-sm flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">API Docs</a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/5 z-50">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  );
}
