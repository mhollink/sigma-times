import {Bar} from "react-chartjs-2";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";
import type {Points} from "../../types/data.ts";
import type {FunctionComponent} from "react";
import {barShadowPlugin} from "./barShadowPlugin.ts";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface WeeklyScoresChartProps {
    data: Record<string, Points>;
}

export const WeeklyScoresChart: FunctionComponent<WeeklyScoresChartProps> = ({data}) => {
    const values: ({week: string} & Points)[] = Object.entries(data)
        .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
        .flatMap((([week, scores]) => ({week, ...scores})));
    const labels = Object.keys(data)
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())


    const chartData = {
        labels,
        datasets: [
            {
                label: "Eric",
                data: values.map((d: Points) => d.eric),
                borderColor: "rgba(125, 255, 224, 0.9)",
                backgroundColor: "rgba(125, 255, 224, 0.3)",
                borderWidth: 2,
            },
            {
                label: "Niels",
                data: values.map((d: Points) => d.niels),
                backgroundColor: "rgba(147, 233, 73, 0.7)",
                borderColor: "rgba(147, 233, 73, 1)",
                borderWidth: 2,
            },
            {
                label: "Marcel",
                data: values.map((d: Points) => d.marcel),
                backgroundColor: "rgba(200, 100, 255, 0.7)",
                borderColor: "rgba(200, 100, 255, 1)",
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom" as const,
                labels: {
                    color: "white",
                },
            },
            tooltip: {
                titleColor: "white",
                bodyColor: "white",
            },
        },
        scales: {
            x: {
                ticks: { color: "white" },
                grid: {color: "rgba(255,255,200,0.15)",}
            },
            y: {
                ticks: { color: "white"},
                grid: {color: "rgba(255,255,200,0.15)",}
            },
        },
    };

    return <Bar
        data={chartData}
        options={options}
        plugins={[barShadowPlugin]}
    />;
}