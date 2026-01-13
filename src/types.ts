import { ReactNode, ComponentType, IframeHTMLAttributes } from 'react';

export interface ReactIframeProps extends Omit<IframeHTMLAttributes<HTMLIFrameElement>, 'srcDoc' | 'src'> {
  /**
   * React component to render inside the iframe
   * Alternative to using children prop
   */
  component?: ComponentType<Record<string, unknown>>;
  
  /**
   * React component(s) to render inside the iframe
   * Alternative to using component prop
   */
  children?: ReactNode;
  
  /**
   * Props to pass to the component rendered inside the iframe
   */
  componentProps?: Record<string, unknown>;
  
  /**
   * Automatically adjust iframe height to match content height
   * Prevents vertical scrollbars by dynamically resizing the iframe
   * @default true
   */
  autoHeight?: boolean;
  
  /**
   * Minimum height in pixels when autoHeight is enabled
   * @default 0
   */
  minHeight?: number;
  
  /**
   * Maximum height in pixels when autoHeight is enabled
   * @default undefined (no limit)
   */
  maxHeight?: number;
}
