/**
 * StellaHub - Code & Project Ownership System (Final Unified Version)
 *
 * Tüm bileşenler (Dashboard, Creator, Manager) tek bir Home.tsx dosyasına entegre edilmiştir.
 * Proje: GitHub benzeri, Stellar üzerinde tokenleştirilmiş kod sahipliği platformu.
 */

'use client';

import { useState } from 'react';

// DIKKAT: Bu importlar muhtemelen sizin projenizdeki /components klasöründen geliyor.
// Bu kısımların varlığını korumak zorundayız, aksi takdirde kod çalışmaz.
import WalletConnection from '@/components/WalletConnection';
import TokenizedProjectDisplay from '@/components/BalanceDisplay';
import ProjectTransferForm from '@/components/PaymentForm';
import OwnershipHistory from '@/components/TransactionHistory';

// Sekme İsimleri
type Tab = 'dashboard' | 'creator' | 'manager';

// ====================================================================
// YARDIMCI BİLEŞENLER (Bu dosya içinde tanımlandı)
// ====================================================================

// 1. Proje Oluşturma Formu (Project Creator)
interface ProjectCreatorProps {
  publicKey: string;
}

const ProjectCreator: React.FC<ProjectCreatorProps> = ({ publicKey }) => {
  const [assetCode, setAssetCode] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');
    
    // ARKA PLAN SIMÜLASYONU
    console.log("Yeni Proje (Asset) oluşturuluyor...", { assetCode, projectUrl, creator: publicKey });

    setTimeout(() => {
        setIsLoading(false);
        setStatus('success'); 
    }, 2000);
  };

  return (
    <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-indigo-500/30">
      <h3 className="text-2xl font-bold text-white mb-6">Tokenize Yeni Proje</h3>
      <p className="text-gray-400 mb-6">
        Projeniz için benzersiz bir Owner Token'ı (Stellar Asset) oluşturun. Token, otomatik olarak cüzdanınıza tanımlanacaktır.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="assetCode" className="block text-sm font-medium text-gray-300 mb-2">
            Proje Kodu (Asset Code, Örn: MYCODE1, MAX 12 Karakter)
          </label>
          <input
            id="assetCode"
            type="text"
            value={assetCode}
            onChange={(e) => setAssetCode(e.target.value.toUpperCase().slice(0, 12))}
            required
            placeholder="PROJE_TOKENI"
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="projectUrl" className="block text-sm font-medium text-gray-300 mb-2">
            GitHub/Proje URL
          </label>
          <input
            id="projectUrl"
            type="url"
            value={projectUrl}
            onChange={(e) => setProjectUrl(e.target.value)}
            required
            placeholder="https://github.com/kullanici/proje-adi"
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div className='bg-gray-700/50 p-3 rounded-lg border border-indigo-500/50'>
            <p className='text-sm text-indigo-300'>⚠️ Not: Mülkiyet tokenı olarak, arzı **1 adet** olarak belirlenir. Bu token transferi, projenin tüm sahipliğini aktarır.</p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-colors duration-200 ${
            isLoading
              ? 'bg-indigo-700/70 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/40'
          }`}
        >
          {isLoading ? 'Token Oluşturuluyor...' : '✅ Projeyi Tokenize Et'}
        </button>
      </form>

      {status === 'success' && (
        <div className="mt-4 p-4 bg-green-900/50 text-green-300 rounded-lg border border-green-600/50">
          Proje Tokenı Başarıyla Oluşturuldu!
        </div>
      )}
    </div>
  );
};


// 2. Proje Yöneticisi Formu (Project Manager)
interface ProjectManagerProps {
    publicKey: string;
}

const ProjectManager: React.FC<ProjectManagerProps> = ({ publicKey }) => {
    const [assetCode, setAssetCode] = useState('');
    const [newVersion, setNewVersion] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus('idle');
        
        // ARKA PLAN SIMÜLASYONU
        console.log("Proje meta verisi güncelleniyor...", { assetCode, newVersion, newDescription, issuer: publicKey });

        setTimeout(() => {
            setIsLoading(false);
            setStatus('success'); 
        }, 2000);
    };

    return (
        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-indigo-500/30">
            <h3 className="text-2xl font-bold text-white mb-6">Sürüm ve Metadata Güncelle</h3>
            <p className="text-gray-400 mb-6">
                Bu işlemi sadece tokenın dağıtıcı (Issuer) hesabı yapabilir. Güncelleme, projenizin yaşam döngüsünü yönetmenizi sağlar.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="assetCode" className="block text-sm font-medium text-gray-300 mb-2">
                        Güncellenecek Proje Kodu (Asset Code)
                    </label>
                    <input
                        id="assetCode"
                        type="text"
                        value={assetCode}
                        onChange={(e) => setAssetCode(e.target.value.toUpperCase())}
                        required
                        placeholder="MEVCUT_PROJE"
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="newVersion" className="block text-sm font-medium text-gray-300 mb-2">
                        Yeni Sürüm (Versiyon) Numarası
                    </label>
                    <input
                        id="newVersion"
                        type="text"
                        value={newVersion}
                        onChange={(e) => setNewVersion(e.target.value)}
                        required
                        placeholder="v2.0.1"
                        className="w-full p-3 bg-gray-700/80 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="newDescription" className="block text-sm font-medium text-gray-300 mb-2">
                        Güncelleme Notları / Açıklama
                    </label>
                    <textarea
                        id="newDescription"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        rows={3}
                        required
                        placeholder="Önemli hata düzeltmeleri ve yeni API entegrasyonu yapıldı."
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-colors duration-200 ${
                        isLoading
                            ? 'bg-red-700/70 cursor-not-allowed'
                            : 'bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/40'
                    }`}
                >
                    {isLoading ? 'Metadata Güncelleniyor...' : '✍️ Meta Veriyi Güncelle'}
                </button>
            </form>

            {status === 'success' && (
                <div className="mt-4 p-4 bg-green-900/50 text-green-300 rounded-lg border border-green-600/50">
                    Proje Meta Verisi Başarıyla Güncellendi!
                </div>
            )}
        </div>
    );
};


