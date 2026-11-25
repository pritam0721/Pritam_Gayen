"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";

const currency = "$";
const colors = {
  blue: "#5e64ff",
  lightBlue: "#7cd6fd",
  violet: "#743ee2",
  red: "#ff5858",
  orange: "#ffa00a",
  green: "#28a745",
  lightGreen: "#98d85b",
  grey: "#e3e5e8",
};

const slides = [
  {
    key: "hr",
    kicker: "01 · HR",
    title: ["Know your team,", "at a glance."],
    description:
      "Headcount, attendance and leave in one live view, so a manager can see who is in today without opening a single spreadsheet.",
    bullets: [
      "Live headcount and attendance in number cards",
      "Daily attendance chart: present, on leave, absent",
      "Leave requests waiting for one-click approval",
    ],
    tag: "Built on Frappe HR",
    rgb: "40,167,69",
    module: "HR",
  },
  {
    key: "accounting",
    kicker: "02 · Accounting",
    title: ["The money,", "always up to date."],
    description:
      "Income, expenses and cash balance update the moment an invoice or payment is posted, so the numbers are never a month old.",
    bullets: [
      "Income, expense, profit and bank balance on top",
      "Profit and loss chart, month by month",
      "Receivable aging: who owes what, and for how long",
    ],
    tag: "Built on ERPNext Accounting",
    rgb: "94,100,255",
    module: "Accounting",
  },
  {
    key: "crm",
    kicker: "03 · Sales & CRM",
    title: ["Every lead,", "followed through."],
    description:
      "From the first enquiry to a confirmed order, the pipeline shows where each deal is and where deals drop off.",
    bullets: [
      "Leads, deals, orders and conversion rate",
      "A sales funnel that shows where deals drop off",
      "A live activity feed so nothing slips",
    ],
    tag: "Built on ERPNext Selling",
    rgb: "255,160,10",
    module: "Sales & CRM",
  },
] as const;

const navigation = ["Home", "Accounting", "Selling", "HR", "Assets", "Payroll"];
const chartX0 = 26;
const chartX1 = 296;
const chartY0 = 98;
const chartY1 = 10;

type Segment = { label: string; pct: number; value: string; color: string };
type RowItem = {
  initial: string;
  color: string;
  primary: string;
  secondary: string;
  right: string;
  tone?: "good" | "warn";
};
type DashboardStyle = CSSProperties & { "--ac-rgb": string };

const formatNumber = (value: number, decimals = 0) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

