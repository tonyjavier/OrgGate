// ==========================================================================
// SERVIÇO DE CAMADA DE DADOS E MOCK BACKEND (Preparado para API de Produção)
// ==========================================================================

const LOCAL_STORAGE_KEY = 'gatofoco_app_data';

const defaultData = {
    user: {
        name: 'Antony',
        streak: 7,
        lastHabitDate: null
    },
    tasks: [
        { id: 1, title: 'Estudar para o concurso de tecnologia', duration: 30, completed: false, category: 'Estudos' },
        { id: 2, title: 'Revisar código do projeto OrgGate', duration: 45, completed: true, category: 'Trabalho' },
        { id: 3, title: 'Treino de academia (Perna)', duration: 60, completed: false, category: 'Saúde' }
    ],
    habits: [
        { id: 1, name: 'Treinar na academia', icon: 'fitness_center', frequency: '5x na semana', history: [true, true, true, true, false, false, false] },
        { id: 2, name: 'Ler livro técnico', icon: 'menu_book', frequency: 'Diário', history: [true, true, true, false, false, false, false] },
        { id: 3, name: 'Meditar e alongar', icon: 'spa', frequency: '3x na semana', history: [false, true, false, true, false, false, false] }
    ],
    finance: {
        balance: 1420.50,
        transactions: [
            { id: 1, description: 'Salário Projeto Freelance', amount: 2500.00, type: 'revenue', category: 'Trabalho', date: '2026-07-18' },
            { id: 2, description: 'Mensalidade Academia', amount: 110.00, type: 'expense', category: 'Saúde', date: '2026-07-19' },
            { id: 3, description: 'Supermercado e Lanches', amount: 969.50, type: 'expense', category: 'Alimentação', date: '2026-07-20' }
        ]
    },
    notes: [
        { id: 1, title: 'Ideias de Projetos', category: 'Trabalho', content: 'Fazer o design de uma interface para o banco de dados. Implementar mais animações de transição no mobile.', date: '2026-07-20' },
        { id: 2, title: 'Leituras Recomendadas', category: 'Estudos', content: 'Clean Code, UX Moderno em Dispositivos Móveis.', date: '2026-07-19' }
    ],
    agenda: [
        { id: 1, title: 'Reunião de Alinhamento', time: '09:00', category: 'Trabalho', day: 0 },
        { id: 2, title: 'Academia', time: '11:00', category: 'Saúde', day: 0 },
        { id: 3, title: 'Dentista', time: '14:30', category: 'Saúde', day: 2 },
        { id: 4, title: 'Estudar UX/UI', time: '19:00', category: 'Estudos', day: 3 }
    ],
    pomodoroStats: {
        sessions: 4,
        minutes: 100,
        streak: 3
    }
};

// Objeto da API preparado para se conectar a um backend futuramente
const apiService = {
    // Carrega dados iniciais do LocalStorage ou define o mock inicial
    getData: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
                if (stored) {
                    try {
                        resolve(JSON.parse(stored));
                    } catch (e) {
                        resolve(defaultData);
                    }
                } else {
                    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultData));
                    resolve(defaultData);
                }
            }, 150); // Simula latência de rede sutil
        });
    },

    // Salva o estado atualizado no LocalStorage
    saveData: async (data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
                resolve(true);
            }, 100);
        });
    }
};

// ==========================================================================
// COMPONENTES AUXILIARES TIPO GLIFO/ÍCONE
// ==========================================================================

// Tradução de ícones e inicialização dinâmica do Lucide
const LucideIcon = ({ name, className = "w-5 h-5", size = 20 }) => {
    React.useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, [name]);

    return (
        <i data-lucide={name} className={className} style={{ width: size, height: size, display: 'inline-block' }}></i>
    );
};

// ==========================================================================
// COMPONENTE DO MASCOTE (Gato Preto de Olhos Laranja)
// ==========================================================================

const MascotMiau = ({ quoteType }) => {
    const quotes = {
        dash: [
            "Foco é o seu superpoder hoje, Antony! 🚀",
            "Miau! Já bebeu água e marcou suas tarefas hoje?",
            "Um passo de cada vez. Você está indo super bem! ✨",
            "Não olhe para o topo da montanha, apenas dê o próximo passo."
        ],
        habits: [
            "Bolinha laranja com check me deixa muito feliz! 🐱",
            "Sua sequência está incrível! Mantenha o ritmo!",
            "Hábitos diários moldam o seu futuro. Continue firme!",
            "Consistência vence a intensidade sempre, humano!"
        ],
        finance: [
            "O saldo está positivo! Continue controlando bem o bolso. 💸",
            "Economizar hoje é garantir a tranquilidade de amanhã.",
            "Antes de comprar, pergunte: 'Eu realmente preciso disso agora?'",
            "Miau! Minha ração é cara, então guarde um dinheirinho!"
        ],
        pomodoro: [
            "Foque totalmente por 25 minutos. Eu vigio suas distrações! 👀",
            "Sem espiar as redes sociais! O tempo voa quando focamos.",
            "Respire fundo. Apenas você e a tarefa à sua frente.",
            "Quando terminar a sessão de foco, ganha um carinho! Miau!"
        ],
        notes: [
            "Organize suas ideias para clarear a sua mente. 📝",
            "Anotar liberta espaço valioso no seu cérebro.",
            "Escreva para planejar, organize para executar!",
            "Ideias desaparecem rápido. Anote tudo, miau!"
        ],
        agenda: [
            "Uma agenda bem planejada evita surpresas ruins! 📅",
            "Confira seus eventos de hoje e prepare sua mente.",
            "Miau! Lembre-se de reservar momentos de pausa no seu dia.",
            "Seu dia está bem distribuído. Vamos conquistar a semana!"
        ]
    };

    const [currentQuote, setCurrentQuote] = React.useState('');

    React.useEffect(() => {
        const typeQuotes = quotes[quoteType] || quotes.dash;
        const randomQuote = typeQuotes[Math.floor(Math.random() * typeQuotes.length)];
        setCurrentQuote(randomQuote);
    }, [quoteType]);

    return (
        <div className="bg-brand-bgSurface rounded-custom p-4 shadow-card-dark border border-brand-border/30 flex items-center gap-4 relative overflow-hidden group">
            <div className="w-16 h-16 flex-shrink-0 relative z-10">
                <img 
                    src="assets/mascot_cat.png" 
                    alt="Mascote Gato Foco" 
                    className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(255,107,0,0.3)] group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="flex-1 relative z-10">
                <span className="text-[10px] uppercase font-extrabold text-brand-orange tracking-widest block mb-1">MiauConselho</span>
                <p className="text-xs text-brand-textPrimary font-medium leading-relaxed italic">
                    "{currentQuote}"
                </p>
            </div>
            {/* Efeito decorativo sutil de fundo */}
            <div className="absolute right-0 top-0 w-24 h-24 bg-brand-orange/5 rounded-full blur-xl transform translate-x-6 -translate-y-6"></div>
        </div>
    );
};

// ==========================================================================
// APLICATIVO CENTRAL (ESTADO E NAVEGAÇÃO GLOBAL)
// ==========================================================================

