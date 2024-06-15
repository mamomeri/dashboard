// types/react-plotly-js.d.ts
declare module 'react-plotly.js' {
    import * as React from 'react';
    import * as Plotly from 'plotly.js';
  
    export interface PlotParams {
      data: Plotly.Data[];
      layout?: Partial<Plotly.Layout>;
      config?: Partial<Plotly.Config>;
      onClick?: (event: Plotly.PlotMouseEvent) => void;
      onBeforeHover?: (event: Plotly.PlotMouseEvent) => boolean;
      onHover?: (event: Plotly.PlotMouseEvent) => void;
      onUnHover?: (event: Plotly.PlotMouseEvent) => void;
      onSelected?: (event: Plotly.PlotSelectionEvent) => void;
      onDeselect?: (event: Plotly.PlotMouseEvent) => void;
      style?: React.CSSProperties;
      className?: string;
      divId?: string;
      revision?: number;
      debug?: boolean;
      useResizeHandler?: boolean;
      animate?: boolean;
      animationOptions?: Partial<Plotly.AnimationOpts>;
    }
  
    const Plot: React.FC<PlotParams>;
  
    export default Plot;
  }
  