function smoothPath(points: [number, number][]) {
  let path = `M${points[0][0]} ${points[0][1]}`;
  for (let index = 0; index < points.length - 1; index++) {
    const p0 = points[index - 1] ?? points[index];
    const p1 = points[index];
    const p2 = points[index + 1];
    const p3 = points[index + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    path += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0]} ${p2[1]}`;
  }
  return path;
}

function Grid({
  max,
  prefix = "",
  suffix = "",
}: {
  max: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <g>
      {[0, 1, 2, 3, 4].map((tick) => {
        const y = chartY0 - ((chartY0 - chartY1) * tick) / 4;
        return (
          <g key={tick}>
            <line
              x1={chartX0}
              x2={chartX1}
              y1={y}
              y2={y}
              className="fx-gridline"
            />
            <text
              x={chartX0 - 4}
              y={y + 2.5}
              textAnchor="end"
              className="fx-axis"
            >
              {prefix}
              {Math.round((max * tick) / 4)}
              {suffix}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function NumberCard({
  label,
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  delta,
  up = true,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  delta: string;
  up?: boolean;
}) {
  return (
    <div className="fx-card fx-hl" data-card data-hl="0">
      <small>{label}</small>
      <strong>
        {prefix}
        <span data-count data-to={value} data-decimals={decimals}>
          {formatNumber(value, decimals)}
        </span>
        {suffix}
      </strong>
      <em className={up ? "up" : "down"}>
        {up ? "▲" : "▼"} {delta}
      </em>
    </div>
  );
}

function Panel({
  title,
  subtitle,
  highlight,
  children,
}: {
  title: string;
  subtitle?: string;
  highlight?: 1 | 2;
  children: ReactNode;
}) {
  return (
    <div className="fx-card fx-panel fx-hl" data-panel data-hl={highlight}>
      <header>
        <span>{title}</span>
        {subtitle ? <small>{subtitle}</small> : null}
      </header>
      <div className="fx-chart">{children}</div>
    </div>
  );
}

function StackedBars({
  labels,
  series,
  max,
}: {
  labels: string[];
  series: { color: string; values: number[] }[];
  max: number;
}) {
  const step = (chartX1 - chartX0) / labels.length;
  const barWidth = step * 0.5;
  return (
    <svg viewBox="0 0 300 120" className="fx-svg" aria-hidden="true">
      <Grid max={max} />
      {labels.map((label, index) => {
        let total = 0;
        const x = chartX0 + step * index + (step - barWidth) / 2;
        return (
          <g key={label}>
            <g data-bar>
              {series.map((item) => {
                const height = (item.values[index] / max) * (chartY0 - chartY1);
                const y =
                  chartY0 -
                  ((total + item.values[index]) / max) * (chartY0 - chartY1);
                total += item.values[index];
                return (
                  <rect
                    key={item.color}
                    x={x}
                    y={y}
                    width={barWidth}
                    height={height}
                    rx={1.2}
                    fill={item.color}
                  />
                );
              })}
            </g>
            <text
              x={x + barWidth / 2}
              y={111}
              textAnchor="middle"
              className="fx-axis"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function AxisMixed({
  labels,
  income,
  expense,
}: {
  labels: string[];
  income: number[];
  expense: number[];
}) {
  const max = 260;
  const step = (chartX1 - chartX0) / labels.length;
  const barWidth = step * 0.26;
  const yFor = (value: number) =>
    chartY0 - (value / max) * (chartY0 - chartY1);
  const points = income.map((value, index) => {
    const profit = value - expense[index];
    return [chartX0 + step * index + step / 2, yFor(profit)] as [number, number];
  });
  return (
    <svg viewBox="0 0 300 120" className="fx-svg" aria-hidden="true">
      <Grid max={max} prefix={currency} suffix="K" />
      {labels.map((label, index) => {
        const center = chartX0 + step * index + step / 2;
        return (
          <g key={label}>
            <g data-bar>
              <rect
                x={center - barWidth - 0.8}
                y={yFor(income[index])}
                width={barWidth}
                height={chartY0 - yFor(income[index])}
                rx={1.2}
                fill={colors.blue}
              />
            </g>
            <g data-bar>
              <rect
                x={center + 0.8}
                y={yFor(expense[index])}
                width={barWidth}
                height={chartY0 - yFor(expense[index])}
                rx={1.2}
                fill={colors.orange}
              />
            </g>
            <text
              x={center}
              y={111}
              textAnchor="middle"
              className="fx-axis"
            >
              {label}
            </text>
          </g>
        );
      })}
      <path
        data-line
        pathLength={1}
        className="fx-line"
        d={smoothPath(points)}
        fill="none"
        stroke={colors.green}
        strokeWidth={2.4}
        strokeLinecap="round"
      />
      {points.map((point, index) => (
        <circle
          key={index}
          data-dot
          cx={point[0]}
          cy={point[1]}
          r={2.8}
          fill="#fff"
          stroke={colors.green}
          strokeWidth={1.8}
        />
      ))}
    </svg>
  );
}

function ColorBars({
  labels,
  values,
  barColors,
  max,
}: {
  labels: string[];
  values: number[];
  barColors: string[];
  max: number;
}) {
  const step = (chartX1 - chartX0) / labels.length;
  const barWidth = step * 0.46;
  return (
    <svg viewBox="0 0 300 120" className="fx-svg" aria-hidden="true">
      <Grid max={max} prefix={currency} suffix="K" />
      {labels.map((label, index) => {
        const x = chartX0 + step * index + (step - barWidth) / 2;
        const y = chartY0 - (values[index] / max) * (chartY0 - chartY1);
        return (
          <g key={label}>
            <g data-bar>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={chartY0 - y}
                rx={1.4}
                fill={barColors[index]}
              />
            </g>
            <text
              data-fade
              x={x + barWidth / 2}
              y={y - 3}
              textAnchor="middle"
              className="fx-val"
            >
              {currency}
              {values[index]}K
            </text>
            <text
              x={x + barWidth / 2}
              y={111}
              textAnchor="middle"
              className="fx-axis"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function LineChart({
  values,
  labels,
  max,
  id,
  color,
}: {
  values: number[];
  labels: string[];
  max: number;
  id: string;
  color: string;
}) {
  const step = (chartX1 - chartX0) / (values.length - 1);
  const points = values.map(
    (value, index) =>
      [
        chartX0 + step * index,
        chartY0 - (value / max) * (chartY0 - chartY1),
      ] as [number, number],
  );
  const line = smoothPath(points);
  return (
    <svg viewBox="0 0 300 120" className="fx-svg" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity=".32" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <Grid max={max} />
      <path
        data-area
        d={`${line} L${chartX1} ${chartY0} L${chartX0} ${chartY0} Z`}
        fill={`url(#${id})`}
      />
      <path
        data-line
        pathLength={1}
        className="fx-line"
        d={line}
        fill="none"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
      />
      {points.map((point, index) => (
        <g key={labels[index]}>
          <circle
            data-dot
            cx={point[0]}
            cy={point[1]}
            r={2.8}
            fill="#fff"
            stroke={color}
            strokeWidth={1.8}
          />
          <text
            x={point[0]}
            y={111}
            textAnchor="middle"
            className="fx-axis"
          >
            {labels[index]}
          </text>
        </g>
      ))}
    </svg>
  );
}

