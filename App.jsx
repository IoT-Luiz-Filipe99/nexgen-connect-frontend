import { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('user');
  const [tickets, setTickets] = useState([
    { id: 1, title: 'Sistema ERP fora do ar', description: 'Não consigo acessar o módulo de notas fiscais.', urgency: 'Alta', status: 'Aberto' }
  ]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('Baixa');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return alert("Preencha todos os campos!");
    
    const newTicket = {
      id: tickets.length + 1,
      title,
      description,
      urgency,
      status: 'Aberto'
    };
    
    setTickets([...tickets, newTicket]);
    setTitle('');
    setDescription('');
    setUrgency('Baixa');
    alert("Chamado registrado com sucesso!");
  };

  const updateStatus = (id, newStatus) => {
    const updatedTickets = tickets.map(ticket => 
      ticket.id === id ? { ...ticket, status: newStatus } : ticket
    );
    setTickets(updatedTickets);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans w-full selection:bg-blue-500 selection:text-white">
      
      {/* Cabeçalho Premium - Estilo "Tech Startup" */}
      <header className="bg-slate-900 text-white p-5 border-b border-slate-800 shadow-lg w-full">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="flex items-center gap-3">
            {/* Ícone Vetorizado de Headset Profissional (Sem emojis!) */}
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
               <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
               <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
            </svg>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-100">
              NexGen <span className="text-blue-500">Connect</span>
            </h1>
          </div>
          
          {/* Menu de Abas */}
          <nav className="flex gap-2 bg-slate-800 p-1.5 rounded-lg shadow-inner border border-slate-700">
            <button 
              onClick={() => setActiveTab('user')}
              className={`font-medium px-5 py-2 rounded-md transition-all duration-200 text-sm ${activeTab === 'user' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
            >
              Portal do Colaborador
            </button>
            <button 
              onClick={() => setActiveTab('tech')}
              className={`font-medium px-5 py-2 rounded-md transition-all duration-200 text-sm ${activeTab === 'tech' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
            >
              Painel Técnico
            </button>
          </nav>
        </div>
      </header>

      {/* Área Principal */}
      <main className="max-w-5xl mx-auto p-4 sm:p-8 mt-8 bg-white rounded-xl shadow-xl border border-slate-200/60">
        
        {/* TELA 1: ABERTURA DE CHAMADO */}
        {activeTab === 'user' && (
          <section className="animate-fade-in">
            <div className="border-b border-slate-100 pb-5 mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Novo Chamado de Suporte</h2>
              <p className="text-slate-500 text-sm mt-1.5">Descreva o incidente abaixo. A equipe técnica será notificada e o atendimento priorizado.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5" htmlFor="title">Resumo do Problema</label>
                <input 
                  id="title"
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all shadow-sm"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Impressora do RH não está puxando papel"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5" htmlFor="urgency">Nível de Prioridade</label>
                <select 
                  id="urgency"
                  className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all shadow-sm cursor-pointer"
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                >
                  <option value="Baixa">Baixa (Pode esperar)</option>
                  <option value="Média">Média (Atrapalha o trabalho)</option>
                  <option value="Alta">Alta (Sistema parado)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5" htmlFor="description">Detalhes do Incidente</label>
                <textarea 
                  id="description"
                  rows="5" 
                  className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all shadow-sm resize-y"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Forneça o máximo de detalhes (mensagens de erro, quando começou, tentativas de solução)..."
                ></textarea>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                  <span>Registrar Chamado</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </div>
            </form>
          </section>
        )}

        {/* TELA 2: DASHBOARD TÉCNICO */}
        {activeTab === 'tech' && (
          <section className="animate-fade-in">
            <div className="border-b border-slate-100 pb-5 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Fila de Atendimento</h2>
                <p className="text-slate-500 text-sm mt-1.5">Gerenciamento de chamados abertos pelos colaboradores.</p>
              </div>
              <div className="bg-slate-100 border border-slate-200 text-slate-700 text-sm font-bold px-4 py-2 rounded-lg shadow-sm">
                Total: {tickets.length} Ticket(s)
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                    <th className="p-4 font-bold">Ticket</th>
                    <th className="p-4 font-bold">Descrição</th>
                    <th className="p-4 font-bold">Prioridade</th>
                    <th className="p-4 font-bold">Status</th>
                    <th className="p-4 font-bold">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tickets.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-12 text-center">
                        <div className="flex flex-col items-center justify-center text-slate-400">
                          <svg className="w-12 h-12 mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          <p className="font-bold text-lg text-slate-500">Fila zerada!</p>
                          <p className="text-sm">Nenhum chamado pendente no momento.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    tickets.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-blue-50/30 transition-colors group">
                        <td className="p-4 text-slate-500 font-mono text-sm font-bold">#{ticket.id.toString().padStart(4, '0')}</td>
                        <td className="p-4">
                          <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{ticket.title}</p>
                          <p className="text-sm text-slate-500 mt-1 line-clamp-2 max-w-[250px]">{ticket.description}</p>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-md text-xs font-bold border ${
                            ticket.urgency.includes('Alta') ? 'bg-red-50 text-red-700 border-red-200' : 
                            ticket.urgency.includes('Média') ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                            'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}>
                            {ticket.urgency.split(' ')[0].toUpperCase()}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`flex items-center gap-2 text-sm font-bold ${
                            ticket.status === 'Concluído' ? 'text-slate-400' : 'text-slate-700'
                          }`}>
                            <span className={`w-2.5 h-2.5 rounded-full shadow-sm ${
                              ticket.status === 'Aberto' ? 'bg-red-500' :
                              ticket.status === 'Em Andamento' ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}></span>
                            {ticket.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <select 
                            className="bg-white border border-slate-300 text-slate-700 text-sm font-bold rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-sm cursor-pointer transition-all"
                            value={ticket.status}
                            onChange={(e) => updateStatus(ticket.id, e.target.value)}
                          >
                            <option value="Aberto">Aberto</option>
                            <option value="Em Andamento">Em Andamento</option>
                            <option value="Concluído">Concluído</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;