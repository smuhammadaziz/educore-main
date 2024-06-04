import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
} from 'react';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import backurl from '../../links';
import useLang from '../../hooks/useLang';
import content from '../../localization/content';

const CodeEntry: React.FC = () => {
  const [code, setCode] = useState<string[]>(['', '', '', '']);
  const [timer, setTimer] = useState<number>(120);
  const [showResendButton, setShowResendButton] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setShowResendButton(true);
    }
  }, [timer]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (index < 3 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value === '') {
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimer(120);
    setShowResendButton(false);
    setCode(['', '', '', '']);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const [error, setError] = useState('');

  const enteredCode = code.join('');
  const registerToken = localStorage.getItem('TOKEN_FOR_REGISTER');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('code', enteredCode);

      const response = await fetch(`${backurl}api/code`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${registerToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Login successful!', {
          position: 'top-right',
        });
        const token = data.token2;

        localStorage.removeItem('TOKEN_FOR_REGISTER');
        localStorage.setItem('TOKEN', token);

        setTimeout(() => {
          window.location.href = '/dashboard/student';
        }, 100);
      } else {
        toast.error(data.message, {
          position: 'top-right',
        });
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <ToastContainer />
      <form onSubmit={handleRegister} className="w-full max-w-sm">
        <div className="bg-white shadow-xl rounded-xl py-20 p-8 space-y-8">
          <h2 className="text-center text-2xl">Enter a code</h2>
          <div className="flex justify-center space-x-2">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-12 text-center text-2xl border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            ))}
          </div>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <div className="text-center text-xl">
            {showResendButton ? (
              <NavLink
                to="/auth/signup"
                onClick={handleResend}
                className="text-blue-500 underline hover:text-blue-700"
              >
                Resend code
              </NavLink>
            ) : (
              <span>Time remaining: {formatTime(timer)}</span>
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-fuchsia-800 text-white rounded-lg hover:bg-fuchsia-500 focus:outline-none"
            >
              Submit and Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CodeEntry;
