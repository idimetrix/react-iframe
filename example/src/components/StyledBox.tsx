import { useState, useCallback, useMemo, memo, FC, ChangeEvent } from 'react';

interface ColorOption {
  name: string;
  value: string;
}

const StyledBox: FC = () => {
  const [color, setColor] = useState('#2196f3');
  const [size, setSize] = useState(100);

  // Memoize colors array to prevent recreation on every render
  const colors = useMemo<ColorOption[]>(
    () => [
      { name: 'Blue', value: '#2196f3' },
      { name: 'Green', value: '#4caf50' },
      { name: 'Red', value: '#f44336' },
      { name: 'Orange', value: '#ff9800' },
      { name: 'Purple', value: '#9c27b0' },
    ],
    []
  );

  // Memoize handlers
  const handleColorChange = useCallback((newColor: string) => {
    setColor(newColor);
  }, []);

  const handleSizeChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSize(Number(e.target.value));
  }, []);

  // Memoize styles
  const containerStyle = useMemo(
    () => ({
      padding: '20px',
      textAlign: 'center' as const,
    }),
    []
  );

  const descriptionStyle = useMemo(
    () => ({
      color: '#666',
      marginBottom: '30px',
    }),
    []
  );

  const boxStyle = useMemo(
    () => ({
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      margin: '30px auto' as const,
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      display: 'flex' as const,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      color: 'white',
      fontSize: '14px',
      fontWeight: 'bold' as const,
    }),
    [size, color]
  );

  const controlsContainerStyle = useMemo(
    () => ({
      maxWidth: '400px',
      margin: '0 auto' as const,
    }),
    []
  );

  const labelStyle = useMemo(
    () => ({
      display: 'block' as const,
      marginBottom: '10px',
      fontWeight: '500' as const,
    }),
    []
  );

  const buttonContainerStyle = useMemo(
    () => ({
      display: 'flex' as const,
      gap: '10px',
      flexWrap: 'wrap' as const,
      justifyContent: 'center' as const,
    }),
    []
  );

  // Memoize button component to prevent unnecessary re-renders
  const ColorButton = memo<{ colorOption: ColorOption; isSelected: boolean; onSelect: (color: string) => void }>(
    ({ colorOption, isSelected, onSelect }) => {
      const buttonStyle = useMemo(
        () => ({
          padding: '8px 16px',
          backgroundColor: colorOption.value,
          color: 'white',
          border: `2px solid ${isSelected ? '#fff' : 'transparent'}`,
          borderRadius: '4px',
          cursor: 'pointer' as const,
          fontSize: '14px',
        }),
        [colorOption.value, isSelected]
      );

      return (
        <button onClick={() => onSelect(colorOption.value)} style={buttonStyle}>
          {colorOption.name}
        </button>
      );
    }
  );

  ColorButton.displayName = 'ColorButton';

  return (
    <div style={containerStyle}>
      <h2>Styled Box Component</h2>
      <p style={descriptionStyle}>
        This demonstrates CSS isolation - styles are scoped to the iframe.
      </p>

      <div style={boxStyle}>{size}px</div>

      <div style={controlsContainerStyle}>
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Color:</label>
          <div style={buttonContainerStyle}>
            {colors.map((c) => (
              <ColorButton
                key={c.value}
                colorOption={c}
                isSelected={color === c.value}
                onSelect={handleColorChange}
              />
            ))}
          </div>
        </div>

        <div>
          <label style={labelStyle}>Size: {size}px</label>
          <input
            type="range"
            min="50"
            max="200"
            value={size}
            onChange={handleSizeChange}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(StyledBox);
