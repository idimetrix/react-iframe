import { useState, useCallback, useMemo, memo, FC, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Form: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // Memoize handlers to prevent unnecessary re-renders
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  }, []);

  // Memoize styles
  const containerStyle = useMemo(
    () => ({
      padding: '20px',
      maxWidth: '500px',
      margin: '0 auto' as const,
    }),
    []
  );

  const successStyle = useMemo(
    () => ({
      padding: '20px',
      backgroundColor: '#4caf50',
      color: 'white',
      borderRadius: '4px',
      textAlign: 'center' as const,
    }),
    []
  );

  const successTextStyle = useMemo(
    () => ({
      margin: 0,
      fontSize: '18px',
    }),
    []
  );

  const labelStyle = useMemo(
    () => ({
      display: 'block' as const,
      marginBottom: '5px',
      fontWeight: '500' as const,
    }),
    []
  );

  const inputStyle = useMemo(
    () => ({
      width: '100%',
      padding: '8px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
    }),
    []
  );

  const textareaStyle = useMemo(
    () => ({
      ...inputStyle,
      fontFamily: 'inherit' as const,
    }),
    [inputStyle]
  );

  const submitButtonStyle = useMemo(
    () => ({
      width: '100%',
      padding: '12px',
      backgroundColor: '#2196f3',
      color: 'white',
      border: 'none' as const,
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer' as const,
      fontWeight: '500' as const,
    }),
    []
  );

  const descriptionStyle = useMemo(
    () => ({
      marginTop: '20px',
      color: '#666',
      fontSize: '14px',
    }),
    []
  );

  return (
    <div style={containerStyle}>
      <h2>Contact Form</h2>
      {submitted ? (
        <div style={successStyle}>
          <p style={successTextStyle}>✓ Form submitted successfully!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="name" style={labelStyle}>
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email" style={labelStyle}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="message" style={labelStyle}>
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              style={textareaStyle}
            />
          </div>
          <button type="submit" style={submitButtonStyle}>
            Submit
          </button>
        </form>
      )}
      <p style={descriptionStyle}>
        This component demonstrates form handling and user interaction inside an iframe.
      </p>
    </div>
  );
};

export default memo(Form);