function Donut({
  segments,
  center,
  caption,
}: {
  segments: Segment[];
  center: string;
  caption: string;
}) {
  return (
    <div className="fx-donut">
      <svg viewBox="0 0 36 36" aria-hidden="true">
        <circle cx="18" cy="18" r="15.9155" className="fx-donut-track" />
        {segments.map((segment, index) => {
          const currentOffset = -segments
            .slice(0, index)
            .reduce((total, item) => total + item.pct, 0);
          const dash = `${segment.pct - 0.8} ${100 - segment.pct + 0.8}`;
          return (
            <circle
              key={segment.label}
              data-seg
              data-dash={dash}
              cx="18"
              cy="18"
              r="15.9155"
              fill="none"
              stroke={segment.color}
              strokeWidth="5"
              strokeDasharray={dash}
              strokeDashoffset={currentOffset}
              transform="rotate(-90 18 18)"
            />
          );
        })}
        <text x="18" y="18" textAnchor="middle" className="fx-donut-num">
          {center}
        </text>
        <text x="18" y="22.6" textAnchor="middle" className="fx-donut-cap">
          {caption}
        </text>
      </svg>
      <ul className="fx-legend">
        {segments.map((segment) => (
          <li key={segment.label} data-row>
            <i style={{ background: segment.color }} />
            <span>{segment.label}</span>
            <b>{segment.value}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Percentage({
  segments,
  total,
}: {
  segments: Segment[];
  total: string;
}) {
  return (
    <div className="fx-pctwrap">
      <div className="fx-pcttotal" data-fade>
        {total}
      </div>
      <div className="fx-pct" data-pct>
        {segments.map((segment) => (
          <i
            key={segment.label}
            style={{ width: `${segment.pct}%`, background: segment.color }}
          />
        ))}
      </div>
      <ul className="fx-legend">
        {segments.map((segment) => (
          <li key={segment.label} data-row>
            <i style={{ background: segment.color }} />
            <span>{segment.label}</span>
            <b>{segment.value}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Heatmap() {
  const shades = ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"];
  const cells = [];
  for (let column = 0; column < 18; column++) {
    for (let row = 0; row < 7; row++) {
      let level = (column * 5 + row * 3 + ((column * row) % 4)) % 5;
      if (row >= 5) level = Math.max(0, level - 2);
      cells.push(
        <rect
          key={`${column}-${row}`}
          data-cell
          x={column * 6.2}
          y={row * 6.2}
          width={5}
          height={5}
          rx={1.2}
          fill={shades[level]}
        />,
      );
    }
  }
  return (
    <div className="fx-heat">
      <svg viewBox="0 0 112 44" aria-hidden="true">
        {cells}
      </svg>
      <p data-fade>
        <span>
          Avg. check-in <b>9:12 AM</b>
        </span>
        <span className="fx-scale">
          Less
          {shades.map((shade) => (
            <i key={shade} style={{ background: shade }} />
          ))}
          More
        </span>
      </p>
    </div>
  );
}

function Funnel() {
  const stages = [
    { label: "Leads", value: 420, color: colors.blue },
    { label: "Opportunities", value: 268, color: "#7c85ff" },
    { label: "Quotations", value: 146, color: "#9aa5ff" },
    { label: "Orders", value: 82, color: colors.green },
  ];
  return (
    <ul className="fx-funnel">
      {stages.map((stage) => (
        <li key={stage.label}>
          <span>{stage.label}</span>
          <div>
            <i
              data-fbar
              style={{
                width: `${(stage.value / 420) * 100}%`,
                background: stage.color,
              }}
            />
          </div>
          <b data-fade>{stage.value}</b>
        </li>
      ))}
    </ul>
  );
}

function Rows({ items }: { items: RowItem[] }) {
  return (
    <ul className="fx-list">
      {items.map((item) => (
        <li key={`${item.primary}-${item.secondary}`} data-row>
          <i style={{ background: item.color }}>{item.initial}</i>
          <div>
            <b>{item.primary}</b>
            <span>{item.secondary}</span>
          </div>
          <em className={item.tone ?? ""}>{item.right}</em>
        </li>
      ))}
    </ul>
  );
}

function Shell({
  active,
  title,
  toast,
  children,
}: {
  active: string;
  title: string;
  toast: { title: string; text: string };
  children: ReactNode;
}) {
  return (
    <div className="fx-float">
      <div className="fx-mock">
        <div className="fx-top">
          <span className="fx-logo">ERP</span>
          <span className="fx-search">Search or type a command (Ctrl + G)</span>
          <i className="fx-bell" />
          <span className="fx-avatar">SA</span>
        </div>
        <div className="fx-body">
          <aside className="fx-side">
            <b>PUBLIC</b>
            {navigation.map((item) => (
              <div
                key={item}
                className={`fx-nav ${item === active ? "on" : ""}`}
              >
                <i />
                {item}
              </div>
            ))}
          </aside>
          <div className="fx-main">
            <div className="fx-pagehead">
              <h4>{title}</h4>
              <span className="fx-btn">+ New</span>
            </div>
            {children}
          </div>
        </div>
        <div className="fx-toast" data-toast>
          <i>✓</i>
          <div>
            <b>{toast.title}</b>
            <span>{toast.text}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function dashboardStyle(rgb: string): DashboardStyle {
  return { "--ac-rgb": rgb };
}

function HrDashboard() {
  return (
    <div
      className="fx-dash"
      data-dashboard
      style={dashboardStyle(slides[0].rgb)}
      role="img"
      aria-label="HR dashboard with headcount, attendance, department breakdown, check-in activity and leave requests"
    >
      <Shell
        active="HR"
        title="HR"
        toast={{ title: "Leave approved", text: "Priya S. · 2 days" }}
      >
        <div className="fx-cards">
          <NumberCard label="Employees" value={128} delta="4.2%" />
          <NumberCard
            label="Present today"
            value={112}
            delta="1.8%"
            up={false}
          />
          <NumberCard label="On leave" value={9} delta="2 today" />
          <NumberCard label="Open positions" value={6} delta="1 new" />
        </div>
        <div className="fx-row a">
          <Panel title="Attendance" subtitle="Last 6 days" highlight={1}>
            <StackedBars
              labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
              max={140}
              series={[
                { color: colors.green, values: [112, 109, 114, 111, 106, 64] },
                { color: colors.orange, values: [9, 11, 6, 8, 12, 7] },
                { color: colors.red, values: [7, 8, 8, 9, 10, 4] },
              ]}
            />
          </Panel>
          <Panel title="By department" subtitle="128 people">
            <Donut
              center="128"
              caption="people"
              segments={[
                { label: "Sales", pct: 34, value: "44", color: colors.blue },
                {
                  label: "Operations",
                  pct: 28,
                  value: "36",
                  color: colors.lightBlue,
                },
                {
                  label: "Technology",
                  pct: 22,
                  value: "28",
                  color: colors.violet,
                },
                { label: "Admin", pct: 16, value: "20", color: colors.orange },
              ]}
            />
          </Panel>
        </div>
        <div className="fx-row a">
          <Panel title="Check-in activity" subtitle="Last 18 weeks">
            <Heatmap />
          </Panel>
          <Panel title="Leave requests" subtitle="3 pending" highlight={2}>
            <Rows
              items={[
                {
                  initial: "P",
                  color: colors.blue,
                  primary: "Priya S.",
                  secondary: "Casual · 2 days",
                  right: "Pending",
                  tone: "warn",
                },
                {
                  initial: "R",
                  color: colors.violet,
                  primary: "Rahul M.",
                  secondary: "Sick · 1 day",
                  right: "Pending",
                  tone: "warn",
                },
                {
                  initial: "A",
                  color: colors.green,
                  primary: "Anita D.",
                  secondary: "Earned · 5 days",
                  right: "Pending",
                  tone: "warn",
                },
                {
                  initial: "K",
                  color: colors.orange,
                  primary: "Karan P.",
                  secondary: "Casual · 1 day",
                  right: "Approved",
                  tone: "good",
                },
              ]}
            />
          </Panel>
        </div>
      </Shell>
    </div>
  );
}

function AccountingDashboard() {
  return (
    <div
      className="fx-dash"
      data-dashboard
      style={dashboardStyle(slides[1].rgb)}
      role="img"
      aria-label="Accounting dashboard with income, expenses, profit and loss, receivables and recent payments"
    >
      <Shell
        active="Accounting"
        title="Accounting"
        toast={{
          title: "Payment received",
          text: `Northwind · ${currency}12.4K`,
        }}
      >
        <div className="fx-cards">
          <NumberCard
            label="Total income"
            prefix={currency}
            suffix="K"
            value={248}
            delta="12.4%"
          />
          <NumberCard
            label="Total expense"
            prefix={currency}
            suffix="K"
            value={161}
            delta="6.1%"
          />
          <NumberCard
            label="Net profit"
            prefix={currency}
            suffix="K"
            value={87}
            delta="18.9%"
          />
          <NumberCard
            label="Bank balance"
            prefix={currency}
            suffix="K"
            value={312}
            delta="4.5%"
          />
        </div>
        <div className="fx-row a">
          <Panel title="Profit and loss" subtitle="Last 6 months" highlight={1}>
            <AxisMixed
              labels={["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"]}
              income={[182, 196, 210, 205, 228, 248]}
              expense={[124, 131, 142, 139, 150, 161]}
            />
          </Panel>
          <Panel title="Expense breakdown" subtitle="This month">
            <Percentage
              total={`${currency}161K total`}
              segments={[
                {
                  label: "Salaries",
                  pct: 52,
                  value: `${currency}84K`,
                  color: colors.blue,
                },
                {
                  label: "Rent",
                  pct: 18,
                  value: `${currency}29K`,
                  color: colors.lightBlue,
                },
                {
                  label: "Marketing",
                  pct: 14,
                  value: `${currency}23K`,
                  color: colors.orange,
                },
                {
                  label: "Other",
                  pct: 16,
                  value: `${currency}25K`,
                  color: colors.grey,
                },
              ]}
            />
          </Panel>
        </div>
        <div className="fx-row a">
          <Panel title="Receivable aging" subtitle="By days overdue" highlight={2}>
            <ColorBars
              labels={["0–30", "31–60", "61–90", "90+"]}
              values={[86, 42, 21, 9]}
              max={100}
              barColors={[
                colors.lightGreen,
                colors.orange,
                "#ff7a45",
                colors.red,
              ]}
            />
          </Panel>
          <Panel title="Recent payments" subtitle="Today">
            <Rows
              items={[
                {
                  initial: "N",
                  color: colors.blue,
                  primary: "Northwind Traders",
                  secondary: "SINV-0142",
                  right: `+${currency}12.4K`,
                  tone: "good",
                },
                {
                  initial: "G",
                  color: colors.violet,
                  primary: "Globex Corp",
                  secondary: "SINV-0139",
                  right: `+${currency}8.1K`,
                  tone: "good",
                },
                {
                  initial: "U",
                  color: colors.orange,
                  primary: "Umbrella Ltd",
                  secondary: "SINV-0127",
                  right: `+${currency}5.2K`,
                  tone: "good",
                },
                {
                  initial: "I",
                  color: colors.green,
                  primary: "Initech",
                  secondary: "SINV-0131",
                  right: `+${currency}3.6K`,
                  tone: "good",
                },
              ]}
            />
          </Panel>
        </div>
      </Shell>
    </div>
  );
}

function CrmDashboard() {
  return (
    <div
      className="fx-dash"
      data-dashboard
      style={dashboardStyle(slides[2].rgb)}
      role="img"
      aria-label="Sales dashboard with leads, deals, conversion, sales funnel, lead sources and recent activity"
    >
      <Shell
        active="Selling"
        title="Selling"
        toast={{ title: "New lead", text: "Acme Traders · Website" }}
      >
        <div className="fx-cards">
          <NumberCard label="Leads" value={420} delta="14%" />
          <NumberCard label="Open deals" value={34} delta="6%" />
          <NumberCard label="Sales orders" value={82} delta="9.3%" />
          <NumberCard
            label="Conversion"
            value={19.5}
            decimals={1}
            suffix="%"
            delta="2.1%"
          />
        </div>
        <div className="fx-row a">
          <Panel title="Sales funnel" subtitle="This quarter" highlight={1}>
            <Funnel />
          </Panel>
          <Panel title="Lead source" subtitle="420 leads">
            <Donut
              center="420"
              caption="leads"
              segments={[
                { label: "Website", pct: 38, value: "160", color: colors.blue },
                {
                  label: "Referral",
                  pct: 27,
                  value: "113",
                  color: colors.green,
                },
                { label: "Social", pct: 21, value: "88", color: colors.orange },
                {
                  label: "Events",
                  pct: 14,
                  value: "59",
                  color: colors.violet,
                },
              ]}
            />
          </Panel>
        </div>
        <div className="fx-row a">
          <Panel title="Leads over time" subtitle="Weekly">
            <LineChart
              id="fx-area-crm"
              color={colors.blue}
              max={100}
              labels={["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"]}
              values={[38, 46, 41, 58, 63, 57, 72, 86]}
            />
          </Panel>
          <Panel title="Recent activity" subtitle="Live" highlight={2}>
            <Rows
              items={[
                {
                  initial: "A",
                  color: colors.blue,
                  primary: "New lead",
                  secondary: "Acme Traders",
                  right: "2m",
                },
                {
                  initial: "N",
                  color: colors.violet,
                  primary: "Quotation sent",
                  secondary: "Northwind",
                  right: "18m",
                },
                {
                  initial: "G",
                  color: colors.green,
                  primary: "Order won",
                  secondary: `Globex · ${currency}12.4K`,
                  right: "1h",
                  tone: "good",
                },
                {
                  initial: "I",
                  color: colors.orange,
                  primary: "Call logged",
                  secondary: "Initech",
                  right: "3h",
                },
              ]}
            />
          </Panel>
        </div>
      </Shell>
    </div>
  );
}

const query = <T extends Element = HTMLElement>(selector: string, root: Element) =>
  gsap.utils.toArray<T>(selector, root);

function buildPanelTimeline(
  timeline: gsap.core.Timeline,
  panel: HTMLElement,
  start: number,
) {
  const bars = query("[data-bar]", panel);
  if (bars.length) {
    timeline.fromTo(
      bars,
      { scaleY: 0, transformOrigin: "50% 100%" },
      { scaleY: 1, duration: 0.7, ease: "power3.out", stagger: 0.07 },
      start,
    );
  }
  const lines = query("[data-line]", panel);
  if (lines.length) {
    timeline.fromTo(
      lines,
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 1.1, ease: "power1.inOut" },
      start + 0.15,
    );
  }
  const areas = query("[data-area]", panel);
  if (areas.length) {
    timeline.fromTo(
      areas,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 1 },
      start + 0.5,
    );
  }
  const dots = query("[data-dot]", panel);
  if (dots.length) {
    timeline.fromTo(
      dots,
      { scale: 0, transformOrigin: "50% 50%" },
      { scale: 1, duration: 0.4, ease: "back.out(2.4)", stagger: 0.1 },
      start + 0.35,
    );
  }
  const segments = query<SVGElement>("[data-seg]", panel);
  if (segments.length) {
    timeline.fromTo(
      segments,
      { strokeDasharray: "0 100" },
      {
        strokeDasharray: (_index: number, element: Element) =>
          element.getAttribute("data-dash") ?? "0 100",
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.12,
      },
      start,
    );
  }
  const cells = query<SVGElement>("[data-cell]", panel);
  if (cells.length) {
    timeline.fromTo(
      cells,
      { scale: 0, autoAlpha: 0, transformOrigin: "50% 50%" },
      {
        scale: 1,
        autoAlpha: 1,
        duration: 0.35,
        ease: "back.out(2)",
        stagger: 0.008,
      },
      start,
    );
  }
  const funnelBars = query("[data-fbar]", panel);
  if (funnelBars.length) {
    timeline.fromTo(
      funnelBars,
      { scaleX: 0, transformOrigin: "50% 50%" },
      { scaleX: 1, duration: 0.7, ease: "power3.out", stagger: 0.14 },
      start,
    );
  }
  const percentages = query("[data-pct]", panel);
  if (percentages.length) {
    timeline.fromTo(
      percentages,
      { scaleX: 0, transformOrigin: "0% 50%" },
      { scaleX: 1, duration: 0.9, ease: "power3.out" },
      start,
    );
  }
  const rows = query("[data-row]", panel);
  if (rows.length) {
    timeline.fromTo(
      rows,
      { x: 22, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: 0.5, stagger: 0.12 },
      start + 0.1,
    );
  }
  const fades = query("[data-fade]", panel);
  if (fades.length) {
    timeline.fromTo(
      fades,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.5, stagger: 0.06 },
      start + 0.5,
    );
  }
}

export default function ExpandSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const lenis = useLenis();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !lenis || prefersReducedMotion) return;

    let context: gsap.Context | undefined;
    const frame = window.requestAnimationFrame(() => {
      if (!section.isConnected) return;

      gsap.registerPlugin(ScrollTrigger);
      section.dataset.fx = "on";

      context = gsap.context(() => {
        const copies = query("[data-copy]", section);
        const dashboards = query("[data-dashboard]", section);
        const glows = query("[data-glow]", section);
        const steps = query("[data-step]", section);
        const fills = query("[data-fill]", section);
        if (
          copies.length !== 3 ||
          dashboards.length !== 3 ||
          glows.length !== 3 ||
          steps.length !== 3 ||
          fills.length !== 3
        ) {
          return;
        }

        const slideDuration = 6;
        const bulletAt = [0.9, 1.9, 3.0];
        gsap.set(glows[0], { opacity: 1 });
        gsap.set(steps[0], { opacity: 1 });

        const timeline = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * 5}`,
            pin: section,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        dashboards.forEach((dashboard, index) => {
          const copy = copies[index];
          const start = index * slideDuration;
          const isLast = index === dashboards.length - 1;
          const copyParts = query(
            "[data-k],[data-t],[data-d],[data-tag]",
            copy,
          );
          const cards = query("[data-card]", dashboard);
          const panels = query("[data-panel]", dashboard);
          const highlights = query("[data-hl]", dashboard);
          const toast = dashboard.querySelector<HTMLElement>("[data-toast]");

          if (index > 0) {
            const enterAt = start - 0.3;
            timeline.fromTo(
              dashboard,
              { autoAlpha: 0, y: 70, rotationY: -14, scale: 0.96 },
              { autoAlpha: 1, y: 0, rotationY: 0, scale: 1, duration: 0.8 },
              enterAt,
            );
            timeline.fromTo(
              copy,
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.2 },
              enterAt,
            );
            timeline.fromTo(
              copyParts,
              { y: 30, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.09 },
              enterAt,
            );
            timeline.fromTo(
              glows[index],
              { opacity: 0 },
              { opacity: 1, duration: 0.8 },
              enterAt,
            );
          }

          timeline.fromTo(
            cards,
            { y: 16, autoAlpha: 0, scale: 0.92 },
            { y: 0, autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.1 },
            start + 0.4,
          );
          query("[data-count]", dashboard).forEach((element, countIndex) => {
            const target = Number(element.dataset.to);
            const decimals = Number(element.dataset.decimals ?? 0);
            const counter = { value: 0 };
            element.textContent = formatNumber(0, decimals);
            timeline.to(
              counter,
              {
                value: target,
                duration: 1.3,
                ease: "power2.out",
                onUpdate: () => {
                  element.textContent = formatNumber(counter.value, decimals);
                },
              },
              start + 0.6 + countIndex * 0.1,
            );
          });

          timeline.fromTo(
            panels,
            { y: 22, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.45 },
            start + 1.1,
          );
          panels.forEach((panel, indexInSlide) =>
            buildPanelTimeline(
              timeline,
              panel,
              start + 1.3 + indexInSlide * 0.45,
            ),
          );

          query("[data-bullet]", copy).forEach((bullet, bulletIndex) => {
            const on = start + bulletAt[bulletIndex];
            const targets = highlights.filter(
              (highlight) => highlight.getAttribute("data-hl") === String(bulletIndex),
            );
            timeline.to(bullet, { opacity: 1, x: 8, duration: 0.4 }, on);
            timeline.to(targets, { "--hl": 1, duration: 0.4 }, on);
            if (bulletIndex < bulletAt.length - 1) {
              const next = start + bulletAt[bulletIndex + 1];
              timeline.to(bullet, { opacity: 0.4, x: 0, duration: 0.4 }, next);
              timeline.to(targets, { "--hl": 0, duration: 0.4 }, next);
            }
          });

          if (toast) {
            timeline.fromTo(
              toast,
              { y: -14, autoAlpha: 0, scale: 0.9 },
              {
                y: 0,
                autoAlpha: 1,
                scale: 1,
                duration: 0.5,
                ease: "back.out(1.6)",
              },
              start + 3.9,
            );
            timeline.to(toast, { autoAlpha: 0, y: -10, duration: 0.4 }, start + 5);
          }

          if (!isLast) {
            const exitAt = start + slideDuration - 0.7;
            timeline.to(
              highlights,
              { "--hl": 0, duration: 0.3 },
              exitAt - 0.1,
            );
            timeline.to(
              dashboard,
              {
                autoAlpha: 0,
                y: -60,
                rotationY: 14,
                scale: 0.96,
                duration: 0.7,
                ease: "power2.in",
              },
              exitAt,
            );
            timeline.to(
              copy,
              { autoAlpha: 0, y: -30, duration: 0.5, ease: "power2.in" },
              exitAt,
            );
            timeline.to(glows[index], { opacity: 0, duration: 0.7 }, exitAt);
            timeline.to(steps[index], { opacity: 0.35, duration: 0.3 }, exitAt);
          }

          timeline.fromTo(
            fills[index],
            { scaleX: 0 },
            { scaleX: 1, duration: slideDuration, ease: "none" },
            start,
          );
          if (index > 0) {
            timeline.to(steps[index], { opacity: 1, duration: 0.3 }, start - 0.3);
          }
        });

        gsap.to(query(".fx-float", section), {
          y: -7,
          duration: 3.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.4,
        });

        ScrollTrigger.refresh();
      }, section);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      context?.revert();
      delete section.dataset.fx;
    };
  }, [lenis, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="section s-expand theme-light fx"
      aria-label="Dashboard previews: HR, accounting and sales"
      id="expand-trigger"
    >
      <div className="fx-wrap">
        {slides.map((slide, index) => (
          <article className="fx-slide" key={slide.key}>
            <div
              className="fx-copy-item"
              data-copy
              style={{ "--ac-rgb": slide.rgb } as DashboardStyle}
            >
              <span className="fx-kicker" data-k>
                <i />
                {slide.kicker}
              </span>
              <h3 className="fx-title" data-t>
                {slide.title[0]} <em>{slide.title[1]}</em>
              </h3>
              <p className="fx-desc" data-d>
                {slide.description}
              </p>
              <ul className="fx-bullets">
                {slide.bullets.map((bullet) => (
                  <li key={bullet} data-bullet>
                    <i />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <span className="fx-tag" data-tag>
                {slide.tag}
              </span>
            </div>
            {index === 0 ? (
              <HrDashboard />
            ) : index === 1 ? (
              <AccountingDashboard />
            ) : (
              <CrmDashboard />
            )}
          </article>
        ))}

        {slides.map((slide) => (
          <div
            key={slide.key}
            className="fx-glow"
            data-glow
            style={{ "--ac-rgb": slide.rgb } as DashboardStyle}
            aria-hidden="true"
          />
        ))}

        <div className="fx-progress" aria-hidden="true">
          <div className="fx-steps">
            {slides.map((slide) => (
              <div key={slide.key} className="fx-step" data-step>
                <span>{slide.module}</span>
                <i>
                  <b data-fill />
                </i>
              </div>
            ))}
          </div>
          <p>Illustrative screens with sample data</p>
        </div>
      </div>
    </section>
  );
}
