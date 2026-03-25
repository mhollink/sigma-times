import {Line} from "react-chartjs-2";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import type {Points} from "../../types/data.ts";
import type {FunctionComponent} from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface AccumulatedScoresChartProps {
    data: Record<number, Points>;
}

export const AccumulatedScoresChart: FunctionComponent<AccumulatedScoresChartProps> = ({data}) => {
    const values = Object.entries(data)
        .sort(([weekA], [weekB]) => new Date(weekA) - new Date(weekB))
        .flatMap((([week, scores]) => ({week, ...scores})));
    const labels = [
        0,
        ...Object.keys(data)
            .sort((weekA, weekB) => new Date(weekA) - new Date(weekB))
    ]

    const scoresWithFake = [
        {week: 0, eric: 0, niels: 0, marcel: 0},
        ...values,
    ];

    const accumulated = scoresWithFake.reduce((acc, curr, index) => {
        if (index === 0) return [curr];
        const prev = acc[index - 1];
        acc.push({
            week: curr.week,
            eric: curr.eric + prev.eric,
            niels: curr.niels + prev.niels,
            marcel: curr.marcel + prev.marcel,
        });
        return acc;
    }, []);

    const chartData = {
        labels,
        datasets: [
            {
                label: "Eric",
                data: accumulated.map(d => d.eric),
                borderColor: "rgba(125, 255, 224, 0.9)",
                backgroundColor: "rgba(125, 255, 224, 0.3)",
                tension: 0.3, // smooth curve
            },
            {
                label: "Niels",
                data: accumulated.map(d => d.niels),
                backgroundColor: "rgba(147, 233, 73, 0.7)",
                borderColor: "rgba(147, 233, 73, 1)",
                tension: 0.3,
            },
            {
                label: "Marcel",
                data: accumulated.map(d => d.marcel),
                backgroundColor: "rgba(200, 100, 255, 0.7)",
                borderColor: "rgba(200, 100, 255, 1)",
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {labels: {color: "white"}, position: "bottom"},
            tooltip: {titleColor: "white", bodyColor: "white"},
        },
        scales: {
            x: {ticks: {color: "white"}, grid: {color: "rgba(255,255,255,0.1)"}},
            y: {ticks: {color: "white"}, grid: {color: "rgba(255,255,255,0.1)"}},
        },
    };

    return <Line data={chartData} options={options}/>;
}