// 3. Rehber Kartı (GuideCard)
const GuideCard = ({ title, description, icon }: { title: string, description: string, icon: string }) => (
    <div className="bg-gray-700/50 rounded-xl p-6 border border-indigo-600/50 hover:bg-gray-700 transition-colors">
        <div className="w-12 h-12 bg-indigo-500/30 rounded-xl flex items-center justify-center mb-4 text-3xl font-extrabold text-indigo-300">
            {icon}
        </div>
        <h3 className="text-white font-semibold mb-2 text-lg">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
    </div>
);

// 4. Özellik Kartı (FeatureCard)
const FeatureCard = ({ icon, title, description }: { icon: string, title: string, description: string }) => (
    <div className="bg-gray-700/50 rounded-xl p-6 border border-gray-600 hover:border-indigo-500 transition-all duration-300 shadow-md">
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="text-indigo-300 font-bold mb-2 text-xl">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
    </div>
);

// ====================================================================
// ANA KOMPONENT (Home.tsx)
// ====================================================================

export default function Home() {
  const [publicKey, setPublicKey] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard'); 

  const handleConnect = (key: string) => {
    setPublicKey(key);
    setIsConnected(true);
    setActiveTab('dashboard');
  };

  const handleDisconnect = () => {
    setPublicKey('');
    setIsConnected(false);
    setActiveTab('dashboard');
  };

  const handleTransferSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };
  
  // Tab stili için yardımcı fonksiyon
  const getTabClasses = (tabName: Tab) => 
    `px-6 py-2.5 text-lg font-semibold transition-all duration-200 rounded-lg ${
      activeTab === tabName
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
    }`;

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      
      {/* Header - Sleek and Professional */}
      <header className="sticky top-0 z-10 border-b border-indigo-500/30 backdrop-blur-md bg-gray-900/80">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
                🚀
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-wider">StellaHub</h1>
                <p className="text-indigo-400 text-xs mt-0.5 uppercase tracking-widest">
                  Tokenized Code Ownership
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <WalletConnection onConnect={handleConnect} onDisconnect={handleDisconnect} />
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Bağlantı Kesik Durum */}
        {!isConnected && (
          <div className="mb-12 bg-gray-800/50 border border-indigo-500/40 rounded-3xl p-10 text-center shadow-2xl">
             <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-400 mb-4">
              Unlock the Future of Code Ownership
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              Connect your wallet to manage your tokenized projects, transfer ownership (sell/license), and track history on the **Stellar Testnet**.
            </p>
            <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <GuideCard icon="💳" title="Get Wallet" description="Install a Stellar-compatible wallet like Freighter or xBull." />
              <GuideCard icon="🔗" title="Connect" description="Use the 'Connect Wallet' button to approve access to your public key." />
              <GuideCard icon="💰" title="Fund Testnet" description="Use Friendbot to get free Testnet XLM to cover transaction fees." />
              <GuideCard icon="💼" title="Manage Projects" description="View your owned Project Tokens (Assets) and transfer them instantly." />
            </div>
          </div>
        )}

        {/* BAĞLI KULLANICI PANOSU */}
        {isConnected && publicKey && (
          <div className="space-y-10">
            {/* Sekme Navigasyonu */}
            <div className="flex border-b border-gray-700/50 mb-8">
              <button 
                className={getTabClasses('dashboard')} 
                onClick={() => setActiveTab('dashboard')}
              >
                📊 Dashboard
              </button>
              <button 
                className={getTabClasses('creator')} 
                onClick={() => setActiveTab('creator')}
              >
                🛠️ Project Creator
              </button>
              <button 
                className={getTabClasses('manager')} 
                onClick={() => setActiveTab('manager')}
              >
                📝 Project Manager
              </button>
            </div>
            
            {/* Sekme İçerikleri */}
            <div className="p-0">
                {/* 1. Dashboard Sekmesi */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-10">
                        {/* Cüzdan ve Bakiye (TokenizedProjectDisplay) */}
                        <section className="p-8 bg-gray-800 rounded-2xl shadow-xl border border-indigo-500/30">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-semibold text-indigo-400 mb-1">
                                        Connected Wallet:
                                    </h2>
                                    <p className="text-sm font-mono text-gray-300 break-all bg-gray-700/50 p-2 rounded-lg inline-block">
                                        {publicKey}
                                    </p>
                                </div>
                                <div className="text-right" key={`balance-${refreshKey}`}>
                                    <TokenizedProjectDisplay publicKey={publicKey} />
                                </div>
                            </div>
                        </section>

                        {/* Transfer ve Geçmiş */}
                        <div className="grid lg:grid-cols-5 gap-10">
                            <div className="lg:col-span-2">
                                <ProjectTransferForm publicKey={publicKey} onSuccess={handleTransferSuccess} />
                            </div>

                            <div className="lg:col-span-3 p-8 bg-gray-800 rounded-2xl shadow-xl border border-indigo-500/30">
                                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                    <span className="text-indigo-400">📜</span> Ownership & Transaction History
                                </h3>
                                <p className="text-sm text-gray-400 mb-4">
                                    Recent transactions reflect the transfer of Project Assets or XLM payments.
                                </p>
                                <div key={`history-${refreshKey}`}>
                                    <OwnershipHistory publicKey={publicKey} />
                                </div>
                            </div>
                        </div>

                        {/* Feature Cards */}
                        <div className="grid md:grid-cols-3 gap-6 pt-4">
                            <FeatureCard icon="⚡" title="Instant Transfer" description="Ownership changes are recorded in 3-5 seconds—faster than traditional escrows."/>
                            <FeatureCard icon="💸" title="Micro Fees" description="Transaction costs are negligible (0.00001 XLM), making micro-licensing viable."/>
                            <FeatureCard icon="⚙️" title="Asset Flexibility" description="Project tokens allow for fractional ownership, royalty streams, and complex licensing models."/>
                        </div>
                    </div>
                )}
                
                {/* 2. Project Creator Sekmesi */}
                {activeTab === 'creator' && (
                    <div className="bg-gray-900 rounded-2xl">
                        <ProjectCreator publicKey={publicKey} />
                    </div>
                )}

                {/* 3. Project Manager Sekmesi */}
                {activeTab === 'manager' && (
                    <div className="bg-gray-900 rounded-2xl">
                        <ProjectManager publicKey={publicKey} />
                    </div>
                )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700 mt-16 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p className="mb-2">
            StellaHub | Built on the Stellar Network | Testnet Interface
          </p>
          <p className="text-xs text-red-400">
            ⚠️ This is a Testnet application. **Do not use real Stellar Lumens (XLM)**.
          </p>
        </div>
      </footer>
    </div>
  );
}