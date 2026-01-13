import { useState, useCallback, useMemo, memo, FC } from 'react';

const Counter: FC = () => {
  const [count, setCount] = useState(0);

  // Memoize button handlers to prevent unnecessary re-renders
  const handleDecrement = useCallback(() => {
    setCount((prev) => prev - 1);
  }, []);

  const handleReset = useCallback(() => {
    setCount(0);
  }, []);

  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  // Memoize styles to avoid recreating objects on every render
  const containerStyle = useMemo(
    () => ({
      padding: '20px',
      textAlign: 'center' as const,
    }),
    []
  );

  const countStyle = useMemo(
    () => ({
      fontSize: '24px',
      margin: '20px 0',
    }),
    []
  );

  const buttonContainerStyle = useMemo(
    () => ({
      display: 'flex' as const,
      gap: '10px',
      justifyContent: 'center' as const,
    }),
    []
  );

  const buttonBaseStyle = useMemo(
    () => ({
      padding: '10px 20px',
      fontSize: '16px',
      color: 'white',
      border: 'none' as const,
      borderRadius: '4px',
      cursor: 'pointer' as const,
    }),
    []
  );

  const decrementButtonStyle = useMemo(
    () => ({
      ...buttonBaseStyle,
      backgroundColor: '#f44336',
    }),
    [buttonBaseStyle]
  );

  const resetButtonStyle = useMemo(
    () => ({
      ...buttonBaseStyle,
      backgroundColor: '#9e9e9e',
    }),
    [buttonBaseStyle]
  );

  const incrementButtonStyle = useMemo(
    () => ({
      ...buttonBaseStyle,
      backgroundColor: '#4caf50',
    }),
    [buttonBaseStyle]
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
      <h2>Counter Component</h2>
      <p style={countStyle}>
        Count: <strong>{count}</strong>
      </p>
      <div style={buttonContainerStyle}>
        <button onClick={handleDecrement} style={decrementButtonStyle}>
          Decrement
        </button>
        <button onClick={handleReset} style={resetButtonStyle}>
          Reset
        </button>
        <button onClick={handleIncrement} style={incrementButtonStyle}>
          Increment
        </button>
      </div>
      <p style={descriptionStyle}>
        This component demonstrates React state management inside an iframe.
      </p>
    </div>
  );
};

export default memo(Counter);
