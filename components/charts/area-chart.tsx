"use client";

import { motion } from "framer-motion";
import { useId } from "react";

/** Smooth gold area chart with animated draw-in. Pure SVG. */
export function AreaChart({
  data,
  labels,
  height = 220,
}: {
  data: number[];
  labels?: string[];
  height?: number;
}) {
  const id = useId().replace(/:/g, "");
  const width = 640;
  const pad = 12;
  const max = Math.max(...data) * 1.08;
  const min = Math.min(...data) * 0.92;
  const range = max - min || 1;

  const points = data.map((d, i) => ({
    x: pad + (i / (data.length - 1)) * (width - pad * 2),
    y: pad + (1 - (d - min) / range) * (height - pad * 2),
  }));

  // Catmull-Rom → cubic bezier for a smooth curve
  const line = points
    .map((p, i, arr) => {
      if (i === 0) return `M ${p.x},${p.y}`;
      const prev = arr[i - 1];
      const cx = (prev.x + p.x) / 2;
      return `C ${cx},${prev.y} ${cx},${p.y} ${p.x},${p.y}`;
    })
    .join(" ");

  const area = `${line} L ${points[points.length - 1].x},${height - pad} L ${points[0].x},${height - pad} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`area-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(201,169,106,0.35)" />
          <stop offset="100%" stopColor="rgba(201,169,106,0)" />
        </linearGradient>
        <linearGradient id={`stroke-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9c7f4a" />
          <stop offset="100%" stopColor="#e6cf9a" />
        </linearGradient>
      </defs>

      {/* gridlines */}
      {[0.25, 0.5, 0.75].map((g) => (
        <line
          key={g}
          x1={pad}
          x2={width - pad}
          y1={pad + g * (height - pad * 2)}
          y2={pad + g * (height - pad * 2)}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
        />
      ))}

      <motion.path
        d={area}
        fill={`url(#area-${id})`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke={`url(#stroke-${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="3"
          fill="#e6cf9a"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 + i * 0.05 }}
        />
      ))}
      {labels &&
        labels.map((l, i) => (
          <text
            key={i}
            x={points[i].x}
            y={height - 1}
            textAnchor="middle"
            className="fill-fog"
            style={{ fontSize: 10 }}
          >
            {l}
          </text>
        ))}
    </svg>
  );
}
