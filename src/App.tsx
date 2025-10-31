import { useState } from 'react';
import { Video, Loader2, CheckCircle, XCircle } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

function App() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const handleGenerateVideo = async () => {
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch(
        'https://n8n.aytbb.com.tr/webhook/video_yap',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        setStatus('success');
        setMessage('Video oluşturma başlatıldı! İşlem tamamlandığında bildirim alacaksınız.');
      } else {
        throw new Error('İstek başarısız oldu');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Video oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
              <Video className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Video Oluşturucu</h1>
            <p className="text-gray-600">Tek tıkla profesyonel video oluşturun</p>
          </div>

          <button
            onClick={handleGenerateVideo}
            disabled={status === 'loading'}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-lg font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Video Oluşturuluyor...
              </>
            ) : (
              <>
                <Video className="w-6 h-6" />
                Video Üret
              </>
            )}
          </button>

          {message && (
            <div
              className={`p-4 rounded-lg animate-fade-in ${
                status === 'success'
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <div className="flex items-start gap-3">
                {status === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <p
                  className={`text-sm ${
                    status === 'success' ? 'text-green-800' : 'text-red-800'
                  }`}
                >
                  {message}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