function App() {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState(defaultData);
    const [activeTab, setActiveTab] = React.useState('dash');
    const [showTransition, setShowTransition] = React.useState(true);

    // Estado do Pomodoro persistido globalmente para continuar rodando nas outras abas
    const [pomodoro, setPomodoro] = React.useState({
        minutes: 25,
        seconds: 0,
        isActive: false,
        type: 'focus', // focus | break
        sessionsToday: 2,
        minutesToday: 50,
        streak: 3
    });

    // Modais
    const [modals, setModals] = React.useState({
        task: false,
        habit: false,
        transaction: false,
        note: false,
        event: false
    });

    // Lógica do temporizador Pomodoro global
    React.useEffect(() => {
        let interval = null;
        if (pomodoro.isActive) {
            interval = setInterval(() => {
                if (pomodoro.seconds > 0) {
                    setPomodoro(prev => ({ ...prev, seconds: prev.seconds - 1 }));
                } else if (pomodoro.seconds === 0) {
                    if (pomodoro.minutes === 0) {
                        // Concluiu a sessão
                        const wasFocus = pomodoro.type === 'focus';
                        const newType = wasFocus ? 'break' : 'focus';
                        const newMins = wasFocus ? 5 : 25;
                        
                        alert(wasFocus ? "Miau! Sessão de Foco concluída! Hora de uma pausa curta. ☕" : "Hora de voltar ao Foco! Vamos lá! 🎯");
                        
                        setPomodoro(prev => {
                            const updated = {
                                ...prev,
                                minutes: newMins,
                                seconds: 0,
                                isActive: false,
                                type: newType
                            };
                            if (wasFocus) {
                                updated.sessionsToday += 1;
                                updated.minutesToday += 25;
                                
                                // Incrementar os minutos focados no dashboard/user
                                updateFocusTime(25);
                            }
                            return updated;
                        });
                        clearInterval(interval);
                    } else {
                        setPomodoro(prev => ({
                            ...prev,
                            minutes: prev.minutes - 1,
                            seconds: 59
                        }));
                    }
                }
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [pomodoro.isActive, pomodoro.minutes, pomodoro.seconds, pomodoro.type]);

    // Carregar dados no boot
    React.useEffect(() => {
        async function fetchAppInitialData() {
            const result = await apiService.getData();
            setData(result);
            
            // Sincronizar dados do Pomodoro salvos se existirem
            if (result.pomodoroStats) {
                setPomodoro(prev => ({
                    ...prev,
                    sessionsToday: result.pomodoroStats.sessions,
                    minutesToday: result.pomodoroStats.minutes,
                    streak: result.pomodoroStats.streak
                }));
            }
            setLoading(false);
        }
        fetchAppInitialData();
    }, []);

    // Sincronizar com LocalStorage toda vez que "data" mudar
    const syncData = async (updatedData) => {
        setData(updatedData);
        await apiService.saveData(updatedData);
    };

    // Incrementar minutos de foco no estado global
    const updateFocusTime = (minutes) => {
        const updatedData = { ...data };
        updatedData.pomodoroStats = {
            ...updatedData.pomodoroStats,
            sessions: updatedData.pomodoroStats.sessions + 1,
            minutes: updatedData.pomodoroStats.minutes + minutes
        };
        syncData(updatedData);
    };

    // Gerenciador de troca de abas com transição suave
    const changeTab = (tab) => {
        setShowTransition(false);
        setTimeout(() => {
            setActiveTab(tab);
            setShowTransition(true);
        }, 100);
    };

    // Renderizador com esqueleto de carregamento
    if (loading) {
        return (
            <div className="app-container flex flex-col justify-center items-center">
                <img src="assets/mascot_cat.png" alt="Carregando..." className="w-20 h-20 object-contain animate-bounce filter drop-shadow-[0_4px_12px_rgba(255,107,0,0.4)]" />
                <p className="text-sm font-semibold text-brand-orange mt-4 uppercase tracking-widest animate-pulse">Preparando seu foco...</p>
            </div>
        );
    }

    return (
        <div className="app-container">
            {/* Visualização da Tela ativa */}
            <div className={`app-content p-4 space-y-5 ${showTransition ? 'fade-enter-active' : 'fade-enter'}`}>
                {activeTab === 'dash' && (
                    <DashView 
                        data={data} 
                        syncData={syncData}
                        changeTab={changeTab}
                        pomodoroTimeToday={pomodoro.minutesToday}
                        openModal={(type) => setModals(prev => ({ ...prev, [type]: true }))}
                    />
                )}
                
                {activeTab === 'habits' && (
                    <HabitsView 
                        data={data} 
                        syncData={syncData}
                        openModal={(type) => setModals(prev => ({ ...prev, [type]: true }))}
                    />
                )}
                
                {activeTab === 'finance' && (
                    <FinanceView 
                        data={data} 
                        syncData={syncData}
                        openModal={(type) => setModals(prev => ({ ...prev, [type]: true }))}
                    />
                )}
                
                {activeTab === 'pomodoro' && (
                    <PomodoroView 
                        pomodoro={pomodoro} 
                        setPomodoro={setPomodoro}
                        updateFocusTime={updateFocusTime}
                    />
                )}
                
                {activeTab === 'notes' && (
                    <NotesView 
                        data={data} 
                        syncData={syncData}
                        openModal={(type) => setModals(prev => ({ ...prev, [type]: true }))}
                    />
                )}
                
                {activeTab === 'agenda' && (
                    <AgendaView 
                        data={data} 
                        syncData={syncData}
                        openModal={(type) => setModals(prev => ({ ...prev, [type]: true }))}
                    />
                )}
            </div>

            {/* Bottom Navigation Bar */}
            <nav class="absolute bottom-0 left-0 w-full z-40 flex justify-around items-center px-2 pb-safe bg-brand-bgSurface/95 backdrop-blur-lg border-t border-brand-border/40 shadow-lg h-[80px]">
                <button 
                    onClick={() => changeTab('dash')}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 w-[64px] h-[64px] ${activeTab === 'dash' ? 'nav-tab-active' : 'nav-tab-inactive'}`}
                >
                    <LucideIcon name="home" className={activeTab === 'dash' ? "text-brand-orange" : "text-brand-textSecondary"} />
                    <span className="text-[10px] font-semibold mt-1">Dash</span>
                </button>

                <button 
                    onClick={() => changeTab('habits')}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 w-[64px] h-[64px] ${activeTab === 'habits' ? 'nav-tab-active' : 'nav-tab-inactive'}`}
                >
                    <LucideIcon name="check-square" className={activeTab === 'habits' ? "text-brand-orange" : "text-brand-textSecondary"} />
                    <span className="text-[10px] font-semibold mt-1">Hábitos</span>
                </button>

                <button 
                    onClick={() => changeTab('finance')}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 w-[64px] h-[64px] ${activeTab === 'finance' ? 'nav-tab-active' : 'nav-tab-inactive'}`}
                >
                    <LucideIcon name="dollar-sign" className={activeTab === 'finance' ? "text-brand-orange" : "text-brand-textSecondary"} />
                    <span className="text-[10px] font-semibold mt-1">Finanças</span>
                </button>

                <button 
                    onClick={() => changeTab('pomodoro')}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 w-[64px] h-[64px] ${activeTab === 'pomodoro' ? 'nav-tab-active' : 'nav-tab-inactive'}`}
                >
                    <div className="relative">
                        <LucideIcon name="clock" className={activeTab === 'pomodoro' ? "text-brand-orange" : "text-brand-textSecondary"} />
                        {pomodoro.isActive && (
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-orange border border-brand-bgSurface rounded-full animate-ping"></span>
                        )}
                    </div>
                    <span className="text-[10px] font-semibold mt-1">Foco</span>
                </button>

                <button 
                    onClick={() => changeTab('notes')}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 w-[64px] h-[64px] ${activeTab === 'notes' ? 'nav-tab-active' : 'nav-tab-inactive'}`}
                >
                    <LucideIcon name="file-text" className={activeTab === 'notes' ? "text-brand-orange" : "text-brand-textSecondary"} />
                    <span className="text-[10px] font-semibold mt-1">Notas</span>
                </button>

                <button 
                    onClick={() => changeTab('agenda')}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 w-[64px] h-[64px] ${activeTab === 'agenda' ? 'nav-tab-active' : 'nav-tab-inactive'}`}
                >
                    <LucideIcon name="calendar" className={activeTab === 'agenda' ? "text-brand-orange" : "text-brand-textSecondary"} />
                    <span className="text-[10px] font-semibold mt-1">Agenda</span>
                </button>
            </nav>

            {/* ==========================================================================
               MODAIS DE CRIAÇÃO (Globais para centralizar estado de inputs)
               ========================================================================== */}
            
            {/* Modal Criar Tarefa */}
            {modals.task && (
                <CreateTaskModal 
                    data={data}
                    syncData={syncData}
                    closeModal={() => setModals(prev => ({ ...prev, task: false }))}
                />
            )}

            {/* Modal Criar Transação */}
            {modals.transaction && (
                <CreateTransactionModal 
                    data={data}
                    syncData={syncData}
                    closeModal={() => setModals(prev => ({ ...prev, transaction: false }))}
                />
            )}

            {/* Modal Criar Nota */}
            {modals.note && (
                <CreateNoteModal 
                    data={data}
                    syncData={syncData}
                    closeModal={() => setModals(prev => ({ ...prev, note: false }))}
                />
            )}

            {/* Modal Criar Evento Agenda */}
            {modals.event && (
                <CreateEventModal 
                    data={data}
                    syncData={syncData}
                    closeModal={() => setModals(prev => ({ ...prev, event: false }))}
                />
            )}

            {/* Modal Criar Hábito */}
            {modals.habit && (
                <CreateHabitModal 
                    data={data}
                    syncData={syncData}
                    closeModal={() => setModals(prev => ({ ...prev, habit: false }))}
                />
            )}
        </div>
    );
}

// ==========================================================================
// TELA 1 — DASHBOARD
// ==========================================================================

const DashView = ({ data, syncData, changeTab, pomodoroTimeToday, openModal }) => {
    const toggleTaskCompleted = (id) => {
        const updatedTasks = data.tasks.map(t => {
            if (t.id === id) {
                return { ...t, completed: !t.completed };
            }
            return t;
        });
        syncData({ ...data, tasks: updatedTasks });
    };

    // Estatísticas de Resumo
    const completedTasksCount = data.tasks.filter(t => t.completed).length;
    const totalTasksCount = data.tasks.length;
    
    // Hábitos preenchidos hoje (sexta bolinha do histórico, ex: índice 5 para Sábado, ou calculamos dinamicamente)
    // Para simplificar, consideramos "Hoje" como o índice 4 (Sexta-feira)
    const todayIndex = 4;
    const completedHabitsCount = data.habits.filter(h => h.history[todayIndex]).length;
    const totalHabitsCount = data.habits.length;

    // Próxima tarefa não concluída
    const nextTask = data.tasks.find(t => !t.completed);

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex justify-between items-start pt-2">
                <div>
                    <h1 className="text-xl font-extrabold text-brand-textPrimary">
                        Bom dia,
                    </h1>
                    <span className="text-2xl font-black text-brand-orange">{data.user.name}! 👋</span>
                </div>
                <div className="relative p-2 bg-brand-bgSurface hover:bg-brand-bgElevated rounded-xl border border-brand-border/40 cursor-pointer active:scale-95 transition-all">
                    <LucideIcon name="bell" className="text-brand-textSecondary" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-orange rounded-full"></span>
                </div>
            </div>

            {/* Streak Flame Badge */}
            <div className="bg-brand-bgSurface rounded-custom p-4 shadow-card-dark border border-brand-border/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-orange/15 flex items-center justify-center border border-brand-orange/30">
                        <LucideIcon name="flame" className="text-brand-orange fill-brand-orange" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-brand-textSecondary">Sequência atual</p>
                        <h4 className="text-sm font-bold text-brand-textPrimary">{data.user.streak} dias de sequência</h4>
                    </div>
                </div>
                <div className="bg-brand-orange/10 px-3 py-1.5 rounded-full border border-brand-orange/20">
                    <span className="text-xs font-bold text-brand-orange">Meta diária ativa</span>
                </div>
            </div>

            {/* Mascot Banner */}
            <MascotMiau quoteType="dash" />

            {/* Resumo do Dia Grid */}
            <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-brand-orange">Resumo do dia</h3>
                    <button 
                        onClick={() => openModal('task')}
                        className="text-xs font-bold text-brand-textSecondary hover:text-brand-orange flex items-center gap-1"
                    >
                        <LucideIcon name="plus" size={14} className="text-brand-textSecondary" />
                        Nova Tarefa
                    </button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                    {/* Tarefas */}
                    <div className="bg-brand-bgSurface rounded-custom p-4 shadow-card-dark border border-brand-border/20 flex flex-col justify-between h-28">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2 text-brand-textSecondary">
                                <LucideIcon name="check-square" size={16} />
                                <span className="text-xs font-semibold">Tarefas</span>
                            </div>
                            <span className="text-xs font-bold text-brand-textPrimary">{completedTasksCount}/{totalTasksCount}</span>
                        </div>
                        <div className="space-y-1">
                            <div className="w-full bg-brand-bgElevated h-1 rounded-full overflow-hidden">
                                <div 
                                    className="bg-brand-orange h-full rounded-full transition-all duration-500" 
                                    style={{ width: `${totalTasksCount ? (completedTasksCount / totalTasksCount) * 100 : 0}%` }}
                                ></div>
                            </div>
                            <p className="text-[10px] text-brand-textSecondary">{totalTasksCount - completedTasksCount} restantes</p>
                        </div>
                    </div>

                    {/* Foco Pomodoro */}
                    <div className="bg-brand-bgSurface rounded-custom p-4 shadow-card-dark border border-brand-border/20 flex flex-col justify-between h-28 cursor-pointer hover:bg-brand-bgElevated transition-all" onClick={() => changeTab('pomodoro')}>
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2 text-brand-textSecondary">
                                <LucideIcon name="clock" size={16} />
                                <span className="text-xs font-semibold">Foco</span>
                            </div>
                            <span className="text-xs font-bold text-brand-textPrimary">{pomodoroTimeToday}m</span>
                        </div>
                        <div className="space-y-1">
                            <div className="w-full bg-brand-bgElevated h-1 rounded-full overflow-hidden">
                                <div 
                                    className="bg-brand-orange h-full rounded-full transition-all duration-500" 
                                    style={{ width: `${Math.min((pomodoroTimeToday / 120) * 100, 100)}%` }} // Meta 120 minutos
                                ></div>
                            </div>
                            <p className="text-[10px] text-brand-textSecondary">meta diária: 120m</p>
                        </div>
                    </div>

                    {/* Hábitos */}
                    <div className="bg-brand-bgSurface rounded-custom p-4 shadow-card-dark border border-brand-border/20 flex flex-col justify-between h-28 cursor-pointer hover:bg-brand-bgElevated transition-all" onClick={() => changeTab('habits')}>
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2 text-brand-textSecondary">
                                <LucideIcon name="award" size={16} />
                                <span className="text-xs font-semibold">Hábitos</span>
                            </div>
                            <span className="text-xs font-bold text-brand-textPrimary">{completedHabitsCount}/{totalHabitsCount}</span>
                        </div>
                        <div className="space-y-1">
                            <div className="w-full bg-brand-bgElevated h-1 rounded-full overflow-hidden">
                                <div 
                                    className="bg-brand-orange h-full rounded-full transition-all duration-500" 
                                    style={{ width: `${totalHabitsCount ? (completedHabitsCount / totalHabitsCount) * 100 : 0}%` }}
                                ></div>
                            </div>
                            <p className="text-[10px] text-brand-textSecondary">completados hoje</p>
                        </div>
                    </div>

                    {/* Financeiro */}
                    <div className="bg-brand-bgSurface rounded-custom p-4 shadow-card-dark border border-brand-border/20 flex flex-col justify-between h-28 cursor-pointer hover:bg-brand-bgElevated transition-all" onClick={() => changeTab('finance')}>
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2 text-brand-textSecondary">
                                <LucideIcon name="wallet" size={16} />
                                <span className="text-xs font-semibold">Saldo</span>
                            </div>
                            <LucideIcon name="trending-up" size={16} className="text-brand-success" />
                        </div>
                        <div>
                            <span className="text-sm font-extrabold text-brand-success">R$ {data.finance.balance.toFixed(2)}</span>
                            <p className="text-[10px] text-brand-textSecondary mt-1">Saldo consolidado</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Próxima Tarefa Card */}
            {nextTask ? (
                <div className="bg-brand-orange rounded-custom p-4 shadow-glow-orange flex justify-between items-center relative overflow-hidden group cursor-pointer active:scale-95 transition-all duration-300" onClick={() => toggleTaskCompleted(nextTask.id)}>
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
                    <div className="relative z-10 space-y-1 flex-1 pr-4">
                        <span className="text-[10px] font-extrabold uppercase text-white/80 tracking-wider">Próxima Tarefa</span>
                        <h4 className="text-white font-bold text-base leading-tight line-clamp-1">{nextTask.title}</h4>
                        <div className="flex items-center text-white/90 gap-1.5 pt-1">
                            <LucideIcon name="clock" size={12} className="text-white" />
                            <span className="text-xs font-semibold">{nextTask.duration} minutos</span>
                            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">{nextTask.category}</span>
                        </div>
                    </div>
                    <div className="relative z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-orange shadow-lg transform group-hover:translate-x-1 transition-transform">
                        <LucideIcon name="check" size={20} className="stroke-[3]" />
                    </div>
                </div>
            ) : (
                <div className="bg-brand-bgSurface rounded-custom p-4 border border-dashed border-brand-border flex flex-col justify-center items-center py-6 text-center">
                    <p className="text-xs font-semibold text-brand-textSecondary">Parabéns! Todas as tarefas de hoje foram concluídas. 🎉</p>
                    <button 
                        onClick={() => openModal('task')}
                        className="mt-2.5 bg-brand-orange/10 hover:bg-brand-orange/20 text-brand-orange text-xs font-bold px-4 py-2 rounded-full border border-brand-orange/20 active:scale-95 transition-all"
                    >
                        Criar nova tarefa
                    </button>
                </div>
            )}

            {/* Lista Completa de Tarefas (Inline) */}
            <div className="space-y-3 mt-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-brand-orange">Tarefas pendentes</h4>
                <div className="space-y-2">
                    {data.tasks.map(task => (
                        <div 
                            key={task.id}
                            className="bg-brand-bgSurface rounded-xl p-3 flex items-center justify-between border border-brand-border/20 shadow-md group cursor-pointer hover:bg-brand-bgElevated transition-all"
                            onClick={() => toggleTaskCompleted(task.id)}
                        >
                            <div className="flex items-center gap-3">
                                <button className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${task.completed ? 'bg-brand-orange border-brand-orange text-white' : 'border-brand-border group-hover:border-brand-orange'}`}>
                                    {task.completed && <LucideIcon name="check" size={12} className="stroke-[3]" />}
                                </button>
                                <div>
                                    <p className={`text-xs font-semibold ${task.completed ? 'line-through text-brand-textSecondary' : 'text-brand-textPrimary'}`}>
                                        {task.title}
                                    </p>
                                    <span className="text-[10px] text-brand-textSecondary">{task.duration}m • {task.category}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ==========================================================================
// TELA 2 — HÁBITOS
// ==========================================================================

const HabitsView = ({ data, syncData, openModal }) => {
    // Semana S T Q Q S S D
    const diasSemana = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

    // Clique no dot do tracker para alternar o status do dia
    const toggleHabitHistory = (habitId, dayIndex) => {
        let streakChanged = false;
        let newStreak = data.user.streak;

        const updatedHabits = data.habits.map(h => {
            if (h.id === habitId) {
                const newHistory = [...h.history];
                const wasCompleted = newHistory[dayIndex];
                newHistory[dayIndex] = !wasCompleted;

                // Regra comportamental: Ao completar um hábito, se o dia atual for ativado, incrementa a chama.
                // Usamos o índice 4 (sexta) para simular hoje.
                if (dayIndex === 4) {
                    if (!wasCompleted) {
                        newStreak += 1;
                        streakChanged = true;
                    } else {
                        newStreak = Math.max(0, newStreak - 1);
                        streakChanged = true;
                    }
                }

                return { ...h, history: newHistory };
            }
            return h;
        });

        syncData({
            ...data,
            habits: updatedHabits,
            user: {
                ...data.user,
                streak: newStreak
            }
        });
    };

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex justify-between items-center pt-2">
                <h1 className="text-xl font-extrabold text-brand-textPrimary">
                    Rastreador de <span className="text-brand-orange">Hábitos</span>
                </h1>
                <button 
                    onClick={() => openModal('habit')}
                    className="bg-brand-orange text-white w-8 h-8 rounded-full flex items-center justify-center shadow-glow-orange hover:bg-brand-orangeHover active:scale-95 transition-all"
                >
                    <LucideIcon name="plus" size={18} className="stroke-[3]" />
                </button>
            </div>

            {/* Mascot Quote Banner */}
            <MascotMiau quoteType="habits" />

            {/* Lista de Hábitos */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-orange">Seus hábitos semanais</h3>
                
                <div className="space-y-3">
                    {data.habits.map(habit => (
                        <div key={habit.id} className="bg-brand-bgSurface rounded-custom p-4 shadow-card-dark border border-brand-border/20 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-brand-bgElevated flex items-center justify-center text-brand-orange">
                                    <LucideIcon name={habit.icon === 'spa' ? 'spa' : (habit.icon === 'menu_book' ? 'book-open' : 'dumbbell')} size={18} />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-brand-textPrimary">{habit.name}</h4>
                                    <p className="text-[10px] text-brand-textSecondary">{habit.frequency}</p>
                                </div>
                            </div>

                            {/* Tracker Semanal de 7 bolinhas */}
                            <div className="flex justify-between items-center pt-1">
                                {habit.history.map((completed, index) => (
                                    <div key={index} className="flex flex-col items-center gap-1.5">
                                        <button 
                                            onClick={() => toggleHabitHistory(habit.id, index)}
                                            className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all active:scale-90 ${completed ? 'bg-brand-orange border-brand-orange text-white' : 'bg-brand-bgElevated border-brand-border/80'}`}
                                        >
                                            {completed && <LucideIcon name="check" size={14} className="stroke-[3]" />}
                                        </button>
                                        <span className="text-[10px] font-bold text-brand-textSecondary">{diasSemana[index]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Banner Decorativo no Rodapé */}
            <div className="bg-gradient-to-r from-brand-orange/10 to-transparent p-4 rounded-custom border-l-4 border-brand-orange/60 flex items-center gap-3">
                <LucideIcon name="info" className="text-brand-orange flex-shrink-0" />
                <p className="text-[11px] text-brand-textSecondary">
                    Marcar o hábito na coluna de <strong className="text-brand-textPrimary">Sexta (S)</strong> incrementa ou diminui sua sequência de chamas 🔥 no painel principal!
                </p>
            </div>
        </div>
    );
};

// ==========================================================================
// TELA 3 — FINANCEIRO
// ==========================================================================

const FinanceView = ({ data, syncData, openModal }) => {
    // Receitas e Despesas Totais
    const totalRevenues = data.finance.transactions
        .filter(t => t.type === 'revenue')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = data.finance.transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    // Agrupamento por Categorias para barras de progresso
    const categoryTotals = data.finance.transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
        }, {});

    const maxCategoryExpense = Math.max(...Object.values(categoryTotals), 1);

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex justify-between items-center pt-2">
                <h1 className="text-xl font-extrabold text-brand-textPrimary">
                    Painel <span className="text-brand-orange">Financeiro</span>
                </h1>
                <LucideIcon name="eye" className="text-brand-textSecondary cursor-pointer hover:text-brand-orange" />
            </div>

            {/* Hero Card Laranja */}
            <div className="bg-gradient-to-br from-brand-orange to-[#cc5600] rounded-custom p-5 shadow-glow-orange relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
                <div className="relative z-10 space-y-4">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">Saldo atual</span>
                        <h2 className="text-3xl font-black text-white">R$ {data.finance.balance.toFixed(2)}</h2>
                    </div>

                    {/* Mini gráfico SVG */}
                    <div className="h-10 w-full pt-2">
                        <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                            <path 
                                d="M 0 15 Q 25 5, 50 12 T 100 8" 
                                fill="none" 
                                stroke="rgba(255,255,255,0.7)" 
                                strokeWidth="2" 
                                strokeLinecap="round"
                            />
                            <path 
                                d="M 0 15 Q 25 5, 50 12 T 100 8 L 100 20 L 0 20 Z" 
                                fill="rgba(255,255,255,0.15)"
                            />
                        </svg>
                    </div>

                    <div className="flex justify-between items-center text-xs text-white/95 border-t border-white/20 pt-3">
                        <span>Este mês</span>
                        <span className="bg-white/20 px-2 py-0.5 rounded-full font-bold">+ 12.4%</span>
                    </div>
                </div>
            </div>

            {/* Resumo de Receitas e Despesas */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-brand-bgSurface rounded-custom p-3 border border-brand-border/20 shadow-md flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-brand-success/15 flex items-center justify-center text-brand-success">
                        <LucideIcon name="trending-up" size={16} />
                    </div>
                    <div>
                        <p className="text-[10px] text-brand-textSecondary font-semibold">Receitas</p>
                        <span className="text-xs font-bold text-brand-success">+ R$ {totalRevenues.toFixed(2)}</span>
                    </div>
                </div>

                <div className="bg-brand-bgSurface rounded-custom p-3 border border-brand-border/20 shadow-md flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-brand-danger/15 flex items-center justify-center text-brand-danger">
                        <LucideIcon name="trending-down" size={16} />
                    </div>
                    <div>
                        <p className="text-[10px] text-brand-textSecondary font-semibold">Despesas</p>
                        <span className="text-xs font-bold text-brand-danger">- R$ {totalExpenses.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Mascot advice */}
            <MascotMiau quoteType="finance" />

            {/* Categorias */}
            <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-orange">Despesas por Categoria</h3>
                <div className="bg-brand-bgSurface rounded-custom p-4 border border-brand-border/20 shadow-md space-y-3.5">
                    {Object.keys(categoryTotals).length > 0 ? (
                        Object.entries(categoryTotals).map(([cat, val]) => {
                            const percent = ((val / totalExpenses) * 100).toFixed(0);
                            return (
                                <div key={cat} className="space-y-1.5">
                                    <div className="flex justify-between items-center text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2.5 h-2.5 rounded-full bg-brand-orange"></div>
                                            <span className="font-semibold text-brand-textPrimary">{cat}</span>
                                        </div>
                                        <span className="font-bold text-brand-textPrimary">R$ {val.toFixed(2)} ({percent}%)</span>
                                    </div>
                                    <div className="w-full bg-brand-bgElevated h-1.5 rounded-full overflow-hidden">
                                        <div 
                                            className="bg-brand-orange h-full rounded-full transition-all duration-500" 
                                            style={{ width: `${percent}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-xs text-brand-textSecondary text-center py-2">Nenhuma despesa adicionada ainda.</p>
                    )}
                </div>
            </div>

            {/* CTA Nova Transação */}
            <button 
                onClick={() => openModal('transaction')}
                className="w-full bg-brand-orange hover:bg-brand-orangeHover text-white font-bold py-3.5 rounded-full shadow-glow-orange active:scale-95 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
                <LucideIcon name="plus" size={16} className="stroke-[3]" />
                Nova transação
            </button>
        </div>
    );
};

// ==========================================================================
// TELA 4 — POMODORO
// ==========================================================================

const PomodoroView = ({ pomodoro, setPomodoro, updateFocusTime }) => {
    const triggerTimer = () => {
        setPomodoro(prev => ({ ...prev, isActive: !prev.isActive }));
    };

    const resetTimer = () => {
        setPomodoro(prev => ({
            ...prev,
            minutes: prev.type === 'focus' ? 25 : 5,
            seconds: 0,
            isActive: false
        }));
    };

    const toggleType = () => {
        const isFocus = pomodoro.type === 'focus';
        setPomodoro(prev => ({
            ...prev,
            type: isFocus ? 'break' : 'focus',
            minutes: isFocus ? 5 : 25,
            seconds: 0,
            isActive: false
        }));
    };

    // Formatação do tempo
    const formatTime = (mins, secs) => {
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    // Progresso do Arco Circular
    // Circunferência total de um círculo de raio 45 = 2 * PI * 45 = 282.74
    const totalCirc = 282.74;
    const totalSeconds = pomodoro.type === 'focus' ? 25 * 60 : 5 * 60;
    const currentSeconds = pomodoro.minutes * 60 + pomodoro.seconds;
    const progress = (totalSeconds - currentSeconds) / totalSeconds;
    const strokeDashoffset = totalCirc * (1 - progress);

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex justify-between items-center pt-2">
                <h1 className="text-xl font-extrabold text-brand-textPrimary">
                    Temporizador <span className="text-brand-orange">Pomodoro</span>
                </h1>
                <LucideIcon name="bar-chart-2" className="text-brand-textSecondary cursor-pointer hover:text-brand-orange" />
            </div>

            {/* Mascot mini advice */}
            <MascotMiau quoteType="pomodoro" />

            {/* Temporizador Circular SVG */}
            <div className="flex flex-col items-center justify-center py-6">
                <div className="relative w-64 h-64 flex items-center justify-center bg-brand-bgSurface rounded-full border border-brand-border/40 shadow-card-dark">
                    
                    {/* SVG Progress Ring */}
                    <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle 
                            cx="50" 
                            cy="50" 
                            r="45" 
                            className="stroke-brand-bgElevated" 
                            strokeWidth="4" 
                            fill="none" 
                        />
                        <circle 
                            cx="50" 
                            cy="50" 
                            r="45" 
                            className="stroke-brand-orange timer-ring-circle" 
                            strokeWidth="4.5" 
                            fill="none" 
                            strokeDasharray={totalCirc}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                        />
                    </svg>

                    {/* Central Text */}
                    <div className="text-center z-10 space-y-1">
                        <h2 className="text-5xl font-black text-brand-textPrimary leading-none font-mono">
                            {formatTime(pomodoro.minutes, pomodoro.seconds)}
                        </h2>
                        <span className="text-xs uppercase font-extrabold tracking-widest text-brand-orange block">
                            {pomodoro.type === 'focus' ? 'Foco' : 'Pausa'}
                        </span>
                        
                        {/* Botão Alternar */}
                        <button 
                            onClick={toggleType}
                            className="text-[10px] bg-brand-bgElevated hover:bg-brand-border px-3 py-1 rounded-full text-brand-textSecondary hover:text-brand-textPrimary border border-brand-border/60 transition-all font-semibold active:scale-95"
                        >
                            Ir para {pomodoro.type === 'focus' ? 'Pausa' : 'Foco'}
                        </button>
                    </div>
                </div>

                {/* Controles do Timer */}
                <div className="flex items-center gap-5 mt-6">
                    <button 
                        onClick={resetTimer}
                        className="w-12 h-12 rounded-full bg-brand-bgSurface hover:bg-brand-bgElevated border border-brand-border flex items-center justify-center text-brand-textSecondary hover:text-brand-textPrimary active:scale-90 transition-all shadow-md"
                        title="Reiniciar"
                    >
                        <LucideIcon name="rotate-ccw" size={18} />
                    </button>

                    <button 
                        onClick={triggerTimer}
                        className="w-16 h-16 rounded-full bg-brand-orange hover:bg-brand-orangeHover flex items-center justify-center text-white active:scale-90 transition-all shadow-glow-orange"
                        title={pomodoro.isActive ? 'Pausar' : 'Iniciar'}
                    >
                        <LucideIcon name={pomodoro.isActive ? 'pause' : 'play'} size={24} className="stroke-[3] fill-current" />
                    </button>

                    <div className="w-12"></div> {/* Espaçador para equilibrar o layout */}
                </div>
            </div>

            {/* Painel de Estatísticas de Hoje */}
            <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-orange">Estatísticas de Hoje</h3>
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-brand-bgSurface rounded-custom p-3 border border-brand-border/20 text-center space-y-1">
                        <LucideIcon name="target" className="text-brand-orange mx-auto" />
                        <h4 className="text-sm font-bold text-brand-textPrimary">{pomodoro.sessionsToday}</h4>
                        <p className="text-[10px] text-brand-textSecondary uppercase font-bold">Sessões</p>
                    </div>

                    <div className="bg-brand-bgSurface rounded-custom p-3 border border-brand-border/20 text-center space-y-1">
                        <LucideIcon name="clock" className="text-brand-orange mx-auto" />
                        <h4 className="text-sm font-bold text-brand-textPrimary">{pomodoro.minutesToday}m</h4>
                        <p className="text-[10px] text-brand-textSecondary uppercase font-bold">Minutos</p>
                    </div>

                    <div className="bg-brand-bgSurface rounded-custom p-3 border border-brand-border/20 text-center space-y-1">
                        <LucideIcon name="zap" className="text-brand-orange mx-auto" />
                        <h4 className="text-sm font-bold text-brand-textPrimary">{pomodoro.streak}</h4>
                        <p className="text-[10px] text-brand-textSecondary uppercase font-bold">Sequência</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ==========================================================================
// TELA 5 — NOTAS
// ==========================================================================

const NotesView = ({ data, syncData, openModal }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [activeChip, setActiveChip] = React.useState('Todas');

    const filterChips = ['Todas', 'Pessoais', 'Estudos', 'Trabalho'];

    // Filtra notas por busca e categoria
    const filteredNotes = data.notes.filter(note => {
        const matchesCategory = activeChip === 'Todas' || note.category === activeChip;
        const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              note.content.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getCategoryColor = (cat) => {
        switch (cat) {
            case 'Trabalho': return 'text-[#FF4444] bg-[#FF4444]/10';
            case 'Estudos': return 'text-[#00C853] bg-[#00C853]/10';
            case 'Pessoais': return 'text-[#FFD600] bg-[#FFD600]/10';
            default: return 'text-brand-orange bg-brand-orange/10';
        }
    };

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex justify-between items-center pt-2">
                <h1 className="text-xl font-extrabold text-brand-textPrimary">
                    Bloco de <span className="text-brand-orange">Notas</span>
                </h1>
                <button 
                    onClick={() => openModal('note')}
                    className="bg-brand-orange text-white w-8 h-8 rounded-full flex items-center justify-center shadow-glow-orange hover:bg-brand-orangeHover active:scale-95 transition-all"
                >
                    <LucideIcon name="plus" size={18} className="stroke-[3]" />
                </button>
            </div>

            {/* Campo de Busca */}
            <div className="relative">
                <LucideIcon name="search" size={16} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-textSecondary" />
                <input 
                    type="text" 
                    placeholder="Pesquisar notas..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-brand-bgElevated rounded-full pl-11 pr-4 py-3 text-xs text-brand-textPrimary border-0 focus:ring-1 focus:ring-brand-orange/40 shadow-inner"
                />
            </div>

            {/* Filter Chips */}
            <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-width-none">
                {filterChips.map(chip => (
                    <button
                        key={chip}
                        onClick={() => setActiveChip(chip)}
                        className={`text-xs px-4 py-2 rounded-full font-bold flex-shrink-0 transition-all border ${activeChip === chip ? 'bg-brand-orange border-brand-orange text-white' : 'bg-brand-bgElevated border-brand-border text-brand-textSecondary'}`}
                    >
                        {chip}
                    </button>
                ))}
            </div>

            {/* Mascot Advice */}
            <MascotMiau quoteType="notes" />

            {/* Grid/Lista de Notas */}
            <div className="space-y-3">
                {filteredNotes.length > 0 ? (
                    filteredNotes.map(note => (
                        <div key={note.id} className="bg-brand-bgSurface rounded-custom p-4 border border-brand-border/20 shadow-card-dark flex flex-col justify-between gap-2.5">
                            <div className="flex justify-between items-start">
                                <span className={`text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border border-current/25 ${getCategoryColor(note.category)}`}>
                                    {note.category}
                                </span>
                                <span className="text-[10px] text-brand-textSecondary font-semibold">{note.date}</span>
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-brand-textPrimary">{note.title}</h4>
                                <p className="text-xs text-brand-textSecondary line-clamp-2 leading-relaxed">
                                    {note.content}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 space-y-2 border border-dashed border-brand-border rounded-custom">
                        <LucideIcon name="file-text" size={32} className="text-brand-textSecondary mx-auto opacity-30" />
                        <p className="text-xs font-semibold text-brand-textSecondary">
                            {searchQuery ? "Nenhuma nota corresponde à busca." : "Nenhuma nota criada nesta categoria ainda."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

// ==========================================================================
// TELA 6 — AGENDA
// ==========================================================================

const AgendaView = ({ data, syncData, openModal }) => {
    const [selectedDay, setSelectedDay] = React.useState(0); // 0 = Segunda, 6 = Domingo
    const diasSemana = [
        { label: 'SEG', num: 19 },
        { label: 'TER', num: 20 },
        { label: 'QUA', num: 21 },
        { label: 'QUI', num: 22 },
        { label: 'SEX', num: 23 },
        { label: 'SÁB', num: 24 },
        { label: 'DOM', num: 25 }
    ];

    const getDayName = (idx) => {
        const nomes = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
        return nomes[idx] || '';
    };

    // Filtra eventos do dia selecionado
    const dayEvents = data.agenda
        .filter(event => event.day === selectedDay)
        .sort((a, b) => a.time.localeCompare(b.time));

    const getEventCategoryColor = (cat) => {
        switch (cat) {
            case 'Trabalho': return 'border-l-4 border-[#FF4444]';
            case 'Estudos': return 'border-l-4 border-[#00C853]';
            case 'Saúde': return 'border-l-4 border-[#FFD600]';
            default: return 'border-l-4 border-brand-orange';
        }
    };

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex justify-between items-center pt-2">
                <h1 className="text-xl font-extrabold text-brand-textPrimary">
                    Agenda da <span className="text-brand-orange">Semana</span>
                </h1>
                <button 
                    onClick={() => openModal('event')}
                    className="bg-brand-orange text-white w-8 h-8 rounded-full flex items-center justify-center shadow-glow-orange hover:bg-brand-orangeHover active:scale-95 transition-all"
                >
                    <LucideIcon name="plus" size={18} className="stroke-[3]" />
                </button>
            </div>

            {/* Strip Semanal */}
            <div className="flex justify-between items-center bg-brand-bgSurface rounded-custom p-3 border border-brand-border/20 shadow-md">
                {diasSemana.map((day, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedDay(idx)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all w-[44px] ${selectedDay === idx ? 'bg-brand-orange text-white font-bold' : 'text-brand-textSecondary'}`}
                    >
                        <span className="text-[9px] font-bold tracking-wider">{day.label}</span>
                        <span className="text-xs font-black">{day.num}</span>
                    </button>
                ))}
            </div>

            <div className="flex justify-between items-center">
                <h3 className="text-xs font-extrabold text-brand-orange uppercase tracking-wider">
                    {getDayName(selectedDay)}, {diasSemana[selectedDay].num} de Julho
                </h3>
            </div>

            {/* Mascot Banner */}
            <MascotMiau quoteType="agenda" />

            {/* Linha do tempo dos Eventos */}
            <div className="space-y-3">
                {dayEvents.length > 0 ? (
                    dayEvents.map(event => (
                        <div 
                            key={event.id} 
                            className={`bg-brand-bgSurface rounded-custom p-4 shadow-md flex items-center justify-between border border-brand-border/10 ${getEventCategoryColor(event.category)}`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-black text-brand-orange font-mono">{event.time}</span>
                                <div>
                                    <h4 className="text-xs font-bold text-brand-textPrimary">{event.title}</h4>
                                    <span className="text-[10px] text-brand-textSecondary font-semibold">{event.category}</span>
                                </div>
                            </div>
                            <LucideIcon name="more-vertical" size={16} className="text-brand-textSecondary cursor-pointer hover:text-brand-textPrimary" />
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 space-y-2 border border-dashed border-brand-border rounded-custom">
                        <LucideIcon name="calendar-x" size={32} className="text-brand-textSecondary mx-auto opacity-30" />
                        <p className="text-xs font-semibold text-brand-textSecondary">
                            Sem compromissos agendados para este dia.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

// ==========================================================================
// COMPONENTES MODAIS DE DIALOG
// ==========================================================================

// Modal Criar Tarefa
const CreateTaskModal = ({ data, syncData, closeModal }) => {
    const [title, setTitle] = React.useState('');
    const [duration, setDuration] = React.useState(30);
    const [category, setCategory] = React.useState('Estudos');

    const handleSave = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const newTask = {
            id: Date.now(),
            title: title.trim(),
            duration: Number(duration),
            completed: false,
            category
        };

        syncData({
            ...data,
            tasks: [newTask, ...data.tasks]
        });
        closeModal();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-brand-bgSurface w-full max-w-sm rounded-custom p-5 border border-brand-border/40 shadow-card-dark flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold uppercase text-brand-orange tracking-wider">Nova Tarefa</h3>
                    <button onClick={closeModal} className="text-brand-textSecondary hover:text-brand-textPrimary">
                        <LucideIcon name="x" size={18} />
                    </button>
                </div>
                <form onSubmit={handleSave} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-brand-textSecondary uppercase">Título da Tarefa</label>
                        <input 
                            type="text" 
                            required
                            placeholder="Ex: Ler capítulo 3 de UX..." 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-brand-bgElevated text-xs text-brand-textPrimary rounded-full px-4 py-3 border-0 focus:ring-1 focus:ring-brand-orange/40"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-brand-textSecondary uppercase">Duração (min)</label>
                            <input 
                                type="number" 
                                required
                                min="5"
                                max="240"
                                value={duration} 
                                onChange={(e) => setDuration(e.target.value)}
                                className="w-full bg-brand-bgElevated text-xs text-brand-textPrimary rounded-full px-4 py-3 border-0 focus:ring-1 focus:ring-brand-orange/40"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-brand-textSecondary uppercase">Categoria</label>
                            <select 
                                value={category} 
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-brand-bgElevated text-xs text-brand-textPrimary rounded-full px-4 py-3 border-0 focus:ring-1 focus:ring-brand-orange/40"
                            >
                                <option value="Estudos">Estudos</option>
                                <option value="Trabalho">Trabalho</option>
                                <option value="Saúde">Saúde</option>
                                <option value="Outros">Outros</option>
                            </select>
                        </div>
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-brand-orange hover:bg-brand-orangeHover text-white font-bold py-3.5 rounded-full shadow-glow-orange text-xs uppercase tracking-wider active:scale-95 transition-all mt-2"
                    >
                        Criar Tarefa
                    </button>
                </form>
            </div>
        </div>
    );
};

// Modal Criar Transação
const CreateTransactionModal = ({ data, syncData, closeModal }) => {
    const [description, setDescription] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [type, setType] = React.useState('expense');
    const [category, setCategory] = React.useState('Alimentação');

    const handleSave = (e) => {
        e.preventDefault();
        const value = parseFloat(amount);
        if (!description.trim() || isNaN(value) || value <= 0) return;

        const newTransaction = {
            id: Date.now(),
            description: description.trim(),
            amount: value,
            type,
            category,
            date: new Date().toISOString().split('T')[0]
        };

        const newBalance = type === 'revenue' 
            ? data.finance.balance + value 
            : data.finance.balance - value;

        syncData({
            ...data,
            finance: {
                balance: newBalance,
                transactions: [newTransaction, ...data.finance.transactions]
            }
        });
        closeModal();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-brand-bgSurface w-full max-w-sm rounded-custom p-5 border border-brand-border/40 shadow-card-dark flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold uppercase text-brand-orange tracking-wider">Nova Transação</h3>
                    <button onClick={closeModal} className="text-brand-textSecondary hover:text-brand-textPrimary">
                        <LucideIcon name="x" size={18} />
                    </button>
                </div>
                <form onSubmit={handleSave} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-brand-textSecondary uppercase">Descrição</label>
                        <input 
                            type="text" 
                            required
                            placeholder="Ex: Lanche da tarde..." 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-brand-bgElevated text-xs text-brand-textPrimary rounded-full px-4 py-3 border-0 focus:ring-1 focus:ring-brand-orange/40"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-brand-textSecondary uppercase">Valor (R$)</label>
                            <input 
                                type="number" 
                                required
                                step="0.01"
                                placeholder="0,00"
                                value={amount} 
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-brand-bgElevated text-xs text-brand-textPrimary rounded-full px-4 py-3 border-0 focus:ring-1 focus:ring-brand-orange/40"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-brand-textSecondary uppercase">Tipo</label>
                            <select 
                                value={type} 
                                onChange={(e) => setType(e.target.value)}
                                className="w-full bg-brand-bgElevated text-xs text-brand-textPrimary rounded-full px-4 py-3 border-0 focus:ring-1 focus:ring-brand-orange/40"
                            >
                                <option value="expense">Despesa</option>
                                <option value="revenue">Receita</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-brand-textSecondary uppercase">Categoria</label>
                        <select 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-brand-bgElevated text-xs text-brand-textPrimary rounded-full px-4 py-3 border-0 focus:ring-1 focus:ring-brand-orange/40"
                        >
                            <option value="Alimentação">Alimentação</option>
                            <option value="Saúde">Saúde</option>
                            <option value="Trabalho">Trabalho</option>
                            <option value="Lazer">Lazer</option>
                            <option value="Outros">Outros</option>
                        </select>
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-brand-orange hover:bg-brand-orangeHover text-white font-bold py-3.5 rounded-full shadow-glow-orange text-xs uppercase tracking-wider active:scale-95 transition-all mt-2"
                    >
                        Criar Transação
                    </button>
                </form>
            </div>
        </div>
    );
};

// Modal Criar Nota
const CreateNoteModal = ({ data, syncData, closeModal }) => {
    const [title, setTitle] = React.useState('');
    const [category, setCategory] = React.useState('Pessoais');
    const [content, setContent] = React.useState('');

    const handleSave = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        const newNote = {
            id: Date.now(),
            title: title.trim(),
            category,
            content: content.trim(),
            date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
        };

        syncData({
            ...data,
            notes: [newNote, ...data.notes]
        });
        closeModal();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-brand-bgSurface w-full max-w-sm rounded-custom p-5 border border-brand-border/40 shadow-card-dark flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold uppercase text-brand-orange tracking-wider">Nova Nota</h3>
                    <button onClick={closeModal} className="text-brand-textSecondary hover:text-brand-textPrimary">
                        <LucideIcon name="x" size={18} />
                    </button>
                </div>
                <form onSubmit={handleSave} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5 col-span-2">
                            <label className="text-[10px] font-bold text-brand-textSecondary uppercase">Título</label>
                            <input 
                                type="text" 
                                required
                                placeholder="Título da nota..." 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-brand-bgElevated text-xs text-brand-textPrimary rounded-full px-4 py-3 border-0 focus:ring-1 focus:ring-brand-orange/40"
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-brand-textSecondary uppercase">Categoria</label>
                        <select 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-brand-bgElevated text-xs text-brand-textPrimary rounded-full px-4 py-3 border-0 focus:ring-1 focus:ring-brand-orange/40"
                        >
                            <option value="Pessoais">Pessoais</option>
                            <option value="Estudos">Estudos</option>
                            <option value="Trabalho">Trabalho</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-brand-textSecondary uppercase">Conteúdo</label>
                        <textarea 
                            required
                            rows="4"
                            placeholder="Escreva algo..." 
                            value={content} 
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full bg-brand-bgElevated text-xs text-brand-textPrimary rounded-custom p-4 border-0 focus:ring-1 focus:ring-brand-orange/40 resize-none modal-scroll"
                        ></textarea>
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-brand-orange hover:bg-brand-orangeHover text-white font-bold py-3.5 rounded-full shadow-glow-orange text-xs uppercase tracking-wider active:scale-95 transition-all mt-2"
                    >
                        Criar Nota
                    </button>
                </form>
            </div>
        </div>
    );
};

// Modal Criar Evento Agenda
const CreateEventModal = ({ data, syncData, closeModal }) => {
    const [title, setTitle] = React.useState('');
    const [time, setTime] = React.useState('09:00');
    const [category, setCategory] = React.useState('Trabalho');
    const [day, setDay] = React.useState(0);

    const handleSave = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const newEvent = {
            id: Date.now(),
            title: title.trim(),
            time,
            category,
            day: Number(day)
        };

        syncData({
            ...data,
            agenda: [...data.agenda, newEvent]
        });
        closeModal();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-brand-bgSurface w-full max-w-sm rounded-custom p-5 border border-brand-border/40 shadow-card-dark flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold uppercase text-brand-orange tracking-wider">Novo Compromisso</h3>
                    <button onClick={closeModal} className="text-brand-textSecondary hover:text-brand-textPrimary">
                        <LucideIcon name="x" size={18} />
                    </button>
                </div>
                <form onSubmit={handleSave} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-brand-textSecondary uppercase">Compromisso</label>
                        <input 
                            type="text" 
                            required
                            placeholder="Ex: Treino de pernas, Call..." 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-brand-bgElevated text-xs text-brand-textPrimary rounded-full px-4 py-3 border-0 focus:ring-1 focus:ring-brand-orange/40"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-brand-textSecondary uppercase">Horário</label>
                            <input 
                                type="time" 
                                required
                                value={time} 
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full bg-brand-bgElevated text-xs text-brand-textPrimary rounded-full px-4 py-3 border-0 focus:ring-1 focus:ring-brand-orange/40"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-brand-textSecondary uppercase">Dia da Semana</label>
                            <select 
                                value={day} 
                                onChange={(e) => setDay(e.target.value)}
                                className="w-full bg-brand-bgElevated text-xs text-brand-textPrimary rounded-full px-4 py-3 border-0 focus:ring-1 focus:ring-brand-orange/40"
                            >
                                <option value="0">Segunda-feira</option>
                                <option value="1">Terça-feira</option>
                                <option value="2">Quarta-feira</option>
                                <option value="3">Quinta-feira</option>
                                <option value="4">Sexta-feira</option>
                                <option value="5">Sábado</option>
                                <option value="6">Domingo</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-brand-textSecondary uppercase">Categoria</label>
                        <select 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-brand-bgElevated text-xs text-brand-textPrimary rounded-full px-4 py-3 border-0 focus:ring-1 focus:ring-brand-orange/40"
                        >
                            <option value="Trabalho">Trabalho</option>
                            <option value="Estudos">Estudos</option>
                            <option value="Saúde">Saúde</option>
                            <option value="Lazer">Lazer</option>
                        </select>
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-brand-orange hover:bg-brand-orangeHover text-white font-bold py-3.5 rounded-full shadow-glow-orange text-xs uppercase tracking-wider active:scale-95 transition-all mt-2"
                    >
                        Adicionar Evento
                    </button>
                </form>
            </div>
        </div>
    );
};

// Modal Criar Hábito
const CreateHabitModal = ({ data, syncData, closeModal }) => {
    const [name, setName] = React.useState('');
    const [frequency, setFrequency] = React.useState('Diário');
    const [icon, setIcon] = React.useState('fitness_center');

    const handleSave = (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        const newHabit = {
            id: Date.now(),
            name: name.trim(),
            frequency,
            icon,
            // Inicializa histórico com todos os dias vazios (false)
            history: [false, false, false, false, false, false, false]
        };

        syncData({
            ...data,
            habits: [...data.habits, newHabit]
        });
        closeModal();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-brand-bgSurface w-full max-w-sm rounded-custom p-5 border border-brand-border/40 shadow-card-dark flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold uppercase text-brand-orange tracking-wider">Novo Hábito</h3>
                    <button onClick={closeModal} className="text-brand-textSecondary hover:text-brand-textPrimary">
                        <LucideIcon name="x" size={18} />
                    </button>
                </div>
                <form onSubmit={handleSave} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-brand-textSecondary uppercase">Nome do Hábito</label>
                        <input 
                            type="text" 
                            required
                            placeholder="Ex: Beber 2L de água..." 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-brand-bgElevated text-xs text-brand-textPrimary rounded-full px-4 py-3 border-0 focus:ring-1 focus:ring-brand-orange/40"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-brand-textSecondary uppercase">Frequência</label>
                            <select 
                                value={frequency} 
                                onChange={(e) => setFrequency(e.target.value)}
                                className="w-full bg-brand-bgElevated text-xs text-brand-textPrimary rounded-full px-4 py-3 border-0 focus:ring-1 focus:ring-brand-orange/40"
                            >
                                <option value="Diário">Diário</option>
                                <option value="3x na semana">3x na semana</option>
                                <option value="5x na semana">5x na semana</option>
                                <option value="Fim de semana">Fim de semana</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-brand-textSecondary uppercase">Ícone</label>
                            <select 
                                value={icon} 
                                onChange={(e) => setIcon(e.target.value)}
                                className="w-full bg-brand-bgElevated text-xs text-brand-textPrimary rounded-full px-4 py-3 border-0 focus:ring-1 focus:ring-brand-orange/40"
                            >
                                <option value="fitness_center">Halter (Saúde)</option>
                                <option value="menu_book">Livro (Estudos)</option>
                                <option value="spa">Flor (Bem-estar)</option>
                            </select>
                        </div>
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-brand-orange hover:bg-brand-orangeHover text-white font-bold py-3.5 rounded-full shadow-glow-orange text-xs uppercase tracking-wider active:scale-95 transition-all mt-2"
                    >
                        Criar Hábito
                    </button>
                </form>
            </div>
        </div>
    );
};

// Renderizar o App na Div Root do index.html
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
